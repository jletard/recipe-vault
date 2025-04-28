// src/utils/tagColors.ts
// Handles color assignment for tags in the Recipe Vault app.

const COLORS = [
    "bg-rose-400",     // 🍓 Strawberry-ish
    "bg-amber-400",    // 🥕 Carrot-ish
    "bg-lime-400",     // 🥬 Lettuce/Spinach
    "bg-orange-300",   // 🍑 Peach
    "bg-emerald-400",  // 🥑 Avocado
    "bg-yellow-300",   // 🍋 Lemon
    "bg-blue-400",     // 🫐 Blueberry
    "bg-violet-500",   // 🍇 Grape
    "bg-red-500",      // 🍒 Cherry
    "bg-fuchsia-400",   // 🍬 Candy / Sweet vibes
    "bg-cyan-400",     // Extra pop
    "bg-pink-400",     // Nice soft tone
    "bg-indigo-400",   // Deeper pop
    "bg-teal-400",     // Fresh green-blue
    "bg-purple-400",   // Cool mid-tone
    "bg-green-500",    // Classic fresh green
  ];
  
  export function buildTagColors(allTags: string[]): { [tag: string]: string } {
    const tagColorMap: { [tag: string]: string } = {};
  
    const sortedTags = [...allTags].sort((a, b) => a.localeCompare(b));
  
    sortedTags.forEach((tag, index) => {
      tagColorMap[tag] = COLORS[index % COLORS.length];
    });
  
    return tagColorMap;
  }
  