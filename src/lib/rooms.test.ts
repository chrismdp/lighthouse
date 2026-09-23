import { describe, expect, it } from "vitest";
import { availableExits, findRoom, move, startingRoom } from "./rooms";
import { rooms } from "./rooms-data";

describe("startingRoom", () => {
  it("starts the player on the Rocks", () => {
    expect(startingRoom(rooms).id).toBe("rocks");
  });
});

describe("findRoom", () => {
  it("finds a room by grid coordinates", () => {
    expect(findRoom(rooms, 0, 0)?.id).toBe("spiral-stair");
    expect(findRoom(rooms, 1, 0)?.id).toBe("lamp-room");
    expect(findRoom(rooms, 0, 1)?.id).toBe("keepers-kitchen");
    expect(findRoom(rooms, 1, 1)?.id).toBe("rocks");
  });

  it("returns undefined off the grid", () => {
    expect(findRoom(rooms, 2, 2)).toBeUndefined();
  });
});

describe("availableExits", () => {
  it("lists only the directions that lead to a room", () => {
    const rocks = findRoom(rooms, 1, 1)!;
    expect(availableExits(rooms, rocks).sort()).toEqual(["left", "up"]);
  });
});

describe("move", () => {
  it("moves into an adjacent room and clears any message", () => {
    const rocks = findRoom(rooms, 1, 1)!;
    const result = move(rooms, rocks, "left");
    expect(result.room.id).toBe("keepers-kitchen");
    expect(result.blockedMessage).toBeNull();
  });

  it("stays put and returns the room's message when blocked", () => {
    const rocks = findRoom(rooms, 1, 1)!;
    const result = move(rooms, rocks, "down");
    expect(result.room.id).toBe("rocks");
    expect(result.blockedMessage).toBe(rocks.blockedMessages.down);
  });

  it("walks the full loop around the lighthouse", () => {
    let current = startingRoom(rooms);
    let visited: ReadonlySet<string> = new Set<string>();

    ({ room: current, visited } = move(rooms, current, "left", visited)); // Rocks -> Keeper's Kitchen
    expect(current.id).toBe("keepers-kitchen");

    ({ room: current, visited } = move(rooms, current, "up", visited)); // -> Spiral Stair
    expect(current.id).toBe("spiral-stair");

    ({ room: current, visited } = move(rooms, current, "right", visited)); // -> Lamp Room (unlocked, kitchen visited)
    expect(current.id).toBe("lamp-room");

    ({ room: current, visited } = move(rooms, current, "down", visited)); // -> Rocks
    expect(current.id).toBe("rocks");
  });
});

describe("Lamp Room lock", () => {
  it("keeps the Lamp Room door locked until the Keeper's Kitchen has been visited", () => {
    const rocks = startingRoom(rooms);
    const result = move(rooms, rocks, "up", new Set());

    expect(result.room.id).toBe("rocks");
    expect(result.blockedMessage).toBe("The lamp room door is locked.");
  });

  it("unlocks the Lamp Room door once the Keeper's Kitchen has been visited", () => {
    let current = startingRoom(rooms);
    let visited: ReadonlySet<string> = new Set<string>();

    ({ room: current, visited } = move(rooms, current, "left", visited)); // Rocks -> Keeper's Kitchen
    expect(current.id).toBe("keepers-kitchen");

    ({ room: current, visited } = move(rooms, current, "right", visited)); // -> Rocks
    expect(current.id).toBe("rocks");

    const result = move(rooms, current, "up", visited);
    expect(result.room.id).toBe("lamp-room");
    expect(result.blockedMessage).toBeNull();
  });
});
