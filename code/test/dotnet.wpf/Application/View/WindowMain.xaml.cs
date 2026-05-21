namespace SA.Test.CommandLine.View {
    using System.Windows;
    using System.Windows.Input;

    public partial class WindowMain : Window {

        public WindowMain() {
            InitializeComponent();
            PreviewKeyDown += (sender, eventArgs) => {
                var key = eventArgs.SystemKey != Key.None
                    ? eventArgs.SystemKey
                    : eventArgs.Key;
                int keyValue = (int)key;
                listBoxOutput.Items.Add($"{key.ToString()}, Value: {keyValue:X2}, Decimal Value: {keyValue}");
            };
        } //WindowMain

    } //class WindowMain

}
