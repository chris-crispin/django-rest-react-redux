import React from 'react'
import './styles.scss'
import Table from 'react-bootstrap/lib/Table'
import TableRow from '../TableRow/TableRow'
import Spinner from '../Spinner/Spinner'
import Pagination from 'react-bootstrap/lib/Pagination'
import AppHandlerHelper from '../../helpers/AppHandlerHelper'

const ModelTable = ({ids, entries, displayLoader, pages, page, lookup}) => {
  const headings = ['Name', 'User', 'Email', 'Active', 'Staff',
    'Superuser'].map(heading => <th key={heading}>{heading}</th>)

  let tableRows = []
  if (entries) {
    tableRows = entries.map((entry, i) =>
      <TableRow
        key={ids[i]}
        id={ids[i]}
        cells={entry}
        handleClick={() => AppHandlerHelper.handleClick(ids[i], lookup)} />
    )
  }

  return (
    <div>
      <div className='table'>
        {displayLoader &&
          <Spinner />
        }
        <Table striped hover responsive condensed>
          <thead>
            <tr>
              {headings}
            </tr>
          </thead>
        </Table>
        <div className='table__body'>
          <Table striped condensed responsive hover>
            <tbody>
              {tableRows}
            </tbody>
          </Table>
        </div>
      </div>
      <div className='pagination-container'>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          items={pages}
          maxButtons={5}
          activePage={page}
          onSelect={() => {}}
        />
      </div>
    </div>
  )
}

ModelTable.propTypes = {
  ids: React.PropTypes.array.isRequired,
  entries: React.PropTypes.array.isRequired,
  displayLoader: React.PropTypes.bool.isRequired,
  pages: React.PropTypes.number.isRequired,
  page: React.PropTypes.number.isRequired,
  lookup: React.PropTypes.func.isRequired
}

export default ModelTable
