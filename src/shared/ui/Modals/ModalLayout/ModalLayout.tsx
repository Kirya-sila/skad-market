import { FC, ReactNode } from 'react'
import styled from 'styled-components'
import { Underlay } from '../ModalBase'
import { withStopPropagation } from '@/shared/libs'
import { primaryWhite } from '@/theme'

interface IModalLayout {
  onClose: VoidFunction
  width?: number | string
  children: ReactNode
}

const Layout = styled('div')<{ width: number | string }>(({ width }) => ({
  borderRadius: 20,
  width,
  backgroundColor: primaryWhite,
  zIndex: 105,
  padding: 40,
}))

export const ModalLayout: FC<IModalLayout> = ({ onClose, children, width = 'auto' }) => {
  return (
    <Underlay onClick={onClose}>
      <Layout width={width} onClick={withStopPropagation()}>
        {children}
      </Layout>
    </Underlay>
  )
}
