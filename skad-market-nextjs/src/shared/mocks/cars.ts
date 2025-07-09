interface CarSpecifications {
  [generation: string]: string[]
}

interface CarModels {
  [modelName: string]: CarSpecifications
}

interface CarsData {
  [countryName: string]: {
    [letterGroup: string]: {
      [brandName: string]: CarModels
    }
  }
}

interface BrandEntry {
  title: string
  entries: ModelGroup[]
}

interface ModelGroup {
  letter: string
  models: string[]
}

type NormalizedByCountry = {
  title: string
  entries: [string, string[]][]
}

interface GenerationSpec {
  [generation: string]: string[]
}

type NormalizedByMark = BrandEntry[]

type NormalizedByModel = BrandEntry[]

type NormalizedData = NormalizedByCountry[] | NormalizedByMark | NormalizedByModel

type NormalizeType = 'by_country' | 'by_mark' | 'by_model'

export const carsMockData: CarsData = {
  Russia: {
    L: {
      Lada: {
        Granta: {
          '2020.10 - present': ['1.6 (87 hp)', '1.6 (106 hp)'],
        },
        Priora: {
          '2007.10 - 2018.12': ['1.6 (98 hp)', '1.6 (106 hp)'],
        },
      },
      LuAZ: {
        '969M': {
          '1979 - 1994': ['1.2 (40 hp)'],
        },
      },
    },
    G: {
      GAZ: {
        Siber: {
          '2014 - present': ['2.7 (149 hp)', '3.0 (170 hp)'],
        },
      },
    },
    U: {
      UAZ: {
        Patriot: {
          '2014.07 - present': ['2.7 (134 hp)', '2.7 (150 hp)'],
        },
        Hunter: {
          '2003 - present': ['2.7 (112 hp)'],
        },
      },
    },
    M: {
      Moskvich: {
        '2141': {
          '1986 - 2000': ['1.6 (75 hp)', '1.7 (80 hp)'],
        },
      },
    },
    Z: {
      ZIL: {
        '130': {
          '1976 - 1994': ['V8 (150 hp)', 'V8 (180 hp)'],
        },
      },
    },
    K: {
      KamAZ: {
        '5490': {
          '2015 - present': ['10.8 (240 hp)', '11.8 (320 hp)'],
        },
      },
    },
    B: {
      BelAZ: {
        '7540': {
          '1996 - present': ['19.0 (1300 hp)', '20.6 (1500 hp)'],
        },
      },
    },
    V: {
      VAZ: {
        '2101': {
          '1970 - 1988': ['1.2 (58 hp)', '1.3 (64 hp)'],
        },
      },
      Volga: {
        '3102': {
          '1982 - 2009': ['2.3 (105 hp)'],
        },
      },
    },
    T: {
      TagAZ: {
        C10: {
          '2002 - 2014': ['1.6 (98 hp)', '1.6 (106 hp)'],
        },
      },
    },
    N: {
      NAMI: {
        Legend: {
          '2020.05 - present': ['3.5 (270 hp)', '4.4 (400 hp)'],
        },
      },
    },
  },
  China: {
    B: {
      Brilliance: {
        V3: {
          '2014 - 2020': ['1.5 (112 hp)'],
          '2020 - present': ['1.5 Turbo (150 hp)'],
        },
        H530: {
          '2011 - 2017': ['1.5 (105 hp)', '1.6 (118 hp)'],
        },
      },
      BYD: {
        F3: {
          '2005 - 2013': ['1.5 (100 hp)'],
          '2013 - present': ['1.5 (107 hp)'],
        },
        Tang: {
          '2018 - present': ['2.0 Turbo PHEV (500 hp)'],
        },
      },
    },
    C: {
      Changan: {
        CS75: {
          '2013 - 2018': ['1.8 Turbo (177 hp)'],
          '2018 - present': ['1.5 Turbo (178 hp)', '2.0 Turbo (233 hp)'],
        },
        Eado: {
          '2012 - 2017': ['1.6 (125 hp)'],
          '2017 - present': ['1.0 Turbo (136 hp)', '1.6 (128 hp)'],
        },
      },
      Chery: {
        'Tiggo 5': {
          '2013 - 2016': ['2.0 (139 hp)'],
          '2016 - present': ['1.5 Turbo (152 hp)'],
        },
        'Arrizo 5': {
          '2016 - present': ['1.5 (116 hp)', '1.5 Turbo (147 hp)'],
        },
      },
    },
    D: {
      DongFeng: {
        A30: {
          '2014 - present': ['1.6 (123 hp)'],
        },
        AX7: {
          '2014 - 2020': ['2.0 (140 hp)'],
          '2020 - present': ['1.6 Turbo (204 hp)'],
        },
      },
    },
    E: {
      Exeed: {
        TXL: {
          '2019 - present': ['1.6 Turbo (197 hp)', '2.0 Turbo (249 hp)'],
        },
      },
    },
    F: {
      FAW: {
        'Besturn X40': {
          '2017 - present': ['1.6 (116 hp)'],
        },
        'Hongqi H5': {
          '2017 - present': ['1.8 Turbo (204 hp)', '2.0 Turbo (252 hp)'],
        },
      },
      Foton: {
        Tunland: {
          '2011 - present': ['2.8 (130 hp)'],
        },
      },
    },
    G: {
      GAC: {
        GS4: {
          '2015 - present': ['1.3 Turbo (137 hp)', '1.5 Turbo (169 hp)'],
        },
        'Trumpchi GA6': {
          '2014 - 2020': ['1.6 Turbo (163 hp)'],
          '2020 - present': ['2.0 Turbo (252 hp)'],
        },
      },
      Geely: {
        Coolray: {
          '2019 - present': ['1.5 Turbo (177 hp)'],
        },
        Atlas: {
          '2016 - present': ['2.4 (139 hp)', '1.8 Turbo (184 hp)'],
        },
      },
      'Great Wall': {
        'Wingle 6': {
          '2014 - present': ['2.0 Turbo (143 hp)', '2.4 (122 hp)'],
        },
      },
    },
    H: {
      Haima: {
        S5: {
          '2014 - present': ['1.6 (120 hp)', '1.5 Turbo (160 hp)'],
        },
      },
      Haval: {
        H6: {
          '2011 - 2021': ['1.5 Turbo (150 hp)', '2.0 Turbo (190 hp)'],
          '2021 - present': ['2.0 Turbo (224 hp)'],
        },
        H9: {
          '2015 - present': ['2.0 Turbo (224 hp)', '2.0 Turbo (251 hp)'],
        },
      },
    },
    L: {
      'Lynk & Co': {
        '01': {
          '2017 - present': ['2.0 Turbo (190 hp)', '1.5 Turbo (180 hp)'],
        },
      },
    },
  },
  Japan: {
    T: {
      Toyota: {
        Corolla: {
          '2019 - present': ['1.8 Hybrid (122 hp)', '2.0 Hybrid (180 hp)'],
        },
        Camry: {
          '2018 - present': ['2.5 (209 hp)', '2.5 Hybrid (218 hp)'],
        },
        'Land Cruiser': {
          '2020 - present': ['3.5 Turbo (409 hp)', '4.0 V6 (271 hp)'],
        },
      },
      Suzuki: {
        Swift: {
          '2017 - present': ['1.2 (83 hp)', '1.0 Turbo (111 hp)'],
        },
        Jimny: {
          '2018 - present': ['1.5 (102 hp)'],
        },
      },
    },
    H: {
      Honda: {
        Civic: {
          '2017 - present': ['1.0 Turbo (129 hp)', '1.5 Turbo (182 hp)'],
        },
        Accord: {
          '2018 - present': ['1.5 Turbo (192 hp)', '2.0 Turbo (252 hp)'],
        },
      },
      Mazda: {
        'CX-5': {
          '2017 - present': ['2.0 (165 hp)', '2.5 Turbo (230 hp)'],
        },
        Mazda3: {
          '2019 - present': ['2.0 (150 hp)', '2.5 Turbo (250 hp)'],
        },
      },
    },
    N: {
      Nissan: {
        Qashqai: {
          '2021 - present': ['1.3 Turbo (140 hp)', '1.3 Turbo (158 hp)'],
        },
        'GT-R': {
          '2007 - present': ['3.8 V6 Turbo (570 hp)'],
        },
      },
    },
    S: {
      Subaru: {
        Outback: {
          '2020 - present': ['2.5 (185 hp)', '2.4 Turbo (260 hp)'],
        },
        Forester: {
          '2019 - present': ['2.5 (182 hp)'],
        },
      },
    },
    I: {
      Isuzu: {
        'D-Max': {
          '2020 - present': ['1.9 Diesel (163 hp)', '3.0 Diesel (190 hp)'],
        },
      },
    },
    L: {
      Lexus: {
        RX: {
          '2020 - present': ['3.5 V6 (295 hp)', '2.0 Turbo (235 hp)'],
        },
      },
    },
    M: {
      Mitsubishi: {
        Outlander: {
          '2021 - present': ['2.4 (167 hp)', '2.0 PHEV (224 hp)'],
        },
        Lancer: {
          '2007 - 2017': ['1.6 (117 hp)', '2.0 (150 hp)', '2.0 Turbo (295 hp)'],
        },
      },
    },
  },
  Korea: {
    C: {
      Chevrolet: {
        Spark: {
          '2016 - present': ['1.4 (98 hp)'],
        },
      },
    },
    H: {
      Hyundai: {
        Elantra: {
          '2019 - present': ['2.0 (147 hp)', '1.6 (121 hp)'],
        },
      },
    },
    K: {
      Kia: {
        Sportage: {
          '2017 - present': ['2.0 (155 hp)', '2.4 (181 hp)'],
        },
      },
    },
    S: {
      SsangYong: {
        Tivoli: {
          '2015 - present': ['1.6 (128 hp)', '1.5 (163 hp)'],
        },
      },
    },
    G: {
      Genesis: {
        G70: {
          '2018 - present': ['2.0 (252 hp)', '3.3 (365 hp)'],
        },
      },
    },
    R: {
      'Renault Samsung': {
        QM6: {
          '2016 - present': ['1.6 (130 hp)', '2.0 (190 hp)'],
        },
        SM6: {
          '2016 - present': ['2.0 (150 hp)', '1.6 Turbo (190 hp)'],
        },
      },
    },
  },
  Europe: {
    A: {
      Audi: {
        A4: {
          '2019 - present': ['2.0 (150 hp)', '3.0 (354 hp)'],
        },
      },
    },
    B: {
      BMW: {
        '3 Series': {
          '2018 - present': ['2.0 (184 hp)', '3.0 (374 hp)'],
        },
      },
    },
    F: {
      Fiat: {
        '500': {
          '2020 - present': ['1.0 (70 hp) Hybrid'],
        },
      },
    },
    M: {
      'Mercedes-Benz': {
        'C-Class': {
          '2020 - present': ['1.5 (184 hp)', '2.0 (258 hp)'],
        },
      },
    },
    V: {
      Volkswagen: {
        Passat: {
          '2019 - present': ['1.5 (150 hp)', '2.0 (190 hp)'],
        },
      },
    },
    P: {
      Peugeot: {
        '308': {
          '2021 - present': ['1.2 (130 hp)', '1.5 (130 hp)'],
        },
      },
    },
    R: {
      Renault: {
        Megane: {
          '2020 - present': ['1.3 Turbo (140 hp)', '1.5 Diesel (115 hp)'],
        },
        Logan: {
          '2020 - present': ['1.3 Turbo (140 hp)', '1.5 Diesel (115 hp)'],
        },
      },
    },
  },
  Other: {
    C: {
      Chevrolet: {
        Malibu: {
          '2019 - present': ['1.5 Turbo (160 hp)', '2.0 Turbo (250 hp)'],
        },
      },
    },
    T: {
      Toyota: {
        Camry: {
          '2018 - present': ['2.5 (203 hp)', '3.5 (301 hp)'],
        },
      },
    },
    N: {
      Nissan: {
        Altima: {
          '2019 - present': ['2.5 (188 hp)', '2.0 (248 hp)'],
        },
      },
    },
    F: {
      Ford: {
        Focus: {
          '2019 - present': ['1.0 (125 hp)', '1.5 (150 hp)'],
        },
      },
    },
    M: {
      Mazda: {
        Mazda3: {
          '2019 - present': ['2.0 (155 hp)', '2.5 (186 hp)'],
        },
      },
    },
    H: {
      Honda: {
        Accord: {
          '2018 - present': ['1.5 (192 hp)', '2.0 (252 hp)'],
        },
      },
      Hyundai: {
        Sonata: {
          '2020 - present': ['2.5 (191 hp)', '1.6 Turbo (180 hp)'],
        },
      },
    },
  },
}
