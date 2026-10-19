# Zum Bergfrieden · Sprachbrücke

Die Sprachbrücke ist eine responsive Website und Progressive Web App (PWA). Sie kann auf PC, Tablet und Smartphone im Browser genutzt und auf dem Startbildschirm installiert werden.

## Website starten

`index.html` lässt sich auf einem Computer direkt im Browser öffnen. Für die Installation, den Offline-Betrieb und den Mikrofonzugriff benötigt die Website jedoch eine **HTTPS-Adresse** (außer auf `localhost`).

Zum lokalen Testen im Projektordner einen lokalen Server starten:

```powershell
python -m http.server 8080
```

Dann `http://localhost:8080` im Browser öffnen. Die lokale Adresse ist nur auf diesem Computer erreichbar; auf dem iPhone funktioniert die Installation erst über eine veröffentlichte HTTPS-Adresse.

In VS Code können Sie alternativ das iOS-Projekt `ios/ZumBergfrieden.xcodeproj` öffnen und **Launch Bergfrieden on localhost** starten. Dabei startet VS Code den lokalen Server automatisch.

## Website veröffentlichen

Die Seite besteht aus statischen Dateien und benötigt weder Datenbank noch Server-Anwendung. Den **gesamten Inhalt dieses Ordners** auf einen HTTPS-fähigen statischen Webhost laden, zum Beispiel GitHub Pages oder Netlify. Die Dateien `index.html`, `app.js`, `styles.css`, `manifest.webmanifest`, `service-worker.js`, `brand-logo.png` und `icons/` müssen gemeinsam am selben Pfad veröffentlicht sein. Änderungen an der Website sind nach dem Hochladen unter der HTTPS-Adresse verfügbar.

## Auf dem iPhone hinzufügen

1. Die veröffentlichte HTTPS-Adresse in **Safari** öffnen.
2. Auf **Teilen** tippen.
3. **Zum Home-Bildschirm** auswählen und **Hinzufügen** antippen.

Auf anderen Geräten können Sie die Schaltfläche **Installieren** oder den Installieren-Eintrag im Browser-Menü nutzen. Beim ersten Seitenaufruf werden App-Oberfläche, Bilder und App-Symbole zwischengespeichert; danach funktioniert die Oberfläche auch ohne Internet.

Für die **Offline-Mikrofonerkennung in Google Chrome** tippen Sie beim ersten Mal mit Internet auf **Antwort sprechen**. Dabei lädt die App einmalig das russische Whisper-Modell (ca. 45 MB) und die Erkennungslaufzeit herunter und speichert sie im Browser-Cache. Warten Sie, bis der Download abgeschlossen ist; danach erkennt die App Sprache ohne Internetverbindung und führt die Aufnahmeverarbeitung vollständig lokal aus. Die Aufnahme wird nicht an einen Online-Dienst gesendet. Mikrofonzugriff im Web benötigt HTTPS (oder `localhost`).

Auf dem iPhone hängt Offline-Erkennung von der iOS-Version und dem installierten russischen Sprachpaket ab. In der nativen iOS-Hülle wird lokale Erkennung angefordert; in Safari kann die Website Offline-Erkennung nicht auf jedem Gerät garantieren.

## Xcode-Projekt (optional)

Für eine native iOS-Hülle liegt weiterhin ein Projekt unter `ios/ZumBergfrieden.xcodeproj`. Das Erstellen einer `.ipa` verlangt macOS, Xcode und ein Apple-Signaturprofil.

## Xcode-Projekt

Öffnen Sie auf einem Mac mit Xcode 15 oder neuer:

`ios/ZumBergfrieden.xcodeproj`

Wählen Sie das Ziel **Zum Bergfrieden**, dann unter **Signing & Capabilities** ein eigenes Apple Developer Team. Falls erforderlich, ändern Sie `PRODUCT_BUNDLE_IDENTIFIER` in `ios/ZumBergfrieden.xcodeproj/project.pbxproj` in eine weltweit eindeutige Kennung. Wählen Sie ein iPhone oder iPad als Ziel und starten Sie die App zunächst direkt über Xcode.

