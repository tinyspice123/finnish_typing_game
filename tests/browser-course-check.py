"""Optional browser regression check. Requires Playwright and an installed Edge browser.

Run from the repository root: python tests/browser-course-check.py
This adds no dependencies to the static website or npm test.
"""
import functools
import http.server
import os
from pathlib import Path
import threading

from playwright.sync_api import sync_playwright


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *_):
        pass


def answer_source(page, source_index):
    answers = page.evaluate("i => courseSources[i].questions.map(q => q.answer)", source_index)
    for index, answer in enumerate(answers):
        page.locator(f'input[name="q{index}"][value="{answer}"]').check()
    page.locator("[data-source-form] button[type=submit]").click()


def main():
    root = Path(__file__).resolve().parent.parent
    handler = functools.partial(QuietHandler, directory=str(root))
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    address = f"http://127.0.0.1:{server.server_port}"
    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(channel="msedge", headless=True)
            for width in (1440, 375, 320):
                context = browser.new_context(viewport={"width": width, "height": 900}, has_touch=width < 500)
                page = context.new_page()
                errors = []
                page.on("pageerror", lambda error: errors.append(str(error)))
                page.goto(address)
                page.locator("#bridgeActivity").wait_for()
                assert page.locator("[data-unit]").count() == 18
                assert page.locator("#bridgeActivity details[open]").count() == 0
                page.locator("#targetPair").select_option("reading-speaking")
                page.reload()
                assert page.locator("#targetPair").input_value() == "reading-speaking"
                assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")

                # Starting check: objective comprehension versus self-reflection stay separate.
                page.locator("#startingCheck").click()
                answer_source(page, 0)
                page.locator("[data-source-continue]").click()
                page.locator("[data-transcript] summary").click()
                answer_source(page, 2)
                page.locator("[data-source-continue]").click()
                for _ in range(2):
                    page.locator("#baselineAnswer").fill("Asun Suomessa. Opiskelen suomea joka päivä.")
                    page.locator("#baselineManaged").check()
                    page.locator("#baselineSave").click()
                assert page.evaluate("LearningStore.state.attempts.filter(a => a.type === 'starting-check').length") == 4
                assert page.evaluate("LearningStore.state.attempts.find(a => a.skill === 'writing').success") is None

                # Appointment pilot: construct, change details, handle a follow-up, produce and transfer.
                page.locator('[data-unit="appointments"]').click()
                page.locator('[data-bridge-step="1"]').click()
                expected = page.evaluate("bridgeUnits.find(u => u.id === 'appointments').chunks")
                for desired, text in enumerate(expected):
                    current = page.locator("#phraseCards li span").all_text_contents().index(text)
                    while current > desired:
                        page.locator(f'[data-move="{current}"][data-direction="-1"]').click()
                        current -= 1
                page.locator("#checkBuild").click()
                assert "in order" in page.locator("#ykiStatus").inner_text()
                page.locator('[data-bridge-step="2"]').click()
                page.locator("#appointmentDay").select_option(label="perjantaina")
                assert "perjantaina" in page.locator("#appointmentPreview").inner_text()
                page.locator("#changedMessage").fill("Haluaisin ajan perjantaina iltapäivällä.")
                page.locator('[data-bridge-step="3"]').click()
                page.locator("#roleQuestion").click()
                page.locator("#roleAnswer").fill("Kipu alkoi eilen. Sopisiko maanantai?")
                page.locator('[data-bridge-step="4"]').click()
                page.locator("#independentDraft").fill("Minulla on yskä. Se alkoi maanantaina. Haluaisin ajan torstaina.")
                page.locator("#bridgeActivity details[data-support] summary").click()
                page.locator("#outsideHelp").check()
                with page.expect_download() as download_event:
                    page.locator("#exportSample").click()
                assert "Support used: yes" in Path(download_event.value.path()).read_text(encoding="utf-8")
                page.reload()
                assert "Minulla on yskä" in page.locator("#independentDraft").input_value()
                page.locator("#saveIndependent").click()
                assert page.evaluate("LearningStore.state.attempts.at(-1).supported") is True
                page.locator("#continueUnit").click()
                page.locator("#independentDraft").fill("Siirsin ajan perjantaille, koska olin töissä.")
                page.locator("#saveIndependent").click()
                assert page.evaluate("LearningStore.state.completed.appointments") is True
                mission_sources = page.evaluate("LearningStore.state.attempts.filter(a => a.type === 'transfer').map(a => a.sourceId)")
                page.locator('[data-bridge-step="5"]').click()
                page.locator("#independentDraft").fill("Harjoittelin kotona. Ehdotin uutta aikaa.")
                page.locator("#saveIndependent").click()
                assert page.evaluate("LearningStore.state.attempts.at(-1).sourceId") == mission_sources[0]

                # Transcript support survives navigation before submission.
                page.locator('[data-yki-view="comprehension"]').click()
                page.locator("#sourceSelect").select_option("4")
                page.locator("#sourceSkill").select_option("listening")
                page.locator("[data-transcript] summary").click()
                page.locator("#sourceBack").click()
                page.locator("#sourcePractice").click()
                answer_source(page, 4)
                assert page.evaluate("LearningStore.state.attempts.at(-1).supported") is True
                page.locator("[data-source-continue]").click()

                # Failed TTS cannot create an independent listening result.
                page.evaluate("() => { speechSynthesis.speak = u => u.onerror({error: 'audio-unavailable'}); }")
                page.locator("[data-play-source]").click()
                before = page.evaluate("LearningStore.state.attempts.length")
                answer_source(page, 5)
                assert page.evaluate("LearningStore.state.attempts.length") == before
                assert "Listen first" in page.locator("#ykiStatus").inner_text()

                # Pending transcript support follows a source across different activity types.
                page.locator("#sourceSelect").select_option("4")
                page.locator("[data-transcript] summary").click()
                page.locator("#sourceBack").click()
                page.locator('[data-unit="appointments"]').click()
                page.locator('[data-bridge-step="6"]').click()
                page.locator("#reviewSkill").select_option("listening")
                answer_source(page, 4)
                assert page.evaluate("LearningStore.state.attempts.at(-1).supported") is True

                # A checkpoint is exposed when rendered, even if abandoned.
                page.locator('[data-yki-view="mock"]').click()
                page.locator("#startHeldout").click()
                assert page.evaluate("LearningStore.state.visited['checkpoint-housing-travel-reading']") is True
                page.locator("#leaveCheckpoint").click()
                page.locator("#courseCheckpoint").click()
                page.locator("#startHeldout").click()
                assert page.evaluate("LearningStore.state.visited['checkpoint-work-services-reading']") is True
                assert page.evaluate("document.activeElement.id") == "ykiTitle"
                page.locator('input[name="q0"][value="1"]').check()
                page.locator("[data-source-form] button[type=submit]").click()
                page.locator("[data-source-continue]").click()
                assert page.evaluate("document.activeElement.id") == "ykiTitle"
                page.locator("[data-transcript] summary").click()
                page.locator('input[name="q0"][value="0"]').check()
                page.locator("[data-source-form] button[type=submit]").click()
                page.locator("[data-source-continue]").click()
                for _ in range(2):
                    page.locator("#checkpointAnswer").fill("Haluaisin uuden ajan. En pääse aamulla, koska olen töissä.")
                    page.locator("#checkpointSave").click()
                assert "Checkpoint saved" in page.locator("#ykiTitle").inner_text()
                page.locator('[data-yki-view="mock"]').click()
                page.locator("#startHeldout").click()
                page.locator("#leaveCheckpoint").click()
                page.locator("#courseCheckpoint").click()
                assert "All three sets" in page.locator("#ykiContent").inner_text()
                page.locator("#startHeldout").click()
                page.locator('input[name="q0"][value="0"]').check()
                page.locator("[data-source-form] button[type=submit]").click()
                assert page.evaluate("LearningStore.state.attempts.at(-1).unseen") is False

                # Keyword-only writing and self-checks never receive automatic language success.
                page.locator('[data-yki-view="writing"]').click()
                page.locator("#ykiAnswer").fill("hana vuotaa alk korja sopi")
                page.locator("#checkWriting").click()
                assert "covers approximately" not in page.locator("#taskFeedback").inner_text()
                page.locator("#taskFeedback details summary").click()
                page.locator('[data-rate="3"]').click()
                assert page.evaluate("LearningStore.state.attempts.at(-1).success") is None
                assert page.evaluate("LearningStore.state.attempts.at(-1).supported") is True

                # Every unit/stage fits a narrow screen; actions remain accessible buttons.
                page.locator('[data-yki-view="bridge"]').click()
                for unit in page.evaluate("bridgeUnits.map(u => u.id)"):
                    page.locator(f'[data-unit="{unit}"]').click()
                    for stage in range(7):
                        page.locator(f'[data-bridge-step="{stage}"]').click()
                        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), (width, unit, stage)
                page.locator('[data-yki-view="typing"]').click()
                assert page.locator("#time").inner_text() == "0:00"
                assert page.locator("#levelSelect").input_value() == "starter"
                target = page.evaluate("current().fi")
                page.locator("#typingInput").fill(target.upper())
                assert "Hyvä" in page.locator("#feedback").inner_text()
                assert not errors, errors

                # Unavailable mic and speech are recoverable; recording cleanup releases tracks.
                page.locator('[data-yki-view="speaking"]').click()
                page.evaluate("() => { navigator.mediaDevices.getUserMedia = () => Promise.reject(new Error('denied')); }")
                page.locator(".record-local").click()
                assert "unavailable" in page.locator(".recorder-note").inner_text()
                assert page.locator("#ykiTimer").inner_text() == "Untimed"
                page.locator('[data-yki-view="bridge"]').click()
                page.locator('[data-unit="appointments"]').click()
                page.locator('[data-bridge-step="1"]').click()
                page.screenshot(path=str(Path(os.environ.get("TEMP", "/tmp")) / f"nappara-course-{width}.png"), full_page=True)
                print(f"PASS {width}px: course, baseline, persistence, source support, audio failure, checkpoints, writing, mobile, mic denial", flush=True)
                context.close()
            browser.close()
    finally:
        server.shutdown()


if __name__ == "__main__":
    main()
