import AVFoundation
import Speech
import SwiftUI
import UIKit
import WebKit

@main
struct ZumBergfriedenApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .preferredColorScheme(.light)
        }
    }
}

private struct ContentView: View {
    @State private var loadError: String?
    @State private var reloadID = UUID()

    var body: some View {
        Group {
            if let loadError {
                VStack(spacing: 16) {
                    Image(systemName: "exclamationmark.triangle")
                        .font(.system(size: 38))
                        .foregroundStyle(.orange)
                    Text("Die Sprachbrücke konnte nicht geöffnet werden.")
                        .font(.title3.weight(.semibold))
                    Text(loadError)
                        .font(.body)
                        .foregroundStyle(.secondary)
                        .multilineTextAlignment(.center)
                    Button("Erneut versuchen") {
                        self.loadError = nil
                        reloadID = UUID()
                    }
                    .buttonStyle(.borderedProminent)
                }
                .padding(28)
            } else {
                WebApplication { message in
                    loadError = message
                }
                .id(reloadID)
                .ignoresSafeArea()
            }
        }
    }
}

private struct WebApplication: UIViewRepresentable {
    let onLoadFailure: (String) -> Void

    func makeCoordinator() -> Coordinator {
        Coordinator(onLoadFailure: onLoadFailure)
    }

    func makeUIView(context: Context) -> WKWebView {
        let contentController = WKUserContentController()
        contentController.add(context.coordinator, name: "bergfriedenSpeak")
        contentController.add(context.coordinator, name: "bergfriedenSpeech")

        let configuration = WKWebViewConfiguration()
        configuration.userContentController = contentController
        configuration.preferences.javaScriptCanOpenWindowsAutomatically = false

        let webView = WKWebView(frame: .zero, configuration: configuration)
        webView.isOpaque = false
        webView.backgroundColor = UIColor(red: 0.953, green: 0.961, blue: 0.937, alpha: 1)
        webView.scrollView.backgroundColor = webView.backgroundColor
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.allowsBackForwardNavigationGestures = false
        webView.navigationDelegate = context.coordinator
        context.coordinator.webView = webView

        guard let pageURL = Bundle.main.url(forResource: "index", withExtension: "html") else {
            onLoadFailure("Die Startseite fehlt im App-Bundle. Öffnen Sie das Xcode-Projekt und prüfen Sie die Copy Bundle Resources-Dateiliste.")
            return webView
        }
        webView.loadFileURL(pageURL, allowingReadAccessTo: Bundle.main.bundleURL)
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {}

    final class Coordinator: NSObject, WKScriptMessageHandler, WKNavigationDelegate, AVSpeechSynthesizerDelegate {
        weak var webView: WKWebView?

        private let onLoadFailure: (String) -> Void
        private let speechSynthesizer = AVSpeechSynthesizer()
        private let speechRecognizer = SFSpeechRecognizer(locale: Locale(identifier: "ru-RU"))
        private let audioEngine = AVAudioEngine()
        private var recognitionRequest: SFSpeechAudioBufferRecognitionRequest?
        private var recognitionTask: SFSpeechRecognitionTask?
        private var isFinishingRecognition = false
        private var hasInputTap = false

        init(onLoadFailure: @escaping (String) -> Void) {
            self.onLoadFailure = onLoadFailure
            super.init()
            speechSynthesizer.delegate = self
        }

        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            guard let body = message.body as? [String: Any] else { return }
            switch message.name {
            case "bergfriedenSpeak":
                speak(
                    text: body["text"] as? String ?? "",
                    language: body["language"] as? String ?? "ru-RU",
                    rate: body["rate"] as? Double ?? 0.9
                )
            case "bergfriedenSpeech":
                startSpeechRecognition()
            default:
                break
            }
        }

        func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
            onLoadFailure(error.localizedDescription)
        }

