// === GLOBALE ZOOM-VARIABLEN & FUNKTIONEN (Ganz oben) ===
let scale = 1;
const minScale = 0.3; // Bis zu 30% rauszoomen
const maxScale = 2.0; // Bis zu 200% reinzoomen

function updateZoom() {
    const inner = document.getElementById('canvasInner');
    const zoomLevel = document.getElementById('zoomLevel');
    if (inner) {
        inner.style.transform = `scale(${scale})`;
        inner.style.transformOrigin = 'top left'; // Hält den Anker stabil
    }
    if (zoomLevel) {
        zoomLevel.innerText = `${Math.round(scale * 100)}%`;
    }
}

function zoomIn() {
    if (scale < maxScale) {
        scale += 0.1;
        updateZoom();
        speichereZustand();
    }
}

function zoomOut() {
    if (scale > minScale) {
        scale -= 0.1;
        updateZoom();
        speichereZustand();
    }
}

// Erweiterte Grasshopper-Baustein-Bibliothek (echte Grasshopper-Standardkomponenten)
const bausteinBibliothek = [
    // 1. PARAMS (Parameter & Eingaben)
    {
        id: "slider", name: "Number Slider", kategorie: "Params", kategorieFarbe: "bg-zinc-600",
        inputs: [], outputs: ["v: Value"],
        logik: "Gibt einen numerischen Wert aus (anpassbar für Min/Max/Step).", python: "wert = 5.0", fehler: "None",
        min: 0, max: 100, step: 1
    },
    {
        id: "panel", name: "Panel", kategorie: "Params", kategorieFarbe: "bg-zinc-600",
        inputs: ["in: Input"], outputs: ["out: Text/Data"],
        logik: "Zeigt ankommende Werte/Bäume an oder leitet sie als Datenstrom weiter.", python: "panel_out = data_in", fehler: "None"
    },
    {
        id: "point", name: "Point", kategorie: "Params", kategorieFarbe: "bg-zinc-600",
        inputs: ["x: X", "y: Y", "z: Z"], outputs: ["pt: Point"],
        logik: "Erzeugt einen Punkt im Raum aus X-, Y- und Z-Koordinaten.", python: "punkt = rs.AddPoint(x, y, z)", fehler: "None"
    },
    {
        id: "integer", name: "Integer", kategorie: "Params", kategorieFarbe: "bg-zinc-600",
        inputs: ["i: Value"], outputs: ["i: Integer"],
        logik: "Rundet/konvertiert Zahlen zu Ganzzahlen (z. B. für Listen-Indizes).", python: "ganzzahl = int(wert)", fehler: "None"
    },
    {
        id: "number", name: "Number", kategorie: "Params", kategorieFarbe: "bg-zinc-600",
        inputs: ["n: Value"], outputs: ["n: Number"],
        logik: "Leitet numerische Werte als Fließkommazahl weiter.", python: "zahl = float(wert)", fehler: "None"
    },
    {
        id: "boolean", name: "Boolean", kategorie: "Params", kategorieFarbe: "bg-zinc-600",
        inputs: ["b: Value"], outputs: ["b: Boolean"],
        logik: "Verarbeitet Wahrheitswerte (True / False) für Logik und Filter.", python: "flag = bool(wert)", fehler: "None"
    },
    {
        id: "curve_param", name: "Curve", kategorie: "Params", kategorieFarbe: "bg-zinc-600",
        inputs: ["c: Curve"], outputs: ["c: Curve"],
        logik: "Hält oder leitet Kurven-Geometrie weiter.", python: "kurve = crv_in", fehler: "None"
    },
    {
        id: "surface_param", name: "Surface", kategorie: "Params", kategorieFarbe: "bg-zinc-600",
        inputs: ["s: Surface"], outputs: ["s: Surface"],
        logik: "Hält oder leitet Flächen-Geometrie weiter.", python: "flaeche = srf_in", fehler: "None"
    },
    {
        id: "brep_param", name: "Brep", kategorie: "Params", kategorieFarbe: "bg-zinc-600",
        inputs: ["b: Brep"], outputs: ["b: Brep"],
        logik: "Hält oder leitet Volumen-/Brep-Geometrie weiter.", python: "brep = brep_in", fehler: "None"
    },
    {
        id: "geometry_param", name: "Geometry", kategorie: "Params", kategorieFarbe: "bg-zinc-600",
        inputs: ["g: Geometry"], outputs: ["g: Geometry"],
        logik: "Allgemeiner Geometrie-Container für beliebige Objekte.", python: "geom = geom_in", fehler: "None"
    },

    // 2. MATH (Mathematik & Logik)
    {
        id: "addition", name: "Addition (+)", kategorie: "Math", kategorieFarbe: "bg-purple-600",
        inputs: ["a: A", "b: B"], outputs: ["res: A + B"],
        logik: "Addiert zwei numerische Werte miteinander.", python: "ergebnis = a + b", fehler: "None"
    },
    {
        id: "subtraction", name: "Subtraction (-)", kategorie: "Math", kategorieFarbe: "bg-purple-600",
        inputs: ["a: A", "b: B"], outputs: ["res: A - B"],
        logik: "Subtrahiert Wert B von Wert A.", python: "ergebnis = a - b", fehler: "None"
    },
    {
        id: "multiplication", name: "Multiplication (×)", kategorie: "Math", kategorieFarbe: "bg-purple-600",
        inputs: ["a: A", "b: B"], outputs: ["res: A × B"],
        logik: "Multipliziert zwei Werte miteinander.", python: "ergebnis = a * b", fehler: "None"
    },
    {
        id: "division", name: "Division (÷)", kategorie: "Math", kategorieFarbe: "bg-purple-600",
        inputs: ["a: A", "b: B"], outputs: ["res: A ÷ B"],
        logik: "Teilt Wert A durch Wert B.", python: "ergebnis = a / b", fehler: "Division by zero"
    },
    {
        id: "negative", name: "Negative (-x)", kategorie: "Math", kategorieFarbe: "bg-purple-600",
        inputs: ["x: Number"], outputs: ["res: -x"],
        logik: "Kehrt das Vorzeichen einer Zahl um.", python: "neg = -x", fehler: "None"
    },
    {
        id: "abs", name: "Absolute (|x|)", kategorie: "Math", kategorieFarbe: "bg-purple-600",
        inputs: ["x: Number"], outputs: ["res: |x|"],
        logik: "Gibt den Absolutwert (Betrag) einer Zahl aus.", python: "betrag = abs(x)", fehler: "None"
    },
    {
        id: "power", name: "Power (x^y)", kategorie: "Math", kategorieFarbe: "bg-purple-600",
        inputs: ["x: Base", "y: Exponent"], outputs: ["res: x^y"],
        logik: "Potenziert Basis x mit Exponent y.", python: "potenz = x ** y", fehler: "None"
    },
    {
        id: "sqrt", name: "Square Root (√x)", kategorie: "Math", kategorieFarbe: "bg-purple-600",
        inputs: ["x: Number"], outputs: ["res: √x"],
        logik: "Berechnet die Quadratwurzel einer nicht-negativen Zahl.", python: "wurzel = math.sqrt(x)", fehler: "Negative input"
    },
    {
        id: "modulo", name: "Modulus (A % B)", kategorie: "Math", kategorieFarbe: "bg-purple-600",
        inputs: ["a: A", "b: B"], outputs: ["res: A % B"],
        logik: "Gibt den Divisionsrest bei Teilung von A durch B aus.", python: "rest = a % b", fehler: "Division by zero"
    },
    {
        id: "min_val", name: "Minimum (Min)", kategorie: "Math", kategorieFarbe: "bg-purple-600",
        inputs: ["a: A", "b: B"], outputs: ["min: Min(A,B)"],
        logik: "Gibt den kleineren von zwei Werten aus.", python: "kleiner = min(a, b)", fehler: "None"
    },
    {
        id: "max_val", name: "Maximum (Max)", kategorie: "Math", kategorieFarbe: "bg-purple-600",
        inputs: ["a: A", "b: B"], outputs: ["max: Max(A,B)"],
        logik: "Gibt den größeren von zwei Werten aus.", python: "groesser = max(a, b)", fehler: "None"
    },
    {
        id: "larger_than", name: "Larger Than (A > B)", kategorie: "Math", kategorieFarbe: "bg-purple-600",
        inputs: ["a: A", "b: B"], outputs: ["r: A > B"],
        logik: "Prüft, ob Wert A größer als Wert B ist.", python: "ist_groesser = a > b", fehler: "None"
    },
    {
        id: "smaller_than", name: "Smaller Than (A < B)", kategorie: "Math", kategorieFarbe: "bg-purple-600",
        inputs: ["a: A", "b: B"], outputs: ["r: A < B"],
        logik: "Prüft, ob Wert A kleiner als Wert B ist.", python: "ist_kleiner = a < b", fehler: "None"
    },
    {
        id: "equality", name: "Equality (A == B)", kategorie: "Math", kategorieFarbe: "bg-purple-600",
        inputs: ["a: A", "b: B"], outputs: ["r: A == B"],
        logik: "Prüft, ob Wert A gleich Wert B ist.", python: "ist_gleich = (a == b)", fehler: "None"
    },
    {
        id: "remap", name: "Remap Numbers", kategorie: "Math", kategorieFarbe: "bg-purple-600",
        inputs: ["v: Value", "minA: Source Min", "maxA: Source Max", "minB: Target Min", "maxB: Target Max"],
        outputs: ["r: Mapped"],
        logik: "Überträgt einen Wert linear aus einem Quellbereich in einen Zielbereich.", python: "mapped = remap(v, minA, maxA, minB, maxB)", fehler: "Invalid domain"
    },

    // 3. VECTOR (Vektoren, Ebenen & Punkte)
    {
        id: "vector_xyz", name: "Vector XYZ", kategorie: "Vector", kategorieFarbe: "bg-teal-600",
        inputs: ["x: X", "y: Y", "z: Z"], outputs: ["v: Vector"],
        logik: "Erzeugt einen Vektor aus X-, Y- und Z-Komponenten.", python: "vektor = [x, y, z]", fehler: "None"
    },
    {
        id: "unit_x", name: "Unit X", kategorie: "Vector", kategorieFarbe: "bg-teal-600",
        inputs: ["F: Factor"], outputs: ["V: Vector"],
        logik: "Erzeugt einen Vektor entlang der X-Achse skaliert mit F.", python: "vec_x = VectorX(F)", fehler: "None"
    },
    {
        id: "unit_y", name: "Unit Y", kategorie: "Vector", kategorieFarbe: "bg-teal-600",
        inputs: ["F: Factor"], outputs: ["V: Vector"],
        logik: "Erzeugt einen Vektor entlang der Y-Achse skaliert mit F.", python: "vec_y = VectorY(F)", fehler: "None"
    },
    {
        id: "unit_z", name: "Unit Z", kategorie: "Vector", kategorieFarbe: "bg-teal-600",
        inputs: ["F: Factor"], outputs: ["V: Vector"],
        logik: "Erzeugt einen Vektor entlang der Z-Achse (z. B. für Wandhöhen).", python: "vec_z = VectorZ(F)", fehler: "None"
    },
    {
        id: "vector_2pt", name: "Vector 2Pt", kategorie: "Vector", kategorieFarbe: "bg-teal-600",
        inputs: ["A: Point A", "B: Point B"], outputs: ["V: Vector", "L: Length"],
        logik: "Erzeugt den Richtungsvektor und die Distanz zwischen zwei Punkten.", python: "vec = B - A", fehler: "None"
    },
    {
        id: "amplitude", name: "Amplitude", kategorie: "Vector", kategorieFarbe: "bg-teal-600",
        inputs: ["v: Vector", "a: Amplitude"], outputs: ["v: Vector"],
        logik: "Skaliert einen Vektor exakt auf die angegebene Länge (Amplitude).", python: "vec_amp = set_length(v, a)", fehler: "None"
    },
    {
        id: "reverse_vec", name: "Reverse", kategorie: "Vector", kategorieFarbe: "bg-teal-600",
        inputs: ["v: Vector"], outputs: ["r: Reversed"],
        logik: "Kehrt die Richtung eines Vektors um.", python: "vec_rev = -v", fehler: "None"
    },
    {
        id: "xy_plane", name: "XY Plane", kategorie: "Vector", kategorieFarbe: "bg-teal-600",
        inputs: ["o: Origin"], outputs: ["p: Plane"],
        logik: "Erzeugt eine horizontale XY-Ebene am Ursprungspunkt.", python: "plane_xy = PlaneXY(o)", fehler: "None"
    },
    {
        id: "xz_plane", name: "XZ Plane", kategorie: "Vector", kategorieFarbe: "bg-teal-600",
        inputs: ["o: Origin"], outputs: ["p: Plane"],
        logik: "Erzeugt eine vertikale XZ-Ebene am Ursprungspunkt.", python: "plane_xz = PlaneXZ(o)", fehler: "None"
    },
    {
        id: "yz_plane", name: "YZ Plane", kategorie: "Vector", kategorieFarbe: "bg-teal-600",
        inputs: ["o: Origin"], outputs: ["p: Plane"],
        logik: "Erzeugt eine vertikale YZ-Ebene am Ursprungspunkt.", python: "plane_yz = PlaneYZ(o)", fehler: "None"
    },
    {
        id: "construct_point", name: "Construct Point", kategorie: "Vector", kategorieFarbe: "bg-teal-600",
        inputs: ["x: X", "y: Y", "z: Z"], outputs: ["pt: Point"],
        logik: "Baut einen Punkt aus X-, Y- und Z-Werten (Standardwerte 0).", python: "pt = Point3d(x, y, z)", fehler: "None"
    },
    {
        id: "deconstruct_point", name: "Deconstruct", kategorie: "Vector", kategorieFarbe: "bg-teal-600",
        inputs: ["pt: Point"], outputs: ["x: X", "y: Y", "z: Z"],
        logik: "Zerlegt einen Punkt in seine X-, Y- und Z-Koordinaten.", python: "x, y, z = pt.X, pt.Y, pt.Z", fehler: "None"
    },

    // 4. SETS (Listen, Reihenfolgen & Data Trees)
    {
        id: "merge", name: "Merge", kategorie: "Sets", kategorieFarbe: "bg-sky-600",
        inputs: ["data 1: Input", "data 2: Input"], outputs: ["data: Merged List"],
        logik: "Führt mehrere Datenströme zu einer gemeinsamen Liste zusammen.", python: "ergebnis = liste1 + liste2", fehler: "None"
    },
    {
        id: "graft", name: "Graft Tree", kategorie: "Sets", kategorieFarbe: "bg-sky-600",
        inputs: ["x: Tree / List"], outputs: ["x: Grafts Tree"],
        logik: "Platziert jedes Element in einen eigenen Ast des Datenbaums.", python: "zweig = [[item] for item in liste]", fehler: "Data matching failed"
    },
    {
        id: "flatten", name: "Flatten Tree", kategorie: "Sets", kategorieFarbe: "bg-sky-600",
        inputs: ["x: Tree"], outputs: ["x: Flattens Tree"],
        logik: "Führt alle Zweige eines Datenbaums zu einer flachen Liste zusammen.", python: "flach = [item for b in baum for item in b]", fehler: "None"
    },
    {
        id: "listitem", name: "List Item", kategorie: "Sets", kategorieFarbe: "bg-sky-600",
        inputs: ["L: List", "i: Index"], outputs: ["item: Item"],
        logik: "Wählt ein Element anhand seines Indexes aus einer Liste.", python: "element = liste[index]", fehler: "Index out of range"
    },
    {
        id: "list_length", name: "List Length", kategorie: "Sets", kategorieFarbe: "bg-sky-600",
        inputs: ["L: List"], outputs: ["n: Length"],
        logik: "Gibt die Anzahl der Elemente in der Liste aus.", python: "anzahl = len(liste)", fehler: "None"
    },
    {
        id: "reverse_list", name: "Reverse List", kategorie: "Sets", kategorieFarbe: "bg-sky-600",
        inputs: ["L: List"], outputs: ["r: Reversed"],
        logik: "Kehrt die Reihenfolge der Elemente in einer Liste um.", python: "umgekehrt = list(reversed(liste))", fehler: "None"
    },
    {
        id: "series", name: "Series", kategorie: "Sets", kategorieFarbe: "bg-sky-600",
        inputs: ["s: Start", "n: Step", "c: Count"], outputs: ["s: Series"],
        logik: "Erzeugt eine arithmetische Zahlenreihe ab Start mit Schrittweite n.", python: "reihe = [s + i*n for i in range(c)]", fehler: "None"
    },
    {
        id: "range", name: "Range", kategorie: "Sets", kategorieFarbe: "bg-sky-600",
        inputs: ["min: Domain Min", "max: Domain Max", "n: Steps"], outputs: ["r: Range"],
        logik: "Teilt einen Bereich [min..max] in n gleichmäßige Schritte.", python: "werte = linspace(min, max, n)", fehler: "None"
    },
    {
        id: "repeat_data", name: "Repeat Data", kategorie: "Sets", kategorieFarbe: "bg-sky-600",
        inputs: ["d: Data", "l: Length"], outputs: ["d: Repeated"],
        logik: "Wiederholt Daten, bis die gewünschte Länge erreicht ist.", python: "wiederholt = repeat_to_len(d, l)", fehler: "None"
    },
    {
        id: "cull_index", name: "Cull Index", kategorie: "Sets", kategorieFarbe: "bg-sky-600",
        inputs: ["L: List", "i: Index"], outputs: ["L: Culled List"],
        logik: "Entfernt gezielt das Element an Position i aus der Liste.", python: "gefiltert = [x for idx, x in enumerate(L) if idx != i]", fehler: "None"
    },
    {
        id: "dispatch", name: "Dispatch", kategorie: "Sets", kategorieFarbe: "bg-sky-600",
        inputs: ["L: List", "p: Pattern"], outputs: ["A: True List", "B: False List"],
        logik: "Teilt eine Liste anhand eines True/False-Musters in zwei Listen auf.", python: "a, b = dispatch(L, p)", fehler: "None"
    },
    {
        id: "shift_list", name: "Shift List", kategorie: "Sets", kategorieFarbe: "bg-sky-600",
        inputs: ["L: List", "s: Shift"], outputs: ["L: Shifted"],
        logik: "Verschiebt Listenelemente um s Schritte nach vorne oder hinten.", python: "verschoben = shift(L, s)", fehler: "None"
    },

    // 5. CURVE (Kurven, Linien, Kreise & Rechtecke)
    {
        id: "curve", name: "Line", kategorie: "Curve", kategorieFarbe: "bg-emerald-600",
        inputs: ["a: Start Point", "b: End Point"], outputs: ["l: Line"],
        logik: "Erzeugt eine gerade Linie zwischen Punkt A und Punkt B.", python: "linie = Line(a, b)", fehler: "None"
    },
    {
        id: "line_sdl", name: "Line SDL", kategorie: "Curve", kategorieFarbe: "bg-emerald-600",
        inputs: ["s: Start", "d: Direction", "l: Length"], outputs: ["l: Line"],
        logik: "Erzeugt eine Linie ab Startpunkt in Richtung d mit Länge l.", python: "linie = LineSDL(s, d, l)", fehler: "None"
    },
    {
        id: "rectangle", name: "Rectangle", kategorie: "Curve", kategorieFarbe: "bg-emerald-600",
        inputs: ["p: Plane/Origin", "x: X Size", "y: Y Size"], outputs: ["r: Rectangle", "p: Perimeter"],
        logik: "Erzeugt ein geschlossenes Rechteck (z. B. Wandprofil oder Fensteröffnung).", python: "rect = Rectangle(w=x, h=y)", fehler: "None"
    },
    {
        id: "circle", name: "Circle", kategorie: "Curve", kategorieFarbe: "bg-emerald-600",
        inputs: ["p: Center", "r: Radius"], outputs: ["c: Circle"],
        logik: "Erzeugt einen Kreis um einen Mittelpunkt mit Radius r.", python: "kreis = Circle(p, r)", fehler: "Radius must be greater than zero"
    },
    {
        id: "eval_length", name: "Evaluate Length", kategorie: "Curve", kategorieFarbe: "bg-emerald-600",
        inputs: ["c: Curve/Length", "l: Length/Factor", "n: Normalized"], outputs: ["pt: Point", "t: Parameter"],
        logik: "Ermittelt den Punkt entlang einer Kurve/Länge bei Position l.", python: "pt = eval_length(c, l, n)", fehler: "None"
    },
    {
        id: "divide", name: "Divide Curve", kategorie: "Curve", kategorieFarbe: "bg-emerald-600",
        inputs: ["C: Curve/Length", "N: Count"], outputs: ["P: Points", "T: Tangents"],
        logik: "Unterteilt eine Kurve/Strecke in N gleichmäßige Abschnitte.", python: "punkte = divide_curve(C, N)", fehler: "Curve cannot be divided"
    },
    {
        id: "offset_curve", name: "Offset Curve", kategorie: "Curve", kategorieFarbe: "bg-emerald-600",
        inputs: ["c: Curve/Length", "d: Distance"], outputs: ["c: Offset"],
        logik: "Versetzt eine Kurve/Kontur um den Abstand d (z. B. Wandstärke/Laibung).", python: "offset = offset_crv(c, d)", fehler: "None"
    },
    {
        id: "join_curves", name: "Join Curves", kategorie: "Curve", kategorieFarbe: "bg-emerald-600",
        inputs: ["c: Curves"], outputs: ["c: Joined"],
        logik: "Verbindet aneinanderstoßende Kurven zu einer zusammenhängenden Kurve.", python: "joined = join_curves(c)", fehler: "None"
    },

    // 6. SURFACE (Flächen & Volumenkörper)
    {
        id: "boundary_srf", name: "Boundary Surface", kategorie: "Surface", kategorieFarbe: "bg-indigo-600",
        inputs: ["e: Edges/Curves"], outputs: ["s: Surface"],
        logik: "Erzeugt eine planare Fläche aus geschlossenen Randkurven (z. B. Rechteck).", python: "srf = BoundarySurface(e)", fehler: "No planar boundary found"
    },
    {
        id: "loft", name: "Loft", kategorie: "Surface", kategorieFarbe: "bg-indigo-600",
        inputs: ["C: Curves"], outputs: ["S: Loft Surface"],
        logik: "Spannt eine Fläche über mehrere Profilkurven.", python: "loft = Loft(C)", fehler: "Not enough curves for loft"
    },
    {
        id: "box_2pt", name: "Center Box", kategorie: "Surface", kategorieFarbe: "bg-indigo-600",
        inputs: ["b: Base/Center", "x: X", "y: Y", "z: Z"], outputs: ["b: Box"],
        logik: "Erzeugt einen Quader/Box mit Maßen X, Y und Z (z. B. Fenster-Körper).", python: "box = Box(w=x, d=y, h=z)", fehler: "None"
    },
    {
        id: "deconstruct_brep", name: "Deconstruct Brep", kategorie: "Surface", kategorieFarbe: "bg-indigo-600",
        inputs: ["b: Brep"], outputs: ["f: Faces", "e: Edges", "v: Vertices"],
        logik: "Zerlegt ein Volumen/Brep in Teilflächen, Kanten und Eckpunkte.", python: "faces, edges, verts = deconstruct(b)", fehler: "None"
    },

    // 7. TRANSFORM (Verschieben, Extrudieren, Spiegeln, Skalieren)
    {
        id: "move", name: "Move", kategorie: "Transform", kategorieFarbe: "bg-amber-600",
        inputs: ["g: Geometry", "t: Motion Vector"], outputs: ["g: Moved Geom"],
        logik: "Verschiebt Geometrie anhand eines Bewegungsvektors.", python: "moved = Move(g, t)", fehler: "Data matching failed"
    },
    {
        id: "extrude", name: "Extrude", kategorie: "Transform", kategorieFarbe: "bg-amber-600",
        inputs: ["b: Base/Profile", "d: Direction/Vector"], outputs: ["e: Extrusion"],
        logik: "Extrudiert Kurven, Profile oder Flächen entlang eines Vektors.", python: "ext = Extrude(b, d)", fehler: "1 item collected, but 0 expected"
    },
    {
        id: "rotate", name: "Rotate", kategorie: "Transform", kategorieFarbe: "bg-amber-600",
        inputs: ["g: Geometry", "a: Angle (deg)"], outputs: ["g: Rotated"],
        logik: "Dreht Geometrie um den angegebenen Winkel.", python: "rot = Rotate(g, a)", fehler: "None"
    },
    {
        id: "scale", name: "Scale", kategorie: "Transform", kategorieFarbe: "bg-amber-600",
        inputs: ["g: Geometry", "f: Factor"], outputs: ["g: Scaled"],
        logik: "Skaliert Geometrie proportional mit dem Faktor f.", python: "scl = Scale(g, f)", fehler: "None"
    },
    {
        id: "mirror", name: "Mirror", kategorie: "Transform", kategorieFarbe: "bg-amber-600",
        inputs: ["g: Geometry", "p: Plane"], outputs: ["g: Mirrored", "m: Mirror"],
        logik: "Spiegelt Geometrie an einer Ebene.", python: "mir = Mirror(g, p)", fehler: "None"
    },

    // 8. INTERSECT (Boolesche Operationen & Durchbrüche)
    {
        id: "solid_diff", name: "Solid Difference", kategorie: "Intersect", kategorieFarbe: "bg-rose-600",
        inputs: ["a: Breps A (Target)", "b: Breps B (Cutters)"], outputs: ["r: Result"],
        logik: "Zieht Schnittkörper B (z. B. Fensteröffnung) von Volumen A (Wand) ab.", python: "diff = SolidDifference(A, B)", fehler: "Boolean failed"
    },
    {
        id: "solid_union", name: "Solid Union", kategorie: "Intersect", kategorieFarbe: "bg-rose-600",
        inputs: ["b: Breps"], outputs: ["r: Union"],
        logik: "Vereinigt mehrere Volumenkörper zu einem gemeinsamen Körper.", python: "union = SolidUnion(b)", fehler: "Boolean failed"
    },
    {
        id: "region_diff", name: "Region Difference", kategorie: "Intersect", kategorieFarbe: "bg-rose-600",
        inputs: ["a: Curve A", "b: Curve B"], outputs: ["r: Difference"],
        logik: "Bildet die 2D-Differenz zwischen geschlossenen Kurven/Regionen.", python: "reg_diff = RegionDifference(A, B)", fehler: "None"
    }
];

