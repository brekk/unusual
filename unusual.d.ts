export as namespace unusual

export type UnusualInstance = {
  random: () => number
  integer: (x: { min: number; max: number }) => number
  pick: (a: any[]) => any
  pickKey: (a: Record<string, unknown>) => string
  pickValue: <X>(a: Record<string, X>) => X
  floor: (x: number) => number
  floorMin: (x: number, y: number) => number
  shuffle: <X>(a: X[]) => X[]
}

export function unusual(seed: string | number): UnusualInstance
export default unusual
