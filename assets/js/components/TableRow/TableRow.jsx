import React from 'react'
import Checkbox from 'react-bootstrap/lib/Checkbox'
import './styles.scss'
import PropTypes from 'prop-types'

const TableRow = ({id, cells, handleClick}) => {
  const tableCells = cells.map((cell, i) => {
    if (cell === true) {
      cell = <Checkbox className='table-row__checkbox' disabled checked />
    } else if (cell === false) {
      cell = <Checkbox className='table-row__checkbox' disabled />
    }
    return <td className='table-cell' key={i}> {cell} </td>
  })
  return (
    <tr
      onClick={() => handleClick(id)}
      key={id} className='table-row'>
      {tableCells}
    </tr>
  )
}

TableRow.propTypes = {
  id: PropTypes.number.isRequired,
  cells: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default TableRow
