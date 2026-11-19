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

Verkettung / Kaskade (Chaining): Das Durchreichen eines berechneten Ausgangswerts eines Bausteins über ein Kabel in den Eingang eines nachfolgenden Bausteins, sodass mehrere Operationen nacheinander eine Berechnungskette bilden.

Fallback-Wert (Rückfallwert): Ein Standardwert (wie 0 für unverbundene Eingänge valA/valB oder 50 für einen noch nicht bewegten Slider), der genutzt wird, wenn kein verbundener Eingangswert oder kein eigener Wert vorliegt.

Fehlerweitergabe (Error Propagation): Das Verhalten in einem Datenflussnetzwerk, bei dem ein Fehler oder ungültiger Zustand eines Bausteins (wie eine Division durch Null) an nachfolgende Bausteine durchgereicht wird, statt sie mit einem Ersatzwert (0) still weiterrechnen zu lassen.

Fan-Out / Verzweigung: Das Verbinden eines einzelnen Ausgangs-Pins mit mehreren Eingangs-Pins (wie hier beim Ausgang der Addition, der sowohl in die Division als auch in die Subtraktion führt), sodass derselbe Wert an mehrere Stellen gleichzeitig verteilt wird.

Pfad (Path) im Data Tree: Die Adressierung eines bestimmten Astes (Branches) innerhalb eines Datenbaums (in Grasshopper oft in geschweiften Klammern wie {0} oder {0;0;1} geschrieben), die angibt, auf welcher hierarchischen Ebene und in welcher Gruppe eine Liste von Werten liegt.

List Item: Ein Baustein (in Grasshopper typischerweise unter Sets / List), der aus einer Liste oder einem Ast gezielt das Element an einer bestimmten Position (Index, z. B. 0 für das erste Element) herausgreift.

Index out of range: Ein Fehlerzustand (z. B. bei List Item), der auftritt, wenn auf eine Listenposition zugegriffen wird, die außerhalb der gültigen Länge der Liste liegt (z. B. Index 5 bei einer Liste mit nur 2 Elementen).

Ast (Branch) im Data Tree: Ein einzelner Zweig innerhalb eines Datenbaums, der eine geordnete Liste von Elementen unter einem bestimmten Pfad (wie {0} oder {0;1}) bündelt.

Hilfsfunktion (Helper Function): Eine kleine, klar abgegrenzte Funktion (wie normalisiereTree() oder extrahiereZahl()), die eine wiederkehrende Teilaufgabe kapselt, damit Hauptfunktionen wie evaluiereNetzwerk() übersichtlich und wartbar bleiben.

NaN (Not-a-Number): Ein spezieller Wert in JavaScript, der entsteht, wenn eine mathematische Operation oder Umwandlung (wie parseFloat(...) auf einem Objekt) keine gültige Zahl ergibt – mit extrahiereZahl(...) fangen wir das ab, bevor es eine Berechnung unbemerkt zerschießt.

Ternärer Operator (bedingung ? wennWahr : wennFalsch): Eine kompakte Kurzform einer if...else-Abfrage in JavaScript, die je nach Bedingung einen von zwei Werten zurückgibt.

Set (Menge): Eine Datenstruktur (in JavaScript z. B. new Set()), die eindeutige Einträge ohne Duplikate verwaltet und schnelle Prüfungen wie .has(...) sowie .add(...) / .delete(...) erlaubt – ideal, um fehlerhafte Ausgangs-Pins (nodeFehlerOutputs) sauber zu tracken.

Referenz vs. Kopie (Shallow Copy): Wenn zwei Bausteine dasselbe Array im Speicher teilen (Referenz), ändert ein .push() beim einen Baustein ungewollt auch den anderen – mit [...node.inputs] erzeugst du eine eigene Kopie pro Instanz.

Self-Loop (Selbstverbindung): Eine Verbindung, bei der Ausgang (fromNode) und Eingang (toNode) auf demselben Baustein liegen – in handlePinClick bereits durch selectedPin.nodeIndex === nodeIdx abgefangen.

Spread-Operator (...): Eine JavaScript-Syntax, mit der Eigenschaften eines Objekts (...bausteinObjekt) oder Elemente eines Arrays ([...bausteinObjekt.inputs]) flach in ein neues Objekt oder Array kopiert werden.

Reproduzierbarkeit: Die Eigenschaft eines Fehlers oder Verhaltens, sich unter denselben Bedingungen zuverlässig erneut auslösen zu lassen – lässt es sich nicht reproduzieren, ist es oft ein einmaliger Bedien- oder Zustands-Effekt gewesen.

Flatten (Abflachen): Das Zusammenführen mehrerer Äste oder verschachtelter Listenebenen eines Data Trees in eine einzige flache Liste von Elementen.

Index (0-basiert): Die Zählweise einer Liste ab 0 – das erste Element liegt also bei Index 0, das zweite Element bei Index 1.

event.stopPropagation(): Eine Methode in JavaScript, die verhindert, dass ein Event (wie ein Klick auf den +-Button) an übergeordnete Elemente (wie die verschiebbare Node-Karte oder das Canvas) weitergereicht wird.

Doppelte Code-Blöcke / Dead Code: Code-Abschnitte, die doppelt vorhanden sind oder durch einen früheren Block bzw. fehlende Klammern nicht sauber greifen – das Entfernen schafft Klarheit und verhindert unerwartete Überschreibungen.

Upstream Error: Ein Folgefehler in einem Datenflussnetzwerk, der entsteht, weil ein vorgelagerter Baustein (Upstream) bereits einen Fehler erzeugt hat und nachfolgende Bausteine diesen Zustand sauber übernehmen, statt falsche Ersatzwerte zu berechnen.

Pin-Index: Die fortlaufende Nummerierung (0, 1, 2, ...) der Eingangs- bzw. Ausgangs-Pins eines Bausteins, über die Verbindungen (toPin, fromPin) und Werte (${nodeIdx}-${pinIdx}) eindeutig zugeordnet werden.

