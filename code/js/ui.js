"use strict";

const definitionSet = createDefinitionSet();

window.addEventListener(definitionSet.names.DOMContentLoaded, () => {

    const elementSet = {
        svg: document.querySelector(definitionSet.names.elements.svg),
        select: document.querySelector(definitionSet.names.elements.select),
        output: document.querySelector(definitionSet.names.elements.textarea),
        notes: document.querySelectorAll(definitionSet.names.classes.note),
        buttons: {
            copy: document.getElementById(definitionSet.names.buttonId.copy),
            clear: document.getElementById(definitionSet.names.buttonId.clear),
            help: document.getElementById(definitionSet.names.buttonId.help),
        },
        hoverBox: document.querySelector(definitionSet.names.elements.aside),
    }; //elementSet
    elementSet.hoverBoxTables = elementSet.hoverBox.querySelectorAll(definitionSet.names.elements.table);
    elementSet.select.size = elementSet.select.children.length;

    elementSet.buttons.copy.onclick = () =>
        navigator.clipboard.writeText(elementSet.output.value);
    elementSet.buttons.clear.onclick = () =>
        elementSet.output.value = new String();
    elementSet.buttons.help.onclick = () =>
        definitionSet.help();

    const createSvgElement = name => document.createElementNS(definitionSet.names.svgNamespace, name);

    const addText = (parent, textContent, className, yShift) => {
        const text = createSvgElement(definitionSet.names.elements.text);
        if (yShift)
            text.setAttribute(definitionSet.names.attributes.y, yShift);
        text[data] = textContent;
        text.textContent = definitionSet.formats.formatKey(textContent);
        text.classList.add(className);
        parent.appendChild(text);
    } //addText

    const data = Symbol();

    const groups = document.querySelectorAll(definitionSet.names.elements.g);
    const populate = groups => {
        const cssClasses = [];
        for (const option of elementSet.select.children)
            cssClasses.push(option.value);
        for (const group of groups) {
            const scancode = group.id;
            if (!scancode) continue;
            addText(group, scancode, definitionSet.names.classes.scancode, definitionSet.formats.defaultShift);
            const info = definitionSet.keys.get(scancode);
            if (!info) continue;
            for (const property in info) {
                const nameSet = info[property];
                if (nameSet instanceof Array) {
                    let yShift = nameSet.length - 1;
                    for (const name of nameSet) {
                        if (name.constructor != String) break;
                        addText(group, name, property, definitionSet.formats.formatYShift(yShift--));
                    } //loop
                } else if (nameSet.constructor == String)
                    addText(group, nameSet, property, definitionSet.formats.defaultShift);
            } //loop
        } //loop
    }; //populate
    populate(groups);

    const selectHandler = select => {
        elementSet.svg.classList = [];
        elementSet.svg.classList.add(select.value);
        for (const note of elementSet.notes)
            note.classList = [];
        const visibleNote = document.getElementById(select.value);
        if (visibleNote)
            visibleNote.className = definitionSet.names.classes.show;
    } //selectHandler
    elementSet.select.onchange = event => selectHandler(event.target);
    selectHandler(elementSet.select);

    const output = document.querySelector(definitionSet.names.elements.textarea);
    for (const group of groups) {
        group.onpointerup = event => {
            const style = elementSet.select.value;
            const keyInfo = definitionSet.keys.get(group.id);
            if (style == definitionSet.names.classes.label && keyInfo.legend) {
                output.value += definitionSet.formats.outputLegend(keyInfo.legend); return;
            } //if
            const textElements = event.currentTarget.querySelectorAll(definitionSet.names.getTextClass(style));
            if (textElements)
                for (const element of textElements)
                    output.value += definitionSet.formats.output(element[data], style);
        } //group.onpointerup
        group.onpointerenter = eventInstance => {
            const style = elementSet.select.value;
            for (const table of elementSet.hoverBoxTables)
                table.style.display = definitionSet.names.displayStyles.none;
            const keyInfo = definitionSet.keys.get(group.id);
            const textInfo = keyInfo[style];
            let visibleTable = null;
            if (style == definitionSet.names.classes.scancode)
                visibleTable = document.getElementById(definitionSet.tableDescriptors.scanCode);
            else if (textInfo.constructor == String || keyInfo.legend)
                visibleTable = document.getElementById(definitionSet.tableDescriptors.simple);
            else if (keyInfo.isKeypad) {
                visibleTable = textInfo.length >= 4
                    ? document.getElementById(definitionSet.tableDescriptors.numLockKeysAndValues)
                    : document.getElementById(definitionSet.tableDescriptors.numLockKeys);
            } else {
                visibleTable = (style == definitionSet.names.classes.win)
                    ? document.getElementById(definitionSet.tableDescriptors.keyValue)
                    : document.getElementById(definitionSet.tableDescriptors.LowerUpper);
            } //if
            if (!visibleTable) return;
            visibleTable.style.display = definitionSet.names.displayStyles.table;
            const fields = visibleTable.querySelectorAll(definitionSet.names.elements.span);
            if (style != definitionSet.names.classes.scancode) {
                if (textInfo.constructor == String)
                    fields[0].textContent = definitionSet.formats.output(textInfo, style);
                else if (keyInfo.legend)
                    fields[0].textContent = keyInfo.legend;
                else
                    for (let index = 0; index < textInfo.length; ++index)
                        fields[index].textContent = definitionSet.formats.output(textInfo[index], style);
            } //if
            fields[fields.length - 1].textContent = definitionSet.formats.scanCode(group.id);
            const rectangle = eventInstance.currentTarget.querySelector(definitionSet.names.elements.rect);
            const bounds = rectangle.getBoundingClientRect();
            if (bounds.right > window.innerWidth / 2) {
                elementSet.hoverBox.style.left = definitionSet.names.displayStyles.auto
                elementSet.hoverBox.style.right = definitionSet.formats.location(window.innerWidth - bounds.right);
            } else {
                elementSet.hoverBox.style.right = definitionSet.names.displayStyles.auto;
                elementSet.hoverBox.style.left = definitionSet.formats.location(bounds.left);
            } //if
            if (bounds.top > window.innerHeight / 2) {
                elementSet.hoverBox.style.top = definitionSet.names.displayStyles.auto;
                elementSet.hoverBox.style.bottom = definitionSet.formats.location(window.innerHeight - bounds.top);
            } else {
                elementSet.hoverBox.style.bottom = definitionSet.names.displayStyles.auto;
                elementSet.hoverBox.style.top = definitionSet.formats.location(bounds.bottom);
            } //if
            elementSet.hoverBox.style.display = definitionSet.names.displayStyles.block;
        }; //group.onpointerenter
        group.onpointerleave = () => 
            elementSet.hoverBox.style.display = definitionSet.names.displayStyles.none;
    } //loop

    elementSet.select.focus();

}); //DOMContentLoaded
