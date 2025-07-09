import { FC } from "react"

interface ILabelsProps {
  labels: string[]
  className: string
}

export const Labels: FC<ILabelsProps> = ({ labels, className }) => (
  <div className={className}>
    {labels.map((x) => (
      <div key={`rim-item-label-${x}`}>{x}</div>
    ))}
  </div>
)
