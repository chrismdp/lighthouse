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

    current = move(rooms, current, "left").room; // Rocks -> Keeper's Kitchen
    expect(current.id).toBe("keepers-kitchen");

    current = move(rooms, current, "up").room; // -> Spiral Stair
    expect(current.id).toBe("spiral-stair");

    current = move(rooms, current, "right").room; // -> Lamp Room
    expect(current.id).toBe("lamp-room");

    current = move(rooms, current, "down").room; // -> Rocks
    expect(current.id).toBe("rocks");
  });
});
