namespace SA.Test.Main;
using Console = System.Console;
using Key = System.Windows.Input.Key;
using WinFormsKeys = System.Windows.Forms.Keys;

static class TestStart {
    [System.STAThread]
    static void Main() {
        Console.OutputEncoding = System.Text.Encoding.UTF8;
        Console.WriteLine("Forms:");
        new Reflect<WinFormsKeys>().Report();
        Console.WriteLine();
        Console.WriteLine("WPF:");
        new Reflect<Key>().Report();
    } //MainClass
} //class TestStart