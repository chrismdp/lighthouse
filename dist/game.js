"use strict";
const rooms = [
    {
        name: "Spiral Stair",
        description: "A narrow iron staircase spirals upward into the gloom, its steps worn smooth by generations of keepers. Cold sea air seeps through gaps in the stone walls.",
        x: 0,
        y: 0,
        blocked: {
            up: "The staircase ends against solid stone here — the Lamp Room is the highest you can climb.",
            left: "Bare lighthouse wall. There's no way through here.",
        },
    },
    {
        name: "Lamp Room",
        description: "Sunlight blazes through the great glass lens at the top of the tower, throwing rainbows across the brass fittings. Far below, the grey sea stretches to the horizon.",
        x: 1,
        y: 0,
        blocked: {
            up: "The domed glass ceiling seals the room — there's nowhere higher to climb.",
            right: "Only glass and open sky lie beyond. You can't step through it.",
        },
    },
    {
        name: "Keeper's Kitchen",
        description: "A cast-iron stove sits cold in the corner, and a chipped mug still waits on the table. Faded charts and half-burned candles clutter every shelf.",
        x: 0,
        y: 1,
        blocked: {
            down: "The floorboards end at solid foundation stone.",
            left: "Just the outer wall here — no door this way.",
        },
    },
    {
        name: "Rocks",
        description: "Waves hiss and retreat over the dark, kelp-slicked stones, and salt spray stings your face. The lighthouse looms above, its white paint peeling in the wind.",
        x: 1,
        y: 1,
        blocked: {
            down: "The sea crashes just beyond — there's nowhere further down.",
            right: "Nothing but open water stretches out to the right.",
        },
    },
];
const deltas = {
    up: { dx: 0, dy: -1 },
    down: { dx: 0, dy: 1 },
    left: { dx: -1, dy: 0 },
    right: { dx: 1, dy: 0 },
};
const directionLabels = {
    up: "Up",
    down: "Down",
    left: "Left",
    right: "Right",
};
function findRoom(x, y) {
    return rooms.find((room) => room.x === x && room.y === y);
}
function availableExits(room) {
    const directions = ["up", "down", "left", "right"];
    return directions.filter((dir) => {
        const { dx, dy } = deltas[dir];
        return findRoom(room.x + dx, room.y + dy) !== undefined;
    });
}
class Game {
    constructor() {
        this.message = null;
        const startRoom = findRoom(1, 1);
        if (!startRoom) {
            throw new Error("Starting room not found");
        }
        this.current = startRoom;
        this.roomNameEl = this.requireElement("room-name");
        this.descriptionEl = this.requireElement("description");
        this.exitsEl = this.requireElement("exits");
        this.messageEl = this.requireElement("message");
        document.addEventListener("keydown", (event) => this.handleKeydown(event));
        this.render();
    }
    requireElement(id) {
        const el = document.getElementById(id);
        if (!el) {
            throw new Error(`Missing element #${id}`);
        }
        return el;
    }
    handleKeydown(event) {
        const keyMap = {
            ArrowUp: "up",
            ArrowDown: "down",
            ArrowLeft: "left",
            ArrowRight: "right",
        };
        const direction = keyMap[event.key];
        if (!direction) {
            return;
        }
        event.preventDefault();
        this.move(direction);
    }
    move(direction) {
        var _a;
        const { dx, dy } = deltas[direction];
        const target = findRoom(this.current.x + dx, this.current.y + dy);
        if (target) {
            this.current = target;
            this.message = null;
        }
        else {
            this.message = (_a = this.current.blocked[direction]) !== null && _a !== void 0 ? _a : "You can't go that way.";
        }
        this.render();
    }
    render() {
        var _a;
        this.roomNameEl.textContent = this.current.name;
        this.descriptionEl.textContent = this.current.description;
        const exits = availableExits(this.current);
        this.exitsEl.textContent =
            exits.length > 0
                ? `You can go: ${exits.map((dir) => directionLabels[dir]).join(", ")}.`
                : "There is nowhere to go from here.";
        this.messageEl.textContent = (_a = this.message) !== null && _a !== void 0 ? _a : "";
    }
}
window.addEventListener("DOMContentLoaded", () => {
    new Game();
});
