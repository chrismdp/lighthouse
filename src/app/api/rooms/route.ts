import { NextResponse } from "next/server";
import { rooms } from "@/lib/rooms-data";

export async function GET() {
  return NextResponse.json(rooms);
}
