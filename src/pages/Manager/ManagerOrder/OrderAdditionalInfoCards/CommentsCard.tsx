import { useState } from 'react'
import { Button, Flex } from 'antd'
import { EditableTextField, InfoText } from '@/shared/ui'
import { managersOrderStore } from '@/features/manager'
import { observer } from 'mobx-react-lite'
import { OrderStatus } from '@/interfaces'

export const CommentsCard = observer(() => {
  const {
    commentsCardData,
    orderStatusInfo: { status },
  } = managersOrderStore
  const [editableStr, setEditableStr] = useState(commentsCardData ?? '')
  const [expanded, setExpanded] = useState(false)
  const [isEllipsis, setEllipsis] = useState(false)

  const handleExpand = () => {
    if (expanded) {
      setExpanded(false)
    } else {
      setExpanded(true)
    }
  }

  const handleEdit = (value: string) => {
    setEditableStr(value)
  }

  return (
    <Flex vertical gap={10} style={{ width: '100%' }}>
      {status !== OrderStatus.canceled ? (
        // <EditableTextField
        //   onChange={handleEdit}
        //   ellipsis={{
        //     rows: 5,
        //     onExpand: (_, info) => setExpanded(info.expanded),
        //     expanded,
        //     onEllipsis: (ellipsis) => setEllipsis(ellipsis),
        //   }}
        // >
        //   {editableStr}
        // </EditableTextField>
        <InfoText>{commentsCardData ?? ''}</InfoText>
      ) : (
        <InfoText>{commentsCardData ?? ''}</InfoText>
      )}

      <Flex justify='space-between'>
        {isEllipsis && (
          <Button style={{ padding: 0 }} variant='link' color='primary' onClick={handleExpand}>
            {!expanded ? 'Читать полностью' : 'Свернуть'}
          </Button>
        )}
      </Flex>
    </Flex>
  )
})
