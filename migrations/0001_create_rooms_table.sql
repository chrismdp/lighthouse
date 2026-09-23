-- Migration number: 0001 	 2026-09-23T08:00:00.000Z
CREATE TABLE rooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  x INTEGER NOT NULL,
  y INTEGER NOT NULL,
  blocked_up TEXT,
  blocked_down TEXT,
  blocked_left TEXT,
  blocked_right TEXT
);

INSERT INTO rooms (id, name, description, x, y, blocked_up, blocked_down, blocked_left, blocked_right) VALUES
  (
    'spiral-stair',
    'Spiral Stair',
    'A narrow iron staircase spirals upward into the gloom, its steps worn smooth by generations of keepers. Cold sea air seeps through gaps in the stone walls.',
    0, 0,
    'The staircase ends against solid stone here — the Lamp Room is the highest you can climb.',
    NULL,
    'Bare lighthouse wall. There''s no way through here.',
    NULL
  ),
  (
    'lamp-room',
    'Lamp Room',
    'Sunlight blazes through the great glass lens at the top of the tower, throwing rainbows across the brass fittings. Far below, the grey sea stretches to the horizon.',
    1, 0,
    'The domed glass ceiling seals the room — there''s nowhere higher to climb.',
    NULL,
    NULL,
    'Only glass and open sky lie beyond. You can''t step through it.'
  ),
  (
    'keepers-kitchen',
    'Keeper''s Kitchen',
    'A cast-iron stove sits cold in the corner, and a chipped mug still waits on the table. Faded charts and half-burned candles clutter every shelf.',
    0, 1,
    NULL,
    'The floorboards end at solid foundation stone.',
    'Just the outer wall here — no door this way.',
    NULL
  ),
  (
    'rocks',
    'Rocks',
    'Waves hiss and retreat over the dark, kelp-slicked stones, and salt spray stings your face. The lighthouse looms above, its white paint peeling in the wind.',
    1, 1,
    NULL,
    'The sea crashes just beyond — there''s nowhere further down.',
    NULL,
    'Nothing but open water stretches out to the right.'
  );
