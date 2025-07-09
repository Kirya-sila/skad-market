export enum Tabs {
  All = 'Все',
  OriginalParams = 'Оригинальные параметры',
  AcceptableParams = 'Допустимые параметры',
  TuneParams = 'Тюнинговые параметры',
  SupetTuneParams = 'Супертюнинговые параметры',
}

export enum Params {
  All = 'All',
  O = 'O',
  OT = 'OT',
  T = 'T',
  TT = 'TT',
}

export const ApplicabilityParams = {
  [Params.All]: Tabs.All,
  [Params.O]: Tabs.OriginalParams,
  [Params.OT]: Tabs.AcceptableParams,
  [Params.T]: Tabs.TuneParams,
  [Params.TT]: Tabs.SupetTuneParams,
}
