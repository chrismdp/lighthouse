import type { Room } from "./rooms";

export const rooms: Room[] = [
  {
    id: "spiral-stair",
    name: "Spiral Stair",
    description:
      "A narrow iron staircase spirals upward into the gloom, its steps worn smooth by generations of keepers. Cold sea air seeps through gaps in the stone walls.",
    x: 0,
    y: 0,
    blockedMessages: {
      up: "The staircase ends against solid stone here — the Lamp Room is the highest you can climb.",
      left: "Bare lighthouse wall. There's no way through here.",
    },
  },
  {
    id: "lamp-room",
    name: "Lamp Room",
    description:
      "Sunlight blazes through the great glass lens at the top of the tower, throwing rainbows across the brass fittings. Far below, the grey sea stretches to the horizon.",
    x: 1,
    y: 0,
    blockedMessages: {
      up: "The domed glass ceiling seals the room — there's nowhere higher to climb.",
      right: "Only glass and open sky lie beyond. You can't step through it.",
    },
  },
  {
    id: "keepers-kitchen",
    name: "Keeper's Kitchen",
    description:
      "A cast-iron stove sits cold in the corner, and a chipped mug still waits on the table. Faded charts and half-burned candles clutter every shelf.",
    x: 0,
    y: 1,
    blockedMessages: {
      down: "The floorboards end at solid foundation stone.",
      left: "Just the outer wall here — no door this way.",
    },
  },
  {
    id: "rocks",
    name: "Rocks",
    description:
      "Waves hiss and retreat over the dark, kelp-slicked stones, and salt spray stings your face. The lighthouse looms above, its white paint peeling in the wind.",
    x: 1,
    y: 1,
    blockedMessages: {
      down: "The sea crashes just beyond — there's nowhere further down.",
      right: "Nothing but open water stretches out to the right.",
    },
  },
];
