import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";
import type { Room } from "@/lib/rooms";

interface RoomRow {
  id: string;
  name: string;
  description: string;
  x: number;
  y: number;
  blocked_up: string | null;
  blocked_down: string | null;
  blocked_left: string | null;
  blocked_right: string | null;
}

function toRoom(row: RoomRow): Room {
  const blockedMessages: Room["blockedMessages"] = {};
  if (row.blocked_up) blockedMessages.up = row.blocked_up;
  if (row.blocked_down) blockedMessages.down = row.blocked_down;
  if (row.blocked_left) blockedMessages.left = row.blocked_left;
  if (row.blocked_right) blockedMessages.right = row.blocked_right;

  return {
    id: row.id,
    name: row.name,
    description: row.description,
    x: row.x,
    y: row.y,
    blockedMessages,
  };
}

export async function GET() {
  const { env } = getCloudflareContext();
  const { results } = await env.DB.prepare(
    "SELECT id, name, description, x, y, blocked_up, blocked_down, blocked_left, blocked_right FROM rooms"
  ).all<RoomRow>();

  const rooms = results.map(toRoom);
  return NextResponse.json(rooms);
}
