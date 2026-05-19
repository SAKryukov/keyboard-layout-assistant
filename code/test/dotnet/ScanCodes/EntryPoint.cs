using System;
namespace ScanCodes;
static class Program {
    [STAThread]
    static void Main() {
        System.Windows.Forms.Application.Run(new FormScanCodes());
    }
}