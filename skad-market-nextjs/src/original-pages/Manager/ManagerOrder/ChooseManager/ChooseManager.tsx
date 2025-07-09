import { Button, Flex, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { ChooseManagerModal } from './ChooseManagerModal'
import { managersOrderStore } from '@/features/manager'
import { primaryBlack } from '@/theme'

// interface IAssignedManager {}

const StyledFlex = styled(Flex)({
  span: {
    fontSize: 16,
    lineHeight: '26px',
    fontWeight: 600,
  },
})

export const ChooseManager = observer(() => {
  const { assignedManagerFullName, chooseManagerModalOpen, handleOpenChooseManagerModal } = managersOrderStore

  return (
    <>
      <StyledFlex align='center'>
        <Typography.Text style={{ color: primaryBlack }}>Менеджер: </Typography.Text>
        {assignedManagerFullName ? (
          <Button color='default' variant='link' type='text' onClick={() => handleOpenChooseManagerModal(true)}>
            {assignedManagerFullName}
          </Button>
        ) : (
          <Button color='danger' variant='link' type='text' onClick={() => handleOpenChooseManagerModal(true)}>
            Не назначен
          </Button>
        )}
      </StyledFlex>
      {chooseManagerModalOpen && <ChooseManagerModal />}
    </>
  )
})
