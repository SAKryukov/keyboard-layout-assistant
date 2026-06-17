Keyboard Layout Assistant{title}

Кeyboard Layout Аssistant is an application used to assist in the creation of keyboard layouts for different systems, remapping keyboard keys, and the development of software applications handling keyboard events.

The application presents a standard US physical keyboard layout. For other layouts, please use
test applications [for Windows](https://github.com/SAKryukov/keyboard-layout-assistant/tree/main/code/test/dotnet) and [Web browsers](https://github.com/SAKryukov/keyboard-layout-assistant/tree/main/code/test/js).

# Layers

The key data is shown in nine separate layers representing different platforms, one layer at a time.

## Labels

This layer is informal. It roughly corresponds to the labels written on the key of a standard US keyboard, but provides a bit more information.

Point to the key to see the details. Some keys have different names for different keyboard models, notably, the Windows Logo key (also known as “Super” or “Meta”) and the Context Menu key.

## Scan Codes, Key Down
    
Low-level hardware *scan codes* are sent by the keyboard to the computer when a user presses a key. Please see [Scan Codes](#heading-scan-codes) for more information.

## Scan Codes, Key Up

Low-level hardware *scan codes* sent by the keyboard to the computer when a user releases a key. Please see [Scan Codes](#heading-scan-codes) for more information.

## Linux XKB Key Codes

[X Keyboard Extension](https://en.wikipedia.org/wiki/X_keyboard_extension) (XKB) is a part of [X_Window_System](https://en.wikipedia.org/wiki/X_Window_System).

It can be used, in particular, for [the creation of keyboard layouts for Linux](https://medium.com/@damko/a-simple-humble-but-comprehensive-guide-to-xkb-for-linux-6f1ad5e13450).

On the keyboard, the key names are shown without angular brackets. Point to the key to see the details, or click it to see how the key names are presented in the files.

## Windows Virtual Keys

Windows virtual keys are dispatched to the Windows application handling the event [`WM_KEYDOWN`](https://learn.microsoft.com/en-us/windows/win32/inputdev/wm-keydown) and [`WM_KEYDUP`](https://learn.microsoft.com/en-us/windows/win32/inputdev/wm-keyup) messages. The virtual-key code is passed as the parameter `wParam`.

See also: [Virtual-Key Codes](https://learn.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes).

The virtual key codes do not depend on the culture or keyboard layout. However, the virtual key codes of the [numpad](https://en.wikipedia.org/wiki/Numeric_keypad) depend on the state of the Num Lock key.

## .NET System.Windows.Forms

The enumeration members of the type [`System.Windows.Forms.Keys`](https://learn.microsoft.com/en-us/dotnet/api/system.windows.forms.keys).

See [.NET Keyboard Events](#heading-.net-keyboard-events).

## .NET WPF

[`System.Windows.Input.Key`](https://learn.microsoft.com/en-us/dotnet/api/system.windows.input.key).

See [.NET Keyboard Events](#heading-.net-keyboard-events).

## JavaScript Key

[KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) property values.

This is the only case when the key data depends on the software keyboard layout. To identify the keys independently from the layout, [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code) can be used.

See also [Web Browser Keyboard Events](#heading-web-browser-keyboard-events).

## JavaScript Code

[KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code) property values.

See also [Web Browser Keyboard Events](#heading-web-browser-keyboard-events).

# Notes

## Scan Codes

Keyboards create a hardware interrupt and send sequences of low-level hardware scan codes, typically 1 or 2 bytes, or more, in some special cases.

On PC, this is IRQ 1, `int 1`, and the data can be read from the port 0x60, and the port 0x64 is used for the status information. The application must send an End-Of-Interrupt (EOI) command to the port 0x20, so the CPU knows it can receive future hardware interrupts.

The scan codes sent when a user presses the key and releases the key are different, so the scan codes are presented in two separate layers.

On Windows, the scan codes can be obtained by handling the message [`WM_INPUT`](https://learn.microsoft.com/en-us/windows/win32/inputdev/wm-input) and using [raw input](https://learn.microsoft.com/en-us/windows/win32/inputdev/raw-input). Please see the [test application based on .NET `System.Windows.Forms`](https://github.com/SAKryukov/keyboard-layout-assistant/tree/main/code/test/dotnet) (application name “KeyboardTest.exe”) for more information.

Scan codes can be used on Windows for *remapping* keyboard keys. The remapping table is stored in the system Registry at the key `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Keyboard Layout` under the name `Scancode Map`. The table is a block of 4-byte sequences of the type `REG_BINARY` representing the pairs of the output and input scan codes. The algorithm for packing and unpacking the mapping is defined in the application [SharpKeys](https://github.com/randyrants/sharpkeys/blob/master/SharpKeys/Dialog_Main.cs). [This application](https://github.com/randyrants/sharpkeys) can be used to remap the keys and store the new mapping in the system Registry.

## .NET Keyboard Events

.NET Keyboard Events depend on the presentation framework used. There are two different keyboard systems for [System.Windows.Forms](https://learn.microsoft.com/en-us/dotnet/api/system.windows.forms) and [WPF](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/overview).

The enumeration types [`System.Windows.Forms.Keys`](https://learn.microsoft.com/en-us/dotnet/api/system.windows.forms.keys) and the [WPF](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/overview) [`System.Windows.Input.Key`](https://learn.microsoft.com/en-us/dotnet/api/system.windows.input.key) are pretty similar but different. Importantly, these two enumeration types have different underlying numeric values. [`System.Windows.Forms.Keys`](https://learn.microsoft.com/en-us/dotnet/api/system.windows.forms.keys) is modeled after the [Windows Virtual Keys](#heading-windows-virtual-keys).

The names of the enumeration members are also different. It looks like some [`System.Windows.Forms.Keys`](https://learn.microsoft.com/en-us/dotnet/api/system.windows.forms.keys) member names have been corrected in WPF.

Also, the order of the *alias* enumeration members, that is, the enumeration members with the identical underlying numeric values, is different:

~~~
System.Windows.Forms:

Return ≡ Enter ≡ 13
Capital ≡ CapsLock ≡ 20
Prior ≡ PageUp ≡ 33
Next ≡ PageDown ≡ 34
Snapshot ≡ PrintScreen ≡ 44
OemSemicolon ≡ Oem1 ≡ 186
OemQuestion ≡ Oem2 ≡ 191
Oem3 ≡ Oemtilde ≡ 192
OemOpenBrackets ≡ Oem4 ≡ 219
OemPipe ≡ Oem5 ≡ 220
OemCloseBrackets ≡ Oem6 ≡ 221
Oem7 ≡ OemQuotes ≡ 222
Oem102 ≡ OemBackslash ≡ 226
~~~

~~~
WPF:

Return ≡ Enter ≡ 6
Capital ≡ CapsLock ≡ 8
Prior ≡ PageUp ≡ 19
Next ≡ PageDown ≡ 20
Snapshot ≡ PrintScreen ≡ 30
Oem1 ≡ OemSemicolon ≡ 140
Oem2 ≡ OemQuestion ≡ 145
Oem3 ≡ OemTilde ≡ 146
Oem4 ≡ OemOpenBrackets ≡ 149
Oem5 ≡ OemPipe ≡ 150
Oem6 ≡ OemCloseBrackets ≡ 151   
Oem7 ≡ OemQuotes ≡ 152
Oem102 ≡ OemBackslash ≡ 154
~~~

The tables shown above are generated with the test application “Duplicates”, please see the [.NET solution](https://github.com/SAKryukov/keyboard-layout-assistant/tree/main/code/test/dotnet).

To minimize the confusion, the keyboard keys are marked with the enumeration member names that come first. This way, the keyboard shows the same names reported by the [test applications](https://github.com/SAKryukov/keyboard-layout-assistant/tree/main/code/test/dotnet). Both equivalent names are shown in the detailed view when the user points to a key.

## Web Browser Keyboard Events

In Web browsers, the [`KeyboardEvent` object](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) is passed to the handlers of the events [keydown](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event), [keyup](https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event), or obsolete `keypress`.

Two properties, not considering the obsolete ones, can be used to identify keys: [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) and [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code).

Please see the [test application for Web browsers](https://github.com/SAKryukov/keyboard-layout-assistant/tree/main/code/test/js) for more information.

# Any Questions?

Please ask any questions using the [GitHub Discussions related to this repository](https://github.com/SAKryukov/keyboard-layout-assistant/discussions).
