import React, { PropsWithChildren } from 'react'
import css from '@/pages/uikit-page/ui/common.module.scss'

export const Row = ({ children }: PropsWithChildren) => <div className={css.row}>{children}</div>
export const Section = ({ children }: PropsWithChildren) => <div className={css.section}>{children}</div>
export const Title = ({ children }: PropsWithChildren) => <h3 className={css.title}>{children}</h3>
export const Label = ({ children }: PropsWithChildren) => <p className={css.label}>{children}</p>
