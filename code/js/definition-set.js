"use strict";

const createDefinitionSet = (() => {

    const keys = new Map();
    keys.set("01", {
        linux: "ESC",
        label: "Esc",
    });
    keys.set("29", {
        linux: "TLDE",
        label: ["'", "~"],
    });
    keys.set("02", {
        linux: "AE01",
        label: ["1", "!"],
    });

    keys.set("03", {
        linux: "AE02",
        label: ["2", "@"],
    });
    keys.set("04", {
        linux: `AE03`,
        label: ["3", "#"],
    });
    keys.set("05", {
        linux: "AE04",
        label: ["4", "$"],
    });
    keys.set("06", {
        linux: "AE05",
        label: ["5", "%"],
    });
    keys.set("07", {
        linux: "AE06",
        label: ["6", "^"],
    });
    keys.set("08", {
        linux: "AE07",
        label: ["7", "&"],
    });
    keys.set("09", {
        linux: "AE08",
        label: ["8", "*"],
    });
    keys.set("0A", {
        linux: "AE09",
        label: ["9", "("],
    });
    keys.set("0B", {
        linux: "AE10",
        label: ["0", ")"],
    });
    keys.set("0C", {
        linux: "AE11",
        label: ["-", "_"],
    });
    keys.set("0D", {
        linux: "AE12",
        label: ["=", "+"],
    });
    keys.set("0E", {
        linux: "BKSP",
        label: "Backspace",
    });
    //--------------
    keys.set("10", {
        linux: "AD01",
        label: ["q", "Q"],
    });
    keys.set("11", {
        linux: "AD02",
        label: ["w", "W"],
    });
    keys.set("12", {
        linux: "AD03",
        label: ["e", "E"],
    });
    //...
    //--------------

    keys.set("54", {
        linux: "PRSC",
        label: "PtSc",
    });
    keys.set("46", {
        linux: "SCLK",
        label: "Scroll",
    });
    keys.set("E1 1D", {
        linux: "PAUS",
        label: "Pause",
    });
    // keys

    const initializeNames = objectArray => {
        for (const subset of objectArray)
            for (const index in subset)
                if (subset[index] === 0)
                    subset[index] = index;
    }; //initializeNames

    const names = {
        DOMContentLoaded: 0,
        svgNamespace: "http://www.w3.org/2000/svg",
        elements: {
            svg: 0,
            select: 0,
            textarea: 0,
            g: 0,
            text: 0,
        }, //elements
        classes: { // special cases, should match two <select> <option> values:
            scancode: 0, // <g> id's are scancodes
            linux: 0, // to support <>, see formats output: (data, style)
        }, //classes
        attributes: {
            x: 0,
            y: 0,
        }, //attributes
        getTextClass: function(className) { return `${this.elements.text}.${className}`; },
    }; //names
    initializeNames([
        names,
        names.elements,
        names.classes,
        names.attributes,
    ]);

    const defaultShift = 0.25;
    const formats = {
        output: (data, style) => {
            let bra = "", ket = "";
            if (style == names.classes.linux) {
                bra = "<"; ket = ">";
            } //if
            return `${bra}${data}${ket} `;
        }, //output
        defaultShift: `${defaultShift}em`,
        formatYShift: value => `${value + defaultShift}em`,
    }; //formats

    return { keys, names, formats };

}); //createDefinitionSet