let aktiveCanvasNodes = [];
let verbindungen = [];
let selectedPin = null;

// Zustand für sauberes Drag-and-Drop ohne doppelte Window-Listener
let activeDragNode = null;
let activeDragCard = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

const componentSelect = document.getElementById('componentSelect');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const canvasWorkspace = document.getElementById('canvasWorkspace');
const nodesContainer = document.getElementById('nodesContainer');
const emptyState = document.getElementById('emptyState');
const connectionCount = document.getElementById('connectionCount');
const wiresGroup = document.getElementById('wiresGroup');

// Dropdown nach Kategorien gruppiert befüllen
const kategorien = [...new Set(bausteinBibliothek.map(b => b.kategorie))];
if (componentSelect) {
    kategorien.forEach(kat => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = kat;

        bausteinBibliothek.filter(b => b.kategorie === kat).forEach(b => {
            const option = document.createElement('option');
            option.value = b.id;
            option.textContent = b.name;
            optgroup.appendChild(option);
        });

        componentSelect.appendChild(optgroup);
    });
}

// Hilfsfunktion: Macht aus einem Einzelwert, Array oder Baum ein einheitliches Tree-Objekt
function normalisiereTree(val) {
    if (val && typeof val === "object" && Array.isArray(val.branches)) {
        return {
            branches: val.branches.map(b => ({
                path: String(b.path),
                items: Array.isArray(b.items) ? [...b.items] : [b.items]
            }))
        };
    }
    if (Array.isArray(val)) {
        return {
            branches: [{ path: "{0}", items: [...val] }]
        };
    }
    if (val !== undefined && val !== null) {
        return {
            branches: [{ path: "{0}", items: [val] }]
        };
    }
    return { branches: [] };
}

