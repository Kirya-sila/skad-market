import { Flex } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Copyright } from '../Copyright'
import { appRoutes } from '@/app-settings'
import { RegularButton } from '@/shared/ui'
import { primaryGray } from '@/theme'

const baseInfo = [
  { path: appRoutes.about, label: 'О SkadMarket' },
  { path: appRoutes.contacts, label: 'Контакты' },
  { path: appRoutes.forSellers, label: 'Продавцам' },
]

const policyInfo = [
  { path: appRoutes.userAgreement, label: 'Пользовательское соглашение' },
  { path: appRoutes.policy, label: 'Политика обработки персональных даннных' },
  { path: appRoutes.personalInfoAgreement, label: 'Соглашение на обработку персональных данных' },
]

export const ManagerPageFooter = () => {
  const navigate = useNavigate()
  return (
    <Flex vertical gap={30} style={{ borderTop: `1px solid ${primaryGray}`, padding: '16px 0' }}>
      <Flex gap={28}>
        {baseInfo.map(({ label, path }) => (
          <RegularButton
            key={path}
            variant='text'
            text={label}
            appearance='defaultText'
            onClick={() => navigate(path)}
            style={{ fontWeight: 500, fontSize: 14 }}
          />
        ))}
      </Flex>
      <Flex justify='space-between'>
        <Flex gap={28}>
          {policyInfo.map(({ label, path }) => (
            <RegularButton
              key={path}
              variant='text'
              text={label}
              appearance='defaultText'
              onClick={() => navigate(path)}
              style={{ fontWeight: 400, fontSize: 12, height: 16 }}
            />
          ))}
        </Flex>
        <Flex style={{ fontSize: 12 }}>
          <Copyright />
        </Flex>
      </Flex>
    </Flex>
  )
}
