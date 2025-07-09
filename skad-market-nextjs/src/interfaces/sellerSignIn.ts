export interface ISellerSignIn {
  email: string
  password: string
}

export interface ISellerResetPassword {
  password: string
  passwordConfirmation: string
}

export interface ISellerResetPasswordRequest extends ISellerResetPassword {
  email: string
  token: string
}
