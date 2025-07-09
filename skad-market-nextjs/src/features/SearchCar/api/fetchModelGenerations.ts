import { httpClient } from '@shared/api/httpClient';
import { apiRoutes } from '@/app-settings';
import { Generation } from '@/features/SearchCar/model/types';

export const fetchModelGenerations = async (brand: string, model: string): Promise<Generation[]> => {
  const data: Generation[] = await httpClient(`${apiRoutes.carGenerations}?Brand=${brand}&Model=${model}`)

  return data
}
