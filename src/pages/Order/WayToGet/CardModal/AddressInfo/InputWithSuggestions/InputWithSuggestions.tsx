import { ChangeEvent, forwardRef, ReactNode, useRef, useState } from 'react'
import { CloseIcon } from '@assets/icons/CloseIcon'
import { useOnClickOutside } from '@shared/libs/hooks/useOnClickOutside'
import cn from 'classnames'
import css from './InputWithSuggestions.module.scss'
import { noop } from '@/shared/libs'
import { TextInput } from '@/shared/ui'

export interface SearchInputProps {
  value: string
  filled?: boolean
  className?: string
  showButton?: boolean
  placeholder?: string
  onBlur?: VoidFunction
  onClick?: VoidFunction
  onFocus?: VoidFunction
  buttonIcon?: ReactNode
  suggestions?: Array<string>
  onChange: (value: string) => void
  onClickSuggestion?: (value: string) => void
}

export const InputWithSuggestions = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      onChange,
      className,
      suggestions,
      onBlur = noop,
      // onFocus = noop,
      onClickSuggestion,
      // showButton = true,
      // buttonIcon = <SearchIcon />,
      // placeholder = 'Искать товары',
    },
    ref,
  ) => {
    // const innerRef = useRef(null)
    const suggestionsRef = useRef(null)
    // const resolvedRef = (ref || innerRef) as RefObject<HTMLInputElement>
    // const [hasSuggestions, setHasSuggestions] = useState(!!suggestions?.length)
    const [focused, setFocused] = useState(false)

    // useEffect(() => {
    //   setHasSuggestions(!!suggestions?.length)
    // }, [suggestions])

    useOnClickOutside([suggestionsRef], () => setFocused(false))

    const highlightMatch = (suggestion = '', inputValue = '') => {
      const matchIndex = suggestion.toLowerCase().indexOf(inputValue.toLowerCase())
      if (matchIndex === -1) return suggestion

      return (
        <>
          {suggestion.substring(0, matchIndex)}
          <span className={css.highlight}>{suggestion.substring(matchIndex, matchIndex + inputValue.length)}</span>
          {suggestion.substring(matchIndex + inputValue.length)}
        </>
      )
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      onChange(value)
    }

    const handleReset = () => {
      onChange('')
    }

    const onFocus = () => {
      setFocused(true)
      // setHasSuggestions(true)
    }

    return (
      <div className={cn(css.container, className)}>
        <div className={cn(css.searchInput, { [css.filled]: !!value })}>
          <TextInput
            className={css.input}
            type='text'
            onChange={handleChange}
            value={value}
            placeholder='Введите адрес'
            renderRightIcon={<CloseIcon />}
            onIconClick={handleReset}
            onBlur={onBlur}
            onFocus={onFocus}
          />
          {/* {!!value && (
            <div className={css.resetButton} onClick={handleReset}>
              <CloseIcon />
            </div>
          )} */}
          {/* {showButton && <button className={css.button}>{buttonIcon}</button>} */}
          {!!suggestions?.length && focused && (
            <div className={css.suggestions} ref={suggestionsRef} id='searchInputSuggestions'>
              {suggestions?.map((suggestion, index) => (
                <div
                  key={index}
                  className={css.suggestion}
                  onClick={() => {
                    onClickSuggestion?.(suggestion)
                    setFocused(false)
                  }}
                >
                  {highlightMatch(suggestion, value)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  },
)

InputWithSuggestions.displayName = 'InputWithSuggestions'
