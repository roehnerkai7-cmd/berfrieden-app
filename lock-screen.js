(() => {
  const APP_PASSWORD = "32108";
  const LOCK_KEY = "bergfrieden.unlocked.v1";
  const ACTIVITY_KEY = "bergfrieden.lastActivity.v1";
  const INACTIVITY_MINUTES = 20;
  const INACTIVITY_MS = INACTIVITY_MINUTES * 60 * 1000;

  let inactivityTimer = null;
  let locked = true;

  function readStorage(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn("Lock screen: could not persist unlock state.", error);
    }
  }

  function isUnlocked() {
    if (readStorage(LOCK_KEY) !== "true") return false;
    const lastActivity = Number(readStorage(ACTIVITY_KEY) || 0);
    return Date.now() - lastActivity < INACTIVITY_MS;
  }

  function saveUnlocked(value) {
    writeStorage(LOCK_KEY, String(value));
    if (value) writeStorage(ACTIVITY_KEY, String(Date.now()));
  }

  function applyLockedState() {
    locked = true;
    if (inactivityTimer) clearTimeout(inactivityTimer);
    const lock = document.getElementById("password-lock");
    const appShell = document.getElementById("app-shell");
    if (lock) lock.style.display = "flex";
    if (appShell) {
      appShell.classList.add("is-locked");
      appShell.setAttribute("aria-hidden", "true");
    }
    saveUnlocked(false);
    const input = document.getElementById("password-input");
    if (input) {
      input.value = "";
      input.focus();
    }
  }

  function applyUnlockedState() {
    locked = false;
    const lock = document.getElementById("password-lock");
    const appShell = document.getElementById("app-shell");
    const errorText = document.getElementById("password-error");
    if (lock) lock.style.display = "none";
    if (appShell) {
      appShell.classList.remove("is-locked");
      appShell.removeAttribute("aria-hidden");
    }
    if (errorText) errorText.textContent = "";
    saveUnlocked(true);
    resetInactivityTimer();
  }

  function resetInactivityTimer() {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(applyLockedState, INACTIVITY_MS);
  }

  function validate() {
    const input = document.getElementById("password-input");
    const errorText = document.getElementById("password-error");
    if (!input || !errorText) return;

    const value = String(input.value || "").trim();

    if (value === APP_PASSWORD) {
      applyUnlockedState();
      return;
    }

    errorText.textContent = "Falsches Passwort. Bitte erneut versuchen.";
    input.value = "";
    input.focus();
    saveUnlocked(false);
  }

  function registerUserActivity() {
    if (locked) return;
    writeStorage(ACTIVITY_KEY, String(Date.now()));
    resetInactivityTimer();
  }

  function initLockScreen() {
    const input = document.getElementById("password-input");
    const button = document.getElementById("unlock-button");

    if (input) {
      input.addEventListener("keydown", event => {
        if (event.key === "Enter") validate();
      });
    }

    if (button) {
      button.addEventListener("click", validate);
    }

    ["click", "keydown", "mousemove", "touchstart", "scroll"].forEach(type => {
      document.addEventListener(type, registerUserActivity, { passive: true });
    });

    // Re-check when the app returns from the background (e.g. iPad sleep).
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && !locked && !isUnlocked()) applyLockedState();
    });

    // Hidden lock: Ctrl/Cmd + Shift + L or a double-tap on the brand logo.
    document.addEventListener("keydown", event => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === "l") {
        event.preventDefault();
        applyLockedState();
      }
    });
    const brandLogo = document.querySelector(".brand-logo");
    if (brandLogo) brandLogo.addEventListener("dblclick", event => {
      event.preventDefault();
      applyLockedState();
    });

    if (isUnlocked()) {
      applyUnlockedState();
    } else {
      applyLockedState();
    }
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    initLockScreen();
  } else {
    window.addEventListener("load", initLockScreen, { once: true });
  }
})();
