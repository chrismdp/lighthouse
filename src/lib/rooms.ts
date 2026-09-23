export type Direction = "up" | "down" | "left" | "right";

export interface Room {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  blockedMessages: Partial<Record<Direction, string>>;
}

const deltas: Record<Direction, { dx: number; dy: number }> = {
  up: { dx: 0, dy: -1 },
  down: { dx: 0, dy: 1 },
  left: { dx: -1, dy: 0 },
  right: { dx: 1, dy: 0 },
};

export const directionLabels: Record<Direction, string> = {
  up: "Up",
  down: "Down",
  left: "Left",
  right: "Right",
};

export const START_COORDS = { x: 1, y: 1 };

export function findRoom(rooms: Room[], x: number, y: number): Room | undefined {
  return rooms.find((room) => room.x === x && room.y === y);
}

export function startingRoom(rooms: Room[]): Room {
  const room = findRoom(rooms, START_COORDS.x, START_COORDS.y);
  if (!room) {
    throw new Error("Starting room (Rocks) not found");
  }
  return room;
}

export function availableExits(rooms: Room[], room: Room): Direction[] {
  const directions: Direction[] = ["up", "down", "left", "right"];
  return directions.filter((dir) => {
    const { dx, dy } = deltas[dir];
    return findRoom(rooms, room.x + dx, room.y + dy) !== undefined;
  });
}

export interface MoveResult {
  room: Room;
  blockedMessage: string | null;
}

export function move(rooms: Room[], current: Room, direction: Direction): MoveResult {
  const { dx, dy } = deltas[direction];
  const target = findRoom(rooms, current.x + dx, current.y + dy);

  if (target) {
    return { room: target, blockedMessage: null };
  }

  return {
    room: current,
    blockedMessage: current.blockedMessages[direction] ?? "You can't go that way.",
  };
}