Für ein `.ipa`: In Xcode **Product → Archive** ausführen und im Organizer **Distribute App** wählen. Xcode benötigt dafür macOS, ein installiertes iOS-SDK und ein passendes Apple-Signatur-/Bereitstellungsprofil. Ohne dieses Zertifikat wäre eine erzeugte `.ipa` nicht auf einem iPhone installierbar.

## Beim Start

Das große Willkommensfenster mit dem Bergfrieden-Logo und der Schaltfläche zum Eintreten öffnet sich bei jedem App-Start. Über **Klingel läuten** oder **Weiter zur Übersicht** gelangen Sie zur Übersicht. Über **Tor öffnen** können Sie das Fenster jederzeit erneut aufrufen. Die Kurzanleitung bleibt separat über **Kurzanleitung** erreichbar.

Das aktive Bewohnerprofil heißt Kai Röhner. Ein vorhandenes Valentina-Demoprofil wird beim Start auf Kai Röhner umgestellt und an die erste Stelle gesetzt; gespeicherte Übungseinträge bleiben dabei erhalten.

## Funktionen

- Bild-Aktivierung mit 22 deutsch-russischen Fotokarten, immer sichtbarer deutscher Bedeutung und einem anklickbaren Schritt-für-Schritt-Lernweg.
- Russische Aussprache zum normalen oder langsamen Anhören; beim Sprechen gibt die App Rückmeldung, ob das Wort erkannt wurde. Die Chrome-Web-Erkennung nutzt ein lokal zwischengespeichertes Whisper-Modell und fällt nicht auf einen Online-Dienst zurück.
- Je Bewohner lokal gespeicherte Übungen, Lernpunkte, Level, Wochensterne, Tages- und Wochenübersicht. Tages- und Wochenurkunden sind auf Russisch gestaltet und zeigen die deutsche Übersetzung klein darunter.
- Wort-Spiel mit zwei Zuordnungsarten, Punkten, Sternen, Serienanzeige, sichtbarer richtiger/falscher Antwort und gesprochener Rückmeldung.
- Pflege-Schnellkarten mit geprüften russischen Sätzen und Lautschrift. Unbekannte freie Sätze werden nicht als übersetzt ausgegeben.
- Bewohnerprofile, Karten-Studio mit echten Foto-URLs für eigene Karten, lokale Übungshistorie und kopierbarer SIS-Entwurf.
- Originales Bergfrieden-Logo und iPhone-/iPad-Layout.

## Datenschutz und Grenzen

Profile, Karten und Protokolle werden lokal im Browserspeicher des verwendeten Geräts gehalten; es gibt keinen App-Server, kein Konto und keine automatische Synchronisierung. Beim ersten Einrichten werden Modell und Laufzeit aus öffentlichen Paket- und Modell-Repositories heruntergeladen und lokal gespeichert. Das Mikrofon wird erst nach Antippen der Sprechfunktion angefragt; die Aufnahme wird lokal verarbeitet und nicht hochgeladen. SIS-Texte sind Entwürfe und müssen fachlich geprüft werden. Die Schnellübersetzungen ersetzen keinen professionellen Dolmetschdienst. Bei Bewohnerdaten sind die Datenschutzregeln der Einrichtung zu beachten.

Die mitgelieferten Kartenbilder liegen lokal unter `images/cards/`; Fotos und gezeichnete Illustrationen werden für die Offline-Nutzung vorgeladen und in der Anzeige nicht abgeschnitten. Die Fotos wurden von Unsplash unter der Unsplash-Lizenz bezogen. Eigene Karten benötigen eine HTTPS-Foto-URL.

## Build-Hinweis für diese Arbeitsumgebung

Eine veröffentlichte öffentliche Domain muss beim gewählten Webhost eingerichtet werden. Der Quellcode allein stellt keine Website unter einer öffentlichen Internetadresse bereit.
