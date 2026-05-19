using System.Windows.Forms;
namespace ScanCodes;

public partial class FormScanCodes : Form {
    public FormScanCodes() { InitializeComponent(); }
    private const int WM_KEYDOWN = 0x0100;
    protected override void WndProc(ref Message m) {
        base.WndProc(ref m);
        if (m.Msg == WM_KEYDOWN) {
            int lParam = m.LParam.ToInt32();
            int scanCode = (lParam >> 16) & 0xFF;
            // Optional: Handle extended keys (e.g., arrows, Numpad)
            // Bit 24 indicates if the key is an extended key
            int isExtended = (lParam >> 24) & 0x1;            
            System.Windows.Forms.MessageBox.Show(
               $"Virtual Key Code: {m.WParam.ToString("X2")}\n" +
               $"Scan Code: {scanCode} (0x{scanCode.ToString("X2")}),\n" +
               $"Extended: {isExtended}");
        } //if
    } //WndProc
} //FormScanCodes

