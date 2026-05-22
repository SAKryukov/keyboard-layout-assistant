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

    const setFallback = () => {}; //String.fromCodePoint(0x2705);
    
    const keys = new Map();
        keys.set("01", {
        linux: "ESC",
        label: "Esc",
        win: [`VK_ES${abbreviation}CAPE`, "1B"],
        dotnetforms: `Esc${abbreviation}ape`,
    });
    // F row
    keys.set("3B", { dotnetforms: setFallback(),
        linux: "FK01",
        label: "F1",
        win: ["VK_F1", "70"],
    });
    keys.set("3C", { dotnetforms: setFallback(),
        linux: "FK02",
        label: "F2",
        win: ["VK_F2", "71"],
    });
    keys.set("3D", { dotnetforms: setFallback(),
        linux: "FK03",
        label: "F3",
        win: ["VK_F3", "72"],
    });
    keys.set("3E", { dotnetforms: setFallback(),
        linux: "FK04",
        label: "F4",
        win: ["VK_F4", "73"],
    });
    keys.set("3F", { dotnetforms: setFallback(),
        linux: "FK05",
        label: "F5",
        win: ["VK_F5", "74"],
    });
    keys.set("40", { dotnetforms: setFallback(),
        linux: "FK06",
        label: "F6",
        win: ["VK_F6", "75"],
    });
    keys.set("41", { dotnetforms: setFallback(),
        linux: "FK07",
        label: "F7",
        win: ["VK_F7", "76"],
    });
    keys.set("42", { dotnetforms: setFallback(),
        linux: "FK08",
        label: "F8",
        win: ["VK_F8", "77"],
    });
    keys.set("43", { dotnetforms: setFallback(),
        linux: "FK09",
        label: "F9",
        win: ["VK_F9", "78"],
    });
    keys.set("44", { dotnetforms: setFallback(),
        linux: "FK10",
        label: "F10",
        win: ["VK_F10", "79"],
    });
    keys.set("57", { dotnetforms: setFallback(),
        linux: "FK11",
        label: "F11",
        win: ["VK_F11", "7A"],
    });
    keys.set("58", { dotnetforms: setFallback(),
        linux: "FK12",
        label: "F12",
        win: ["VK_F12", "7B"],
    });
    //
    keys.set("29", {
        linux: "TLDE",
        label: ["`", "~"],
        win: [`VK_O${abbreviation}EM_3`, "C0"],
        dotnetforms: `Oem${abbreviation}tilde`,
        dotnetwpf: `Oem${abbreviation}Tilde`, // sic! names for System.Windows.Forms and wpf are different!
        jskey: "`",
        jscode: `Bac${abbreviation}kquote`,
    });
    // row 1
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
        win: [`VK_OE${abbreviation}M_MINUS`, "BD"],
        dotnetforms: `Oem${abbreviation}Minus`,
        jskey: ["-", "_"],
        jscode: "Minus",
    });
    keys.set("0D", {
        linux: "AE12",
        label: ["=", "+"],
        win: [`VK_OE${abbreviation}M_PLUS`, "BB"],
        dotnetforms: `Oem${abbreviation}plus`,
        dotnetwpf: `Oem${abbreviation}Plus`, // sic! names for System.Windows.Forms and wpf are different!
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
        win: [`VK_OE${abbreviation}M_4`, "DB"],
        dotnetforms: `Oem4`,
        dotnetwpf: `Oem${abbreviation}OpenBrackets`,
        jskey: ["[", "{"],
        jscode: `Bra${abbreviation}cketLeft`,
    });
    keys.set("1B", {
        linux: "AD12",
        label: ["]", "}"],
        win: [`VK_OE${abbreviation}M_6`, "DD"],
        dotnetforms: `Oem6`,
        dotnetwpf: `Oem6`,
        jskey: ["]", "}"],
        jscode: `Bra${abbreviation}cketRight`,
    });
    keys.set("2B", {
        linux: "BKSL",
        label: ["\\", "|"],
        win: ["VK_OEM_5", "0xDC"],
        dotnetforms: `OemPipe`,
        dotnetwpf: `Oem5`,
        jskey: ["\\", "|"],
        jscode: `Backsl${abbreviation}ash`,
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
        win: [`VK_OE${abbreviation}M_1`, "BA"],
        dotnetforms: `Oem${abbreviation}Semicolon`,
        dotnetwpf: `Oem1`,
        jskey: [";", ":"],
        jscode: `Sem${abbreviation}icolon`,
    });
    keys.set("28", {
        linux: "AC11",
        label: ["'", "\""],
        win: [`VK_OE${abbreviation}M_7`, "DE"],
        dotnetforms: `Oem${abbreviation}Quotes`,
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
        win: [`VK_OE${abbreviation}M_COMMA`, "BC"],
        dotnetforms: `Oem${abbreviation}comma`,
        jskey: [",", "<"],
        jscode: `Com${abbreviation}ma`,
    });
    keys.set("34", {
        linux: "AB09",
        label: [".", ">"],
        win: [`VK_OE${abbreviation}M_PERIOD`, "BE"],
        dotnetforms: `Oem${abbreviation}Period`,
        jskey: [".", ">"],
        jscode: `Per${abbreviation}iod`,
    });
    keys.set("35", {
        linux: "AB10",
        label: ["/", "?"],
        win: [`VK_OE${abbreviation}M_2`, "BF"],
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
        win: [`VK_LCO${abbreviation}NTROL`, "A2"],
        dotnetforms: `Contro${abbreviation}lKey`, 
        dotnetwpf: `LeftCtrl`,
        jskey: "Control",
        jscode: `Contr${abbreviation}olLeft`,
    });
    keys.set("E0 5B", {
        linux: "LWIN",
        label: ideograph.super, //"Win",
        win: [`VK_LWIN`, "5B"],
        dotnetforms: `LWin`, 
        dotnetwpf: `LWin`,
        jskey: "Meta",
        jscode: `MetaL${abbreviation}eft`,
    });
    keys.set("38", {
        linux: "LALT",
        label: "Alt",
        win: [`VK_LME${abbreviation}NU`, "A4"],
        dotnetforms: `Menu`, 
        dotnetwpf: `LeftAlt`,
        jskey: "Alt",
        jscode: `AltLeft`,
    });
    keys.set("39", {
        linux: "39",
        label: "",
        win: ["VK_SPACE", "20"],
        dotnetforms: "Space",
        jskey: "",
        jscode: "Space",
    });
    keys.set("E0 38", {
        linux: "RALT",
        label: "Alt",
        win: [`VK_RME${abbreviation}NU`, "A5"],
        dotnetforms: `Menu`,
        dotnetwpf: `RightAlt`,
        jskey: "Alt",
        jscode: `AltRight`,
    });
    keys.set("E0 5C", {
        linux: "RWIN",
        label: ideograph.super, //"Win",
        win: ["VK_RWIN", "5C"], 
        dotnetforms: `RWin`,
        jskey: "Meta",
        jscode: `MetaR${abbreviation}ight`,
    });
    keys.set("E0 5D", {
        linux: "MENU",
        label: ideograph.menu, //"Menu"
        win: ["VK_APPS", "5D"],
        dotnetforms: `Apps`,
        jskey: `Conte${abbreviation}xtMenu`,
        jscode: `Conte${abbreviation}xtMenu`,
    });
    keys.set("E0 1D", {
        linux: "RCTL",
        label: "Ctrl",
        win: [`VK_RCO${abbreviation}NTROL`, "A3"],
        dotnetforms: `Contro${abbreviation}lKey`,
        dotnetwpf: `RightCtrl`,
        jscode: `Contr${abbreviation}olRight`,
    });
    //--------------
    keys.set("54", {
        linux: "PRSC",
        label: "PtSc",
        win: [`VK_SN${abbreviation}APSHOT`, "2C"],
        dotnetforms: `Prin${abbreviation}tScreen`,
        jskey: `Pri${abbreviation}ntScreen`,
        jscode: `Pri${abbreviation}ntScreen`,
    });
    keys.set("46", {
        linux: "SCLK",
        label: ["Lock", "Scroll"],
        win: [`VK_SC${abbreviation}CROLL`, 	"91"],
        dotnetforms: `Scroll`,
        jskey: `Scr${abbreviation}ollLock`,
        jscode: `Scr${abbreviation}ollLock`,
    });
    keys.set("E1 1D", {
        linux: "PAUS",
        label: "Pause",
        win: [`VK_PA${abbreviation}USE`, "13"],
        dotnetforms: `Pause`,
        jskey: `Pause`,
        jscode: `Pause`,
    });
    //insert, pg up/down, arrows:
    keys.set("E0 52", { dotnetforms: setFallback(),
        linux: "INS",
        label: "Insert",
        win: [`VK_IN${abbreviation}SERT`, "2D"],
    });
    keys.set("E0 47", { dotnetforms: setFallback(),
        linux: "HOME",
        label: "Home",
        win: [`VK_HO${abbreviation}ME`, "24"],
    });
    keys.set("E0 49", {
        linux: "PGUP",
        label: "PgUp",
        win: [`VK_P${abbreviation}RIOR`, "21"],
        dotnetforms: `Pag${abbreviation}eUp`,
        jskey: `Pag${abbreviation}eUp`,
    });
    keys.set("E0 53", { dotnetforms: setFallback(),
        linux: "DELE",
        label: "Delete",
        win: [`VK_DE${abbreviation}LETE`, "2E"],
    });
    keys.set("E0 4F", { dotnetforms: setFallback(),
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
        dotnetforms: `Next`,
        jskey: `Pag${abbreviation}eDown`,
        jscode: `Pag${abbreviation}eDown`,
    });
    keys.set("E0 48", {
        linux: "UP",
        label: ideograph.up,
        win: ["VK_UP", "26"],
        dotnetforms: `Up`,
        jskey: `Arr${abbreviation}owUp`,
        jscode: `Arr${abbreviation}owUp`,
    });
    keys.set("E0 4B", {
        linux: "LEFT",
        label: ideograph.left,
        win: [`VK_L${abbreviation}EFT`, "25"],
        dotnetforms: `Left`,
        jskey: `Arr${abbreviation}owLeft`,
        jscode: `Arr${abbreviation}owLeft`,
    });
    keys.set("E0 50", {
        linux: "DOWN",
        label: ideograph.down,
        win: [`VK_D${abbreviation}OWN`, "28"],
        dotnetforms: `Down`,
        jskey: `Arr${abbreviation}owDown`,
        jscode: `Arr${abbreviation}owDown`,
    });
    keys.set("E0 4D", {
        linux: "RIGHT",
        label: ideograph.right,
        win: [`VK_RI${abbreviation}GHT`, "27"],
        dotnetforms: `Right`,
        jskey: `Arr${abbreviation}owRight`,
        jscode: `Arr${abbreviation}owRight`,
    });
    // keypad
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
    // keypad: may depend on numlock:
    keys.set("47", {
        linux: "KP7",
        label: ["Home", "7"],
        win: [`VK_HO${abbreviation}ME`, "24", `VK_NU${abbreviation}MPAD7`, "67"],
        dotnetforms: "NumPad7",
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
    // end keypad
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
    keys.set("0F", { dotnetforms: setFallback(),
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
    (keys => { // prepopulate fallback
        const values = keys.values();
        for (const value of values) {
            //break;
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
        }, //elements
        classes: { // special cases, should match two <select> <option> values:
            scancode: 0, // <g> id's are scancodes
            linux: 0, // to support <>, see formats output: (data, style)
            show: 0,
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
        getTextClass: function(className) { return `${this.elements.text}.${className}`; },
    }; //names
    initializeNames([
        names,
        names.elements,
        names.classes,
        names.attributes,
        names.buttonId,
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

    const help = () => {
        window.open("../docs/help.html", '_blank').focus();
    } //help

    return { keys, names, formats, help, trimAppreviation };

}); //createDefinitionSet
