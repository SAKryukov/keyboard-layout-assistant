Keyboard Layout Assistant{title}

Кeyboard Layout Аssistant is an application used to
assist in the creation of keyboard layouts for different systems
and the development of software applications using the keyboard.

# Layers

## Labels

Provided for the orientation only, can be different on different keyboards.

## Scan Codes

Scan codes are the primary key code sent by the physical keyboard device. A single key 

## Linux XKB Key Codes

...The notation used in the XKB keyboard layouts, <code>/usr/share/X11/xkb/symbols</code>.
Shown without the angilar brackets.

## Windows Virtual Keys

`VK_*` key names and hexadecimal values.

Windows virtual keys are dispatched to the Windows application handling the event [`WM_KEYDOWN`](https://learn.microsoft.com/en-us/windows/win32/inputdev/wm-keydown) and [`WM_KEYDUP`](https://learn.microsoft.com/en-us/windows/win32/inputdev/wm-keyup) messages. The virtual-key code is passed as the parameter `wParam`.

See also: [Virtual-Key Codes](https://learn.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes).

The virtual key codes do not depend on the culture or keyboard layout. However, the virtual key codes of the [numpad](https://en.wikipedia.org/wiki/Numeric_keypad) depend on the state of the Num Lock key.

. The Hardware PortsData Port (0x60): Read the actual byte of data (the scan code) sent by the keyboard when a key is pressed or released.Status/Command Port (0x64): Read the status of the controller or send commands to it.

## .NET System.Windows.Forms

`System.Windows.Input.Key` names.


## .NET WPF

`System.Windows.Input.Keys` names.

## JavaScript Key

JavaScript `KeyboardEvent.key`</code>`: strings depending on the shift state and keyboard layout.;
    
## JavaScript Code

JavaScript `KeyboardEvent.code`: key names independent from the shift state and keyboard layout</code>.
