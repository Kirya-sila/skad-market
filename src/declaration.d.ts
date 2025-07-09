declare type ReactItem = JSX.Element | React.ReactNode

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T
}
