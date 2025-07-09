import { Generation } from '@/features/SearchCar/model/types'

export const getGenerationLabel = (generation: Generation): string => {
  const { beginVIP, endVIP, bodyDefenition, bodyType, doorsAmount, lzxpcd } = generation

  return `${beginVIP} - ${endVIP} ${bodyDefenition} ${bodyType} ${lzxpcd} ${doorsAmount ? '(' + doorsAmount + ')' : ''}`
}

