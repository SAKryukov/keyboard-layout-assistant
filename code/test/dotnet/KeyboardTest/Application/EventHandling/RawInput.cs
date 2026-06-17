namespace SA.Test;

using IntPtr = nint;
 
    enum Flags : ushort {
        RI_KEY_MAKE = 0, // 	The key is down.
        RI_KEY_BREAK = 1, // 	The key is up.
        RI_KEY_E0 = 2, // 	The scan code has the E0 prefix.
        RI_KEY_E1 = 4, //   The scan code has the E1 prefix.
    } // Flags

    enum MapVirtualKeyType : uint {
        MAPVK_VK_TO_VSC = 0,
        MAPVK_VSC_TO_VK = 1,
        MAPVK_VK_TO_CHAR = 2,
        MAPVK_VSC_TO_VK_EX = 3,
        MAPVK_VK_TO_VSC_EX = 4,        
    } //MapVirtualKeyType

    struct RAWKEYBOARD {
        public RAWKEYBOARD() {}
        internal ushort MakeCode = 0;
        internal Flags Flags = 0;
        internal ushort Reserved = 0;
        internal ushort VKey = 0;
        internal uint Message = 0;
        internal IntPtr  ExtraInformation = 0;
        internal static ushort Size { get; } = 4 * 2 + 4 + 8;
    } //struct RAWKEYBOARD

    struct RAWINPUTHEADER {
        public RAWINPUTHEADER() {}
        internal uint type = 0;
        internal uint size = 0;
        internal IntPtr device = 0;
        internal IntPtr wParam = 0;
        internal static ushort Size { get; } = 2 * (4 + 8);
    } //struct RAWINPUTHEADER

    struct RAWINPUT {
        public RAWINPUT() {}
        internal RAWINPUTHEADER header = new();
        internal RAWKEYBOARD keyboard = new();
    } //struct RAWINPUT

    struct RAWINPUTDEVICE {    
        public RAWINPUTDEVICE() {}
        internal ushort usUsagePage = 0;
        internal ushort usUsage = 0;
        internal uint dwFlags = 0;
        internal nint hwndTarget = 0;
    } //struct RAWINPUTDEVICE

static class WindowsAPI {
    
    const string dllName = "user32.dll";
    [System.Runtime.InteropServices.DllImport(dllName)]
    internal static extern bool RegisterRawInputDevices(RAWINPUTDEVICE[] pRawInputDevices, uint uiNumDevices, uint cbSize);

    [System.Runtime.InteropServices.DllImport(dllName)]
    internal static extern  int GetRawInputData(IntPtr hRawInput, uint uiCommand, out RAWINPUT pData, ref uint pcbSize, uint cbSizeHeader);

    [System.Runtime.InteropServices.DllImport(dllName)]
    internal static extern uint MapVirtualKeyA(uint code, MapVirtualKeyType mapType);

} //class WindowsAPI