// Hilfsfunktion: Holt aus einem Baum oder Wert eine einzelne Zahl (z. B. für Mathe-Nodes)
function extrahiereZahl(val, fallback = 0) {
    if (typeof val === "number" && !isNaN(val)) return val;
    if (typeof val === "string" && val.trim() !== "" && !isNaN(Number(val))) return Number(val);
    if (val && typeof val === "object" && Array.isArray(val.branches)) {
        for (const b of val.branches) {
            if (Array.isArray(b.items)) {
                for (const item of b.items) {
                    if (item !== undefined && item !== null && String(item).trim() !== "") {
                        const n = parseFloat(item);
                        if (!isNaN(n)) return n;
                    }
                }
            }
        }
    }
    return fallback;
}

function evaluiereNetzwerk() {
    let nodeOutputs = {};
    let nodeFehlerOutputs = new Set();

    // Startwerte der Slider sammeln
    aktiveCanvasNodes.forEach((node, nodeIdx) => {
        if (node.id === 'slider') {
            nodeOutputs[`${nodeIdx}-0`] = node.value !== undefined ? parseFloat(node.value) : 50;
        }
    });

    const durchlaeufe = Math.max(2, aktiveCanvasNodes.length + 1);

    for (let step = 0; step < durchlaeufe; step++) {
        let nodeInputs = {};
        let inputHatFehler = {};

        verbindungen.forEach(v => {
            const sourceKey = `${v.fromNode}-${v.fromPin}`;
            const targetKey = `${v.toNode}-${v.toPin}`;

            if (nodeInputs[targetKey] === undefined && nodeOutputs[sourceKey] !== undefined) {
                nodeInputs[targetKey] = nodeOutputs[sourceKey];
            }
            if (nodeFehlerOutputs.has(sourceKey)) {
                inputHatFehler[targetKey] = true;
            }
        });

        aktiveCanvasNodes.forEach((node, nodeIdx) => {
            node.fehler = "None";

            // --- MATH ---
            if (
                node.id === 'addition' ||
                node.id === 'multiplication' ||
                node.id === 'subtraction' ||
                node.id === 'division'
            ) {
                const keyA = `${nodeIdx}-0`;
                const keyB = `${nodeIdx}-1`;
                const outKey = `${nodeIdx}-0`;

                if (inputHatFehler[keyA] || inputHatFehler[keyB]) {
                    node.fehler = "Upstream error";
                    node.python = `ergebnis = None  # Fehler aus Vorgänger-Baustein`;
                    nodeOutputs[outKey] = undefined;
                    nodeFehlerOutputs.add(outKey);
                } else {
                    const valA = extrahiereZahl(nodeInputs[keyA], 0);
                    const valB = extrahiereZahl(nodeInputs[keyB], 0);

                    if (node.id === 'addition') {
                        const res = valA + valB;
                        node.python = `ergebnis = ${valA} + ${valB} (${res})`;
                        nodeFehlerOutputs.delete(outKey);
                        nodeOutputs[outKey] = res;
                    } else if (node.id === 'subtraction') {
                        const res = valA - valB;
                        node.python = `ergebnis = ${valA} - ${valB} (${res})`;
                        nodeFehlerOutputs.delete(outKey);
                        nodeOutputs[outKey] = res;
                    } else if (node.id === 'multiplication') {
                        const res = valA * valB;
                        node.python = `ergebnis = ${valA} * ${valB} (${res})`;
                        nodeFehlerOutputs.delete(outKey);
                        nodeOutputs[outKey] = res;
                    } else if (node.id === 'division') {
                        if (valB === 0) {
                            node.fehler = "Division by zero";
                            node.python = `ergebnis = ${valA} / ${valB}`;
                            nodeOutputs[outKey] = undefined;
                            nodeFehlerOutputs.add(outKey);
                        } else {
                            const res = valA / valB;
                            node.python = `ergebnis = ${valA} / ${valB} (${res.toFixed(2)})`;
                            nodeFehlerOutputs.delete(outKey);
                            nodeOutputs[outKey] = res;
                        }
                    }
                }
            }

            // --- SETS / DATA TREES ---
            if (node.id === "merge") {
                const outKey = `${nodeIdx}-0`;
                const eingehendeKabel = verbindungen
                    .filter(v => v.toNode === nodeIdx)
                    .sort((a, b) => a.toPin - b.toPin);

                const hatVorgaengerFehler = eingehendeKabel.some(
                    v => nodeFehlerOutputs.has(`${v.fromNode}-${v.fromPin}`)
                );

                if (hatVorgaengerFehler) {
                    node.fehler = "Upstream error";
                    node.python = `ergebnis = None  # Fehler aus Vorgänger-Baustein`;
                    nodeOutputs[outKey] = undefined;
                    nodeFehlerOutputs.add(outKey);
                } else {
                    const gesammelteItems = [];
                    eingehendeKabel.forEach(v => {
                        const raw = nodeOutputs[`${v.fromNode}-${v.fromPin}`];
                        const tree = normalisiereTree(raw);
                        tree.branches.forEach(b => {
                            gesammelteItems.push(...b.items);
                        });
                    });

                    node.fehler = "None";
                    nodeFehlerOutputs.delete(outKey);
                    node.python = `ergebnis = ${JSON.stringify(gesammelteItems)}`;
                    nodeOutputs[outKey] = {
                        branches: [{ path: "{0}", items: gesammelteItems }]
                    };
                }
            } else if (node.id === "graft") {
                const inputKey = `${nodeIdx}-0`;
                const outputKey = `${nodeIdx}-0`;

                if (inputHatFehler[inputKey]) {
                    node.fehler = "Upstream error";
                    node.python = `zweig = None  # Fehler aus Vorgänger-Baustein`;
                    nodeOutputs[outputKey] = undefined;
                    nodeFehlerOutputs.add(outputKey);
                } else {
                    const tree = normalisiereTree(nodeInputs[inputKey]);
                    if (tree.branches.length === 0) {
                        node.fehler = "Data matching failed";
                        node.python = `zweig = []`;
                        nodeOutputs[outputKey] = { branches: [] };
                        nodeFehlerOutputs.delete(outputKey);
                    } else {
                        const neueBranches = [];
                        const pythonListe = [];

                        tree.branches.forEach((b, bIdx) => {
                            b.items.forEach((item, iIdx) => {
                                neueBranches.push({
                                    path: `{${bIdx};${iIdx}}`,
                                    items: [item]
                                });
                                pythonListe.push([item]);
                            });
                        });

                        node.fehler = "None";
                        nodeFehlerOutputs.delete(outputKey);
                        node.python = `zweig = ${JSON.stringify(pythonListe)}`;
                        nodeOutputs[outputKey] = { branches: neueBranches };
                    }
                }
            } else if (node.id === "flatten") {
                const inputKey = `${nodeIdx}-0`;
                const outputKey = `${nodeIdx}-0`;

                if (inputHatFehler[inputKey]) {
                    node.fehler = "Upstream error";
                    node.python = `flach = None  # Fehler aus Vorgänger-Baustein`;
                    nodeOutputs[outputKey] = undefined;
                    nodeFehlerOutputs.add(outputKey);
                } else {
                    const tree = normalisiereTree(nodeInputs[inputKey]);
                    const flachItems = [];
                    tree.branches.forEach(b => {
                        flachItems.push(...b.items);
                    });

                    node.fehler = "None";
                    nodeFehlerOutputs.delete(outputKey);
                    node.python = `flach = ${JSON.stringify(flachItems)}`;
                    nodeOutputs[outputKey] = {
                        branches: [{ path: "{0}", items: flachItems }]
                    };
                }
            } else if (node.id === "listitem") {
                const keyList = `${nodeIdx}-0`;
                const keyIndex = `${nodeIdx}-1`;
                const keyOut = `${nodeIdx}-0`;

                if (inputHatFehler[keyList] || inputHatFehler[keyIndex]) {
                    node.fehler = "Upstream error";
                    node.python = `element = None  # Fehler aus Vorgänger-Baustein`;
                    nodeOutputs[keyOut] = undefined;
                    nodeFehlerOutputs.add(keyOut);
                } else {
                    const idx = Math.trunc(extrahiereZahl(nodeInputs[keyIndex], 0));
                    const tree = normalisiereTree(nodeInputs[keyList]);
                    const alleItems = tree.branches.flatMap(b => b.items);

                    if (alleItems.length === 0 || idx < 0 || idx >= alleItems.length) {
                        node.fehler = "Index out of range";
                        node.python = `element = liste[${idx}]  # Fehler: Index out of range`;
                        nodeOutputs[keyOut] = undefined;
                        nodeFehlerOutputs.add(keyOut);
                    } else {
                        const treffer = alleItems[idx];
                        node.fehler = "None";
                        nodeFehlerOutputs.delete(keyOut);
                        node.python = `element = liste[${idx}]  # -> ${JSON.stringify(treffer)}`;
                        nodeOutputs[keyOut] = treffer;
                    }
                }
            }

            // --- GEOMETRIE / VEKTOR / TRANSFORMATION (Modell-als-Text) ---
            if (
                node.id === "unit_x" ||
                node.id === "unit_y" ||
                node.id === "unit_z" ||
                node.id === "point" ||
                node.id === "vector_xyz" ||
                node.id === "curve" ||
                node.id === "circle" ||
                node.id === "rectangle" ||
                node.id === "divide" ||
                node.id === "loft" ||
                node.id === "move" ||
                node.id === "extrude"
            ) {
                const outKey = `${nodeIdx}-0`;
                const eingehendeKabel = verbindungen
                    .filter(v => v.toNode === nodeIdx)
                    .sort((a, b) => a.toPin - b.toPin);

                const hatVorgaengerFehler = eingehendeKabel.some(
                    v => nodeFehlerOutputs.has(`${v.fromNode}-${v.fromPin}`)
                );

                if (hatVorgaengerFehler) {
                    node.fehler = "Upstream error";
                    node.python = `# Fehler aus Vorgänger-Baustein`;
                    nodeOutputs[outKey] = undefined;
                    nodeFehlerOutputs.add(outKey);
                } else {
                    const ersterInputKey = eingehendeKabel.length > 0
                        ? `${eingehendeKabel[0].toNode}-${eingehendeKabel[0].toPin}`
                        : null;
                    const rawIn = ersterInputKey ? nodeInputs[ersterInputKey] : undefined;

                    if (node.id === "unit_x" || node.id === "unit_y" || node.id === "unit_z") {
                        const faktor = extrahiereZahl(nodeInputs[`${nodeIdx}-0`], 1);
                        const achse = node.id === "unit_x" ? "X" : node.id === "unit_y" ? "Y" : "Z";
                        node.fehler = "None";
                        nodeFehlerOutputs.delete(outKey);
                        node.python = `vec_${achse.toLowerCase()} = Vector${achse}(${faktor})`;
                        nodeOutputs[outKey] = faktor;
                    } else if (node.id === "rectangle") {
                        const xVal = extrahiereZahl(nodeInputs[`${nodeIdx}-1`], 100);
                        const yVal = extrahiereZahl(nodeInputs[`${nodeIdx}-2`], 100);
                        node.fehler = "None";
                        nodeFehlerOutputs.delete(outKey);
                        node.python = `rect = Rectangle(w=${xVal}, h=${yVal})`;
                        nodeOutputs[outKey] = normalisiereTree([xVal, yVal]);
                    } else if (node.id === "extrude") {
                        const baseTree = normalisiereTree(nodeInputs[`${nodeIdx}-0`]);
                        const richtungVal = nodeInputs[`${nodeIdx}-1`];
                        const hoehe = richtungVal !== undefined ? extrahiereZahl(richtungVal, 300) : 300;
                        const basisItems = baseTree.branches.flatMap(b => b.items);

                        if (basisItems.length === 0) {
                            node.fehler = "None";
                            nodeFehlerOutputs.delete(outKey);
                            node.python = `extrude = []  # h=${hoehe}`;
                            nodeOutputs[outKey] = { branches: [] };
                        } else {
                            const branches = baseTree.branches.map((b, bIdx) => ({
                                path: b.path || `{${bIdx}}`,
                                items: b.items.map(item => ({
                                    basis: item,
                                    hoehe: hoehe
                                }))
                            }));

                            node.fehler = "None";
                            nodeFehlerOutputs.delete(outKey);
                            node.python = `extrude(${JSON.stringify(basisItems)}, h=${hoehe})  # ${branches.length} Zweig(e)`;
                            nodeOutputs[outKey] = { branches };
                        }
                    } else {
                        const tree = normalisiereTree(rawIn);
                        node.fehler = "None";
                        nodeFehlerOutputs.delete(outKey);
                        if (tree.branches.length > 0) {
                            const items = tree.branches.flatMap(b => b.items);
                            node.python = `${node.id}(${JSON.stringify(items)})  # ${tree.branches.length} Zweig(e)`;
                            nodeOutputs[outKey] = tree;
                        } else {
                            node.python = `${node.id}([])  # leer`;
                            nodeOutputs[outKey] = { branches: [] };
                        }
                    }
                }
            }
            // --- ERWEITERTE GRASSHOPPER-BAUSTEINE ---
            if (node.id === "panel") {
                const outKey = `${nodeIdx}-0`;
                const tree = normalisiereTree(nodeInputs[`${nodeIdx}-0`]);
                const items = tree.branches.flatMap(b => b.items);
                node.python = `panel = ${JSON.stringify(items)}`;
                nodeOutputs[outKey] = tree;
            } else if (node.id === "integer") {
                const outKey = `${nodeIdx}-0`;
                const val = Math.trunc(extrahiereZahl(nodeInputs[`${nodeIdx}-0`], 0));
                node.python = `int_val = ${val}`;
                nodeOutputs[outKey] = val;
            } else if (node.id === "number") {
                const outKey = `${nodeIdx}-0`;
                const val = extrahiereZahl(nodeInputs[`${nodeIdx}-0`], 0);
                node.python = `num_val = ${val}`;
                nodeOutputs[outKey] = val;
            } else if (node.id === "boolean") {
                const outKey = `${nodeIdx}-0`;
                const raw = nodeInputs[`${nodeIdx}-0`];
                const flag = Boolean(typeof raw === "object" && raw !== null ? extrahiereZahl(raw, 0) : raw);
                node.python = `bool_val = ${flag}`;
                nodeOutputs[outKey] = flag;
            } else if (["negative", "abs", "power", "sqrt", "modulo", "min_val", "max_val", "larger_than", "smaller_than", "equality", "remap"].includes(node.id)) {
                const outKey = `${nodeIdx}-0`;
                const a = extrahiereZahl(nodeInputs[`${nodeIdx}-0`], 0);
                const b = extrahiereZahl(nodeInputs[`${nodeIdx}-1`], 0);
                let res = 0;

                if (node.id === "negative") {
                 res = -a;
                const hinweis = res < 0 ? "nach INNEN (z.B. Offset)" : "nach AUSSEN";
                node.python = `neg = ${res}  # -> ${hinweis}`;
                } else if (node.id === "abs") {
                    res = Math.abs(a);
                    node.python = `abs_val = ${res}`;
                } else if (node.id === "power") {
                    res = Math.pow(a, b);
                    node.python = `pow_val = ${res}`;
                } else if (node.id === "sqrt") {
                    if (a < 0) {
                        node.fehler = "Negative input";
                        node.python = `sqrt(${a})  # Fehler: negativer Wert`;
                        nodeOutputs[outKey] = undefined;
                        nodeFehlerOutputs.add(outKey);
                    } else {
                        res = Math.sqrt(a);
                        node.python = `sqrt_val = ${res.toFixed(4)}`;
                    }
                } else if (node.id === "modulo") {
                    if (b === 0) {
                        node.fehler = "Division by zero";
                        node.python = `${a} % ${b}`;
                        nodeOutputs[outKey] = undefined;
                        nodeFehlerOutputs.add(outKey);
                    } else {
                        res = a % b;
                        node.python = `mod_val = ${res}`;
                    }
                } else if (node.id === "min_val") {
                    res = Math.min(a, b);
                    node.python = `min_val = ${res}`;
                } else if (node.id === "max_val") {
                    res = Math.max(a, b);
                    node.python = `max_val = ${res}`;
                } else if (node.id === "larger_than") {
                    res = a > b;
                    node.python = `gt_val = ${res}`;
                } else if (node.id === "smaller_than") {
                    res = a < b;
                    node.python = `lt_val = ${res}`;
                } else if (node.id === "equality") {
                    res = a === b;
                    node.python = `eq_val = ${res}`;
                } else if (node.id === "remap") {
                    const minA = extrahiereZahl(nodeInputs[`${nodeIdx}-1`], 0);
                    const maxA = extrahiereZahl(nodeInputs[`${nodeIdx}-2`], 100);
                    const minB = extrahiereZahl(nodeInputs[`${nodeIdx}-3`], 0);
                    const maxB = extrahiereZahl(nodeInputs[`${nodeIdx}-4`], 1);
                    if (maxA === minA) {
                        node.fehler = "Invalid domain";
                        node.python = `remap  # Domain Min == Max`;
                        nodeOutputs[outKey] = undefined;
                        nodeFehlerOutputs.add(outKey);
                    } else {
                        res = minB + ((a - minA) / (maxA - minA)) * (maxB - minB);
                        node.python = `remapped = ${res}`;
                    }
                }

                if (node.fehler === "None") {
                    nodeFehlerOutputs.delete(outKey);
                    nodeOutputs[outKey] = res;
                }
            } else if (["list_length", "reverse_list", "series", "range", "repeat_data", "cull_index", "shift_list"].includes(node.id)) {
                const outKey = `${nodeIdx}-0`;
                const tree = normalisiereTree(nodeInputs[`${nodeIdx}-0`]);
                const items = tree.branches.flatMap(b => b.items);

                if (node.id === "list_length") {
                    node.python = `len = ${items.length}`;
                    nodeOutputs[outKey] = items.length;
                } else if (node.id === "reverse_list") {
                    const rev = [...items].reverse();
                    node.python = `rev = ${JSON.stringify(rev)}`;
                    nodeOutputs[outKey] = normalisiereTree(rev);
                } else if (node.id === "series") {
                    const start = extrahiereZahl(nodeInputs[`${nodeIdx}-0`], 0);
                    const stepVal = extrahiereZahl(nodeInputs[`${nodeIdx}-1`], 1);
                    const count = Math.max(0, Math.trunc(extrahiereZahl(nodeInputs[`${nodeIdx}-2`], 5)));
                    const arr = Array.from({ length: count }, (_, i) => start + i * stepVal);
                    node.python = `series = ${JSON.stringify(arr)}`;
                    nodeOutputs[outKey] = normalisiereTree(arr);
                } else if (node.id === "range") {
                    const minD = extrahiereZahl(nodeInputs[`${nodeIdx}-0`], 0);
                    const maxD = extrahiereZahl(nodeInputs[`${nodeIdx}-1`], 10);
                    const steps = Math.max(1, Math.trunc(extrahiereZahl(nodeInputs[`${nodeIdx}-2`], 5)));
                    const arr = Array.from({ length: steps + 1 }, (_, i) => minD + (i / steps) * (maxD - minD));
                    node.python = `range = ${JSON.stringify(arr)}`;
                    nodeOutputs[outKey] = normalisiereTree(arr);
                } else if (node.id === "repeat_data") {
                    const targetLen = Math.max(0, Math.trunc(extrahiereZahl(nodeInputs[`${nodeIdx}-1`], 4)));
                    const base = items.length > 0 ? items : [0];
                    const arr = Array.from({ length: targetLen }, (_, i) => base[i % base.length]);
                    node.python = `repeated = ${JSON.stringify(arr)}`;
                    nodeOutputs[outKey] = normalisiereTree(arr);
                } else if (node.id === "cull_index") {
                    const delIdx = Math.trunc(extrahiereZahl(nodeInputs[`${nodeIdx}-1`], 0));
                    const filtered = items.filter((_, idx) => idx !== delIdx);
                    node.python = `culled = ${JSON.stringify(filtered)}`;
                    nodeOutputs[outKey] = normalisiereTree(filtered);
                } else if (node.id === "shift_list") {
                    const shiftVal = Math.trunc(extrahiereZahl(nodeInputs[`${nodeIdx}-1`], 1));
                    let shifted = [...items];
                    if (shifted.length > 0) {
                        const k = ((shiftVal % shifted.length) + shifted.length) % shifted.length;
                        shifted = [...shifted.slice(k), ...shifted.slice(0, k)];
                    }
                    node.python = `shifted = ${JSON.stringify(shifted)}`;
                    nodeOutputs[outKey] = normalisiereTree(shifted);
                }
            } else if (["eval_length", "offset_curve", "box_2pt", "solid_diff", "solid_union", "region_diff"].includes(node.id)) {
                const outKey = `${nodeIdx}-0`;
                if (node.id === "eval_length") {
                    const lenOrCrv = extrahiereZahl(nodeInputs[`${nodeIdx}-0`], 900);
                    const posVal = extrahiereZahl(nodeInputs[`${nodeIdx}-1`], 0.5);
                    const normalized = Boolean(nodeInputs[`${nodeIdx}-2`]);
                    const pos = normalized ? lenOrCrv * posVal : posVal;
                    node.python = `eval_pt = ${pos}  (von ${lenOrCrv})`;
                    nodeOutputs[outKey] = pos;
                } else if (node.id === "offset_curve") {
                const base = extrahiereZahl(nodeInputs[`${nodeIdx}-0`], 900);
                const dist = extrahiereZahl(nodeInputs[`${nodeIdx}-1`], -40);
                const richtung = dist < 0 ? "INNEN (negativ)" : dist > 0 ? "AUSSEN (positiv)" : "0 (kein Offset)";
                node.python = `offset(${base}, d=${dist})  # Richtung: ${richtung}`;
                nodeOutputs[outKey] = { basis: base, offset: dist, richtung };
                } else if (node.id === "box_2pt") {
                    const w = extrahiereZahl(nodeInputs[`${nodeIdx}-1`], 300);
                    const d = extrahiereZahl(nodeInputs[`${nodeIdx}-2`], 40);
                    const h = extrahiereZahl(nodeInputs[`${nodeIdx}-3`], 120);
                    node.python = `box = Box(w=${w}, d=${d}, h=${h})`;
                    nodeOutputs[outKey] = { width: w, depth: d, height: h };
                } else if (node.id === "solid_diff" || node.id === "region_diff") {
                    const targetA = nodeInputs[`${nodeIdx}-0`];
                    const cutterB = nodeInputs[`${nodeIdx}-1`];
                    node.python = `${node.id}(A=${JSON.stringify(targetA)}, B=${JSON.stringify(cutterB)})`;
                    nodeOutputs[outKey] = { target: targetA, cutter: cutterB, op: node.id };
                } else if (node.id === "solid_union") {
                    const tree = normalisiereTree(nodeInputs[`${nodeIdx}-0`]);
                    const items = tree.branches.flatMap(b => b.items);
                    node.python = `union(${JSON.stringify(items)})`;
                    nodeOutputs[outKey] = tree;
                }
            }
        });
    }
}

