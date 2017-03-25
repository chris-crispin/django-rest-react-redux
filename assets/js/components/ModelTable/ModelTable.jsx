import React from 'react'
import './styles.scss'
import Table from 'react-bootstrap/lib/Table'
import TableRow from '../TableRow/TableRow'
import Spinner from '../Spinner/Spinner'

const ModelTable = ({ids, headers, entries, onRowClick, displayLoader}) => {
  const headings = headers.map(heading => <th key={heading}>{heading}</th>)

  let tableRows = []
  if (entries) {
    tableRows = entries.map((entry, i) =>
      <TableRow
        key={ids[i]}
        id={ids[i]}
        cells={entry}
        handleClick={onRowClick} />
    )
  }

  return (
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
  )
}

ModelTable.propTypes = {
  ids: React.PropTypes.array.isRequired,
  headers: React.PropTypes.array.isRequired,
  entries: React.PropTypes.array,
  onRowClick: React.PropTypes.func.isRequired,
  displayLoader: React.PropTypes.bool.isRequired
}

export default ModelTable
