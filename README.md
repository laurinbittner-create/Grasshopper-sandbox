Markdown
# Grasshopper Sandbox

Eine webbasierte Sandbox (inspiriert von Rhino/Grasshopper) zur Visualisierung und zum Testen von Datenlogik, Listen und Data Trees im Browser.

## Tech-Stack

* **HTML**: Grundstruktur und semantischer Aufbau der Web-App.
* **Tailwind CSS**: Utility-First CSS-Framework für schnelles und konsistentes Layout innerhalb HTML Datei(Flexbox, Abstände, Farben).
* **CSS (Custom)**: Spezielle visuelle Effekte und mathematische Muster (wie das skalierbare Punkt-Raster auf dem Canvas).
* **JavaScript**: Steuerung der Logik, Event-Handler und Datenstrukturen (Komponenten-Bibliothek).
* **GitHub & GitHub Pages**: Versionsverwaltung und kostenloses Hosting der Live-Anwendung.

---

##  Projektstruktur

* `index.html` – Enthält das Hauptgerüst, die Kopfzeile (Toolbar) und den scrollbaren Arbeitsbereich (`#canvasWorkspace`) mit dem SVG-Canvas (`#wireCanvas`).
* `style.css` – Beinhaltet das feine, gepunktete Hintergrund-Raster (`radial-gradient`) für die unendliche Zeichenfläche.
* `app.js` – Verwaltet die Baustein-Bibliothek (`bausteinBibliothek`), Datenstrukturen (Arrays & Objekte) und die Verbindungslogik.

---

## 📖 Mini-Lexikon (Glossar)

* **DOM (Document Object Model):** Die Live-Struktur einer Webseite im Arbeitsspeicher des Browsers, die JavaScript verändern kann.
* **Array `[]`:** Eine geordnete Liste von Elementen (z. B. eine Liste von Bausteinen).
* **Objekt `{}`:** Ein zusammengehöriges Datenpaket mit benannten Eigenschaften (z. B. Name, ID und Python-Code eines Bausteins).
* **Flexbox:** Ein CSS-Layout-Modul zur flexiblen Ausrichtung von Elementen in Zeilen oder Spalten (`flex`, `flex-wrap`).