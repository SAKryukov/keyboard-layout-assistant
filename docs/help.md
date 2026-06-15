Keyboard Layout Assistant{title}

Кeyboard Layout Аssistant is an application used to assist in the creation of keyboard layouts for different systems, remapping keyboard keys, and the development of software applications handling keyboard events.

The application presents a standard US physical keyboard layout. For other layouts, please use
test applications [for Windows](https://github.com/SAKryukov/keyboard-layout-assistant/tree/main/code/test/dotnet) and [browsers](https://github.com/SAKryukov/keyboard-layout-assistant/tree/main/code/test/js).

# Layers

The key data is shown in 9 separate layers representing different platforms.

## Labels

This layer is informal. It roughly corresponds to the labels written on the key of a standard US keyboard, but provides a bit more information.

Point to the key to see the details. Some keys have different names on different keyboard models notably, the Windows Logo key (also known as “Super” or “Meta”) and the Context Menu key.

## Scan Codes, Key Down

Low-level hardware *scan codes* sent by the keyboard to the computer when a user pressed a key. Please see [Scan Codes](#heading-scan-codes) for more information.

## Scan Codes, Key Up

Low-level hardware *scan codes* sent by the keyboard to the computer when a user releases a key. Please see [Scan Codes](#heading-scan-codes) for more information.

## Linux XKB Key Codes

[X Keyboard Extension](https://en.wikipedia.org/wiki/X_keyboard_extension) (XKB) is a part of [X_Window_System](https://en.wikipedia.org/wiki/X_Window_System).

It can be used, in particular, for [the creation of keyboard layouts for Linux](https://medium.com/@damko/a-simple-humble-but-comprehensive-guide-to-xkb-for-linux-6f1ad5e13450).

On the keyboard, the key names are shown without angular brackets. Point to the key to see the details or click it to see how the key names are presented in the files.

## Windows Virtual Keys

[`WM_KEYDOWN`](https://learn.microsoft.com/en-us/windows/win32/inputdev/wm-keydown) [`WM_KEYUP`](https://learn.microsoft.com/en-us/windows/win32/inputdev/wm-keyup)

## .NET System.Windows.Forms

[`System.Windows.Forms.Keys`](https://learn.microsoft.com/en-us/dotnet/api/system.windows.forms.keys)

## .NET WPF

[`System.Windows.Input.Key`](https://learn.microsoft.com/en-us/dotnet/api/system.windows.input.key)

## JavaScript key

[KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)

## JavaScript code

[KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)

# Notes

## Scan Codes

Keyboards create hardware interrupt and send sequences of low-level hardware scan codes, typically 1 or 2 bytes, or more, in some special cases.

On PC, this is IRQ 1, `int 1`, and the data can be read from the port 0x60, and the port 0x64 is used for the status information. The application must send an End-Of-Interrupt (EOI) command to the port 0x20, so the CPU knows it can receive future hardware interrupts.

The scan codes sent when a user presses the key and releases the key are different, so the scan codes are presented in two separate layers.

On Windows, the scan codes can be obtained by handling the message [`WM_INPUT`](https://learn.microsoft.com/en-us/windows/win32/inputdev/wm-input) and using [raw input](https://learn.microsoft.com/en-us/windows/win32/inputdev/raw-input). Please see the [test application based on .NET `System.Windows.Forms`](https://github.com/SAKryukov/keyboard-layout-assistant/tree/main/code/test/dotnet) (application name “KeyboardTest.exe”) for more information.

## Windows Virtual Keys

`VK_*` key names and hexadecimal values.

Windows virtual keys are dispatched to the Windows application handling the event [`WM_KEYDOWN`](https://learn.microsoft.com/en-us/windows/win32/inputdev/wm-keydown) and [`WM_KEYDUP`](https://learn.microsoft.com/en-us/windows/win32/inputdev/wm-keyup) messages. The virtual-key code is passed as the parameter `wParam`.

See also: [Virtual-Key Codes](https://learn.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes).

The virtual key codes do not depend on the culture or keyboard layout. However, the virtual key codes of the [numpad](https://en.wikipedia.org/wiki/Numeric_keypad) depend on the state of the Num Lock key.

The Hardware PortsData Port (0x60): Read the actual byte of data (the scan code) sent by the keyboard when a key is pressed or released.Status/Command Port (0x64): Read the status of the controller or send commands to it.

# Any Questions?

Please ask any questions using the [GitHub Discussions related to this repository](https://github.com/SAKryukov/keyboard-layout-assistant/discussions).
