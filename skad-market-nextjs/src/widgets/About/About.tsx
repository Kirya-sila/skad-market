import { ICArrowRightLine } from '@assets/icons'
import cn from 'classnames'
import css from './About.module.scss'

interface AboutProps {
  className?: string
}

const AboutItem = ({ title, description }: { title: string; description: string }) => (
  <div className={css.aboutItem}>
    <div className={css.aboutItemTitle}>{title}</div>
    <div className={css.aboutItemDescription}>{description}</div>
  </div>
)

const ExpandButton = ({ className }: { className?: string }) => (
  <button className={cn(css.expand, className)}>
    Подробнее о SkadMarket
    <ICArrowRightLine />
  </button>
)

export const About = ({ className }: AboutProps) => {
  return (
    <div className={cn(css.about, className)}>
      <div className={css.header}>
        <div className={css.title}>О SkadMarket</div>
        <ExpandButton />
      </div>
      <div className={css.body}>
        <AboutItem title='100%' description='продавцов проходят строгую премодерацию' />
        <AboutItem title='800+' description='доставок в неделю по всей России' />
        <AboutItem title='24/7' description='вашим услугам служба поддержки клиентов' />
        <AboutItem title='850+' description='довольных клиентов в неделю' />
      </div>
      <ExpandButton className={css.bottomExpand} />
    </div>
  )
}

About.displayName = 'About'
