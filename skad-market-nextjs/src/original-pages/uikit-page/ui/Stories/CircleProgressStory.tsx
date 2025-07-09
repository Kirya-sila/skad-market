import React, { useState } from 'react'
import { Row, Section, Title } from '@/pages/uikit-page/ui/common'
import { CircleProgress, RegularButton } from '@shared/ui'
import { useCountdownCounter } from '@shared/libs'

export const CircleProgressStory = () => {
  const [force, setForce] = useState(1)

  const Wrap = () => {
    const total = 10
    const countdownFromTen = useCountdownCounter({ startValue: 10, endValue: 0, interval: 500 })
    const countdownFromFive = useCountdownCounter({ startValue: 5, endValue: 0, interval: 1000 })
    const countdownFromSixty = useCountdownCounter({ startValue: 60, endValue: 0, interval: 100 })

    return (
      <Section>
        <Title>CIRCLE PROGRESS</Title>
        <Row>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              background: 'black',
              borderRadius: 20,
              padding: 20,
              marginRight: '20px',
            }}
          >
            <CircleProgress current={countdownFromTen.current} total={total} radius={50} strokeWidth={30} />
            <CircleProgress current={countdownFromFive.current} total={5} />
            <CircleProgress current={countdownFromTen.current} total={total} strokeWidth={1} />
            <CircleProgress current={countdownFromSixty.current} total={60} radius={30} strokeWidth={4} />
          </div>
          <RegularButton
            text="RESTART"
            variant="outline"
            size="large"
            appearance="secondary"
            onClick={() => setForce(force + 1)}
          />
        </Row>
      </Section>
    )
  }

  return <Wrap key={force} />
}