const STORAGE_KEY = "og_node_simulator_state_v1";

function speichereZustand() {
    try {
        const payload = {
            aktiveCanvasNodes,
            verbindungen,
            scale
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
        console.warn("Speichern in localStorage fehlgeschlagen:", err);
    }
}

function ladeZustand() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return false;
        const data = JSON.parse(raw);
        if (Array.isArray(data.aktiveCanvasNodes) && Array.isArray(data.verbindungen)) {
            aktiveCanvasNodes = data.aktiveCanvasNodes;
            verbindungen = data.verbindungen;
            if (typeof data.scale === "number") {
                scale = data.scale;
            }
            return true;
        }
    } catch (err) {
        console.warn("Laden aus localStorage fehlgeschlagen:", err);
    }
    return false;
}

window.exportiereNetzwerkJSON = function() {
    const blob = new Blob(
        [JSON.stringify({ aktiveCanvasNodes, verbindungen, scale }, null, 2)],
        { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "og-data-tree-setup.json";
    a.click();
    URL.revokeObjectURL(url);
};

window.importiereNetzwerkJSON = function(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (Array.isArray(data.aktiveCanvasNodes) && Array.isArray(data.verbindungen)) {
                aktiveCanvasNodes = data.aktiveCanvasNodes;
                verbindungen = data.verbindungen;
                if (typeof data.scale === "number") scale = data.scale;
                speichereZustand();
                updateZoom();
                renderCanvas();
            }
        } catch (err) {
            console.warn("JSON-Import fehlgeschlagen:", err);
        }
    };
    reader.readAsText(file);
};

