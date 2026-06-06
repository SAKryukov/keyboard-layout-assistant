"use strict";

const definitionSet = createDefinitionSet();

window.addEventListener(definitionSet.names.DOMContentLoaded, () => {

    const elementSet = {
        svg: document.querySelector(definitionSet.names.elements.svg),
        select: document.querySelector(definitionSet.names.elements.select),
        output: document.querySelector(definitionSet.names.elements.textarea),
        buttons: {
            copy: document.getElementById(definitionSet.names.buttonId.copy),
            clear: document.getElementById(definitionSet.names.buttonId.clear),
            help: document.getElementById(definitionSet.names.buttonId.help),
        },
        hoverBox: document.querySelector(definitionSet.names.elements.aside),
    }; //elementSet
    elementSet.hoverBoxTables = elementSet.hoverBox.querySelectorAll(definitionSet.names.elements.table);
    elementSet.select.size = elementSet.select.children.length;
    const metadataElements = document.querySelectorAll(definitionSet.names.elements.metadata.selector);
    metadataElements[definitionSet.names.elements.metadata.versionIndex].innerHTML = metadata.version;
    metadataElements[definitionSet.names.elements.metadata.copyrightIndex].innerHTML = metadata.copyright;

    elementSet.buttons.copy.onclick = () =>
        navigator.clipboard.writeText(elementSet.output.value);
    elementSet.buttons.clear.onclick = () =>
        elementSet.output.value = new String();
    elementSet.buttons.help.onclick = () =>
        definitionSet.help();
    window.onkeydown = event => { 
        if (event.key == definitionSet.names.keys.F1) {
            definitionSet.help();
            event.preventDefault();
        } //if
    }; //windows.onkeydown, help

    const createSvgElement = name => document.createElementNS(definitionSet.names.svgNamespace, name);

    const addText = (parent, textContent, className, yShift, abbreviatedTextContent) => {
        const text = createSvgElement(definitionSet.names.elements.text);
        if (yShift)
            text.setAttribute(definitionSet.names.attributes.y, yShift);
        text[data] = textContent;
        const effectiveTextContent = abbreviatedTextContent == undefined
            ? textContent
            : abbreviatedTextContent;
        text.textContent = definitionSet.formats.formatKey(effectiveTextContent);
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
            const info = definitionSet.keys.get(scancode);
            addText(group, scancode, definitionSet.names.classes.scancode, definitionSet.formats.defaultShift, info.scanCodeAbbreviation);
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
            output.placeholder = String();
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
            const key = eventInstance.currentTarget.querySelector(definitionSet.names.elements.rect);
            const boundingRectangleViewPort = key.getBoundingClientRect();
            const bounds = new DOMRect( boundingRectangleViewPort.x + window.scrollX, boundingRectangleViewPort.y + window.scrollY,
                                        boundingRectangleViewPort.width, boundingRectangleViewPort.height);
            const keyCenterViewPort = { x: boundingRectangleViewPort.x + boundingRectangleViewPort.width / 2,
                                        y: boundingRectangleViewPort.y + boundingRectangleViewPort.height / 2, };
            const viewPortSize = { x: document.documentElement.clientWidth, y: document.documentElement.clientHeight, };
            if (keyCenterViewPort.x > viewPortSize.x / 2) {
                elementSet.hoverBox.style.left = definitionSet.names.displayStyles.auto;
                let x = viewPortSize.x - bounds.right;
                if (x < 0) x = 0;
                elementSet.hoverBox.style.right = definitionSet.formats.location(Math.round(x));
            } else {
                elementSet.hoverBox.style.right = definitionSet.names.displayStyles.auto;
                let x = bounds.left;
                if (x < 0) x = 0;
                elementSet.hoverBox.style.left = definitionSet.formats.location(Math.round(x));
            } //if
            if (keyCenterViewPort.y > viewPortSize.y / 2) {
                elementSet.hoverBox.style.top = definitionSet.names.displayStyles.auto;
                let y = viewPortSize.y - bounds.top;
                if (y < 0) y = 0;
                elementSet.hoverBox.style.bottom = definitionSet.formats.location(Math.round(y));
            } else {
                elementSet.hoverBox.style.bottom = definitionSet.names.displayStyles.auto;
                let y = bounds.bottom;
                if (y < 0) y = 0;
                elementSet.hoverBox.style.top = definitionSet.formats.location(Math.round(y));
            } //if
            elementSet.hoverBox.style.display = definitionSet.names.displayStyles.block;
        }; //group.onpointerenter
        group.onpointerleave = () => 
            elementSet.hoverBox.style.display = definitionSet.names.displayStyles.none;
    } //loop
 
    elementSet.select.focus();

}); //DOMContentLoaded

window.onload = () => globalThis.scrollTo({ top: 0, behavior: definitionSet.names.instantScrollBehavior });
