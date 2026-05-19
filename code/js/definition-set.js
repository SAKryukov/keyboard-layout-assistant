"use strict";

const createDefinitionSet = (() => {

    const twoCaseArray = lower => [lower, lower.toUpperCase()];
    const arrow = {
        up: String.fromCodePoint(0x2191),
        left: String.fromCodePoint(0x2190),
        down: String.fromCodePoint(0x2193),
        right: String.fromCodePoint(0x2192),
        super: [String.fromCodePoint(0x229E), "Super"],
        menu: [String.fromCodePoint(0x1f5b9), "Menu"],
    }; //arrow

    const keys = new Map();
    keys.set("01", {
        linux: "ESC",
        label: "Esc",
    });
    // F row
    keys.set("3B", {
        linux: "FK01",
        label: "F1",
    });
    keys.set("3C", {
        linux: "FK02",
        label: "F2",
    });
    keys.set("3D", {
        linux: "FK03",
        label: "F3",
    });
    keys.set("3E", {
        linux: "FK04",
        label: "F4",
    });
    keys.set("3F", {
        linux: "FK05",
        label: "F5",
    });
    keys.set("40", {
        linux: "FK06",
        label: "F6",
    });
    keys.set("41", {
        linux: "FK07",
        label: "F7",
    });
    keys.set("42", {
        linux: "FK08",
        label: "F8",
    });
    keys.set("43", {
        linux: "FK09",
        label: "F9",
    });
    keys.set("44", {
        linux: "FK10",
        label: "F10",
    });
    keys.set("57", {
        linux: "FK11",
        label: "F11",
    });
    keys.set("58", {
        linux: "FK12",
        label: "F12",
    });
    //
    keys.set("29", {
        linux: "TLDE",
        label: ["`", "~"],
    });
    // row 1
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

    // row 2:
    keys.set("10", {
        linux: "AD01",
        label: twoCaseArray("q"),
    });
    keys.set("11", {
        linux: "AD02",
        label: twoCaseArray("w"),
    });
    keys.set("12", {
        linux: "AD03",
        label: twoCaseArray("e"),
    });
    keys.set("13", {
        linux: "AD04",
        label: twoCaseArray("r"),
    });
    keys.set("14", {
        linux: "AD05",
        label: twoCaseArray("t"),
    });
    keys.set("15", {
        linux: "AD06",
        label: twoCaseArray("y"),
    });
    keys.set("16", {
        linux: "AD07",
        label: twoCaseArray("u"),
    });
    keys.set("17", {
        linux: "AD08",
        label: twoCaseArray("i"),
    });
    keys.set("18", {
        linux: "AD09",
        label: twoCaseArray("o"),
    });
    keys.set("19", {
        linux: "AD10",
        label: twoCaseArray("p"),
    });
    //row 2, extra:
    keys.set("1A", {
        linux: "AD11",
        label: ["[", "{"],
    });
    keys.set("1B", {
        linux: "AD12",
        label: ["]", "}"],
    });
    keys.set("2B", {
        linux: "BKSL",
        label: ["\\", "|"],
    });
    //row 3:
    keys.set("1E", {
        linux: "AC01",
        label: twoCaseArray("a"),
    });
    keys.set("1F", {
        linux: "AC02",
        label: twoCaseArray("s"),
    });
    keys.set("20", {
        linux: "AC03",
        label: twoCaseArray("d"),
    });
    keys.set("21", {
        linux: "AC04",
        label: twoCaseArray("f"),
    });
    keys.set("22", {
        linux: "AC05",
        label: twoCaseArray("g"),
    });
    keys.set("23", {
        linux: "AC06",
        label: twoCaseArray("h"),
    });
    keys.set("24", {
        linux: "AC07",
        label: twoCaseArray("j"),
    });
    keys.set("25", {
        linux: "AC08",
        label: twoCaseArray("k"),
    });
    keys.set("26", {
        linux: "AC09",
        label: twoCaseArray("l"),
    });
    //row3, extra:
    keys.set("27", {
        linux: "AC10",
        label: [";", ":"],
    });
    keys.set("28", {
        linux: "AC11",
        label: ["'", "\""],
    });
    keys.set("1C", {
        linux: "RTRN",
        label: "Enter",
    });
    //row 4:
    keys.set("2C", {
        linux: "AB01",
        label: twoCaseArray("z"),
    });
    keys.set("2D", {
        linux: "AB02",
        label: twoCaseArray("x"),
    });
    keys.set("2E", {
        linux: "AB03",
        label: twoCaseArray("c"),
    });
    keys.set("2F", {
        linux: "AB04",
        label: twoCaseArray("v"),
    });
    keys.set("30", {
        linux: "AB05",
        label: twoCaseArray("b"),
    });
    keys.set("31", {
        linux: "AB06",
        label: twoCaseArray("n"),
    });
    keys.set("32", {
        linux: "AB07",
        label: twoCaseArray("m"),
    });
    keys.set("33", {
        linux: "AB08",
        label: [",", "<"],
    });
    keys.set("34", {
        linux: "AB09",
        label: [".", ">"],
    });
    keys.set("35", {
        linux: "AB10",
        label: ["/", "?"],
    });
    keys.set("36", {
        linux: "RTSH",
        label: "Shift",
    });
    //row 5:
    keys.set("1D", {
        linux: "LCTL",
        label: "Ctrl",
    });
    keys.set("E0 5B", {
        linux: "LWIN",
        label: arrow.super, //"Win",
    });
    keys.set("38", {
        linux: "LALT",
        label: "Alt",
    });
    keys.set("39", {
        linux: "39",
        label: "",
    });
    keys.set("E0 38", {
        linux: "RALT",
        label: "Alt",
    });
    keys.set("E0 5C", {
        linux: "RWIN",
        label: arrow.super, //"Win",
    });
    keys.set("E0 5D", {
        linux: "MENU",
        label: arrow.menu, //"Menu"
    });
    keys.set("E0 1D", {
        linux: "RCTL",
        label: "Ctrl",
    });
    
    
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
    //
    //insert, pg up/down, arrows:
    keys.set("E0 52", {
        linux: "INS",
        label: "Insert",
    });
    keys.set("E0 47", {
        linux: "HOME",
        label: "Home",
    });
    keys.set("E0 49", {
        linux: "PGUP",
        label: "PgUp",
    });
    keys.set("E0 53", {
        linux: "DELE",
        label: "Delete",
    });
    keys.set("E0 4F", {
        linux: "END",
        label: "End",
    });
    keys.set("E0 51", {
        linux: "PGDN",
        label: "PgDn",
    });
    keys.set("E0 48", {
        linux: "UP",
        label: arrow.up
    });
    keys.set("E0 4B", {
        linux: "LEFT",
        label: arrow.left
    });
    keys.set("E0 50", {
        linux: "DOWN",
        label: arrow.down
    });
    keys.set("E0 4D", {
        linux: "RIGHT",
        label: arrow.right
    });

    // keypad;
    keys.set("45", {
        linux: "NMLK",
        label: ["Lock", "Num"],
    });
    keys.set("E0 35", {
        linux: "KPDV",
        label: "/",
    });
    keys.set("37", {
        linux: "KPMU",
        label: "*",
    });
    keys.set("4A", {
        linux: "KPSU",
        label: "-",
    });
    keys.set("47", {
        linux: "KP7",
        label: ["Home", "7"],
    });
    keys.set("48", {
        linux: "KP8",
        label: [arrow.up, "8"],
    });
    keys.set("49", {
        linux: "KP9",
        label: ["PgUp", "9"],
    });
    keys.set("4B", {
        linux: "KP4",
        label: [arrow.left, "4"],
    });
    keys.set("4C", {
        linux: "KP5",
        label: "5",
    });
    keys.set("4D", {
        linux: "KP6",
        label: [arrow.right, "6"],
    });
    keys.set("4F", {
        linux: "KP1",
        label: ["End", "1"],
    });
    keys.set("50", {
        linux: "KP2",
        label: [arrow.down, "2"],
    });
    keys.set("51", {
        linux: "KP3",
        label: ["PgDn", "3"],
    });
    keys.set("52", {
        linux: "KP0",
        label: ["Insert", "0"],
    });
    keys.set("53", {
        linux: "KPDL",
        label: ["Delete", "."],
    });
    keys.set("4E", {
        linux: "KPAD",
        label: "+",
    });
    keys.set("E0 1C", {
        linux: "KPEN",
        label: "Enter",
    });
    // remaining left:
    keys.set("0F", {
        linux: "TAB",
        label: "Tab",
    });
    keys.set("3A", {
        linux: "CAPS",
        label: "Caps Lock",
    });
    keys.set("2A", {
        linux: "LFSH",
        label: "Shift",
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