function beginDrag(nodeObj, cardEl, clientX, clientY) {
    activeDragNode = nodeObj;
    activeDragCard = cardEl;
    dragOffsetX = clientX - (nodeObj.x * scale);
    dragOffsetY = clientY - (nodeObj.y * scale);
    cardEl.style.zIndex = 100;
    document.querySelectorAll('.draggable-node').forEach(n => {
        if (n !== cardEl) n.style.zIndex = 10;
    });
}

function moveActiveDrag(clientX, clientY) {
    if (!activeDragNode || !activeDragCard) return;
    activeDragNode.x = (clientX - dragOffsetX) / scale;
    activeDragNode.y = (clientY - dragOffsetY) / scale;
    activeDragCard.style.left = activeDragNode.x + 'px';
    activeDragCard.style.top = activeDragNode.y + 'px';
    drawWires();
}

function endActiveDrag() {
    if (!activeDragNode && !activeDragCard) return;
    activeDragNode = null;
    activeDragCard = null;
    speichereZustand();
}

function renderCanvas() {
    evaluiereNetzwerk();
    const existingNodes = canvasWorkspace.querySelectorAll('.draggable-node');
    existingNodes.forEach(n => n.remove());

    if (aktiveCanvasNodes.length === 0) {
        emptyState.style.display = 'flex';
        connectionCount.textContent = '0';
        wiresGroup.innerHTML = '';
        speichereZustand();
        return;
    }
    emptyState.style.display = 'none';
    connectionCount.textContent = verbindungen.length;

    aktiveCanvasNodes.forEach((b, nodeIndex) => {
        if (b.id === 'slider') {
            if (b.min === undefined) b.min = 0;
            if (b.max === undefined) b.max = 100;
            if (b.step === undefined) b.step = 1;
            if (b.value === undefined) b.value = (b.max - b.min) / 2;
        }

        const nodeCard = document.createElement('div');
        nodeCard.className = "draggable-node w-80 bg-zinc-900 border border-zinc-700/80 rounded-md shadow-2xl overflow-hidden flex flex-col justify-between";
        nodeCard.style.left = b.x + 'px';
        nodeCard.style.top = b.y + 'px';

        let inputsHtml = b.inputs.map((inp, pinIndex) => {
            const connectedWires = verbindungen.filter(v => v.toNode === nodeIndex && v.toPin === pinIndex);
            const isConnected = connectedWires.length > 0;
            const pinClass = isConnected ? 'pin-connected' : 'bg-zinc-600';
            const countText = isConnected ? ' (' + connectedWires.length + ')' : '';

            return '<div class="text-[11px] text-zinc-300 flex items-center gap-2 py-1">' +
                   '<span class="pin input-pin ' + pinClass + ' border border-zinc-300 inline-block hover:bg-amber-500 transition-all" data-node="' + nodeIndex + '" data-type="input" data-pin="' + pinIndex + '" data-name="' + inp + '"></span>' +
                   inp + '<span class="text-[9px] text-emerald-400 font-bold">' + countText + '</span>' +
                   '</div>';
        }).join('');

        let outputsHtml = b.outputs.map((out, pinIndex) => {
            const isConnected = verbindungen.some(v => v.fromNode === nodeIndex && v.fromPin === pinIndex);
            const pinClass = isConnected ? 'pin-connected' : 'bg-zinc-600';
            return '<div class="text-[11px] text-zinc-300 flex items-center justify-end gap-2 py-1">' +
                   out +
                   '<span class="pin output-pin ' + pinClass + ' border border-zinc-300 inline-block hover:bg-amber-500 transition-all" data-node="' + nodeIndex + '" data-type="output" data-pin="' + pinIndex + '" data-name="' + out + '"></span>' +
                   '</div>';
        }).join('');

        let extraContentHtml = '';
        if (b.id === 'slider') {
            extraContentHtml = '<div class="mt-2 space-y-2 bg-zinc-950 p-2.5 rounded border border-zinc-800">' +
                '<div class="flex items-center gap-2">' +
                '<input type="range" min="' + b.min + '" max="' + b.max + '" step="' + b.step + '" value="' + b.value + '" id="range-' + nodeIndex + '" oninput="updateSliderValue(' + nodeIndex + ', this.value)" class="w-full accent-amber-500 cursor-pointer">' +
                '<input type="number" step="' + b.step + '" value="' + b.value + '" id="num-' + nodeIndex + '" onchange="updateSliderValue(' + nodeIndex + ', this.value)" class="w-16 bg-zinc-900 text-amber-400 font-mono font-bold text-center px-1 py-0.5 rounded border border-zinc-700 focus:outline-none focus:border-amber-500">' +
                '</div>' +
                '<div class="flex justify-between items-center text-[10px] text-zinc-400 font-mono pt-1 border-t border-zinc-900">' +
                '<div class="flex items-center gap-1"><span>Min:</span><input type="number" value="' + b.min + '" onchange="updateSliderBounds(' + nodeIndex + ', \'min\', this.value)" class="w-14 bg-zinc-900 text-zinc-200 px-1 py-0.5 rounded border border-zinc-700 text-center"></div>' +
                '<div class="flex items-center gap-1"><span>Max:</span><input type="number" value="' + b.max + '" onchange="updateSliderBounds(' + nodeIndex + ', \'max\', this.value)" class="w-14 bg-zinc-900 text-zinc-200 px-1 py-0.5 rounded border border-zinc-700 text-center"></div>' +
                '</div>' +
                '</div>';
        }

        const mergePlusBtnHtml = b.id === 'merge'
            ? `<button type="button" onclick="event.stopPropagation(); addMergeInput(${nodeIndex});" class="mt-1.5 px-2 py-0.5 text-[10px] font-bold rounded bg-sky-700 hover:bg-sky-600 text-white cursor-pointer" title="Weiteren Input hinzufügen">+ Slot</button>`
            : '';

        nodeCard.innerHTML = `
            <div>
                <div class="${b.kategorieFarbe} px-3 py-1.5 flex justify-between items-center text-white cursor-grab">
                    <span class="font-bold text-sm tracking-wide pointer-events-none">${b.name}</span>
                    <div class="flex items-center gap-2">
                        <span class="text-[10px] uppercase tracking-wider opacity-90 pointer-events-none">${b.kategorie}</span>
                        <button onclick="removeNode(event, ${nodeIndex})" class="text-white/70 hover:text-white font-bold px-1 text-xs">✕</button>
                    </div>
                </div>
                <div class="px-3 py-2 bg-zinc-950/60 border-b border-zinc-800 flex justify-between">
                    <div>
                        <div class="space-y-1">${inputsHtml}</div>
                        ${mergePlusBtnHtml}
                    </div>
                    <div class="space-y-1 text-right">${outputsHtml}</div>
                </div>
                <div class="p-3">
                    <p class="text-xs text-zinc-300 mb-1 leading-relaxed">${b.logik}</p>
                    ${extraContentHtml}
                    <div class="mt-2 bg-zinc-950 p-2 rounded text-[11px] text-emerald-400 font-mono border border-zinc-800">
                        <code id="py-${nodeIndex}">${b.python}</code>
                    </div>
                </div>
            </div>
            <div class="px-3 py-2 bg-zinc-950/90 border-t border-zinc-800 text-[11px] flex justify-between items-center">
                <span class="text-zinc-500">Status:</span>
                <span id="status-${nodeIndex}" class="${b.fehler === 'None' ? 'text-emerald-400' : 'text-rose-400'} font-bold">${b.fehler}</span>
            </div>
        `;

        // Maus-Event auf der Node
        nodeCard.addEventListener('mousedown', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.classList.contains('pin') || e.target.closest('code')) return;
            beginDrag(b, nodeCard, e.clientX, e.clientY);
            e.stopPropagation();
        });

        // Touch-Event auf der Node (Handy / Tablet)
        nodeCard.addEventListener('touchstart', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.classList.contains('pin') || e.target.closest('code')) return;
            const touch = e.touches[0];
            beginDrag(b, nodeCard, touch.clientX, touch.clientY);
            e.stopPropagation();
        }, { passive: true });

        nodesContainer.appendChild(nodeCard);
    });

    document.querySelectorAll('.pin').forEach(pinElement => {
        pinElement.addEventListener('click', (e) => {
            handlePinClick(e.target);
            e.stopPropagation();
        });
    });

    drawWires();
    speichereZustand();
}

