import React from 'react'
import { Collapse } from 'antd'

export const FaqSection = () => (
  <Collapse>
    <Collapse.Panel header='Вопрос 1' key='1'>Ответ 1</Collapse.Panel>
    <Collapse.Panel header='Вопрос 2' key='2'>Ответ 2</Collapse.Panel>
  </Collapse>
)