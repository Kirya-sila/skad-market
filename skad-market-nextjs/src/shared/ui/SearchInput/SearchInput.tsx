import { ChangeEvent, forwardRef, ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import { CloseIcon } from '@assets/icons/CloseIcon'
import { SearchIcon } from '@assets/icons/SearchIcon'
import { noop } from '@shared/libs'
import { useOnClickOutside } from '@shared/libs/hooks/useOnClickOutside'
import cn from 'classnames'
import css from './SearchInput.module.scss'

export interface SearchInputProps {
  value: string
  filled?: boolean
  className?: string
  showButton?: boolean
  placeholder?: string
  onBlur?: VoidFunction
  onFocus?: VoidFunction
  buttonIcon?: ReactNode
  suggestions?: Array<string>
  onChange: (value: string) => void
  onClickSuggestion?: (value: string) => void
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      onChange,
      className,
      suggestions,
      onBlur = noop,
      onFocus = noop,
      onClickSuggestion,
      showButton = true,
      buttonIcon = <SearchIcon />,
      placeholder = 'Искать товары',
    },
    ref,
  ) => {
    const [isInputFilled, setIsInputFilled] = useState(false)
    const innerRef = useRef(null)
    const suggestionsRef = useRef(null)
    const resolvedRef = (ref || innerRef) as RefObject<HTMLInputElement>
    const [hasSuggestions, setHasSuggestions] = useState(!!suggestions?.length)

    useEffect(() => {
      setHasSuggestions(!!suggestions?.length)
    }, [suggestions])

    useOnClickOutside([resolvedRef, suggestionsRef], () => setHasSuggestions(false))

    const highlightMatch = (suggestion: string, inputValue: string) => {
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
      setIsInputFilled(Boolean(value.length))
    }

    const handleReset = () => {
      onChange('')
      setIsInputFilled(false)
    }

    return (
      <div className={cn(css.container, className)}>
        <div className={cn(css.searchInput, { [css.filled]: isInputFilled, [css.hideButton]: !showButton })}>
          <input
            className={css.input}
            placeholder={placeholder}
            ref={resolvedRef}
            onChange={handleChange}
            type='text'
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          {isInputFilled && (
            <div className={css.resetButton} onClick={handleReset}>
              <CloseIcon />
            </div>
          )}
          {showButton && <button className={css.button}>{buttonIcon}</button>}
          {hasSuggestions && (
            <div className={css.suggestions} ref={suggestionsRef} id='searchInputSuggestions'>
              {suggestions?.map((suggestion, index) => (
                <div
                  key={index}
                  className={css.suggestion}
                  onClick={() => {
                    onClickSuggestion?.(suggestion)
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

SearchInput.displayName = 'SearchInput'