// Einmalige globale Drag-Listener auf window
window.addEventListener('mousemove', (e) => moveActiveDrag(e.clientX, e.clientY));
window.addEventListener('mouseup', () => endActiveDrag());
window.addEventListener('touchmove', (e) => {
    if (!activeDragNode) return;
    const touch = e.touches[0];
    moveActiveDrag(touch.clientX, touch.clientY);
    e.preventDefault();
}, { passive: false });
window.addEventListener('touchend', () => endActiveDrag());

function drawWires() {
    wiresGroup.innerHTML = '';

    verbindungen.forEach(v => {
        const fromPinEl = document.querySelector(`.output-pin[data-node="${v.fromNode}"][data-pin="${v.fromPin}"]`);
        const toPinEl = document.querySelector(`.input-pin[data-node="${v.toNode}"][data-pin="${v.toPin}"]`);

        if (fromPinEl && toPinEl) {
            const canvasRect = canvasWorkspace.getBoundingClientRect();
            const fromRect = fromPinEl.getBoundingClientRect();
            const toRect = toPinEl.getBoundingClientRect();

            const x1 = (fromRect.left + fromRect.width / 2 - canvasRect.left + canvasWorkspace.scrollLeft) / scale;
            const y1 = (fromRect.top + fromRect.height / 2 - canvasRect.top + canvasWorkspace.scrollTop) / scale;
            const x2 = (toRect.left + toRect.width / 2 - canvasRect.left + canvasWorkspace.scrollLeft) / scale;
            const y2 = (toRect.top + toRect.height / 2 - canvasRect.top + canvasWorkspace.scrollTop) / scale;

            const dx = Math.abs(x2 - x1) * 0.5;
            const pathData = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", pathData);
            path.setAttribute("stroke", "#10b981");
            path.setAttribute("stroke-width", "2.5");
            path.setAttribute("fill", "none");
            path.setAttribute("opacity", "0.8");

            wiresGroup.appendChild(path);
        }
    });
}

