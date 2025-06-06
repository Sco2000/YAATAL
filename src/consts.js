export const FONTUP = [
  { 
    id: "message",
    item: ["fa-solid", "fa-message", "flex", "flex-col", "title-xs" , "text-gray-500", "text-2xl"],
    title: "Messages",
    bubbleClass: ["bg-[#00a884]", "font-bold", "text-[#111b21]", "rounded-full", "", "p-2", "text-xs", "text-center", "w-[40%]", "h-[50%]", "flex", "items-center", "justify-center", "relative", "top-2", "left-10"],
    bubbleContent: "200"
  },
  {
    id: "status",
    item: ["bxr  bx-circle-outer-dashed-circle", "flex", "flex-col" , "text-gray-500", "text-2xl"],
    title: "Groupes",
    bubbleClass: ["bg-[#00a884]", "text-white", "rounded-full","text-xs", "text-center", "size-2", "flex", "items-center", "justify-center", "relative", "top-2", "left-[50px]"],
    bubbleContent: ""
  },
  {
    id: "channels",
    item: ["bx", "bx-podcast", "flex", "flex-col" , "text-gray-500", "text-2xl"],
    title: "Diffusions",
     bubbleClass: ["bg-[#00a884]", "text-white", "rounded-full", "text-xs", "text-center", "size-2", "flex", "items-center", "justify-center", "relative", "top-2", "left-[50px]"],
    bubbleContent: ""
  },
  {
    id: "communities",
    item: ["bxr", "bx-community", "flex", "flex-col" , "text-gray-500", "text-2xl"],
    title: "Archives",
     bubbleClass: [],
    bubbleContent: ""
  }
]

export const MESSAGES_BUTTONS = [
  {
    id: "Tous",
    titre: "Tous",
    class: ["h-[90%]", "flex", "justify-center", "text-[#00a884]", "items-center", "bg-[#0a332c]", "rounded-full", "p-2"],
    border: "border-orange-500"
  },
  {
    id: "Nonlu",
    titre: "Non lus",
    class: ["h-[90%]", "flex", "justify-center", "items-center", "bg-gray-500/25", "rounded-full", "p-2"],
    border: "border-neutral-400"
  },
  {
    id: "Favoris",
    titre: "Favoris",
    class: ["h-[90%]", "flex", "justify-center", "items-center", "bg-gray-500/25", "rounded-full", "p-2"],
    border: "border-slate-900"
  },
  {
    id: "Groupes",
    titre: "Groupes",
    class: ["h-[90%]", "flex", "justify-center", "items-center", "bg-gray-500/25", "rounded-full", "p-2"],
    border: "border-red-600"
  }
];

export const RIGHT_BUTTONS = [
  {
    id: "search-discussion",
    item: ["fa-solid", "fa-magnifying-glass",  "text-gray-500", "text-xl"]
  },
  {
    id: "option-discussion",
    item: ["fa-solid", "fa-ellipsis-vertical",  "text-gray-500", "text-xl"]
  }
];