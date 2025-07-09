import css from './PaymentWays.module.scss'

export const PaymentWays = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.title}>Способы оплаты:</div>
      <div className={css.paymentItems}>
        {/* <div>Оплата онлайн</div> */}
        <div>При получении</div>
      </div>
    </div>
  )
}
