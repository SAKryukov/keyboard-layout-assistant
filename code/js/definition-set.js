"use strict";

const createDefinitionSet = (() => {

    const twoCaseArray = lower => [lower, lower.toUpperCase()];
    const abbreviation = String.fromCodePoint(0x22EE); // vertical ellipsis
    const abbreviationSeparator = "--";
    const empty = String();

    const tableDescriptors = {
        numLockKeysAndValues: "numlock-key-value-1",
        numLockKeys: "numlock-key-2",
        keyValue: "key-value-3",
        LowerUpper: "lower-upper-4",
        simple: "simple-5",
        scanCode: "scan-code-6",
    }; //tableDescriptors

    const ideograph = {
        up: String.fromCodePoint(0x2191),
        left: String.fromCodePoint(0x2190),
        down: String.fromCodePoint(0x2193),
        right: String.fromCodePoint(0x2192),
        super: [String.fromCodePoint(0x229E), "Super"],
        superLegend: `${String.fromCodePoint(0x229E)} Super, Meta, Windows Logo`,
        menu: [String.fromCodePoint(0x1f5b9), "Menu"],
        menuLegend: `${String.fromCodePoint(0x1f5b9)} Context Menu`,
    }; //ideograph

    const keys = new Map();
        keys.set("01", {
        linux: "ESC",
        label: "Esc",
        win: [`VK_ESCAPE--VK_ES${abbreviation}`, "1B"],
        dotnetforms: `Escape--Esc${abbreviation}`,
    });
    // F row
    keys.set("3B", {
        linux: "FK01",
        label: "F1",
        win: ["VK_F1", "70"],
    });
    keys.set("3C", {
        linux: "FK02",
        label: "F2",
        win: ["VK_F2", "71"],
    });
    keys.set("3D", {
        linux: "FK03",
        label: "F3",
        win: ["VK_F3", "72"],
    });
    keys.set("3E", {
        linux: "FK04",
        label: "F4",
        win: ["VK_F4", "73"],
    });
    keys.set("3F", {
        linux: "FK05",
        label: "F5",
        win: ["VK_F5", "74"],
    });
    keys.set("40", {
        linux: "FK06",
        label: "F6",
        win: ["VK_F6", "75"],
    });
    keys.set("41", {
        linux: "FK07",
        label: "F7",
        win: ["VK_F7", "76"],
    });
    keys.set("42", {
        linux: "FK08",
        label: "F8",
        win: ["VK_F8", "77"],
    });
    keys.set("43", {
        linux: "FK09",
        label: "F9",
        win: ["VK_F9", "78"],
    });
    keys.set("44", {
        linux: "FK10",
        label: "F10",
        win: ["VK_F10", "79"],
    });
    keys.set("57", {
        linux: "FK11",
        label: "F11",
        win: ["VK_F11", "7A"],
    });
    keys.set("58", {
        linux: "FK12",
        label: "F12",
        win: ["VK_F12", "7B"],
    });
    //
    keys.set("29", {
        linux: "TLDE",
        label: ["`", "~"],
        win: [`VK_OEM_3--VK_O${abbreviation}`, "C0"],
        dotnetforms: `Oemtilde--Oem${abbreviation}`,
        dotnetwpf: `OemTilde--Oem${abbreviation}`, // sic! names for System.Windows.Forms and wpf are different!
        jskey: "`",
        jscode: `Backquote--Bac${abbreviation}`,
    });    // row 1
    keys.set("02", {
        linux: "AE01",
        label: ["1", "!"],
        win: ["1", "31"],
        dotnetforms: "D1",
        jskey: ["1", "!"],
        jscode: "Digit1",
    });
    keys.set("03", {
        linux: "AE02",
        label: ["2", "@"],
        win: ["2", "32"],
        dotnetforms: "D2",
        jskey: ["2", "@"],
        jscode: "Digit2",
    });
    keys.set("04", {
        linux: `AE03`,
        label: ["3", "#"],
        win: ["3", "33"],
        dotnetforms: "D3",
        jskey: ["3", "#"],
        jscode: "Digit3",
    });
    keys.set("05", {
        linux: "AE04",
        label: ["4", "$"],
        win: ["4", "34"],
        dotnetforms: "D4",
        jskey: ["4", "$"],
        jscode: "Digit4",
    });
    keys.set("06", {
        linux: "AE05",
        label: ["5", "%"],
        win: ["5", "35"],
        dotnetforms: "D5",
        jskey: ["5", "%"],
        jscode: "Digit5",
    });
    keys.set("07", {
        linux: "AE06",
        label: ["6", "^"],
        win: ["6", "36"],
        dotnetforms: "D6",
        jskey: ["6", "^"],
        jscode: "Digit6",
    });
    keys.set("08", {
        linux: "AE07",
        label: ["7", "&"],
        win: ["7", "37"],
        dotnetforms: "D7",
        jskey: ["7", "&"],
        jscode: "Digit7",
    });
    keys.set("09", {
        linux: "AE08",
        label: ["8", "*"],
        win: ["8", "38"],
        dotnetforms: "D8",
        jskey: ["8", "*"],
        jscode: "Digit8",
    });
    keys.set("0A", {
        linux: "AE09",
        label: ["9", "("],
        win: ["9", "39"],
        dotnetforms: "D9",
        jskey: ["9", "("],
        jscode: "Digit9",
    });
    keys.set("0B", {
        linux: "AE10",
        label: ["0", ")"],
        win: ["0", "30"],
        dotnetforms: "D0",
        jskey: ["0", ")"],
        jscode: "Digit0",
    });
    keys.set("0C", {
        linux: "AE11",
        label: ["-", "_"],
        win: [`VK_OEM_MINUS--VK_OE${abbreviation}`, "BD"],
        dotnetforms: `OemMinus--Oem${abbreviation}`,
        jskey: ["-", "_"],
        jscode: "Minus",
    });
    keys.set("0D", {
        linux: "AE12",
        label: ["=", "+"],
        win: [`VK_OEM_PLUS--VK_OE${abbreviation}`, "BB"],
        dotnetforms: `Oemplus--Oem${abbreviation}`,
        dotnetwpf: `OemPlus--Oem${abbreviation}`, // sic! names for System.Windows.Forms and wpf are different!
        jskey: ["=", "+"],
        jscode: "Equal",
    });
    keys.set("0E", {
        linux: "BKSP",
        label: "Backspace",
        win: ["VK_BACK", "08"],
        dotnetforms: `Back`,
        jskey: "Backspace",
        jscode: "Backspace",
    });
    // row 2:
    keys.set("10", {
        linux: "AD01",
        label: twoCaseArray("q"),
        win: ["Q", "51"],
        dotnetforms: "Q",
        jskey: twoCaseArray("q"),
        jscode: "KeyQ",
    });
    keys.set("11", {
        linux: "AD02",
        label: twoCaseArray("w"),
        win: ["W", "57"],
        dotnetforms: "W",
        jskey: twoCaseArray("w"),
        jscode: "KeyW",
    });
    keys.set("12", {
        linux: "AD03",
        label: twoCaseArray("e"),
        win: ["E", "45"],
        dotnetforms: "E",
        jskey: twoCaseArray("e"),
        jscode: "KeyE",
    });
    keys.set("13", {
        linux: "AD04",
        label: twoCaseArray("r"),
        win: ["R", "52"],
        dotnetforms: "R",
        jskey: twoCaseArray("r"),
        jscode: "KeyR",
    });
    keys.set("14", {
        linux: "AD05",
        label: twoCaseArray("t"),
        win: ["T", "54"],
        dotnetforms: "T",
        jskey: twoCaseArray("t"),
        jscode: "KeyT",
    });
    keys.set("15", {
        linux: "AD06",
        label: twoCaseArray("y"),
        win: ["Y", "59"],
        dotnetforms: "Y",
        jskey: twoCaseArray("y"),
        jscode: "KeyY",
    });
    keys.set("16", {
        linux: "AD07",
        label: twoCaseArray("u"),
        win: ["U", "55"],
        dotnetforms: "U",
        jskey: twoCaseArray("u"),
        jscode: "KeyU",
    });
    keys.set("17", {
        linux: "AD08",
        label: twoCaseArray("i"),
        win: ["I", "49"],
        dotnetforms: "I",
        jskey: twoCaseArray("i"),
        jscode: "KeyI",
    });
    keys.set("18", {
        linux: "AD09",
        label: twoCaseArray("o"),
        win: ["O", "4F"],
        dotnetforms: "O",
        jskey: twoCaseArray("o"),
        jscode: "KeyO",
    });
    keys.set("19", {
        linux: "AD10",
        label: twoCaseArray("p"),
        win: ["P", "50"],
        dotnetforms: "P",
        jskey: twoCaseArray("p"),
        jscode: "KeyP",
    });
    //row 2, extra:
    keys.set("1A", {
        linux: "AD11",
        label: ["[", "{"],
        win: [`VK_OEM_4--VK_OE${abbreviation}`, "DB"],
        dotnetforms: `Oem4`,
        dotnetwpf: `OemOpenBrackets--Oem${abbreviation}`,
        jskey: ["[", "{"],
        jscode: `BracketLeft--Bra${abbreviation}`,
    });
    keys.set("1B", {
        linux: "AD12",
        label: ["]", "}"],
        win: [`VK_OEM_6--VK_OE${abbreviation}`, "DD"],
        dotnetforms: `Oem6`,
        dotnetwpf: `Oem6`,
        jskey: ["]", "}"],
        jscode: `BracketRight--Bra${abbreviation}`,
    });
    keys.set("2B", {
        linux: "BKSL",
        label: ["\\", "|"],
        win: ["VK_OEM_5", "0xDC"],
        dotnetforms: `OemPipe--Oe${abbreviation}`,
        dotnetwpf: `Oem5`,
        jskey: ["\\", "|"],
        jscode: `Backslash--Backsl${abbreviation}`,
    });
    //row 3:
    keys.set("1E", {
        linux: "AC01",
        label: twoCaseArray("a"),
        win: ["A", "41"],
        dotnetforms: "A",
        jskey: twoCaseArray("a"),
        jscode: "KeyA",
    });
    keys.set("1F", {
        linux: "AC02",
        label: twoCaseArray("s"),
        win: ["S", "53"],
        dotnetforms: "S",
        jskey: twoCaseArray("s"),
        jscode: "KeyS",
    });
    keys.set("20", {
        linux: "AC03",
        label: twoCaseArray("d"),
        win: ["D", "44"],
        dotnetforms: "D",
        jskey: twoCaseArray("d"),
        jscode: "KeyD",
    });
    keys.set("21", {
        linux: "AC04",
        label: twoCaseArray("f"),
        win: ["F", "46"],
        dotnetforms: "F",
        jskey: twoCaseArray("f"),
        jscode: "KeyF",
    });
    keys.set("22", {
        linux: "AC05",
        label: twoCaseArray("g"),
        win: ["G", "47"],
        dotnetforms: "G",
        jskey: twoCaseArray("g"),
        jscode: "KeyG",
    });
    keys.set("23", {
        linux: "AC06",
        label: twoCaseArray("h"),
        win: ["H", "48"],
        dotnetforms: "H",
        jskey: twoCaseArray("h"),
        jscode: "KeyH",
    });
    keys.set("24", {
        linux: "AC07",
        label: twoCaseArray("j"),
        win: ["J", "4A"],
        dotnetforms: "J",
        jskey: twoCaseArray("j"),
        jscode: "KeyJ",
    });
    keys.set("25", {
        linux: "AC08",
        label: twoCaseArray("k"),
        win: ["K", "4B"],
        dotnetforms: "K",
        jskey: twoCaseArray("k"),
        jscode: "KeyK",
    });
    keys.set("26", {
        linux: "AC09",
        label: twoCaseArray("l"),
        win: ["L", "4C"],
        dotnetforms: "L",
        jskey: twoCaseArray("l"),
        jscode: "KeyL",
    });
    //row3, extra:
    keys.set("27", {
        linux: "AC10",
        label: [";", ":"],
        win: [`VK_OEM_1--VK_OE${abbreviation}`, "BA"],
        dotnetforms: `OemSemicolon--Oem${abbreviation}`,
        dotnetwpf: `Oem1`,
        jskey: [";", ":"],
        jscode: `Semicolon--Sem${abbreviation}`,
    });
    keys.set("28", {
        linux: "AC11",
        label: ["'", "\""],
        win: [`VK_OEM_7--VK_OE${abbreviation}`, "DE"],
        dotnetforms: `OemQuotes--Oem${abbreviation}`,
        jskey: ["'", "\""],
        jscode: "Quote",
    });
    keys.set("1C", {
        linux: "RTRN",
        label: "Enter",
        win: ["VK_RETURN", "0D"],
        dotnetforms: "Enter",
        dotnetwpf: "Return", // sic! names for System.Windows.Forms and wpf are different!
    });
    //row 4:
    keys.set("2C", {
        linux: "AB01",
        label: twoCaseArray("z"),
        win: ["Z", "5A"],
        dotnetforms: "Z",
        jskey: twoCaseArray("z"),
        jscode: "KeyZ",
    });
    keys.set("2D", {
        linux: "AB02",
        label: twoCaseArray("x"),
        win: ["X", "58"],
        dotnetforms: "X",
        jskey: twoCaseArray("x"),
        jscode: "KeyX",
    });
    keys.set("2E", {
        linux: "AB03",
        label: twoCaseArray("c"),
        win: ["C", "43"],        
        dotnetforms: "C",
        jskey: twoCaseArray("c"),
        jscode: "KeyC",
    });
    keys.set("2F", {
        linux: "AB04",
        label: twoCaseArray("v"),
        win: ["V", "56"],
        dotnetforms: "V",
        jskey: twoCaseArray("v"),
        jscode: "KeyV",
    });
    keys.set("30", {
        linux: "AB05",
        label: twoCaseArray("b"),
        win: ["B", "42"],        
        dotnetforms: "B",
        jskey: twoCaseArray("b"),
        jscode: "KeyB",
    });
    keys.set("31", {
        linux: "AB06",
        label: twoCaseArray("n"),
        win: ["N", "4E"],
        dotnetforms: "N",
        jskey: twoCaseArray("n"),
        jscode: "KeyN",
    });
    keys.set("32", {
        linux: "AB07",
        label: twoCaseArray("m"),
        win: ["M", "4D"],
        dotnetforms: "M",
        jskey: twoCaseArray("m"),
        jscode: "KeyM",
    });
    keys.set("33", {
        linux: "AB08",
        label: [",", "<"],
        win: [`VK_OEM_COMMA--VK_OE${abbreviation}`, "BC"],
        dotnetforms: `Oemcomma--Oem${abbreviation}`,
        dotnetwpf: `OemComma--Oem${abbreviation}`, // sic! names for System.Windows.Forms and wpf are different!
        jskey: [",", "<"],
        jscode: `Comma--Com${abbreviation}`,
    });
    keys.set("34", {
        linux: "AB09",
        label: [".", ">"],
        win: [`VK_OEM_PERIOD--VK_OE${abbreviation}`, "BE"],
        dotnetforms: `OemPeriod--Oem${abbreviation}`,
        jskey: [".", ">"],
        jscode: `Period--Per${abbreviation}`,
    });
    keys.set("35", {
        linux: "AB10",
        label: ["/", "?"],
        win: [`VK_OEM_2--VK_OE${abbreviation}`, "BF"],
        dotnetforms: `Oem2`,
        jskey: ["/", "?"],
        jscode: `Slash`,
    });
    keys.set("36", {
        linux: "RTSH",
        label: "Shift",
        win: ["VK_RSHIFT", "10"],
        dotnetforms: "ShiftKey",
        dotnetwpf: "RightShift",
        jskey: "Shift",
        jscode: "ShiftRight",
    });
    //row 5:
    keys.set("1D", {
        linux: "LCTL",
        label: "Ctrl",
        win: [`VK_LCONTROL--VK_LCO${abbreviation}`, "A2"],
        dotnetforms: `ControlKey--Contro${abbreviation}`, 
        dotnetwpf: `LeftCtrl`,
        jskey: "Control",
        jscode: `ControlLeft--Contr${abbreviation}`,
    });
    keys.set("E0 5B", {
        legend: ideograph.superLegend,
        linux: "LWIN",
        label: ideograph.super, //"Win",
        win: [`VK_LWIN`, "5B"],
        dotnetforms: `LWin`, 
        dotnetwpf: `LWin`,
        jskey: "Meta",
        jscode: `MetaLeft--MetaL${abbreviation}`,
    });
    keys.set("38", {
        linux: "LALT",
        label: "Alt",
        win: [`VK_LMENU--VK_LME${abbreviation}`, "A4"],
        dotnetforms: `Menu`, 
        dotnetwpf: `LeftAlt`,
        jskey: "Alt",
        jscode: `AltLeft`,
    });
    keys.set("39", {
        linux: "SPCE",
        label: " ",
        win: ["VK_SPACE", "20"],
        dotnetforms: "Space",
        jskey: " ",
        jscode: "Space",
    });
    keys.set("E0 38", {
        linux: "RALT",
        label: "Alt",
        win: [`VK_RMENU--VK_RME${abbreviation}`, "A5"],
        dotnetforms: `Menu`,
        dotnetwpf: `RightAlt`,
        jskey: "Alt",
        jscode: `AltRight`,
    });
    keys.set("E0 5C", {
        legend: ideograph.superLegend,
        linux: "RWIN",
        label: ideograph.super, //"Win",
        win: ["VK_RWIN", "5C"], 
        dotnetforms: `RWin`,
        jskey: "Meta",
        jscode: `MetaRight--MetaR${abbreviation}`,
    });
    keys.set("E0 5D", {
        legend: ideograph.menuLegend,
        linux: "MENU",
        label: ideograph.menu, //"Menu"
        win: ["VK_APPS", "5D"],
        dotnetforms: `Apps`,
        jskey: `ContextMenu--Conte${abbreviation}`,
        jscode: `ContextMenu--Conte${abbreviation}`,
    });
    keys.set("E0 1D", {
        linux: "RCTL",
        label: "Ctrl",
        win: [`VK_RCONTROL--VK_RCO${abbreviation}`, "A3"],
        dotnetforms: `ControlKey--Contro${abbreviation}`,
        dotnetwpf: `RightCtrl--RightC${abbreviation}`,
        jskey: `Control`,
        jscode: `ControlRight--Contr${abbreviation}`,
    });
    //--------------
    keys.set("54", {
        linux: "PRSC",
        label: "PtSc",
        win: [`VK_SNAPSHOT--VK_SN${abbreviation}`, "2C"],
        dotnetforms: `PrintScreen--Prin${abbreviation}`,
        jskey: `PrintScreen--Pri${abbreviation}`,
        jscode: `PrintScreen--Pri${abbreviation}`,
    });
    keys.set("46", {
        legend: "Scroll Lock",
        linux: "SCLK",
        label: ["Lock", "Scroll"],
        win: [`VK_SCROLL--VK_SC${abbreviation}`, "91"],
        dotnetforms: `Scroll`,
        jskey: `ScrollLock--Scr${abbreviation}`,
        jscode: `ScrollLock--Scr${abbreviation}`,
    });
    keys.set("E1 1D", {
        linux: "PAUS",
        label: "Pause",
        win: [`VK_PAUSE--VK_PA${abbreviation}`, "13"],
        dotnetforms: `Pause`,
        jskey: `Pause`,
        jscode: `Pause`,
    });
    //insert, pg up/down, arrows:
    keys.set("E0 52", {
        linux: "INS",
        label: "Insert",
        win: [`VK_INSERT--VK_IN${abbreviation}`, "2D"],
    });
    keys.set("E0 47", {
        linux: "HOME",
        label: "Home",
        win: [`VK_HOME--VK_HO${abbreviation}`, "24"],
    });
    keys.set("E0 49", {
        linux: "PGUP",
        label: "PgUp",
        win: [`VK_PRIOR--VK_P${abbreviation}`, "21"],
        dotnetforms: `PageUp--Pag${abbreviation}`,
        jskey: `PageUp--Pag${abbreviation}`,
    });
    keys.set("E0 53", {
        linux: "DELE",
        label: "Delete",
        win: [`VK_DELETE--VK_DE${abbreviation}`, "2E"],
    });
    keys.set("E0 4F", {
        linux: "END",
        label: "End",
        win: [`VK_END--VK_EN${abbreviation}`, "23"],
        jskey: "End",
    });
    keys.set("E0 51", {
        linux: "PGDN",
        label: "PgDn",
        win: [`VK_NEXT--VK_NE${abbreviation}`, "22"],
        dotnetforms: `Next`,
        jskey: `PageDown--Pag${abbreviation}`,
    });
    keys.set("E0 48", {
        linux: "UP",
        label: ideograph.up,
        win: ["VK_UP", "26"],
        dotnetforms: `Up`,
        jskey: `ArrowUp--Arr${abbreviation}`,
    });
    keys.set("E0 4B", {
        linux: "LEFT",
        label: ideograph.left,
        win: [`VK_LEFT--VK_L${abbreviation}`, "25"],
        dotnetforms: `Left`,
        jskey: `ArrowLeft--Arr${abbreviation}`,
    });
    keys.set("E0 50", {
        linux: "DOWN",
        label: ideograph.down,
        win: [`VK_DOWN--VK_D${abbreviation}`, "28"],
        dotnetforms: `Down`,
        jskey: `ArrowDown--Arr${abbreviation}`,
    });
    keys.set("E0 4D", {
        linux: "RIGHT",
        label: ideograph.right,
        win: [`VK_RIGHT--VK_RI${abbreviation}`, "27"],
        dotnetforms: `Right`,
        jskey: `ArrowRight--Arr${abbreviation}`,
    });
    // keypad
    keys.set("45", {
        legend: "Num Lock",
        linux: "NMLK",
        label: ["Lock", "Num"],
        win: [`VK_NUMLOCK--VK_NU${abbreviation}`, "90"],
        dotnetforms: `NumLock--Nu${abbreviation}L`,
    });
    keys.set("E0 35", {
        linux: "KPDV",
        label: "/",
        win: [`VK_DIVIDE--VK_DI${abbreviation}`, "6F"],
        dotnetforms: `Divide`,
        jskey: "/",
        jscode: `NumpadDivide--Nu${abbreviation}D`,
    });
    keys.set("37", {
        linux: "KPMU",
        label: "*",
        win: [`VK_MULTIPLY--VK_MU${abbreviation}`, "6A"],
        dotnetforms: `Multiply--Mult${abbreviation}`,
        jskey: "*",
        jscode: `NumpadMultiply--Nu${abbreviation}M`,
    });
    keys.set("4A", {
        linux: "KPSU",
        label: "-",
        win: [`VK_SUBTRACT--VK_SU${abbreviation}`, "6D"],
        dotnetforms: `Subtract--Sub${abbreviation}`,
        jskey: "-",
        jscode: `NumpadSubtract--Nu${abbreviation}S`,
    });
    // keypad: may depend on numlock:
    keys.set("47", {
        isKeypad: true,
        linux: "KP7",
        label: ["Home", "7"],
        win: [`VK_HOME--VK_HO${abbreviation}`, "24", `VK_NUMPAD7--VK_NU${abbreviation}`, "67"],
        dotnetforms: [`Home`, `NumPad7--Nu${abbreviation}7`],
        jskey: ["Home", "7"],
        jscode: `Numpad7--Nu${abbreviation}7`,
    });
    keys.set("48", {
        isKeypad: true,
        linux: "KP8",
        label: [ideograph.up, "8"],
        win: [`VK_UP`, "26", `VK_NUMPAD8--VK_NU${abbreviation}`, "68"],
        dotnetforms: [`Up`, `NumPad8--Nu${abbreviation}8`],
        jskey: [`ArrowUp--Arr${abbreviation}`, "8"],
        jscode: `Numpad8--Nu${abbreviation}8`,
    });
    keys.set("49", {
        isKeypad: true,
        linux: "KP9",
        label: ["PgUp", "9"],
        win: [`VK_PRIOR--VK_PR${abbreviation}`, "21", `VK_NUMPAD9--VK_NU${abbreviation}`, "69"],
        dotnetforms: [`PageUp--Pag${abbreviation}`, `NumPad9--Nu${abbreviation}9`],
        jskey: [`PageUp--Pag${abbreviation}`, "9"],
        jscode: `Numpad9--Nu${abbreviation}9`,
    });
    keys.set("4B", {
        isKeypad: true,
        linux: "KP4",
        label: [ideograph.left, "4"],
        win: [`VK_LEFT--VK_LE${abbreviation}`, "25", `VK_NUMPAD4--VK_NU${abbreviation}`, "64"],
        dotnetforms: [`Left`, `NumPad4--Nu${abbreviation}4`],
        jskey: [`ArrowLeft--Arr${abbreviation}`, "4"],
        jscode: `Numpad4--Nu${abbreviation}4`,
    });
    keys.set("4C", {
        isKeypad: true,
        linux: "KP5",
        label: [`Clear`, "5"],
        win: [`VК_CLEAR--VК_CL${abbreviation}`, "0C", `VK_NUMPAD5--VK_NU${abbreviation}`, "65"],
        dotnetforms: [`Clear`, `NumPad5--Nu${abbreviation}5`],
        jskey: [`Clear`, "5"],
        jscode: `Numpad5--Nu${abbreviation}5`,
    });
    keys.set("4D", {
        isKeypad: true,
        linux: "KP6",
        label: [ideograph.right, "6"],
        win: [`VK_RIGHT--VK_RI${abbreviation}`, "27", `VK_NUMPAD6--VK_NU${abbreviation}`, "66"],
        dotnetforms: [`Right`, `NumPad6--Nu${abbreviation}6`],
        jskey: [`ArrowRight--Arr${abbreviation}`, "6"],
        jscode: `Numpad6--Nu${abbreviation}6`,
    });
    keys.set("4F", {
        isKeypad: true,
        linux: "KP1",
        label: ["End", "1"],
        win: [`VK_END`, "23", `VK_NUMPAD1--VK_NU${abbreviation}`, "61"],
        dotnetforms: [`End`, `NumPad1--Nu${abbreviation}1`],
        jskey: [`End`, "1"],
        jscode: `Numpad1--Nu${abbreviation}1`,
    });
    keys.set("50", {
        isKeypad: true,
        linux: "KP2",
        label: [ideograph.down, "2"],
        win: [`VK_DOWN--VK_DO${abbreviation}`, "28", `VK_NUMPAD2--VK_NU${abbreviation}`, "62"],
        dotnetforms: [`Down`, `NumPad2--Nu${abbreviation}2`],
        jskey: [`ArrowDown--Arr${abbreviation}`, "2"],
        jscode: `Numpad2--Nu${abbreviation}2`,
    });
    keys.set("51", {
        isKeypad: true,
        linux: "KP3",
        label: ["PgDn", "3"],
        win: [`VK_NEXT--VK_NE${abbreviation}`, "22", `VK_NUMPAD3--VK_NU${abbreviation}`, "63"],
        dotnetforms: [`Next`, `NumPad3--Nu${abbreviation}3`],
        jskey: [`PageDown--Pag${abbreviation}`, "3"],
        jscode: `Numpad3--Nu${abbreviation}3`,
    });
    keys.set("52", {
        isKeypad: true,
        linux: "KP0",
        label: ["Insert", "0"],
        win: [`VK_INSERT`, "2D", `VK_NUMPAD0`, "60"],
        dotnetforms: [`Insert`, `NumPad0`],
        jskey: [`Insert`, "0"],
        jscode: `Numpad0`,
    });
    keys.set("53", {
        isKeypad: true,
        linux: "KPDL",
        label: ["Delete", "."],
        win: [`VK_DELETE--VK_DE${abbreviation}`, "2E", `VK_DECIMAL--VK_DE${abbreviation}`, "6E"],
        dotnetforms: [`Delete`, `Decimal--Dec${abbreviation}`],
        jskey: [`Delete--Del${abbreviation}`, "."],
        jscode: `NumpadDecimal--Nu${abbreviation}`,
    });
    // end keypad
    keys.set("4E", {
        linux: "KPAD",
        label: "+",
        win: [`VK_ADD--VK_AD${abbreviation}`, "6B"],
        dotnetforms: `Add`,
        jskey: "+",
        jscode: `NumpadAdd--Nu${abbreviation}A`,
    });
    keys.set("E0 1C", {
        linux: "KPEN",
        label: "Enter",
        win: [`VK_RETURN--VK_RE${abbreviation}`, "0D"],
        dotnetforms: `Enter`,
        dotnetwpf: `Return--Ret${abbreviation}`, //sic! names for System.Windows.Forms and wpf are different!
        jskey: "Enter",
        jscode: `NumpadEnter--Nu${abbreviation}E`,
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
        dotnetforms: `Capital`,
        jskey: "CapsLock",
    });
    keys.set("2A", {
        linux: "LFSH",
        label: "Shift",
        win: ["VK_LSHIFT", "A0"],
        dotnetforms: "ShiftKey",
        dotnetwpf: "LeftShift",
        jskey: "Shift",
        jscode: "ShiftLeft",
    });
    // keys
    (keys => { // fallback:
        const values = keys.values();
        for (const value of values) {
            if (value.dotnetforms == undefined)
                value.dotnetforms = value.label;
            if (value.dotnetwpf == undefined)
                value.dotnetwpf = value.dotnetforms;
            if (value.jskey == undefined)
                value.jskey = value.dotnetforms;
            if (value.jscode == undefined)
                value.jscode = value.jskey;
        } //loop
    })(keys);
    
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
            rect: 0,
            aside: 0,
            table: 0,
            span: 0,
        }, //elements
        classes: { // special cases, should match two <select> <option> values:
            scancode: 0, // <g> id's are scancodes
            linux: 0, // to support <>, see formats output: (data, style)
            win: 0, // to support discrimination between 2-field arrays of string
            label: 0, // to support correct output using legend for faked two-level 
            show: 0, // to support legend
            note: "nav p",
        }, //classes
        buttonId: { // should match <button> ids
            copy: 0,
            clear: 0,
            help: 0,
        }, //buttonId
        attributes: {
            x: 0,
            y: 0,
        }, //attributes
        displayStyles: {
            none: 0,
            block: 0,
            table: 0,
            auto: 0,
        }, //displayStyles
        getTextClass: function(className) { return `${this.elements.text}.${className}`; },
    }; //names
    initializeNames([
        names,
        names.elements,
        names.classes,
        names.attributes,
        names.buttonId,
        names.displayStyles,
    ]);

    const defaultShift = 0.25;
    const formats = {
        formatKey: (data, fullName) => {
            const split = data.split(abbreviationSeparator);
            if (split.length > 1) {
                const index = fullName ? 0 : 1;
                return split[index];
            } //if
            return data;
        }, // formatKey
        output: function (data, style) {
            const keyData = this.formatKey(data, true);
            if (style == names.classes.scancode)
                return `${this.scanCode(data)} `;
            let bra = empty, ket = empty;
            if (style == names.classes.linux) {
                bra = "<"; ket = ">";
            } //if
            return `${bra}${keyData}${ket} `;
        }, //output
        outputLegend: value => `${value} `,
        location: value => `${value}px`,
        defaultShift: `${defaultShift}em`,
        formatYShift: value => `${value + defaultShift}em`,
        scanCode: id => {
            const codes = id.split(" ");
            return `0x${codes.join(" 0x")}`;
        },
    }; //formats

    const generateReport = keys => {
        const formatLabel = data => {
            if (data instanceof Array) {
                const clone = structuredClone(data);
                for (const index in data)
                    clone[index] = `"${data[index].replace(abbreviation, empty)}"`;
                return `[${clone.join(", ")}]`;
            } else
                return `"${data.replace(abbreviation, empty)}"`;
        }; //formatLabel
        const layers = {};
        let layerCount = 0;
        for (const [scancode, value] of keys) {
            for (const property in value) {
                if (layers[property] == undefined) {
                    layers[property] = { layer: property, array: [] };
                    layerCount++;
                } //if
                layers[property].array.push(`Scan code: "${scancode}", value: ${formatLabel(value[property])}\n`);
            } //loop in value
        } //loop main
        let result = empty;
        let count = 1;
        for (const layerIndex in layers) {
            const layer = layers[layerIndex];
            result += `\nSending key Map data, ${count++} of ${layerCount}, Layer: ${layer.layer}:\n`;
            for (const element of layer.array) {
                result += `${element}`;
            } //loop array
        } //loop layers
        return result;
    } //generateReport

    
    const help = () => {
        //navigator.clipboard.writeText(generateReport(keys));
        window.open("../docs/help.html", '_blank').focus();
    } //help

    return { tableDescriptors, keys, names, formats, help };

}); //createDefinitionSet
