export enum BuyerOrderStatusEnum {
  new = 'Новый',
  toWork = 'К выполению',
  inProgress = 'В работе',
  waitingForPayment = 'Ожидает оплаты',
  delivered = 'Доставлен',
  canceled = 'Отменен',
  canceledByManager = 'Отменен менеджером',
  canceledByByuer = 'Отменен продавцом',
}

export enum BuyerOrderPaymentStatusEnum {
  payed = 'payed',
  refund = 'refund',
  waitingForPayment = 'waitingForPayment',
}
