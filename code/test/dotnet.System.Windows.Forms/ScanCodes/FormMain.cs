using System.Windows.Forms;
using Point = System.Drawing.Point;
using StringBuilder = System.Text.StringBuilder;

namespace ScanCodes;

public partial class FormScanCodes : Form {

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
    
    protected override bool ProcessCmdKey(ref Message m, Keys keyData) {
        if (m.Msg == WM_KEYDOWN) {
            int lParam = m.LParam.ToInt32();
            int scanCode = (lParam >> 16) & 0xFF;
            int isExtended = (lParam >> 24) & 0x1;
            if (checkBox.Checked != true)
                return base.ProcessCmdKey(ref m, keyData);
            string value = 
               $"Virtual Key Code: 0x{m.WParam:X2}; " +
               $"Scan Code: 0x{scanCode:X2}; " +
               $"Decimal scan Code: {scanCode}; " +
               $"Extended: {isExtended}";
            listBox.Items.Add(value);
        } //if
        return base.ProcessCmdKey(ref m, keyData);
    } //ProcessCmdKey
    
} //FormScanCodes
