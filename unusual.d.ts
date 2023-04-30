export as namespace unusual

export type UnusualInstance = {
  random: () => number
  integer: (x: { min: number; max: number }) => number
  pick: (a: any[]) => any
  pickKey: (a: Record<string, unknown>) => string
  pickValue: (a: Record<string, unknown>) => unknown
  floor: (x: number) => number
  floorMin: (x: number, y: number) => number
  shuffle: (a: any[]) => any[]
}

export function unusual(seed: string | number): UnusualInstance
