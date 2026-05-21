"use strict";

const createDefinitionSet = (() => {

    const twoCaseArray = lower => [lower, lower.toUpperCase()];
    const abbreviation = String.fromCodePoint(0x2026); // horizontal ellipsis
    const trimAppreviation = name =>
        name.includes(abbreviation)
        ? name.substring(0, name.indexOf(abbreviation)) + abbreviation
            : name;

    const ideograph = {
        up: String.fromCodePoint(0x2191),
        left: String.fromCodePoint(0x2190),
        down: String.fromCodePoint(0x2193),
        right: String.fromCodePoint(0x2192),
        super: [String.fromCodePoint(0x229E), "Super"],
        menu: [String.fromCodePoint(0x1f5b9), "Menu"],
    }; //ideograph

    const keys = new Map();
        keys.set("01", {
        linux: "ESC",
        label: "Esc",
        win: [`VK_ES${abbreviation}CAPE`, "1B"],
        dotnetforms: [`Esc${abbreviation}ape`, "1B"],
        dotnetwpf: [`Esc${abbreviation}ape`, "0D"],
        jskey: `Esc${abbreviation}ape`,
        jscode: `Esc${abbreviation}ape`,
    });
    // F row
    keys.set("3B", {
        linux: "FK01",
        label: "F1",
        win: ["VK_F1", "70"],
        dotnetforms: ["F1", "70"],
        dotnetwpf: ["F1", "5A"],
        jskey: "F1",
        jscode: "F1",
    });
    keys.set("3C", {
        linux: "FK02",
        label: "F2",
        win: ["VK_F2", "71"],
        dotnetforms: ["F2", "71"],
        dotnetwpf: ["F2", "5B"],
        jskey: "F2",
        jscode: "F2",
    });
    keys.set("3D", {
        linux: "FK03",
        label: "F3",
        win: ["VK_F3", "72"],
        dotnetforms: ["F3", "72"],
        dotnetwpf: ["F3", "5C"],
        jskey: "F3",
        jscode: "F3",
    });
    keys.set("3E", {
        linux: "FK04",
        label: "F4",
        win: ["VK_F4", "73"],
        dotnetforms: ["F4", "73"],
        dotnetwpf: ["F4", "5D"],
        jskey: "F4",
        jscode: "F4",
    });
    keys.set("3F", {
        linux: "FK05",
        label: "F5",
        win: ["VK_F5", "74"],
        dotnetforms: ["F5", "74"],
        dotnetwpf: ["F5", "5E"],
        jskey: "F5",
        jscode: "F5",
    });
    keys.set("40", {
        linux: "FK06",
        label: "F6",
        win: ["VK_F6", "75"],
        dotnetforms: ["F6", "75"],
        dotnetwpf: ["F6", "5F"],
        jskey: "F6",
        jscode: "F6",
    });
    keys.set("41", {
        linux: "FK07",
        label: "F7",
        win: ["VK_F7", "76"],
        dotnetforms: ["F7", "76"],
        dotnetwpf: ["F7", "60"],
        jskey: "F7",
        jscode: "F7",
    });
    keys.set("42", {
        linux: "FK08",
        label: "F8",
        win: ["VK_F8", "77"],
        dotnetforms: ["F8", "77"],
        dotnetwpf: ["F8", "61"],
        jskey: "F8",
        jscode: "F8",
    });
    keys.set("43", {
        linux: "FK09",
        label: "F9",
        win: ["VK_F9", "78"],
        dotnetforms: ["F9", "78"],
        dotnetwpf: ["F9", "62"],
        jskey: "F9",
        jscode: "F9",
    });
    keys.set("44", {
        linux: "FK10",
        label: "F10",
        win: ["VK_F10", "79"],
        dotnetforms: ["F10", "79"],
        dotnetwpf: ["F10", "63"],
        jskey: "F10",
        jscode: "F10",
    });
    keys.set("57", {
        linux: "FK11",
        label: "F11",
        win: ["VK_F11", "7A"],
        dotnetforms: ["F11", "7A"],
        dotnetwpf: ["F11", "64"],
        jskey: "F11",
        jscode: "F11",
    });
    keys.set("58", {
        linux: "FK12",
        label: "F12",
        win: ["VK_F12", "7B"],
        dotnetforms: ["F12", "7B"],
        dotnetwpf: ["F12", "65"],
        jskey: "F12",
        jscode: "F12",
    });
    //

/*
System.Windows.Forms.Key: KeyCode: D1; KeyValue: 0x31; Decimal KeyValue: 49
System.Windows.Forms.Key: KeyCode: D2; KeyValue: 0x32; Decimal KeyValue: 50
System.Windows.Forms.Key: KeyCode: D3; KeyValue: 0x33; Decimal KeyValue: 51
System.Windows.Forms.Key: KeyCode: D4; KeyValue: 0x34; Decimal KeyValue: 52
System.Windows.Forms.Key: KeyCode: D5; KeyValue: 0x35; Decimal KeyValue: 53
System.Windows.Forms.Key: KeyCode: D6; KeyValue: 0x36; Decimal KeyValue: 54
System.Windows.Forms.Key: KeyCode: D7; KeyValue: 0x37; Decimal KeyValue: 55
System.Windows.Forms.Key: KeyCode: D8; KeyValue: 0x38; Decimal KeyValue: 56
System.Windows.Forms.Key: KeyCode: D9; KeyValue: 0x39; Decimal KeyValue: 57
System.Windows.Forms.Key: KeyCode: D0; KeyValue: 0x30; Decimal KeyValue: 48
System.Windows.Forms.Key: KeyCode: OemMinus; KeyValue: 0xBD; Decimal KeyValue: 189
System.Windows.Forms.Key: KeyCode: Oemplus; KeyValue: 0xBB; Decimal KeyValue: 187
System.Windows.Forms.Key: KeyCode: Back; KeyValue: 0x08; Decimal KeyValue: 8
*/

    keys.set("29", {
        linux: "TLDE",
        label: ["`", "~"],
        win: [`VK_O${abbreviation}EM_3`, "C0"],
        dotnetforms: [`Oem${abbreviation}tilde`, "C0"],
        dotnetwpf: [`Oem${abbreviation}Tilde`, "92"],
        jskey: "`",
        jscode: `Bac${abbreviation}kquote`,
    });
    // row 1
    keys.set("02", {
        linux: "AE01",
        label: ["1", "!"],
        win: ["1", "31"],
        dotnetforms: ["D1", "31"],
        dotnetwpf: ["D1", "23"],
        jskey: ["1", "!"],
        jscode: "Digit1",
    });
    keys.set("03", {
        linux: "AE02",
        label: ["2", "@"],
        win: ["2", "32"],
        dotnetforms: ["D2", "32"],
        dotnetwpf: ["D2", "24"],
        jskey: ["2", "@"],
        jscode: "Digit2",
    });
    keys.set("04", {
        linux: `AE03`,
        label: ["3", "#"],
        win: ["3", "33"],
        dotnetforms: ["D3", "33"],
        dotnetwpf: ["D3", "25"],
        jskey: ["3", "#"],
        jscode: "Digit3",
    });
    keys.set("05", {
        linux: "AE04",
        label: ["4", "$"],
        win: ["4", "34"],
        dotnetforms: ["D4", "34"],
        dotnetwpf: ["D4", "26"],
        jskey: ["4", "$"],
        jscode: "Digit4",
    });
    keys.set("06", {
        linux: "AE05",
        label: ["5", "%"],
        win: ["5", "35"],
        dotnetforms: ["D5", "35"],
        dotnetwpf: ["D5", "27"],
        jskey: ["5", "%"],
        jscode: "Digit5",
    });
    keys.set("07", {
        linux: "AE06",
        label: ["6", "^"],
        win: ["6", "36"],
        dotnetforms: ["D6", "36"],
        dotnetwpf: ["D6", "28"],
        jskey: ["6", "^"],
        jscode: "Digit6",
    });
    keys.set("08", {
        linux: "AE07",
        label: ["7", "&"],
        win: ["7", "37"],
        dotnetforms: ["D7", "37"],
        dotnetwpf: ["D7", "29"],
        jskey: ["7", "&"],
        jscode: "Digit7",
    });
    keys.set("09", {
        linux: "AE08",
        label: ["8", "*"],
        win: ["8", "38"],
        dotnetforms: ["D8", "38"],
        dotnetwpf: ["D8", "2A"],
        jskey: ["8", "*"],
        jscode: "Digit8",
    });
    keys.set("0A", {
        linux: "AE09",
        label: ["9", "("],
        win: ["9", "39"],
        dotnetforms: ["D9", "39"],
        dotnetwpf: ["D9", "2B"],
        jskey: ["9", "("],
        jscode: "Digit9",
    });
    keys.set("0B", {
        linux: "AE10",
        label: ["0", ")"],
        win: ["0", "30"],
        dotnetforms: ["D0", "30"],
        dotnetwpf: ["D0", "22"],
        jskey: ["0", ")"],
        jscode: "Digit0",
    });
    keys.set("0C", {
        linux: "AE11",
        label: ["-", "_"],
        win: [`VK_OE${abbreviation}M_MINUS`, "BD"],
        jskey: ["-", "_"],
        jscode: "Minus",
    });
    keys.set("0D", {
        linux: "AE12",
        label: ["=", "+"],
        win: [`VK_OE${abbreviation}M_PLUS`, "BB"],
        jskey: ["=", "+"],
        jscode: "Equal",
    });
    keys.set("0E", {
        linux: "BKSP",
        label: "Backspace",
        win: ["VK_BACK", "08"],
        jskey: "Backspace",
        jscode: "Backspace",
    });

    // row 2:
    keys.set("10", {
        linux: "AD01",
        label: twoCaseArray("q"),
        win: ["Q", "51"],
        jskey: twoCaseArray("q"),
        jscode: "KeyQ",
    });
    keys.set("11", {
        linux: "AD02",
        label: twoCaseArray("w"),
        win: ["W", "57"],
        jskey: twoCaseArray("w"),
        jscode: "KeyW",
    });
    keys.set("12", {
        linux: "AD03",
        label: twoCaseArray("e"),
        win: ["E", "45"],
        jskey: twoCaseArray("e"),
        jscode: "KeyE",
    });
    keys.set("13", {
        linux: "AD04",
        label: twoCaseArray("r"),
        win: ["R", "52"],
        jskey: twoCaseArray("r"),
        jscode: "KeyR",
    });
    keys.set("14", {
        linux: "AD05",
        label: twoCaseArray("t"),
        win: ["T", "54"],
        jskey: twoCaseArray("t"),
        jscode: "KeyT",
    });
    keys.set("15", {
        linux: "AD06",
        label: twoCaseArray("y"),
        win: ["Y", "59"],
        jskey: twoCaseArray("y"),
        jscode: "KeyY",
    });
    keys.set("16", {
        linux: "AD07",
        label: twoCaseArray("u"),
        win: ["U", "55"],
        jskey: twoCaseArray("u"),
        jscode: "KeyU",
    });
    keys.set("17", {
        linux: "AD08",
        label: twoCaseArray("i"),
        win: ["I", "49"],
        jskey: twoCaseArray("i"),
        jscode: "KeyI",
    });
    keys.set("18", {
        linux: "AD09",
        label: twoCaseArray("o"),
        win: ["O", "4F"],
        jskey: twoCaseArray("o"),
        jscode: "KeyO",
    });
    keys.set("19", {
        linux: "AD10",
        label: twoCaseArray("p"),
        win: ["P", "50"],
        jskey: twoCaseArray("p"),
        jscode: "KeyP",
    });
    //row 2, extra:
    keys.set("1A", {
        linux: "AD11",
        label: ["[", "{"],
        win: [`VK_OE${abbreviation}M_4`, "DB"],
        jskey: ["[", "{"],
        jscode: `Bra${abbreviation}cketLeft`,
    });
    keys.set("1B", {
        linux: "AD12",
        label: ["]", "}"],
        win: [`VK_OE${abbreviation}M_6`, "DD"],
        jskey: ["]", "}"],
        jscode: `Bra${abbreviation}cketRight`,
    });
    keys.set("2B", {
        linux: "BKSL",
        label: ["\\", "|"],
        win: ["VK_OEM_5", "0xDC"],
        jskey: ["\\", "|"],
        jscode: `Backsl${abbreviation}ash`,
    });
    //row 3:
    keys.set("1E", {
        linux: "AC01",
        label: twoCaseArray("a"),
        win: ["A", "41"],
        jskey: twoCaseArray("a"),
        jscode: "KeyA",
    });
    keys.set("1F", {
        linux: "AC02",
        label: twoCaseArray("s"),
        win: ["S", "53"],
        jskey: twoCaseArray("s"),
        jscode: "KeyS",
    });
    keys.set("20", {
        linux: "AC03",
        label: twoCaseArray("d"),
        win: ["D", "44"],
        jskey: twoCaseArray("d"),
        jscode: "KeyD",
    });
    keys.set("21", {
        linux: "AC04",
        label: twoCaseArray("f"),
        win: ["F", "46"],
        jskey: twoCaseArray("f"),
        jscode: "KeyF",
    });
    keys.set("22", {
        linux: "AC05",
        label: twoCaseArray("g"),
        win: ["G", "47"],
        jskey: twoCaseArray("g"),
        jscode: "KeyG",
    });
    keys.set("23", {
        linux: "AC06",
        label: twoCaseArray("h"),
        win: ["H", "48"],
        jskey: twoCaseArray("h"),
        jscode: "KeyH",
    });
    keys.set("24", {
        linux: "AC07",
        label: twoCaseArray("j"),
        win: ["J", "4A"],
        jskey: twoCaseArray("j"),
        jscode: "KeyJ",
    });
    keys.set("25", {
        linux: "AC08",
        label: twoCaseArray("k"),
        win: ["K", "4B"],
        jskey: twoCaseArray("k"),
        jscode: "KeyK",
    });
    keys.set("26", {
        linux: "AC09",
        label: twoCaseArray("l"),
        win: ["L", "4C"],
        jskey: twoCaseArray("l"),
        jscode: "KeyL",
    });
    //row3, extra:
    keys.set("27", {
        linux: "AC10",
        label: [";", ":"],
        win: [`VK_OE${abbreviation}M_1`, "BA"],
        jskey: [";", ":"],
        jscode: `Sem${abbreviation}icolon`,
    });
    keys.set("28", {
        linux: "AC11",
        label: ["'", "\""],
        win: [`VK_OE${abbreviation}M_7`, "DE"],
        jskey: ["'", "\""],
        jscode: "Quote",
    });
    keys.set("1C", {
        linux: "RTRN",
        label: "Enter",
        win: ["VK_RETURN", "0D"],
        jskey: "Enter",
        jscode: "Enter",
    });
    //row 4:
    keys.set("2C", {
        linux: "AB01",
        label: twoCaseArray("z"),
        win: ["Z", "5A"],
        jskey: twoCaseArray("z"),
        jscode: "KeyZ",
    });
    keys.set("2D", {
        linux: "AB02",
        label: twoCaseArray("x"),
        win: ["X", "58"],
        jskey: twoCaseArray("x"),
        jscode: "KeyX",
    });
    keys.set("2E", {
        linux: "AB03",
        label: twoCaseArray("c"),
        win: ["C", "43"],        
        jskey: twoCaseArray("c"),
        jscode: "KeyC",
    });
    keys.set("2F", {
        linux: "AB04",
        label: twoCaseArray("v"),
        win: ["V", "56"],
        jskey: twoCaseArray("v"),
        jscode: "KeyV",
    });
    keys.set("30", {
        linux: "AB05",
        label: twoCaseArray("b"),
        win: ["B", "42"],        
        jskey: twoCaseArray("b"),
        jscode: "KeyB",
    });
    keys.set("31", {
        linux: "AB06",
        label: twoCaseArray("n"),
        win: ["N", "4E"],
        jskey: twoCaseArray("n"),
        jscode: "KeyN",
    });
    keys.set("32", {
        linux: "AB07",
        label: twoCaseArray("m"),
        win: ["M", "4D"],
        jskey: twoCaseArray("m"),
        jscode: "KeyM",
    });
    keys.set("33", {
        linux: "AB08",
        label: [",", "<"],
        win: [`VK_OE${abbreviation}M_COMMA`, "BC"],
        jskey: [",", "<"],
        jscode: `Com${abbreviation}ma`,
    });
    keys.set("34", {
        linux: "AB09",
        label: [".", ">"],
        win: [`VK_OE${abbreviation}M_PERIOD`, "BE"],
        jskey: [".", ">"],
        jscode: `Per${abbreviation}iod`,
    });
    keys.set("35", {
        linux: "AB10",
        label: ["/", "?"],
        win: [`VK_OE${abbreviation}M_2`, "BF"],
        jskey: ["/", "?"],
        jscode: `Slash`,
    });
    keys.set("36", {
        linux: "RTSH",
        label: "Shift",
        win: ["VK_RSHIFT", "10"],
        jskey: "Shift",
        jscode: "ShiftRight",
    });
    //row 5:

/*
code: AltRight, key: Alt
code: ContextMenu, key: ContextMenu
code: ControlRight, key: Control
*/    
    keys.set("1D", {
        linux: "LCTL",
        label: "Ctrl",
        win: [`VK_LCO${abbreviation}NTROL`, "A2"],
        jskey: "Control",
        jscode: `Contr${abbreviation}olLeft`,
    });
    keys.set("E0 5B", {
        linux: "LWIN",
        label: ideograph.super, //"Win",
        win: [`VK_LWIN`, "5B"],
        jskey: "Meta",
        jscode: `MetaL${abbreviation}eft`,
    });
    keys.set("38", {
        linux: "LALT",
        label: "Alt",
        win: [`VK_LME${abbreviation}NU`, "A4"],
        jskey: "Alt",
        jscode: `AltLeft`,
    });
    keys.set("39", {
        linux: "39",
        label: "",
        win: ["VK_SPACE", "20"],
        jskey: "",
        jscode: "Space",
    });
    keys.set("E0 38", {
        linux: "RALT",
        label: "Alt",
        win: [`VK_RME${abbreviation}NU`, "A5"],
        jskey: "Alt",
        jscode: `AltRight`,
    });
    keys.set("E0 5C", {
        linux: "RWIN",
        label: ideograph.super, //"Win",
        win: ["VK_RWIN", "5C"], 
        jskey: "Meta",
        jscode: `MetaR${abbreviation}ight`,
    });
    keys.set("E0 5D", {
        linux: "MENU",
        label: ideograph.menu, //"Menu"
        win: ["VK_APPS", "5D"],
        jskey: `Conte${abbreviation}xtMenu`,
        jscode: `Conte${abbreviation}xtMenu`,
    });
    keys.set("E0 1D", {
        linux: "RCTL",
        label: "Ctrl",
        win: [`VK_RCO${abbreviation}NTROL`, "A3"],
        jskey: "Control",
        jscode: `Contr${abbreviation}olRight`,
    });
    //--------------
    keys.set("54", {
        linux: "PRSC",
        label: "PtSc",
        win: [`VK_SN${abbreviation}APSHOT`, "2C"],
        dotnetforms: [`Prin${abbreviation}tScreen`, "2C"],
        dotnetwpf: [`Prin${abbreviation}tScreen`, "1C"],
        jskey: `Pri${abbreviation}ntScreen`,
        jscode: `Pri${abbreviation}ntScreen`,
    });
    keys.set("46", {
        linux: "SCLK",
        label: ["Lock", "Scroll"],
        win: [`VK_SC${abbreviation}CROLL`, 	"91"],
        dotnetforms: [`Scroll`, "91"],
        dotnetwpf: [`Scroll`, "73"],
        jskey: `Scr${abbreviation}ollLock`,
        jscode: `Scr${abbreviation}ollLock`,
    });
    keys.set("E1 1D", {
        linux: "PAUS",
        label: "Pause",
        win: [`VK_PA${abbreviation}USE`, "13"],
        dotnetforms: [`Pause`, "13"],
        dotnetwpf: [`Pause`, "07"],
        jskey: `Pause`,
        jscode: `Pause`,
    });

    //insert, pg up/down, arrows:
    keys.set("E0 52", {
        linux: "INS",
        label: "Insert",
        win: [`VK_IN${abbreviation}SERT`, "2D"],
        jskey: `Insert`,
        jscode: 'Insert',
    });
    keys.set("E0 47", {
        linux: "HOME",
        label: "Home",
        win: [`VK_HO${abbreviation}ME`, "24"],
        jskey: `Home`,
        jscode: 'Home',
    });
    keys.set("E0 49", {
        linux: "PGUP",
        label: "PgUp",
        win: [`VK_P${abbreviation}RIOR`, "21"],
        jskey: `Pag${abbreviation}eUp`,
        jscode: `Pag${abbreviation}eUp`,
    });
    keys.set("E0 53", {
        linux: "DELE",
        label: "Delete",
        win: [`VK_DE${abbreviation}LETE`, "2E"],
        jskey: "Delete",
        jscode: "Delete",
    });
    keys.set("E0 4F", {
        linux: "END",
        label: "End",
        win: [`VK_EN${abbreviation}D`, "23"],
        jskey: "End",
        jscode: "End",
    });
    keys.set("E0 51", {
        linux: "PGDN",
        label: "PgDn",
        win: [`VK_N${abbreviation}EXT`, "22"],
        jskey: `Pag${abbreviation}eDown`,
        jscode: `Pag${abbreviation}eDown`,
    });
    keys.set("E0 48", {
        linux: "UP",
        label: ideograph.up,
        win: ["VK_UP", "26"],
        jskey: `Arr${abbreviation}owUp`,
        jscode: `Arr${abbreviation}owUp`,
    });
    keys.set("E0 4B", {
        linux: "LEFT",
        label: ideograph.left,
        win: [`VK_L${abbreviation}EFT`, "25"],
        jskey: `Arr${abbreviation}owLeft`,
        jscode: `Arr${abbreviation}owLeft`,
    });
    keys.set("E0 50", {
        linux: "DOWN",
        label: ideograph.down,
        win: [`VK_D${abbreviation}OWN`, "28"],
        jskey: `Arr${abbreviation}owDown`,
        jscode: `Arr${abbreviation}owDown`,
    });
    keys.set("E0 4D", {
        linux: "RIGHT",
        label: ideograph.right,
        win: [`VK_RI${abbreviation}GHT`, "27"],
        jskey: `Arr${abbreviation}owRight`,
        jscode: `Arr${abbreviation}owRight`,
    });

    // keypad;
    keys.set("45", {
        linux: "NMLK",
        label: ["Lock", "Num"],
        win: [`VK_NU${abbreviation}MLOCK`, "90"],
        jskey: `Nu${abbreviation}mLock`,
        jscode: `Nu${abbreviation}mLock`,
    });
    keys.set("E0 35", {
        linux: "KPDV",
        label: "/",
        win: [`VK_DI${abbreviation}VIDE`, "6F"],
        jskey: "/",
        jscode: `Nu${abbreviation}mpadDivide`,
    });
    keys.set("37", {
        linux: "KPMU",
        label: "*",
        win: [`VK_MU${abbreviation}LTIPLY`, "6A"],
        jskey: "*",
        jscode: `Nu${abbreviation}mpadMultiply`,
    });
    keys.set("4A", {
        linux: "KPSU",
        label: "-",
        win: [`VK_SU${abbreviation}BTRACT`, "6D"],
        jskey: "-",
        jscode: `Nu${abbreviation}mpadSubtract`,
    });
    keys.set("47", {
        linux: "KP7",
        label: ["Home", "7"],
        win: [`VK_HO${abbreviation}ME`, "24", `VK_NU${abbreviation}MPAD7`, "67"],
        jskey: ["Home", "7"],
        jscode: `Nu${abbreviation}mpad7`,
    });
    keys.set("48", {
        linux: "KP8",
        label: [ideograph.up, "8"],
        win: [`VK_UP`, "26", `VK_NU${abbreviation}MPAD8`, "68"],
        jskey: [`Arr${abbreviation}owUp`, "8"],
        jscode: `Nu${abbreviation}mpad8`,
    });
    keys.set("49", {
        linux: "KP9",
        label: ["PgUp", "9"],
        win: [`VK_PR${abbreviation}IOR`, "21", `VK_NU${abbreviation}MPAD9`, "69"],
        jskey: [`Pag${abbreviation}eUp`, "9"],
        jscode: `Nu${abbreviation}mpad9`,
    });
    keys.set("4B", {
        linux: "KP4",
        label: [ideograph.left, "4"],
        win: [`VK_LE${abbreviation}FT`, "25", `VK_NU${abbreviation}MPAD4`, "64"],
        jskey: [`Arr${abbreviation}owLeft`, "4"],
        jscode: `Nu${abbreviation}mpad4`,
    });
    keys.set("4C", {
        linux: "KP5",
        label: "5",
        win: [`VК_CL${abbreviation}EAR`, "0C", `VK_NU${abbreviation}MPAD5`, "65"],
        jskey: [`Uni${abbreviation}dentified`, "5"],
        jscode: `Nu${abbreviation}mpad5`,
    });
    keys.set("4D", {
        linux: "KP6",
        label: [ideograph.right, "6"],
        win: [`VK_RI${abbreviation}GHT`, "27", `VK_NU${abbreviation}MPAD6`, "66"],
        jskey: [`Arr${abbreviation}owRight`, "6"],
        jscode: `Nu${abbreviation}mpad6`,
    });
    keys.set("4F", {
        linux: "KP1",
        label: ["End", "1"],
        win: [`VK_END`, "23", `VK_NU${abbreviation}MPAD1`, "61"],
        jskey: [`End`, "1"],
        jscode: `Nu${abbreviation}mpad1`,
    });
    keys.set("50", {
        linux: "KP2",
        label: [ideograph.down, "2"],
        win: [`VK_DO${abbreviation}WN`, "28", `VK_NU${abbreviation}MPAD2`, "62"],
        jskey: [`Arr${abbreviation}owDown`, "2"],
        jscode: `Nu${abbreviation}mpad2`,
    });
    keys.set("51", {
        linux: "KP3",
        label: ["PgDn", "3"],
        win: [`VK_NE${abbreviation}XT`, "22", `VK_NU${abbreviation}MPAD3`, "63"],
        jskey: [`Pag${abbreviation}eDown`, "3"],
        jscode: `Nu${abbreviation}mpad3`,
    });
    keys.set("52", {
        linux: "KP0",
        label: ["Insert", "0"],
        win: [`VK_INSERT`, "2D", `VK_NUMPAD0`, "60"],
        jskey: [`Insert`, "0"],
        jscode: `Numpad0`,
    });
    keys.set("53", {
        linux: "KPDL",
        label: ["Delete", "."],
        win: [`VK_DE${abbreviation}LETE`, "2E", `VK_DE${abbreviation}CIMAL`, "6E"],
        jskey: [`Del${abbreviation}ete`, "."],
        jscode: `Nu${abbreviation}mpadDecimal`,
    });
    keys.set("4E", {
        linux: "KPAD",
        label: "+",
        win: [`VK_AD${abbreviation}D`, "6B"],
        jskey: "+",
        jscode: `Nu${abbreviation}mpadAdd`,
    });
    keys.set("E0 1C", {
        linux: "KPEN",
        label: "Enter",
        win: [`VK_RE${abbreviation}TURN`, "0D"],
        jskey: "Enter",
        jscode: `Nu${abbreviation}mpadEnter`,
    });
    // remaining left:
    keys.set("0F", {
        linux: "TAB",
        label: "Tab",
        win: ["VK_TAB", "09"],
        jskey: "Tab",
        jscode: "Tab",        
    });
    keys.set("3A", {
        linux: "CAPS",
        label: "Caps Lock",
        win: ["VK_CAPITAL", "14"],
        jskey: "CapsLock",
        jscode: "CapsLock",
    });
    keys.set("2A", {
        linux: "LFSH",
        label: "Shift",
        win: ["VK_LSHIFT", "A0"],
        jskey: "Shift",
        jscode: "ShiftLeft",
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
            show: 0,
            note: "nav p",
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
            if (data.includes(abbreviation))
                data = data.replace(abbreviation, "");
            let bra = "", ket = "";
            if (style == names.classes.linux) {
                bra = "<"; ket = ">";
            } //if
            return `${bra}${data}${ket} `;
        }, //output
        defaultShift: `${defaultShift}em`,
        formatYShift: value => `${value + defaultShift}em`,
    }; //formats

    return { keys, names, formats, trimAppreviation };

}); //createDefinitionSet
