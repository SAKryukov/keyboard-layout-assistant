using System.Windows.Forms;
namespace ScanCodes;

public partial class FormScanCodes : Form {

    CheckBox checkBox = new();
    const string rawText = "Raw Scan Codes and Virtual Key Codes";

    public FormScanCodes() {
        InitializeComponent();
        checkBox.Location = new System.Drawing.Point(10, 10);
        this.Width = 300;
        this.Height = 90;
        this.Text = "Test Keyboard";
        checkBox.Width = System.Int32.MaxValue;
        checkBox.Text = rawText;
        this.Controls.Add(checkBox);
        checkBox.KeyDown += (object sender, System.Windows.Forms.KeyEventArgs eventArgs) => {
            if (checkBox.Checked == true) return;
            System.Windows.Forms.MessageBox.Show(
                $"KeyCode: {eventArgs.KeyCode}\n" +
                $"KeyValue: {eventArgs.KeyValue}\n" +
                $"KeyValue: 0x{eventArgs.KeyValue.ToString("X2")}",
                "KeyCode and KeyValue");
        };
    } //FormScanCodes

    private const int WM_KEYDOWN = 0x0100;
    
    protected override bool ProcessCmdKey(ref Message m, Keys keyData) {
        if (m.Msg == WM_KEYDOWN) {
            int lParam = m.LParam.ToInt32();
            int scanCode = (lParam >> 16) & 0xFF;
            // Optional: Handle extended keys (e.g., arrows, Numpad)
            // Bit 24 indicates if the key is an extended key
            int isExtended = (lParam >> 24) & 0x1;
            if (checkBox.Checked != true)
                return base.ProcessCmdKey(ref m, keyData);
            System.Windows.Forms.MessageBox.Show(
               $"Virtual Key Code: {m.WParam.ToString("X2")}\n" +
               $"Scan Code: {scanCode}\n" +
               $"Scan Code: 0x{scanCode.ToString("X2")},\n" +
               $"Extended: {isExtended}",
               rawText);
            this.Focus();
        } //if
        return base.ProcessCmdKey(ref m, keyData);
    } //ProcessCmdKey
    
} //FormScanCodes

