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

function renderCanvas() {
    const existingNodes = canvasWorkspace.querySelectorAll('.draggable-node');
    existingNodes.forEach(n => n.remove());

    if (aktiveCanvasNodes.length === 0) {
        emptyState.style.display = 'flex';
        connectionCount.textContent = '0';
        wiresGroup.innerHTML = '';
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
                    <div class="space-y-1">${inputsHtml}</div>
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
                <span class="${b.fehler === 'None' ? 'text-emerald-400' : 'text-rose-400'} font-bold">${b.fehler}</span>
            </div>
        `;

        let isDragging = false, startX, startY;

        function startDrag(clientX, clientY) {
            isDragging = true;
            startX = clientX - b.x;
            startY = clientY - b.y;
            nodeCard.style.zIndex = 100;
            document.querySelectorAll('.draggable-node').forEach(n => { if (n !== nodeCard) n.style.zIndex = 10; });
        }

        function onMove(clientX, clientY) {
            if (!isDragging) return;
            b.x = clientX - startX;
            b.y = clientY - startY;
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
        window.addEventListener('mouseup', () => { isDragging = false; });

        // Touch-Events (Handy / Tablet) - Exklusive Aussparung für Inputs & Slider
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

        window.addEventListener('touchend', () => { isDragging = false; });

        canvasWorkspace.appendChild(nodeCard);
    });

    document.querySelectorAll('.pin').forEach(pinElement => {
        pinElement.addEventListener('click', (e) => {
            handlePinClick(e.target);
            e.stopPropagation();
        });
    });

    drawWires();
}

function drawWires() {
    wiresGroup.innerHTML = '';

    verbindungen.forEach(v => {
        const fromPinEl = document.querySelector(`.output-pin[data-node="${v.fromNode}"][data-pin="${v.fromPin}"]`);
        const toPinEl = document.querySelector(`.input-pin[data-node="${v.toNode}"][data-pin="${v.toPin}"]`);

        if (fromPinEl && toPinEl) {
            const canvasRect = canvasWorkspace.getBoundingClientRect();
            const fromRect = fromPinEl.getBoundingClientRect();
            const toRect = toPinEl.getBoundingClientRect();

            const x1 = fromRect.left + fromRect.width / 2 - canvasRect.left + canvasWorkspace.scrollLeft;
            const y1 = fromRect.top + fromRect.height / 2 - canvasRect.top + canvasWorkspace.scrollTop;
            const x2 = toRect.left + toRect.width / 2 - canvasRect.left + canvasWorkspace.scrollLeft;
            const y2 = toRect.top + toRect.height / 2 - canvasRect.top + canvasWorkspace.scrollTop;

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
            if(!p.classList.contains('pin-connected')) p.classList.remove('pin-active');
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
        aktiveCanvasNodes.push({
            ...bausteinObjekt,
            x: 60 + (aktiveCanvasNodes.length * 40) % 350,
            y: 60 + (aktiveCanvasNodes.length * 40) % 250
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

// Performance-optimiert: Aktualisiert nur das UI-Element direkt ohne Canvas-Neugenießung (macht den Slider butterweich!)
window.updateSliderValue = function(nodeIndex, val) {
    const numVal = parseFloat(val);
    if (isNaN(numVal)) return;
    
    aktiveCanvasNodes[nodeIndex].value = numVal;
    aktiveCanvasNodes[nodeIndex].python = `wert = ${numVal}`;

    // Direktes Update der betroffenen Felder ohne DOM-Zerstörung
    const rangeEl = document.getElementById('range-' + nodeIndex);
    const numEl = document.getElementById('num-' + nodeIndex);
    const pyEl = document.getElementById('py-' + nodeIndex);

    if (rangeEl && rangeEl.value != numVal) rangeEl.value = numVal;
    if (numEl && numEl.value != numVal) numEl.value = numVal;
    if (pyEl) pyEl.textContent = `wert = ${numVal}`;
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