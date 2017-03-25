import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import TableRow from '../components/TableRow/TableRow'
import { describe, it } from 'mocha'

describe('<TableRow/>', () => {
  const dummyFunction = () => 0

  it('should blah', () => {
    const wrapper = shallow(<TableRow id={1} cells={['test, testing', 'test']} handleClick={dummyFunction} />)

    // console.log(wrapper.debug())
    expect(wrapper.find('.table-row')).to.have.length(1)
    expect(wrapper.find('.table-cell')).to.have.length(2)
  })
})
