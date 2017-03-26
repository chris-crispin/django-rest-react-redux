import React from 'react'
import './styles.scss'
import Table from 'react-bootstrap/lib/Table'
import TableRow from '../TableRow/TableRow'
import Spinner from '../Spinner/Spinner'
import Pagination from 'react-bootstrap/lib/Pagination'
import ClientUrlBuilder from '../../helpers/ClientUrlBuilder'

export class ModelTable extends React.Component {

  componentDidMount () {
    this.props.search(this.props.params.searchTerm, parseInt(this.props.params.page, 10))
  }

  componentWillUpdate (nextProps) {
    if (this.props.params.searchTerm !== nextProps.params.searchTerm) {
      this.props.search(nextProps.params.searchTerm, parseInt(this.props.params.page, 10))
    }
  }

  render () {
    const headings = ['Name', 'User', 'Email', 'Active', 'Staff',
      'Superuser'].map(heading => <th key={heading}>{heading}</th>)

    let tableRows = []
    if (this.props.entries) {
      tableRows = this.props.entries.map((entry, i) =>
        <TableRow
          key={this.props.ids[i]}
          id={this.props.ids[i]}
          cells={entry}
          handleClick={() => ClientUrlBuilder.editUserView(this.props.ids[i])} />
      )
    }

    return (
      <div>
        <div className='table'>
          {this.props.displayLoader &&
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
            items={this.props.pages}
            maxButtons={5}
            activePage={this.props.page}
            onSelect={() => {}}
          />
        </div>
      </div>
    )
  }
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
