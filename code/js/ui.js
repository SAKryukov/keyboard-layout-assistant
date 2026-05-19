"use strict";

const definitionSet = createDefinitionSet();

window.addEventListener(definitionSet.names.DOMContentLoaded, () => {

    const elementSet = {
        svg: document.querySelector(definitionSet.names.elements.svg),
        select: document.querySelector(definitionSet.names.elements.select),
        output: document.querySelector(definitionSet.names.elements.textarea),
        notes: document.querySelectorAll(definitionSet.names.classes.note),
    }; //elementSet
    elementSet.select.size = elementSet.select.children.length;

    const createSvgElement = name => document.createElementNS(definitionSet.names.svgNamespace, name);

    const addText = (parent, textContent, className, yShift) => {
        const text = createSvgElement(definitionSet.names.elements.text);
        if (yShift)
            text.setAttribute(definitionSet.names.attributes.y, yShift);
        text[data] = textContent;
        text.textContent = definitionSet.trimAppreviation(textContent);
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
            const textElements = event.currentTarget.querySelectorAll(definitionSet.names.getTextClass(style));
            if (textElements)
                for (const element of textElements)
                    output.value += definitionSet.formats.output(element[data], style);
        } //group.onpointerup
    } //loop

    elementSet.select.focus();

}); //DOMContentLoaded
