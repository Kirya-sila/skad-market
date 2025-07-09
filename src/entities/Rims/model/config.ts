export type SortingConfig = {
  direction: 'asc' | 'desc'
}

export const sortingConfig: Record<string, SortingConfig> = {
  offsets: {
    direction: 'desc',
  },
  hubHoleDiameters: {
    direction: 'asc',
  },
}
