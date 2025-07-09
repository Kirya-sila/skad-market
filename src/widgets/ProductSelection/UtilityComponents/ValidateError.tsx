import css from '../ProductSelection.module.scss'

export const ValidateError = ({ isValidateError }: { isValidateError: boolean }) =>
  isValidateError ? <div className={css.validateError}>Необходимо настроить хотя бы один фильтр</div> : null
