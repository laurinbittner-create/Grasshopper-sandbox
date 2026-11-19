Markdown
# Grasshopper Sandbox

Eine webbasierte Sandbox (inspiriert von Rhino/Grasshopper) zur Visualisierung und zum Testen von Datenlogik, Listen und Data Trees im Browser.

Mini-Lexikon (Glossar)
DOM (Document Object Model): Die Live-Struktur einer Webseite im Arbeitsspeicher des Browsers, die JavaScript erzeugt, verändert oder löscht (z. B. Baustein-Karten, Pins, Eingabefelder und Status-Anzeigen).

Array []: Eine geordnete Liste von Elementen (z. B. bausteinBibliothek, aktiveCanvasNodes für platzierte Bausteine oder verbindungen für Kabel).

Objekt {}: Ein zusammengehöriges Datenpaket mit Schlüssel-Wert-Paaren (z. B. id, name, kategorie, inputs, outputs, logik, python und fehler eines Bausteins).

Flexbox: Ein CSS-Layout-Modul zur flexiblen Ausrichtung, Verteilung und Ausrichtung von Elementen in Zeilen oder Spalten (über Utility-Klassen wie flex, flex-col, justify-between, items-center).

Frontend: Der sichtbare und direkt bedienbare Teil der Web-App im Browser (HTML, Tailwind CSS, Custom CSS, JavaScript und DOM-Interaktion), inklusive der lokalen Berechnungslogik im Browser.

Backend: Der serverseitige Teil einer Anwendung (später z. B. mit Python), der Daten entgegennimmt, tiefere Logik oder Datenbaum-Operationen ausführt und Ergebnisse zurückgibt.

Evaluierungs-Engine (evaluiereNetzwerk()): Die Berechnungslogik im Frontend, die Ausgabewerte (z. B. vom Slider) sammelt, den Kabeln folgt, Eingänge belegt, Rechenoperationen ausführt und python sowie fehler aktualisiert.

Pin & Verbindung (verbindungen, selectedPin): Ein- und Ausgangsanschlüsse (input-pin, output-pin) an Bausteinen, über die Datenflüsse (fromNode/fromPin zu toNode/toPin) verknüpft oder getrennt werden.

SVG (#wireCanvas / wiresGroup): Vektorbasiertes Grafikformat im Browser, mit dem geschwungene Kurven (<path>) als Kabel zwischen Pins scharf und skalierbar gezeichnet werden.

Canvas & Zoom (scale, updateZoom()): Die Arbeitsfläche mit Skalierungsfaktor (0.3 bis 2.0, also 30 % bis 200 %), der mit transformOrigin: 'top left' sowie Scroll- und Zoom-Offsets bei Drag & Drop und Kabeln verrechnet wird.

Touch- & Maus-Events: Eingabe-Ereignisse (mousedown/mousemove/mouseup und touchstart/touchmove/touchend), damit Verschieben und Zoomen sowohl am Desktop als auch auf Touch-Geräten funktionieren.

Fehlerstatus (node.fehler): Zustandsmeldung eines Bausteins ("None" bei gültigem Zustand oder Fehlermeldungen wie "Division by zero"), die farblich (Grün/Rot) und als Text am Baustein angezeigt wird.

Data Tree, Graft & Flatten: Baumartige Datenstrukturen aus Grasshopper mit Ästen/Pfaden, wobei Graft Elemente in eigene neue Äste verpackt und Flatten verschachtelte Ebenen in eine flache Liste auflöst.

NURBS, Mesh & SubD: 3D-Geometrieformen – NURBS für mathematisch präzise CAD-Kurven/-Flächen (Rhino), Mesh für Polygonnetze aus Eckpunkten/Kanten/Flächen und SubD für glatte Freiform-Unterteilungen.

Sculpting: Das digitale, intuitive Formen von 3D-Geometrie wie mit Ton, besonders typisch für organische Formen und Details (z. B. in Blender).

JSON & API: JSON ist ein kompaktes Datenformat aus Objekten und Arrays für den Datenaustausch; eine API ist die Schnittstelle, über die Frontend und Backend künftig Daten austauschen.

Git & GitHub Pages: Versionsverwaltung mit git add, git commit und git push zum Sichern von Code-Ständen sowie kostenloses Hosting der statischen Web-App über GitHub Pages.

Logik-Test / Smoke-Test: Ein gezielter Praxistest an einem konkreten Ablauf (z. B. Wertübergabe, Rechenoperation oder Fehlerfall), um zu prüfen, ob Datenfluss, UI-Updates und Fehlerzustände wie erwartet zusammenspielen.

State (Zustand): Die Gesamtheit aller aktuellen Datenwerte einer Anwendung zu einem bestimmten Zeitpunkt (z. B. welche Bausteine auf dem Canvas liegen, welche Werte die Slider haben und welche Kabel verbunden sind).

Browser-Cache: Ein Zwischenspeicher im Browser, der Dateien (wie app.js oder style.css) lokal ablegt, um Seiten schneller zu laden – kann aber dazu führen, dass nach einer Änderung noch ein alter Code-Stand ausgeführt wird, bis ein Hard-Reload erfolgt.

Konsole (Browser DevTools Console): Ein Werkzeug in den Entwickler-Werkzeugen des Browsers, mit dem du JavaScript-Befehle direkt live ausführen und Ausgaben oder Fehlermeldungen deiner Web-App einsehen kannst (im Gegensatz zum System-Terminal wie PowerShell, das Betriebssystem- oder Git-Befehle ausführt).

404 (Not Found): Ein HTTP-Statuscode, der bedeutet, dass eine angeforderte Datei oder Ressource (wie im Screenshot eine nicht vorhandene favicon.ico für das Browser-Tab-Icon) nicht gefunden wurde – stört die JavaScript-Logik deiner Sandbox aber nicht.