        func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
            onLoadFailure(error.localizedDescription)
        }

        func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            guard let scheme = navigationAction.request.url?.scheme?.lowercased() else {
                decisionHandler(.cancel)
                return
            }
            decisionHandler(scheme == "file" || scheme == "about" ? .allow : .cancel)
        }

        private func speak(text: String, language: String, rate: Double) {
            speechSynthesizer.stopSpeaking(at: .immediate)
            guard !text.isEmpty else { return }
            let utterance = AVSpeechUtterance(string: text)
            utterance.voice = AVSpeechSynthesisVoice(language: language)
            utterance.rate = Float(min(max(rate * 0.48, 0.25), 0.52))
            speechSynthesizer.speak(utterance)
        }

        func speechSynthesizer(_ synthesizer: AVSpeechSynthesizer, didFinish utterance: AVSpeechUtterance) {
            dispatch(event: "bergfrieden-speech-end", detail: [:])
        }

        private func startSpeechRecognition() {
            guard let speechRecognizer, speechRecognizer.isAvailable else {
                dispatchError("Russische Spracherkennung ist auf diesem iPhone momentan nicht verfügbar.")
                return
            }

            let authorization = SFSpeechRecognizer.authorizationStatus()
            if authorization == .notDetermined {
                SFSpeechRecognizer.requestAuthorization { [weak self] status in
                    DispatchQueue.main.async {
                        guard let self else { return }
                        guard status == .authorized else {
                            self.dispatchError("Die Berechtigung für Spracherkennung wurde nicht erteilt.")
                            return
                        }
                        self.requestMicrophoneAccessAndStart(speechRecognizer)
                    }
                }
            } else if authorization == .authorized {
                requestMicrophoneAccessAndStart(speechRecognizer)
            } else {
                dispatchError("Erlauben Sie die Spracherkennung in den iPhone-Einstellungen.")
            }
        }

        private func requestMicrophoneAccessAndStart(_ speechRecognizer: SFSpeechRecognizer) {
            AVAudioSession.sharedInstance().requestRecordPermission { [weak self] granted in
                DispatchQueue.main.async {
                    guard let self else { return }
                    guard granted else {
                        self.dispatchError("Der Mikrofonzugriff wurde nicht erteilt.")
                        return
                    }
                    self.startOnDeviceRecognition(speechRecognizer)
                }
            }
        }

        private func startOnDeviceRecognition(_ speechRecognizer: SFSpeechRecognizer) {
            guard speechRecognizer.supportsOnDeviceRecognition else {
                dispatchError("Offline-Spracherkennung für Russisch wird von diesem iPhone nicht unterstützt. Es wurde keine Aufnahme gestartet.")
                return
            }

            stopRecognition()
            isFinishingRecognition = false
            let session = AVAudioSession.sharedInstance()
            do {
                try session.setCategory(.playAndRecord, mode: .spokenAudio, options: [.defaultToSpeaker, .duckOthers])
                try session.setActive(true, options: .notifyOthersOnDeactivation)

                let request = SFSpeechAudioBufferRecognitionRequest()
                request.shouldReportPartialResults = false
                request.requiresOnDeviceRecognition = true
                recognitionRequest = request

                let input = audioEngine.inputNode
                input.installTap(onBus: 0, bufferSize: 1_024, format: input.outputFormat(forBus: 0)) { buffer, _ in
                    request.append(buffer)
                }
                hasInputTap = true
                audioEngine.prepare()
                try audioEngine.start()

                recognitionTask = speechRecognizer.recognitionTask(with: request) { [weak self] result, error in
                    DispatchQueue.main.async {
                        guard let self, !self.isFinishingRecognition else { return }
                        if let result, result.isFinal {
                            let transcript = result.bestTranscription.formattedString
                            self.finishRecognition()
                            if transcript.isEmpty {
                                self.dispatchError("Es wurde kein Wort erkannt. Sie können es noch einmal versuchen.")
                            } else {
                                self.dispatch(event: "bergfrieden-speech-result", detail: ["transcript": transcript])
                            }
                        } else if error != nil {
                            self.finishRecognition()
                            self.dispatchError("Die Spracherkennung wurde beendet. Bitte versuchen Sie es erneut.")
                        }
                    }
                }

                DispatchQueue.main.asyncAfter(deadline: .now() + 12) { [weak self] in
                    guard let self, self.audioEngine.isRunning, !self.isFinishingRecognition else { return }
                    self.finishRecognition()
                    self.dispatchError("Die Aufnahme wurde nach 12 Sekunden beendet. Sie können es erneut versuchen.")
                }
            } catch {
                finishRecognition()
                dispatchError("Mikrofon oder Spracherkennung konnten nicht gestartet werden.")
            }
        }

        private func stopRecognition() {
            if audioEngine.isRunning {
                audioEngine.stop()
            }
            if hasInputTap {
                audioEngine.inputNode.removeTap(onBus: 0)
                hasInputTap = false
            }
            recognitionRequest?.endAudio()
            recognitionRequest = nil
            recognitionTask?.cancel()
            recognitionTask = nil
        }

        private func finishRecognition() {
            guard !isFinishingRecognition else { return }
            isFinishingRecognition = true
            stopRecognition()
            do {
                try AVAudioSession.sharedInstance().setActive(false, options: .notifyOthersOnDeactivation)
            } catch {
                NSLog("Audio-Session konnte nicht beendet werden: %@", error.localizedDescription)
            }
        }

        private func dispatchError(_ message: String) {
            dispatch(event: "bergfrieden-speech-error", detail: ["message": message])
        }

        private func dispatch(event: String, detail: [String: String]) {
            guard
                let webView,
                let detailData = try? JSONSerialization.data(withJSONObject: detail, options: [.fragmentsAllowed]),
                let detailJSON = String(data: detailData, encoding: .utf8),
                let eventData = try? JSONSerialization.data(withJSONObject: event, options: [.fragmentsAllowed]),
                let eventJSON = String(data: eventData, encoding: .utf8)
            else { return }
            let script = "window.dispatchEvent(new CustomEvent(\(eventJSON), { detail: \(detailJSON) }));"
            DispatchQueue.main.async {
                webView.evaluateJavaScript(script) { _, error in
                    if let error {
                        NSLog("App-Mitteilung an die Web-Oberfläche fehlgeschlagen: %@", error.localizedDescription)
                    }
                }
            }
        }

        deinit {
            stopRecognition()
            speechSynthesizer.stopSpeaking(at: .immediate)
        }
    }
}
