(() => {
  const DEFAULT_LANGUAGE = "ru";
  const LANGUAGE_META = {
    ru: { locale: "ru-RU", label: "Russisch" },
    pl: { locale: "pl-PL", label: "Polnisch" }
  };

  function normalizeResidentLanguage(value) {
    const normalized = String(value ?? "").trim().toLowerCase();
    if (normalized === "pl" || normalized === "pl-pl") return "pl";
    if (normalized === "ru" || normalized === "ru-ru") return "ru";
    return DEFAULT_LANGUAGE;
  }

  function activeResident() {
    return window.state && Array.isArray(window.state.residents) ? window.state.residents[0] || null : null;
  }

  function currentResidentLanguage() {
    return normalizeResidentLanguage(activeResident()?.language || DEFAULT_LANGUAGE);
  }

  function localeForLanguage(language) {
    return LANGUAGE_META[normalizeResidentLanguage(language)]?.locale || "ru-RU";
  }

  function labelForLanguage(language) {
    return LANGUAGE_META[normalizeResidentLanguage(language)]?.label || "Russisch";
  }

  function persistResidentLanguages() {
    if (!window.state || !Array.isArray(window.state.residents)) return;
    window.state.residents = window.state.residents.map(resident => ({
      ...resident,
      language: normalizeResidentLanguage(resident.language)
    }));
    try {
      localStorage.setItem("bergfrieden.residents.v1", JSON.stringify(window.state.residents));
    } catch (error) {
      console.warn("Language support: could not persist resident languages.", error);
    }
  }

  function patchResidentForm() {
    const originalRenderModal = window.renderModal;
    if (!originalRenderModal || originalRenderModal.__bergfriedenLanguagePatched) return;

    window.renderModal = function(content, className = "") {
      let nextContent = content;
      if (typeof nextContent === "string" && nextContent.includes('id="resident-form"') && !nextContent.includes('name="language"')) {
        const selectedLanguage = currentResidentLanguage();
        const languageField = `
          <label class="form-field">
            <span class="field-label">Sprache</span>
            <select class="select" name="language">
              <option value="ru" ${selectedLanguage === "ru" ? "selected" : ""}>Russisch</option>
              <option value="pl" ${selectedLanguage === "pl" ? "selected" : ""}>Polnisch</option>
            </select>
          </label>`;
        nextContent = nextContent.replace(/<div class="divider"><\/div>/, `${languageField}<div class="divider"></div>`);
      }
      return originalRenderModal.call(this, nextContent, className);
    };

    originalRenderModal.__bergfriedenLanguagePatched = true;
  }

  function patchSpeak() {
    const originalSpeak = window.speak;
    if (!originalSpeak || originalSpeak.__bergfriedenLanguagePatched) return;

    window.speak = function(text, language = currentResidentLanguage(), rate = 0.9, onEnd) {
      const locale = localeForLanguage(language);
      return originalSpeak.call(this, text, locale, rate, onEnd);
    };

    originalSpeak.__bergfriedenLanguagePatched = true;
  }

  function patchSubmitPhrase() {
    const originalSubmitPhrase = window.submitPhrase;
    if (!originalSubmitPhrase || originalSubmitPhrase.__bergfriedenLanguagePatched) return;

    window.submitPhrase = function(de) {
      const phrase = window.quickPhrases?.find(item => item.de.toLocaleLowerCase("de-DE") === String(de || "").trim().toLocaleLowerCase("de-DE"));
      if (!phrase) return false;
      const residentLanguage = currentResidentLanguage();
      const spokenText = residentLanguage === "pl" && phrase.pl ? phrase.pl : phrase.ru;

      if (window.state && Array.isArray(window.state.chat)) {
        window.state.chat.push(
          { type: "staff", text: de },
          { type: residentLanguage === "pl" ? "polish" : "russian", text: spokenText, translation: phrase }
        );
        if (typeof window.render === "function") window.render();
        const chatWindow = document.getElementById("chat-window");
        if (chatWindow) chatWindow.scrollTop = chatWindow.scrollHeight;
      }

      if (typeof window.speak === "function") {
        window.speak(spokenText, residentLanguage, 0.88);
      }
      return true;
    };

    originalSubmitPhrase.__bergfriedenLanguagePatched = true;
  }

  function patchBeginRecognition() {
    if (window.__bergfriedenBeginRecognitionPatched) return;
    window.__bergfriedenBeginRecognitionPatched = true;

    window.beginRecognition = function() {
      if (!activeResident()) {
        if (typeof window.showToast === "function") window.showToast("Bitte zuerst ein Bewohnerprofil auswählen.");
        return;
      }

      const residentLanguage = currentResidentLanguage();
      const locale = localeForLanguage(residentLanguage);
      const button = document.getElementById("mic-button");
      const status = document.getElementById("recognition-status");
      if (!button || !status) return;

      const nativeSpeech = window.webkit?.messageHandlers?.bergfriedenSpeech;
      if (nativeSpeech) {
        window.state.recognitionStartedAt = Date.now();
        button.classList.add("listening");
        document.getElementById("voice-meter")?.classList.add("active");
        button.innerHTML = "<span>🔴</span> Ich höre zu …";
        status.textContent = `Sprechen Sie jetzt ein Wort auf ${labelForLanguage(residentLanguage)}. Die Erkennung erfolgt nach Möglichkeit direkt auf diesem Gerät.`;
        nativeSpeech.postMessage({ locale });
        return;
      }

      const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!Recognition) {
        if (typeof window.showToast === "function") {
          window.showToast("Diese Spracherkennung ist in diesem Browser nicht verfügbar. Nutzen Sie Chrome oder Edge und tippen Sie auf ein gesprochenes Wort in der Unterhaltung.");
        }
        return;
      }

      const recognition = new Recognition();
      recognition.lang = locale;
      recognition.continuous = false;
      recognition.interimResults = true;
      window.state.recognition = recognition;
      window.state.recognitionStartedAt = Date.now();
      button.classList.add("listening");
      document.getElementById("voice-meter")?.classList.add("active");
      button.innerHTML = "<span>🔴</span> Ich höre zu …";
      status.textContent = `Sprechen Sie jetzt ein Wort auf ${labelForLanguage(residentLanguage)}. Die Erkennung läuft nur während dieser Übung.`;
      let resultHandled = false;

      recognition.onresult = event => {
        if (resultHandled || !button.isConnected) return;
        const results = Array.from(event.results).filter(result => result.isFinal);
        if (!results.length) return;
        const transcript = results.map(result => result[0].transcript).join(" ").trim().toLocaleLowerCase(locale);
        if (!transcript) return;
        resultHandled = true;
        if (typeof window.showRecognitionResult === "function") window.showRecognitionResult(transcript);
      };

      recognition.onerror = event => {
        button.classList.remove("listening");
        document.getElementById("voice-meter")?.classList.remove("active");
        button.innerHTML = "<span>🎙️</span> Antwort sprechen";
        status.textContent = event.error === "not-allowed"
          ? "Mikrofonzugriff wurde verweigert. Erlauben Sie den Zugriff in den Browser-Einstellungen."
          : event.error === "no-speech"
            ? "Es wurde nichts erkannt. Sie können es noch einmal versuchen."
            : `Spracherkennung fehlgeschlagen (${event.error}).`;
        if (event.error !== "no-speech" && event.error !== "aborted" && typeof window.showToast === "function") {
          window.showToast(status.textContent);
        }
      };

      recognition.onend = () => {
        document.getElementById("voice-meter")?.classList.remove("active");
        if (!button.isConnected || !button.classList.contains("listening")) return;
        button.classList.remove("listening");
        button.innerHTML = "<span>🎙️</span> Antwort sprechen";
        if (!resultHandled) status.textContent = "Die Aufnahme wurde beendet. Sie können es noch einmal versuchen.";
      };

      try {
        recognition.start();
      } catch (error) {
        console.error("Spracherkennung konnte nicht gestartet werden.", error);
        button.classList.remove("listening");
        document.getElementById("voice-meter")?.classList.remove("active");
        button.innerHTML = "<span>🎙️</span> Antwort sprechen";
        status.textContent = "Mikrofon konnte nicht gestartet werden. Prüfen Sie die Berechtigung und versuchen Sie es erneut.";
      }
    };
  }

  function patchResidentSubmission() {
    document.addEventListener("submit", function(event) {
      if (!event.target || event.target.id !== "resident-form") return;
      const form = event.target;
      const formLanguage = form.querySelector('[name="language"]');
      const languageValue = normalizeResidentLanguage(formLanguage ? formLanguage.value : "ru");
      const editId = form.dataset.editId || null;

      if (!window.state || !Array.isArray(window.state.residents)) return;
      const existing = editId ? window.state.residents.find(item => item.id === editId) : null;
      const targetResident = existing || window.state.residents[0] || null;

      if (targetResident) {
        targetResident.language = languageValue;
      }
      if (existing) {
        window.state.residents = window.state.residents.map(item => item.id === editId ? { ...item, language: languageValue } : item);
      }
      persistResidentLanguages();
    }, true);
  }

  function install() {
    patchResidentForm();
    patchSpeak();
    patchSubmitPhrase();
    patchBeginRecognition();
    patchResidentSubmission();
    persistResidentLanguages();
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    install();
  } else {
    window.addEventListener("load", install, { once: true });
  }
})();
