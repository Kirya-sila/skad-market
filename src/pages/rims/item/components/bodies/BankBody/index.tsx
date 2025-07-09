import { HalvaIcon, SberIcon, TIcon } from '@/assets/icons'

import css from './BankBody.module.scss'

export const BankBody = () => {
  return (
    <div className={css.holder}>
      <div className={css.title}>Рассрочка</div>
      <div className={css.description}>Рассрочкой можно воспользоваться на сайте в процессе оформления заказа</div>
      <div className={css.list}>
        <div>
          <div>
            <span>
              <TIcon />
            </span>
            <span>Рассрочка от Тинькофф</span>
          </div>
          <ul>
            <li>для клиентов любых банков</li>
            <li>от 4 до 6 месяцев</li>
            <li>без первоночального взноса и переплат</li>
          </ul>
        </div>
        <div>
          <div>
            <span>
              <SberIcon />
            </span>
            <span>Рассрочка от Сбер Банка</span>
          </div>
          <ul>
            <li>для клиентов Сбербанка</li>
            <li>на 6 месяцев</li>
            <li>без первоночального взноса и переплат</li>
            <li>до 300 000 ₽</li>
          </ul>
        </div>
        <div>
          <div>
            <span>
              <HalvaIcon />
            </span>
            <span>Рассрочка от банка ХАЛВА</span>
          </div>
          <ul>
            <li>для держателей карты ХАЛВА</li>
            <li>до 12 месяцев</li>
            <li>без первоночального взноса и переплат</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
