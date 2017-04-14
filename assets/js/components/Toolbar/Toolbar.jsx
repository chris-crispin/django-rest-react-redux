import React from 'react'
import './styles.scss'
import PropTypes from 'prop-types'

const Toolbar = ({onChange, onSubmit, clearSearch, searchTerm, goToAddView}) => {
  return (
    <div id='toolbar'>
      <form
        className='toolbar__search'
        onSubmit={onSubmit}>
        <div className='toolbar__input-wrapper'>
          <i
            className='fa fa-search toolbar__input-icon'
            aria-hidden='true'
          />
          <input
            type='text' placeholder='Search'
            value={searchTerm}
            onChange={onChange}
            className='text-input'
          />
          <button
            type='submit'
            className='toolbar__search__button toolbar__button--submit'>
            Go
          </button>
        </div>
        <button
          className='toolbar__search__button toolbar__button--grey'
          onClick={clearSearch}>
          Clear
        </button>
      </form>
      <button
        className='toolbar__button toolbar__button--green'
        onClick={goToAddView}>
        New
      </button>
    </div>
  )
}

Toolbar.PropTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
  goToAddView: PropTypes.func.isRequired
}

export default Toolbar
