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
    }
}

function zoomOut() {
    if (scale > minScale) {
        scale -= 0.1;
        updateZoom();
    }
}

// Erweiterte Grasshopper-Baustein-Bibliothek mit allen Komponenten
const bausteinBibliothek = [
    // 1. PARAMS (Parameter & Eingaben)
    {
        id: "slider", name: "Number Slider", kategorie: "Params", kategorieFarbe: "bg-zinc-600",
        inputs: [], outputs: ["v: Value"],
        logik: "Gibt einen numerischen Wert aus (anpassbar für Min/Max/Prozent).", python: "wert = 5.0", fehler: "None",
        min: 0, max: 100, step: 1
    },
    {
        id: "point", name: "Point", kategorie: "Params", kategorieFarbe: "bg-zinc-600",
        inputs: ["x: X", "y: Y", "z: Z"], outputs: ["pt: Point"],
        logik: "Erzeugt einen festen Koordinatenpunkt im Raum.", python: "punkt = rs.AddPoint(x, y, z)", fehler: "None"
    },

    // 2. MATH (Mathematik & Logik)
    {
        id: "addition", name: "Addition (+)", kategorie: "Math", kategorieFarbe: "bg-purple-600",
        inputs: ["a: A", "b: B"], outputs: ["res: A + B"],
        logik: "Addiert zwei numerische Werte miteinander.", python: "ergebnis = a + b", fehler: "None"
    },
    {
        id: "multiplication", name: "Multiplication (×)", kategorie: "Math", kategorieFarbe: "bg-purple-600",
        inputs: ["a: A", "b: B"], outputs: ["res: A × B"],
        logik: "Multipliziert zwei Werte (z.B. für Skalierungen).", python: "ergebnis = a * b", fehler: "None"
    },
    {
        id: "subtraction", name: "Subtraction (-)", kategorie: "Math", kategorieFarbe: "bg-purple-600",
        inputs: ["a: A", "b: B"], outputs: ["res: A - B"],
        logik: "Subtrahiert Wert B von Wert A.", python: "ergebnis = a - b", fehler: "None"
    },
    {
        id: "division", name: "Division (÷)", kategorie: "Math", kategorieFarbe: "bg-purple-600",
        inputs: ["a: A", "b: B"], outputs: ["res: A ÷ B"],
        logik: "Teilt Wert A durch Wert B.", python: "ergebnis = a / b", fehler: "Division by zero"
    },

    // 3. VECTOR (Vektoren & Richtung)
    {
        id: "vector_xyz", name: "Vector XYZ", kategorie: "Vector", kategorieFarbe: "bg-teal-600",
        inputs: ["x: X", "y: Y", "z: Z"], outputs: ["v: Vector"],
        logik: "Erzeugt einen Richtungswektor aus X-, Y- und Z-Komponenten.", python: "vektor = rs.VectorCreate([0,0,0], [x,y,z])", fehler: "None"
    },
    {
        id: "unit_x", name: "Unit X", kategorie: "Vector", kategorieFarbe: "bg-teal-600",
        inputs: ["F: Factor"], outputs: ["V: Vector"],
        logik: "Erzeugt einen Einheitsvektor entlang der X-Achse skaliert mit F.", python: "vektor = rs.VectorScale([1,0,0], faktor)", fehler: "None"
    },
    {
        id: "unit_y", name: "Unit Y", kategorie: "Vector", kategorieFarbe: "bg-teal-600",
        inputs: ["F: Factor"], outputs: ["V: Vector"],
        logik: "Erzeugt einen Einheitsvektor entlang der Y-Achse skaliert mit F.", python: "vektor = rs.VectorScale([0,1,0], faktor)", fehler: "None"
    },
    {
        id: "unit_z", name: "Unit Z", kategorie: "Vector", kategorieFarbe: "bg-teal-600",
        inputs: ["F: Factor"], outputs: ["V: Vector"],
        logik: "Erzeugt einen Einheitsvektor entlang der Z-Achse (z.B. für Höhen-Extrusionen).", python: "vektor = rs.VectorScale([0,0,1], faktor)", fehler: "None"
    },

    // 4. SETS (Listen & Datenstrukturen)
    {
        id: "merge", name: "Merge", kategorie: "Sets", kategorieFarbe: "bg-sky-600",
        inputs: ["data 1: Input", "data 2: Input"], outputs: ["data: Merged List"],
        logik: "Führt mehrere Datenströme zu einer gemeinsamen Liste zusammen.", python: "ergebnis = liste1 + liste2", fehler: "None"
    },
    {
        id: "graft", name: "Graft Tree", kategorie: "Sets", kategorieFarbe: "bg-sky-600",
        inputs: ["x: Tree / List"], outputs: ["x: Grafts Tree"],
        logik: "Fügt eine neue Ast-Ebene in den Datenbaum ein.", python: "zweig = [ [item] for item in liste ]", fehler: "Data matching failed"
    },
    {
        id: "flatten", name: "Flatten Tree", kategorie: "Sets", kategorieFarbe: "bg-sky-600",
        inputs: ["x: Tree"], outputs: ["x: Flattens Tree"],
        logik: "Entfernt alle Ast-Ebenen und macht aus dem Baum eine flache Liste.", python: "flach = [item for sublist in baum for item in sublist]", fehler: "None"
    },
    {
        id: "listitem", name: "List Item", kategorie: "Sets", kategorieFarbe: "bg-sky-600",
        inputs: ["L: List", "i: Index"], outputs: ["item: Item"],
        logik: "Filtert ein spezifisches Element anhand seines Indexes aus einer Liste.", python: "element = liste[index]", fehler: "Index out of range"
    },

    // 5. CURVE (Kurven & Geometrie)
    {
        id: "curve", name: "Curve", kategorie: "Curve", kategorieFarbe: "bg-emerald-600",
        inputs: ["p1: Start", "p2: End"], outputs: ["crv: Curve"],
        logik: "Erzeugt eine lineare Kurve zwischen zwei Punkten.", python: "kurve = rs.AddLine(p1, p2)", fehler: "None"
    },
    {
        id: "circle", name: "Circle", kategorie: "Curve", kategorieFarbe: "bg-emerald-600",
        inputs: ["p: Plane/Center", "r: Radius"], outputs: ["c: Circle"],
        logik: "Erzeugt einen Kreis mit einem bestimmten Radius um einen Punkt.", python: "kreis = rs.AddCircle(p, r)", fehler: "Radius must be greater than zero"
    },
    {
        id: "divide", name: "Divide Curve", kategorie: "Curve", kategorieFarbe: "bg-emerald-600",
        inputs: ["C: Curve", "N: Number"], outputs: ["P: Points", "T: Tangents", "L: Length"],
        logik: "Unterteilt eine Kurve in eine gleichmäßige Anzahl von Segmenten.", python: "punkte = rs.DivideCurve(c, n)", fehler: "Curve cannot be divided"
    },

    // 6. SURFACE (Flächen & Modellierung)
    {
        id: "loft", name: "Loft", kategorie: "Surface", kategorieFarbe: "bg-indigo-600",
        inputs: ["C: Curves"], outputs: ["S: Surface"],
        logik: "Erstellt eine Fläche oder einen Körper durch das Verbinden mehrerer Kurven.", python: "flaeche = rs.AddLoftSrf(kurven)", fehler: "Not enough curves for loft"
    },

    // 7. TRANSFORMATION (Verschieben & Extrudieren)
    {
        id: "move", name: "Move", kategorie: "Transformation", kategorieFarbe: "bg-amber-600",
        inputs: ["g: Geometry", "v: Vector"], outputs: ["g: Moved Geom"],
        logik: "Verschiebt Geometrie anhand eines Vektors.", python: "neues_objekt = rs.MoveObject(g, v)", fehler: "Data matching failed"
    },
    {
        id: "extrude", name: "Extrude", kategorie: "Transformation", kategorieFarbe: "bg-amber-600",
        inputs: ["c: Curve", "v: Vector"], outputs: ["s: Surface/Solid"],
        logik: "Zieht eine Kurve entlang eines Vektors hoch.", python: "volumen = rs.ExtrudeCurveStraight(c, p_start, p_end)", fehler: "1 item collected, but 0 expected"
    }
];

