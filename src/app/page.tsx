"use client";

import { useCallback, useEffect, useState } from "react";
import {
  type Direction,
  type Room,
  availableExits,
  directionLabels,
  move,
  startingRoom,
} from "@/lib/rooms";

const KEY_MAP: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
};

export default function Home() {
  const [rooms, setRooms] = useState<Room[] | null>(null);
  const [current, setCurrent] = useState<Room | null>(null);
  const [visited, setVisited] = useState<ReadonlySet<string>>(new Set());
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/rooms")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load rooms (${res.status})`);
        }
        return res.json() as Promise<Room[]>;
      })
      .then((data) => {
        if (cancelled) return;
        const start = startingRoom(data);
        setRooms(data);
        setCurrent(start);
        setVisited(new Set([start.id]));
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (!rooms || !current) return;

      const direction = KEY_MAP[event.key];
      if (!direction) return;

      event.preventDefault();
      const result = move(rooms, current, direction, visited);
      setCurrent(result.room);
      setVisited(result.visited);
      setMessage(result.blockedMessage);
    },
    [rooms, current, visited]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  if (error) {
    return (
      <main>
        <h1>The Lighthouse</h1>
        <p id="message">Couldn&apos;t load the lighthouse: {error}</p>
      </main>
    );
  }

  if (!rooms || !current) {
    return (
      <main>
        <h1>The Lighthouse</h1>
        <p id="description">Loading&hellip;</p>
      </main>
    );
  }

  const exits = availableExits(rooms, current);

  return (
    <main>
      <h1>The Lighthouse</h1>
      <h2 id="room-name">{current.name}</h2>
      <p id="description">{current.description}</p>
      <p id="exits">
        {exits.length > 0
          ? `You can go: ${exits.map((dir) => directionLabels[dir]).join(", ")}.`
          : "There is nowhere to go from here."}
      </p>
      <p id="message">{message ?? ""}</p>
      <footer>Use the arrow keys to move.</footer>
    </main>
  );
}