function handlePinClick(pin) {
    const type = pin.dataset.type;
    const nodeIdx = parseInt(pin.dataset.node);
    const pinIndex = parseInt(pin.dataset.pin);

    if (type === 'output') {
        document.querySelectorAll('.pin').forEach(p => {
            if (!p.classList.contains('pin-connected')) p.classList.remove('pin-active');
        });
        pin.classList.add('pin-active');
        selectedPin = { nodeIndex: nodeIdx, pinIndex };
    } else if (type === 'input') {
        const existingWires = verbindungen.filter(v => v.toNode === nodeIdx && v.toPin === pinIndex);

        if (existingWires.length > 0 && !selectedPin) {
            verbindungen = verbindungen.filter(v => !(v.toNode === nodeIdx && v.toPin === pinIndex));
            renderCanvas();
        } else if (selectedPin) {
            if (selectedPin.nodeIndex === nodeIdx) {
                selectedPin = null;
                renderCanvas();
                return;
            }

            verbindungen = verbindungen.filter(v => !(v.toNode === nodeIdx && v.toPin === pinIndex));

            verbindungen.push({
                fromNode: selectedPin.nodeIndex,
                fromPin: selectedPin.pinIndex,
                toNode: nodeIdx,
                toPin: pinIndex
            });
            selectedPin = null;
            renderCanvas();
        }
    }
}

