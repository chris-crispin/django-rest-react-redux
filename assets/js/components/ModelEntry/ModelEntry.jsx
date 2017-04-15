/* global localStorage */
import React from 'react'
import './styles.scss'
import Form from 'react-bootstrap/lib/Form'
import Col from 'react-bootstrap/lib/Col'
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb'
import Label from 'react-bootstrap/lib/Label'
import Spinner from '../Spinner/Spinner'
import ClientUrlBuilder from '../../helpers/ClientUrlBuilder'
import PropTypes from 'prop-types'
import FormField from '../FormField/FormField'
import FormCheckbox from '../FormCheckbox/FormCheckbox'
import { MODEL_FORM } from '../../helpers/ModelHelper'

export class ModelEntry extends React.Component {

  constructor (props, context) {
    super(props, context)
    this.state = {
      ...this.props.entry
    }
  }

  _update (props) {
    if (props.params.id !== 'add') {
      this.props.lookup(props.params.id, props.params.model)
    }
  }

  componentDidMount () {
    this._update(this.props)
  }

  componentWillUpdate (nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      this._update(nextProps)
    }
    if (this.props.entry !== nextProps.entry) {
      this.setState({...nextProps.entry})
    }
  }

  _onChangeHandler (field, e) {
    if (e.target.type === 'checkbox') {
      this.setState({[field]: e.target.checked})
    } else {
      this.setState({[field]: e.target.value})
    }
  }

  _onSubmit (formValidated, e) {
    if (e) {
      e.preventDefault()
    }
    if (formValidated) {
      const username = localStorage.getItem('user')
      if (this.props.id) {
        this.props.put(this.props.id, username, this.state, this.props.params.model)
      } else {
        this.props.post(username, this.state, this.props.params.model)
      }
    }
  }

  render () {
    let fields = []
    let validateForm = []
    if (this.props.entry !== null) {
      fields = Object.keys(this.props.entry).map((key, i) => {
        const field = MODEL_FORM[this.props.params.model][key]
        if (field) {
          if (field.type === 'checkbox') {
            return <Col key={i} xs={12} sm={8}>
              <FormCheckbox label={field.label}
                value={this.state[key]}
                onChange={this._onChangeHandler.bind(this, key)} />
            </Col>
          }
          let validate = null
          if (field.validate) {
            validate = field.validate.bind(null, this.state[key])
            if (field.validateArgs) {
              field.validateArgs.forEach(arg => {
                validate = validate.bind(null, this.state[arg])
              })
            }
            validateForm.push(validate)
          }
          return <Col key={i} xs={12} sm={8}>
            <FormField label={field.label}
              type={field.type}
              validate={validate}
              value={this.state[key]}
              onChange={this._onChangeHandler.bind(this, key)} />
          </Col>
        }
      })
    }
    const formValidated = validateForm.every(validateFn => validateFn() === 'success' || validateFn() === 'warning')
    return (
      <div className='entry-container'>
        <Breadcrumb className='entry-container__breadcrumb'>
          <Breadcrumb.Item onClick={() => ClientUrlBuilder.searchView('', 1, this.props.params.model)}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            {this.props.id ? `${this.props.params.model} ${this.props.id}` : `New ${this.props.params.model}`}
          </Breadcrumb.Item>
        </Breadcrumb>
        <h4> {this.props.params.model} <Label className='entry-container__overlay'> {this.props.id ? 'Edit' : 'Add'} </Label></h4>
        <br />
        <div className='entry-container__form-container'>
          { this.props.displayLoader &&
            <Spinner />
          }
          { (!this.props.displayLoader) &&
            <Form onSubmit={this._onSubmit.bind(this, formValidated)} className='entry-container__form-container--form'>
              {fields}
              <Col xs={12} sm={8}>
                {formValidated
                ? <button
                  className='active--button'
                  type='submit'>
                  Submit
                </button>
                : <button
                  className='idle--button'
                  type='submit'>
                  Submit
                </button> }
                {this.props.id &&
                <button
                  className='delete--button'
                  onClick={() => this.props.safeDelete(this.props.id, this.props.params.model)}>
                  Delete
                </button> }
              </Col>
            </Form> }
        </div>
      </div>
    )
  }
}

ModelEntry.propTypes = {
  entry: PropTypes.object.isRequired,
  id: PropTypes.number,
  displayLoader: PropTypes.bool.isRequired
}

export default ModelEntry
