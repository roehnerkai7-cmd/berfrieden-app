(() => {
  const APP_PASSWORD = "32108";
  const LOCK_KEY = "bergfrieden.unlocked.v1";
  const INACTIVITY_MINUTES = 20;
  const INACTIVITY_MS = INACTIVITY_MINUTES * 60 * 1000;

  let inactivityTimer = null;

  function isUnlocked() {
    try {
      return localStorage.getItem(LOCK_KEY) === "true";
    } catch (error) {
      return false;
    }
  }

  function saveUnlocked(value) {
    try {
      localStorage.setItem(LOCK_KEY, String(value));
    } catch (error) {
      console.warn("Lock screen: could not persist unlock state.", error);
    }
  }

  function manualLock() {
    const lock = document.getElementById("password-lock");
    const appShell = document.getElementById("app-shell");
    if (lock) lock.style.display = "flex";
    if (appShell) appShell.classList.add("is-locked");
    saveUnlocked(false);
    const input = document.getElementById("password-input");
    if (input) {
      input.value = "";
      input.focus();
    }
  }

  function resetInactivityTimer() {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      manualLock();
    }, INACTIVITY_MS);
  }

  function unlockApp() {
    const lock = document.getElementById("password-lock");
    const appShell = document.getElementById("app-shell");
    const errorText = document.getElementById("password-error");
    if (lock) lock.style.display = "none";
    if (appShell) appShell.classList.remove("is-locked");
    if (errorText) errorText.textContent = "";
    saveUnlocked(true);
    resetInactivityTimer();
  }

  function validate() {
    const input = document.getElementById("password-input");
    const errorText = document.getElementById("password-error");
    if (!input || !errorText) return;

    const value = String(input.value || "").trim();

    if (value === APP_PASSWORD) {
      unlockApp();
      return;
    }

    errorText.textContent = "Falsches Passwort. Bitte erneut versuchen.";
    input.value = "";
    input.focus();
    saveUnlocked(false);
  }

  function registerUserActivity() {
    resetInactivityTimer();
  }

  function bindLogoutButton() {
    const button = document.getElementById("lock-logout");
    if (!button) return;

    button.addEventListener("click", () => {
      manualLock();
    });
  }

  function initLockScreen() {
    const input = document.getElementById("password-input");
    const button = document.getElementById("unlock-button");

    if (isUnlocked()) {
      unlockApp();
      return;
    }

    const lock = document.getElementById("password-lock");
    const appShell = document.getElementById("app-shell");
    if (lock) lock.style.display = "flex";
    if (appShell) appShell.classList.add("is-locked");

    if (input) {
      input.addEventListener("keydown", event => {
        if (event.key === "Enter") validate();
      });
      input.focus();
    }

    if (button) {
      button.addEventListener("click", validate);
    }

    bindLogoutButton();

    document.addEventListener("click", registerUserActivity, { passive: true });
    document.addEventListener("keydown", registerUserActivity, { passive: true });
    document.addEventListener("mousemove", registerUserActivity, { passive: true });
    document.addEventListener("touchstart", registerUserActivity, { passive: true });
    document.addEventListener("scroll", registerUserActivity, { passive: true });

    resetInactivityTimer();
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    initLockScreen();
  } else {
    window.addEventListener("load", initLockScreen, { once: true });
  }
})();
