import React, { FC, PropsWithChildren, useId } from 'react'

export const CarTabColumn = ({ children }: PropsWithChildren) => {
  const uniqId = useId()
  return <React.Fragment key={uniqId}>{children}</React.Fragment>
}
