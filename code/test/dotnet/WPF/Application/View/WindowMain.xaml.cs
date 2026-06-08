namespace SA.Test.CommandLine.View {
    using System.Windows;
    using System.Windows.Input;
    using StringBuilder = System.Text.StringBuilder;

    public partial class WindowMain : Window {

        public WindowMain() {
            InitializeComponent();
            PreviewKeyDown += (sender, eventArgs) => {
                var key = eventArgs.SystemKey != Key.None
                    ? eventArgs.SystemKey
                    : eventArgs.Key;
                int keyValue = (int)key;
                listBoxOutput.Items.Add($"WPF: System.Windows.Input.Key.{key}, Value: {keyValue:X2}, Decimal Value: {keyValue}");
            };
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
