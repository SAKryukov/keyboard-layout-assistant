namespace SA.Test.View {
    using System.Windows;
    using System.Windows.Input;
    using IntPtr = System.IntPtr;
    using EventArgs = System.EventArgs;
    using Marshal = System.Runtime.InteropServices.Marshal;
    using StringBuilder = System.Text.StringBuilder;
    using WindowInteropHelper = System.Windows.Interop.WindowInteropHelper;
    using HwndSource = System.Windows.Interop.HwndSource;

    public partial class WindowMain : Window {

        protected override void OnSourceInitialized(EventArgs eventArgs) {
            base.OnSourceInitialized(eventArgs);
            IntPtr windowHandle = new WindowInteropHelper(this).Handle;
            HwndSource source = HwndSource.FromHwnd(windowHandle);
            RAWINPUTDEVICE[] rid = new RAWINPUTDEVICE[1];
            rid[0].usUsagePage = 0x01;
            rid[0].usUsage = 0x06;
            rid[0].dwFlags = 0x00000100; // RIDEV_INPUTSINK
            rid[0].hwndTarget = windowHandle;
            WindowsAPI.RegisterRawInputDevices(rid, 1, (uint)Marshal.SizeOf(rid[0]));
            source?.AddHook(HwndMessageHook);
        } //OnSourceInitialized

        const int WM_INPUT = 0x00FF;
        const int RID_INPUT = 0x10000003;

        void HandleRawInput(IntPtr lParam) {
            uint cbSizeHeader = RAWINPUTHEADER.Size;
            uint cbSizeKeyboard = RAWKEYBOARD.Size;
            uint pcbSize = cbSizeHeader + cbSizeKeyboard;
            int result = WindowsAPI.GetRawInputData(lParam, RID_INPUT, out RAWINPUT rawInput, ref pcbSize, cbSizeHeader);
            if (result >= 0) {
                bool isUp = (rawInput.keyboard.Flags & Flags.RI_KEY_BREAK) > 0;
                bool prefixE0 = (rawInput.keyboard.Flags & Flags.RI_KEY_E0) > 0;
                bool prefixE1 = (rawInput.keyboard.Flags & Flags.RI_KEY_E1) > 0;
                string direction = isUp ? "up" : "down";
                string e0 = prefixE0 ? "E0 " : "";
                string e1 = prefixE1 ? "E1 " : "";
                ushort principleScanCode = isUp ? (ushort)(rawInput.keyboard.MakeCode | 0x80) : rawInput.keyboard.MakeCode;
                uint packedScanCode = rawInput.keyboard.MakeCode;
                if (prefixE0) packedScanCode |= 0xE000;
                if (prefixE1) packedScanCode |= 0xE100;
                nuint mappedVirtualKey = WindowsAPI.MapVirtualKeyA(packedScanCode, MapVirtualKeyType.MAPVK_VSC_TO_VK_EX);
                string keyName = ((System.Windows.Forms.Keys)mappedVirtualKey).ToString();
                string scanCodeSequence = prefixE1 && (rawInput.keyboard.MakeCode == 0x1D) // special case Pause
                    ? "E1 1D 45 E1 9D C5"
                    : $"{e0}{e1}{principleScanCode:X2}";
                listBoxOutput.Items.Add(
                    $"Key {direction}: " +
                    $"Scan code sequence: {scanCodeSequence}; " +
                    $"Virtual Key: 0x{rawInput.keyboard.VKey:X2}; " +
                    $"System.Window.Forms.Key: {keyName}"
                );
            } else
                listBoxOutput.Items.Add($"Raw input error");
        } //HandleRawInput

        IntPtr HwndMessageHook(IntPtr hwnd, int msg, IntPtr wParam, IntPtr lParam, ref bool handled) {
            if (radioScanCodes.IsChecked == true && msg == WM_INPUT)
                HandleRawInput(lParam);
            return IntPtr.Zero;
        } //HwndMessageHook

        public WindowMain() {
            InitializeComponent();
            PreviewKeyDown += (sender, eventArgs) => {
                if (this.radioWpf.IsChecked != true) return;
                var key = eventArgs.SystemKey != Key.None
                    ? eventArgs.SystemKey
                    : eventArgs.Key;
                int keyValue = (int)key;
                listBoxOutput.Items.Add($"WPF: System.Windows.Input.Key.{key}, Value: {keyValue:X2}, Decimal Value: {keyValue}");
            }; //PreviewKeyDown
            buttonClear.Click += (sender, eventArgs) => 
                listBoxOutput.Items.Clear();
            buttonCopy.Click += (sender, eventArgs) => {
                StringBuilder sb = new();
                foreach (var item in listBoxOutput.Items)
                    sb.AppendLine(item.ToString());
                Clipboard.SetText(sb.ToString());
            }; //buttonCopy.Click
        } //WindowMain

    } //class WindowMain

}
