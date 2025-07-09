import { useEffect } from 'react'
import { SearchIcon } from '@assets/icons/SearchIcon'
import css from './SearchWidget.module.scss'

export const SearchWidget = () => {
  return (
    <>
      <div id='widget-script' style={{ display: 'none' }}></div>
      <div className={css.search} id='search-widget'>
        <span className={css.placeholder}>Искать товары</span>
        <div
          className='sm-search-button'
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: '2',
            borderRadius: 'inherit',
          }}
          // onClick={(e) => console.log(e.target)}
        ></div>
        <button className={css.button}>
          <SearchIcon />
        </button>
      </div>
    </>
  )
}
