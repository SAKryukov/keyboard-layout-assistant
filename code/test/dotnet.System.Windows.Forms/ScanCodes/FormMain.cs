using System.Windows.Forms;
using Point = System.Drawing.Point;
using StringBuilder = System.Text.StringBuilder;
using System.Runtime.InteropServices;
using System;

namespace ScanCodes;

public partial class FormScanCodes : Form {

    enum Flags : ushort {
        RI_KEY_MAKE = 0, // 	The key is down.
        RI_KEY_BREAK = 1, // 	The key is up.
        RI_KEY_E0 = 2, // 	The scan code has the E0 prefix.
        RI_KEY_E1 = 4, //   The scan code has the E1 prefix.
    } // Flags

    struct RAWKEYBOARD {
        public RAWKEYBOARD() {}
        internal ushort MakeCode = 0;
        internal Flags Flags = 0;
        internal ushort Reserved = 0;
        internal ushort VKey = 0;
        internal System.UInt32 Message = 0;
        internal System.IntPtr  ExtraInformation = 0;        
    }
    struct RAWINPUTHEADER {
        public RAWINPUTHEADER() {}
        internal UInt32 type = 0;
        internal UInt32 size = 0;
        internal System.IntPtr device = 0;
        internal System.IntPtr wParam = 0;
    }
    struct RAWINPUT {
        public RAWINPUT() {}
        internal RAWINPUTHEADER header = new();
        internal RAWKEYBOARD keyboard = new();
    }
    struct RAWINPUTDEVICE {    
        public RAWINPUTDEVICE() {}
        internal ushort usUsagePage = 0;
        internal ushort usUsage = 0;
        internal System.UInt32 dwFlags = 0;
        internal System.IntPtr hwndTarget = 0;
    }

    [DllImport("user32.dll")]
    static extern bool RegisterRawInputDevices(RAWINPUTDEVICE[] pRawInputDevices, uint uiNumDevices, uint cbSize);

    [DllImport("user32.dll")]
    static extern int GetRawInputData(System.IntPtr hRawInput, uint uiCommand, out RAWINPUT pData, ref uint pcbSize, uint cbSizeHeader);

    protected override void OnHandleCreated(EventArgs e) {
        base.OnHandleCreated(e);
        // Register to receive raw input for keyboard
        RAWINPUTDEVICE[] rid = new RAWINPUTDEVICE[1];
        rid[0].usUsagePage = 0x01;
        rid[0].usUsage = 0x06;
        rid[0].dwFlags = 0x00000100; // RIDEV_INPUTSINK
        rid[0].hwndTarget = this.Handle;
        RegisterRawInputDevices(rid, 1, (uint)Marshal.SizeOf(rid[0]));
    }

    const string rawText = "Raw Scan Codes and Virtual Key Codes";

    readonly Panel panel = new() { Height = 75, Dock = DockStyle.Top };
    readonly CheckBox checkBox = new() {
        Location = new Point(10, 10),
        Width = int.MaxValue,
        Text = rawText };
    readonly Button copyButton = new() {
        Text = $"{char.ConvertFromUtf32(0x1f4cb)} Copy",
        Location = new Point(10, 40) };
    readonly Button clearButton = new() {
        Text = $"{char.ConvertFromUtf32(0x274c)} Clear"
        };
    readonly ListBox listBox = new() { Dock = DockStyle.Fill };

    public FormScanCodes() {
        InitializeComponent();
        Text = "Test Keyboard";
        Width = 800;
        Height = 600;
        clearButton.Location = new Point(copyButton.Location.X + 4 + copyButton.Width, copyButton.Location.Y);
        Controls.Add(panel);
        panel.Controls.Add(checkBox);
        panel.Controls.Add(copyButton);
        panel.Controls.Add(clearButton);
        Controls.Add(listBox);
        listBox.BringToFront();
        ActiveControl = listBox;
        listBox.KeyDown += (sender, eventArgs) => {
            if (checkBox.Checked == true) return;
            string value = 
                "System.Windows.Forms.Key: " +
                $"KeyCode: {eventArgs.KeyCode}; " +
                $"KeyValue: 0x{eventArgs.KeyValue:X2}; " +
                $"Decimal KeyValue: {eventArgs.KeyValue}";
            listBox.Items.Add(value);
        };
        copyButton.Click += (sender, eventArgs) => {
            StringBuilder sb = new();
            foreach (var item in listBox.Items)
                sb.AppendLine(item.ToString());
            Clipboard.SetText(sb.ToString());            
        }; //copyButton.Click
        clearButton.Click += (sender, eventArgs) => 
            listBox.Items.Clear();
    } //FormScanCodes

    private const int WM_KEYDOWN = 0x0100;
    private const int WM_KEYUP = 0x0101;
    private const int WM_INPUT = 0x00FF;
    private const int RID_INPUT = 0x10000003;

    /*
    protected override bool ProcessKeyPreview(ref Message m) {
        if (checkBox.Checked != true)
            return base.ProcessKeyPreview(ref m);
        if (m.Msg != WM_KEYDOWN && m.Msg != WM_KEYUP)
            return base.ProcessKeyPreview(ref m);
        string direction = m.Msg == WM_KEYUP ? "Key up" : "Key down";
        int lParam = (int)m.LParam;
        int scanCode = (lParam >> 16) & 0xFF;
        int isExtended = (lParam >> 24) & 0x1;
        string value =
            $"{direction}: " +
            $"Virtual Key Code: 0x{m.WParam:X2}; " +
            $"Scan Code: 0x{scanCode:X2}; " +
            $"Decimal scan Code: {scanCode}; " +
            $"Extended: {isExtended}";
            listBox.Items.Add(value);
        return base.ProcessKeyPreview(ref m);
    } //ProcessCmdKey
    */

    protected override void WndProc(ref Message m) {
        if (checkBox.Checked != true)
            { base.WndProc(ref m); return; }
        if (m.Msg != WM_INPUT)
            { base.WndProc(ref m); return; }
        RAWINPUT rawInput = new();
        uint cbSizeHeader = 2 * 4 + 2 * 8;
        uint cbSizeKeyboard = 3 * 4 + 8;
        uint pcbSize = cbSizeHeader + cbSizeKeyboard;
        int result = GetRawInputData(m.LParam, RID_INPUT, out rawInput, ref pcbSize, cbSizeHeader);
        if (result >= 0) {
            bool isUp = (rawInput.keyboard.Flags & Flags.RI_KEY_BREAK) > 0;
            bool prefixE0 = (rawInput.keyboard.Flags & Flags.RI_KEY_E0) > 0;
            bool prefixE1 = (rawInput.keyboard.Flags & Flags.RI_KEY_E1) > 0;
            string direction = isUp ? "up" : "down";
            string e0 = prefixE0 ? "E0" : "";
            string e1 = prefixE1 ? "E1" : "";
            listBox.Items.Add(
                $"Key {direction}: " +
                $"0x{rawInput.keyboard.MakeCode:X2}: " +
                $"Prefixes: {e0} {e1}"
            );
        } else 
            listBox.Items.Add($"Raw input error");
        // Call GetRawInputData to populate the RAWINPUT structure
        // Process the raw.keyboard.MakeCode and Flags (E0, E1, Break)
        base.WndProc(ref m);
    } //WndProc
    
} //FormScanCodes
