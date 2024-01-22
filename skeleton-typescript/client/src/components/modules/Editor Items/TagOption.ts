export class TagOption {
  public name: string;
  public color: string;
  private static tagToTailwind = new Map([
    ["Fun", "bg-amber-50 text-amber-700 ring-amber-700/10"],
    ["Life", "bg-green-50 text-green-700 ring-green-700/10"],
    ["Entertainment", "bg-orange-50 text-orange-700 ring-orange-700/10"],
    ["Romance", "bg-red-50 text-red-700 ring-red-700/10"],
    ["Career", "bg-blue-50 text-blue-700 ring-blue-700/10"],
    ["Academics", "bg-purple-50 text-purple-700 ring-purple-700/10"],
  ]);

  constructor(name: string) {
    this.name = name;
    console.log(TagOption.tagToTailwind.get(name));
    this.color = TagOption.tagToTailwind.get(name) ?? "";
  }
}