if (addBtn) {
    addBtn.addEventListener('click', () => {
        const selectedId = componentSelect ? componentSelect.value : null;
        if (!selectedId) return;
        const bausteinObjekt = bausteinBibliothek.find(b => b.id === selectedId);
        if (bausteinObjekt) {
            const viewX = canvasWorkspace.scrollLeft / scale + 50;
            const viewY = canvasWorkspace.scrollTop / scale + 50;

            aktiveCanvasNodes.push({
                ...bausteinObjekt,
                inputs: Array.isArray(bausteinObjekt.inputs) ? [...bausteinObjekt.inputs] : [],
                outputs: Array.isArray(bausteinObjekt.outputs) ? [...bausteinObjekt.outputs] : [],
                x: viewX + (aktiveCanvasNodes.length * 30) % 300,
                y: viewY + (aktiveCanvasNodes.length * 30) % 200
            });
            renderCanvas();
        }
    });
}

window.removeNode = function(event, index) {
    event.stopPropagation();
    aktiveCanvasNodes.splice(index, 1);
    verbindungen = verbindungen.filter(v => v.fromNode !== index && v.toNode !== index);
    renderCanvas();
};

if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        aktiveCanvasNodes = [];
        verbindungen = [];
        selectedPin = null;
        renderCanvas();
        speichereZustand();
    });
}

if (canvasWorkspace) {
    canvasWorkspace.addEventListener('scroll', () => {
        drawWires();
    });
}

window.updateSliderValue = function(nodeIndex, val) {
    const numVal = parseFloat(val);
    if (isNaN(numVal)) return;

    aktiveCanvasNodes[nodeIndex].value = numVal;
    aktiveCanvasNodes[nodeIndex].python = `wert = ${numVal}`;

    evaluiereNetzwerk();

    const rangeEl = document.getElementById('range-' + nodeIndex);
    const numEl = document.getElementById('num-' + nodeIndex);

    if (rangeEl && rangeEl.value != numVal) rangeEl.value = numVal;
    if (numEl && numEl.value != numVal) numEl.value = numVal;

    aktiveCanvasNodes.forEach((node, idx) => {
        const pEl = document.getElementById('py-' + idx);
        if (pEl) pEl.textContent = node.python;

        const statusEl = document.getElementById('status-' + idx);
        if (statusEl) {
            statusEl.textContent = node.fehler;
            statusEl.className = node.fehler === 'None' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold';
        }
    });

    speichereZustand();
};

window.addMergeInput = function(nodeIndex) {
    const node = aktiveCanvasNodes[nodeIndex];
    if (!node || node.id !== "merge") return;

    if (!Array.isArray(node.inputs)) {
        node.inputs = ["data 1: Input", "data 2: Input"];
    }

    const nextNr = node.inputs.length + 1;
    node.inputs.push(`data ${nextNr}: Input`);

    renderCanvas();
};

window.updateSliderBounds = function(nodeIndex, boundType, val) {
    const numVal = parseFloat(val);
    if (isNaN(numVal)) return;

    if (boundType === 'min') {
        aktiveCanvasNodes[nodeIndex].min = numVal;
    } else if (boundType === 'max') {
        aktiveCanvasNodes[nodeIndex].max = numVal;
    }
    renderCanvas();
};

// === EVENT-LISTENER FÜR ZOOM-BUTTONS (Ganz unten) ===
document.addEventListener('DOMContentLoaded', () => {
    const btnIn = document.getElementById('zoomInBtn');
    const btnOut = document.getElementById('zoomOutBtn');

    if (btnIn) {
        btnIn.addEventListener('click', zoomIn);
        btnIn.addEventListener('touchend', (e) => { e.preventDefault(); zoomIn(); });
    }
    if (btnOut) {
        btnOut.addEventListener('click', zoomOut);
        btnOut.addEventListener('touchend', (e) => { e.preventDefault(); zoomOut(); });
    }

    ladeZustand();
    updateZoom();
    renderCanvas();
});