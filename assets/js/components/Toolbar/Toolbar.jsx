import React from 'react'
import './styles.scss'

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
            defaultValue={searchTerm}
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
  onChange: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  clearSearch: React.PropTypes.func.isRequired,
  searchTerm: React.PropTypes.string,
  goToAddView: React.PropTypes.func.isRequired
}

export default Toolbar
