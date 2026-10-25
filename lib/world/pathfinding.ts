import type { Point } from "@/types/world";
import { isPointWalkable } from "./collision";
import {
  GRID_SIZE,
  WORLD_HEIGHT,
  WORLD_WIDTH,
} from "./layout";

interface Cell {
  col: number;
  row: number;
}

const COLS = Math.ceil(WORLD_WIDTH / GRID_SIZE);
const ROWS = Math.ceil(WORLD_HEIGHT / GRID_SIZE);

const CARDINAL_DIRECTIONS: ReadonlyArray<readonly [number, number]> = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function getCellCenter(cell: Cell): Point {
  return {
    x: cell.col * GRID_SIZE + GRID_SIZE / 2,
    y: cell.row * GRID_SIZE + GRID_SIZE / 2,
  };
}

function getCellFromPoint(point: Point): Cell {
  return {
    col: Math.min(COLS - 1, Math.max(0, Math.floor(point.x / GRID_SIZE))),
    row: Math.min(ROWS - 1, Math.max(0, Math.floor(point.y / GRID_SIZE))),
  };
}

function getCellKey(cell: Cell) {
  return cell.row * COLS + cell.col;
}

function getCellFromKey(key: number): Cell {
  return { col: key % COLS, row: Math.floor(key / COLS) };
}

const BLOCKED_CELLS = buildBlockedGrid();

function buildBlockedGrid() {
  const blocked = new Array<boolean>(COLS * ROWS).fill(false);

  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      blocked[row * COLS + col] = !isPointWalkable(getCellCenter({ col, row }));
    }
  }

  return blocked;
}

function findNearestWalkableCell(point: Point): Cell | null {
  const start = getCellFromPoint(point);
  const startKey = getCellKey(start);

  if (!BLOCKED_CELLS[startKey]) {
    return start;
  }

  const queue: Cell[] = [start];
  const visited = new Set<number>([startKey]);
  let cursor = 0;

  while (cursor < queue.length) {
    const current = queue[cursor];
    cursor += 1;

    if (!BLOCKED_CELLS[getCellKey(current)]) {
      return current;
    }

    for (const [columnOffset, rowOffset] of CARDINAL_DIRECTIONS) {
      const col = current.col + columnOffset;
      const row = current.row + rowOffset;

      if (col < 0 || col >= COLS || row < 0 || row >= ROWS) {
        continue;
      }

      const key = row * COLS + col;

      if (!visited.has(key)) {
        visited.add(key);
        queue.push({ col, row });
      }
    }
  }

  return null;
}

function heuristic(from: Cell, to: Cell) {
  return Math.abs(from.col - to.col) + Math.abs(from.row - to.row);
}

function reconstructPath(
  startKey: number,
  goalKey: number,
  cameFrom: Map<number, number>,
) {
  const path: Point[] = [];
  let key = goalKey;

  while (key !== startKey) {
    path.push(getCellCenter(getCellFromKey(key)));
    const previous = cameFrom.get(key);

    if (previous === undefined) {
      return [];
    }

    key = previous;
  }

  path.push(getCellCenter(getCellFromKey(startKey)));
  path.reverse();

  return path;
}

export function findPath(start: Point, target: Point): Point[] | null {
  const startCell = findNearestWalkableCell(start);
  const goalCell = findNearestWalkableCell(target);

  if (!startCell || !goalCell) {
    return null;
  }

  const startKey = getCellKey(startCell);
  const goalKey = getCellKey(goalCell);
  const open: number[] = [startKey];
  const openSet = new Set<number>([startKey]);
  const cameFrom = new Map<number, number>();
  const costSoFar = new Map<number, number>([[startKey, 0]]);
  const estimatedTotal = new Map<number, number>([
    [startKey, heuristic(startCell, goalCell)],
  ]);

  while (open.length > 0) {
    let bestIndex = 0;

    for (let index = 1; index < open.length; index += 1) {
      const currentEstimate = estimatedTotal.get(open[index]) ?? Infinity;
      const bestEstimate = estimatedTotal.get(open[bestIndex]) ?? Infinity;

      if (currentEstimate < bestEstimate) {
        bestIndex = index;
      }
    }

    const [currentKey] = open.splice(bestIndex, 1);
    openSet.delete(currentKey);

    if (currentKey === goalKey) {
      const path = reconstructPath(startKey, goalKey, cameFrom);

      if (isPointWalkable(target)) {
        const lastPoint = path[path.length - 1];

        if (!lastPoint || lastPoint.x !== target.x || lastPoint.y !== target.y) {
          path.push(target);
        }
      }

      return path;
    }

    const currentCell = getCellFromKey(currentKey);
    const currentCost = costSoFar.get(currentKey) ?? Infinity;

    for (const [columnOffset, rowOffset] of CARDINAL_DIRECTIONS) {
      const neighbor: Cell = {
        col: currentCell.col + columnOffset,
        row: currentCell.row + rowOffset,
      };

      if (
        neighbor.col < 0 ||
        neighbor.col >= COLS ||
        neighbor.row < 0 ||
        neighbor.row >= ROWS
      ) {
        continue;
      }

      const neighborKey = getCellKey(neighbor);

      if (BLOCKED_CELLS[neighborKey]) {
        continue;
      }

      const nextCost = currentCost + 1;

      if (nextCost < (costSoFar.get(neighborKey) ?? Infinity)) {
        cameFrom.set(neighborKey, currentKey);
        costSoFar.set(neighborKey, nextCost);
        estimatedTotal.set(
          neighborKey,
          nextCost + heuristic(neighbor, goalCell),
        );

        if (!openSet.has(neighborKey)) {
          openSet.add(neighborKey);
          open.push(neighborKey);
        }
      }
    }
  }

  return null;
}
