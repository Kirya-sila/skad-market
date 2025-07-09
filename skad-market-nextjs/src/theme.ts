import { Theme } from 'antd/es/config-provider/context'

type ThemeData = {
  borderRadius: number
  colorPrimary: string
  Button?: {
    colorPrimary: string
    algorithm?: boolean
  }
}

export const primaryMainBlue = '#136793'
export const primaryLightBlue = '#1B88C0'
export const primaryDarkestGray = '#656f72'
export const primaryLightestGray = '#f1f5f6'
export const primaryDarkGray = '#909799'
export const primaryLightGray = '#dcdfe0'
export const primaryBlack = '#282f31'
export const primaryGray = '#ced4d6'
export const primaryWhite = '#ffffff'
export const primaryRed = '#ea4747'
export const primaryOrange = '#f1713a'
export const primaryGreen = '#28ad25'
export const primaryBlue = '#136793'

export const theme = {
  token: {
    fontFamily: 'Hauora, sans-serif',
    colorPrimary: primaryMainBlue,
    borderRadius: 8,
    // borderRadiusSM: 8,
    colorText: primaryDarkestGray,
    colorTextDescription: primaryDarkGray,
    colorTextHeading: primaryBlack,
    colorLink: primaryMainBlue,
    fontSizeHeading1: 42,
    fontSizeHeading3: 32,
    fontSizeHeading4: 24,
    fontSizeHeading5: 20,
    screenXSMin: 0,
    screenXS: 359,
    screenXSMax: 359,
    screenSMMin: 360,
    screenSMMax: 767,
    screenMDMin: 768,
    screenMD: 768,
    screenMDMax: 1023,
    screenLGMin: 1024,
    screenLG: 1024,
    screenLGMax: 1199,
    screenXLMin: 1200,
    screenXL: 1200,
    screenXLMax: 1439,
    screenXXLMin: 1440,
    screenXXL: 1440,
  },
  components: {
    Button: {
      // colorPrimary: primaryMainBlue,
      paddingInlineLG: 32,
      paddingBlockLG: 16,
      controlHeightLG: 56,
      controlHeight: 36,
      defaultBorderColor: primaryBlack,
      defaultColor: primaryBlack,
      fontWeight: 600,
      // primaryColor: primaryMainBlue,
    },
    Select: {
      colorBgContainer: primaryLightestGray,
      colorBorder: 'none',
      colorTextPlaceholder: primaryDarkestGray,
      controlHeightLG: 56,
      controlHeight: 56,
      controlHeightSM: 36,
      optionHeight: 36,
      optionPadding: '5px 12px',
    },
    Typography: {
      titleMarginTop: 0,
      titleMarginBottom: 0,
    },
    DatePicker: {
      colorBgContainer: primaryLightestGray,
      colorBorder: primaryLightestGray,
      controlHeightSM: 36,
    },
    Radio: {
      radioSize: 18,
      dotSize: 8,
    },
    Input: {
      paddingBlock: 6,
    },
    Checkbox: {
      fontSize: 16,
    },
  },
}