let aktiveCanvasNodes = [];
let verbindungen = [];
let selectedPin = null;

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

// Hilfsfunktion: Macht aus einem Einzelwert, Array oder Baum ein einheitliches Tree-Objekt
// Struktur: { branches: [ { path: "{0}", items: [...] } ] }
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

    // Mehrere Durchläufe, damit Ketten (z. B. Slider -> Addition -> Division -> Tree) sauber durchlaufen
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

            if (
                node.id === 'addition' ||
                node.id === 'multiplication' ||
                node.id === 'subtraction' ||
                node.id === 'division'
            ) {
                const keyA = `${nodeIdx}-0`;
                const keyB = `${nodeIdx}-1`;
                const outKey = `${nodeIdx}-0`;

                // Falls ein verbundener Eingang aus einem Fehlerzustand (z. B. Division durch 0) kommt
                if (inputHatFehler[keyA] || inputHatFehler[keyB]) {
                    node.fehler = "Upstream error";
                    node.python = `ergebnis = None  # Fehler aus Vorgänger-Baustein`;
                    nodeOutputs[outKey] = undefined;
                    nodeFehlerOutputs.add(outKey);
                    return;
                }

                const valA = extrahiereZahl(nodeInputs[keyA], 0);
                const valB = extrahiereZahl(nodeInputs[keyB], 0);

                let res = 0;
                if (node.id === 'addition') {
                    res = valA + valB;
                    node.python = `ergebnis = ${valA} + ${valB} (${res})`;
                } else if (node.id === 'subtraction') {
                    res = valA - valB;
                    node.python = `ergebnis = ${valA} - ${valB} (${res})`;
                } else if (node.id === 'multiplication') {
                    res = valA * valB;
                    node.python = `ergebnis = ${valA} * ${valB} (${res})`;
                } else if (node.id === 'division') {
                    if (valB === 0) {
                        node.fehler = "Division by zero";
                        node.python = `ergebnis = ${valA} / ${valB}`;
                        nodeOutputs[outKey] = undefined;
                        nodeFehlerOutputs.add(outKey);
                        return;
                    } else {
                        res = valA / valB;
                        node.python = `ergebnis = ${valA} / ${valB} (${res.toFixed(2)})`;
                    }
                }

                nodeFehlerOutputs.delete(outKey);
                nodeOutputs[outKey] = res;
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
                    return;
                }

                const gesammelteItems = [];
                eingehendeKabel.forEach(v => {
                    const raw = nodeOutputs[`${v.fromNode}-${v.fromPin}`];
                    const tree = normalisiereTree(raw);
                    tree.branches.forEach(b => {
                        gesammelteItems.push(...b.items);
                    });
                });

                const mergedTree = {
                    branches: [{ path: "{0}", items: gesammelteItems }]
                };

                node.fehler = "None";
                nodeFehlerOutputs.delete(outKey);
                node.python = `ergebnis = ${JSON.stringify(gesammelteItems)}`;
                nodeOutputs[outKey] = mergedTree;
            } else if (node.id === "graft") {
                const inputKey = `${nodeIdx}-0`;
                const outputKey = `${nodeIdx}-0`;

                if (inputHatFehler[inputKey]) {
                    node.fehler = "Upstream error";
                    node.python = `zweig = None  # Fehler aus Vorgänger-Baustein`;
                    nodeOutputs[outputKey] = undefined;
                    nodeFehlerOutputs.add(outputKey);
                    return;
                }

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
            } else if (node.id === "flatten") {
                const inputKey = `${nodeIdx}-0`;
                const outputKey = `${nodeIdx}-0`;

                if (inputHatFehler[inputKey]) {
                    node.fehler = "Upstream error";
                    node.python = `flach = None  # Fehler aus Vorgänger-Baustein`;
                    nodeOutputs[outputKey] = undefined;
                    nodeFehlerOutputs.add(outputKey);
                    return;
                }

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
            } else if (node.id === "listitem") {
                const keyList = `${nodeIdx}-0`;
                const keyIndex = `${nodeIdx}-1`;
                const keyOut = `${nodeIdx}-0`;

                if (inputHatFehler[keyList] || inputHatFehler[keyIndex]) {
                    node.fehler = "Upstream error";
                    node.python = `element = None  # Fehler aus Vorgänger-Baustein`;
                    nodeOutputs[keyOut] = undefined;
                    nodeFehlerOutputs.add(keyOut);
                    return;
                }

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
                    return;
                }

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

        let isDragging = false, startX, startY;

        function startDrag(clientX, clientY) {
            isDragging = true;
            startX = clientX - (b.x * scale);
            startY = clientY - (b.y * scale);
            nodeCard.style.zIndex = 100;
            document.querySelectorAll('.draggable-node').forEach(n => { if (n !== nodeCard) n.style.zIndex = 10; });
        }

        function onMove(clientX, clientY) {
            if (!isDragging) return;
            b.x = (clientX - startX) / scale;
            b.y = (clientY - startY) / scale;
            nodeCard.style.left = b.x + 'px';
            nodeCard.style.top = b.y + 'px';
            drawWires();
        }

       // Maus-Events
        nodeCard.addEventListener('mousedown', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.classList.contains('pin') || e.target.closest('code')) return;
            startDrag(e.clientX, e.clientY);
            e.stopPropagation();
        });
        window.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                speichereZustand();
            }
        });

        // Touch-Events (Handy / Tablet)
        nodeCard.addEventListener('touchstart', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.classList.contains('pin') || e.target.closest('code')) return;
            const touch = e.touches[0];
            startDrag(touch.clientX, touch.clientY);
            e.stopPropagation();
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const touch = e.touches[0];
            onMove(touch.clientX, touch.clientY);
            e.preventDefault();
        }, { passive: false });

        window.addEventListener('touchend', () => {
            if (isDragging) {
                isDragging = false;
                speichereZustand();
            }
        });
    }); // 
    document.querySelectorAll('.pin').forEach(pinElement => {
        pinElement.addEventListener('click', (e) => {
            handlePinClick(e.target);
            e.stopPropagation();
        });
    });

    drawWires();
    speichereZustand();
} //

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

addBtn.addEventListener('click', () => {
    const selectedId = componentSelect.value;
    if (!selectedId) return;
    const bausteinObjekt = bausteinBibliothek.find(b => b.id === selectedId);
    if (bausteinObjekt) {
        // Berechnet den aktuellen sichtbaren Bereich (inkl. Zoom & Scrollen)
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

window.removeNode = function(event, index) {
    event.stopPropagation();
    aktiveCanvasNodes.splice(index, 1);
    verbindungen = verbindungen.filter(v => v.fromNode !== index && v.toNode !== index);
    renderCanvas();
};

clearBtn.addEventListener('click', () => {
    aktiveCanvasNodes = [];
    verbindungen = [];
    selectedPin = null;
    renderCanvas();
});

canvasWorkspace.addEventListener('scroll', () => {
    drawWires();
});

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
    speicherZustand();
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