import React from 'react'
import './styles.scss'
import Table from 'react-bootstrap/lib/Table'
import TableRow from '../TableRow/TableRow'
import Spinner from '../Spinner/Spinner'
import Pagination from 'react-bootstrap/lib/Pagination'
import ClientUrlBuilder from '../../helpers/ClientUrlBuilder'
import { MODEL_HEADERS } from '../../helpers/ModelHelper'
import PropTypes from 'prop-types'

export class ModelTable extends React.Component {

  componentDidMount () {
    this.props.search(this.props.params.searchTerm, parseInt(this.props.params.page, 10), this.props.params.model)
  }

  componentWillUpdate (nextProps) {
    if (this.props.params.searchTerm !== nextProps.params.searchTerm) {
      this.props.search(nextProps.params.searchTerm, parseInt(this.props.params.page, 10), this.props.params.model)
    }
    if (this.props.params.page !== nextProps.params.page) {
      this.props.search(this.props.params.searchTerm, parseInt(nextProps.params.page, 10), this.props.params.model)
    }
  }

  render () {
    const headings = MODEL_HEADERS[this.props.params.model].map(heading => <th key={heading}>{heading}</th>)

    let tableRows = []
    if (this.props.entries) {
      tableRows = this.props.entries.map((entry, i) =>
        <TableRow
          key={this.props.ids[i]}
          id={this.props.ids[i]}
          cells={entry}
          handleClick={() => ClientUrlBuilder.editView(this.props.ids[i], this.props.params.model)} />
      )
    }

    return (
      <div>
        {(this.props.displayLoader && this.props.entries.length === 0) &&
          <div className='table--container'>
            <Spinner />
          </div>
        }
        {this.props.entries.length > 0 &&
          <div>
            <div className='table--container'>
              {this.props.displayLoader &&
                <Spinner />
              }
              <div>
                <Table className='table' striped condensed responsive hover>
                  <thead>
                    <tr>
                      {headings}
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows}
                  </tbody>
                </Table>
              </div>
            </div>
            <div className='pagination--container'>
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
                onSelect={(e) => ClientUrlBuilder.searchView(this.props.params.searchTerm, e, this.props.params.model)}
              />
            </div>
          </div>}
      </div>
    )
  }
}

ModelTable.propTypes = {
  ids: PropTypes.array.isRequired,
  entries: PropTypes.array.isRequired,
  displayLoader: PropTypes.bool.isRequired,
  pages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  lookup: PropTypes.func.isRequired
}

export default ModelTable
