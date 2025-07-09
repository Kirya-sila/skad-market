import React from 'react'
import { RegularButton } from '@shared/ui/RegularButton'

interface ParamsButtonProps {
  text: string
  onClick?: () => void
}

export const ParamsButton = ({ text, onClick }: ParamsButtonProps) => {
  return <RegularButton text={text} size="middle" onClick={onClick} variant="text" appearance="secondary" />
}

ParamsButton.displayName = 'ParamsButton'
