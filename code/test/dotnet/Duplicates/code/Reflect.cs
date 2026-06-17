namespace SA.Test.Main;
using StringList = System.Collections.Generic.List<string>;
using Dictionary = System.Collections.Generic.Dictionary<int, System.Collections.Generic.List<string>>;
using Type = System.Type;
using BindingFlags = System.Reflection.BindingFlags;
using Console = System.Console;

class Reflect<ENUM> {
    
    internal Reflect() {
        Type type = typeof(ENUM);
        var fields = type.GetFields(BindingFlags.Static | BindingFlags.Public);
        foreach (var field in fields) {
            int key = (int)field.GetRawConstantValue();
            if (!dictionary.TryGetValue(key, out StringList value))
                dictionary.Add(key, [field.Name]);
            else
                value.Add(field.Name);
        } //loop
    } //Reflect
    
    internal void Report() {
        StringList list = [];
        foreach(var pair in dictionary) {
            if (pair.Value.Count < 2) continue;
            StringList nameList = [];
            foreach (var name in pair.Value)
                nameList.Add(name);
            nameList.Add(pair.Key.ToString());
            string line = string.Join(DefinitionSet.Separator, nameList);
            list.Add(line);
        }
        Console.WriteLine(string.Join(DefinitionSet.newLine, list));
    } //Report

    readonly Dictionary dictionary = [];

} //class Reflect