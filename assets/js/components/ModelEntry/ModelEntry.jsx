/* global localStorage */
import React from 'react'
import './styles.scss'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import Form from 'react-bootstrap/lib/Form'
import Col from 'react-bootstrap/lib/Col'
import Checkbox from 'react-bootstrap/lib/Checkbox'
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Label from 'react-bootstrap/lib/Label'
import Spinner from '../Spinner/Spinner'
import ClientUrlBuilder from '../../helpers/ClientUrlBuilder'

export class ModelEntry extends React.Component {

  constructor (props, context) {
    super(props, context)
    this.state = {
      user: this.props.user,
      password: '',
      confirmPassword: '',
      email: this.props.email,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      isActive: this.props.isActive,
      isStaff: this.props.isStaff,
      isSuper: this.props.isSuper
    }
  }

  componentDidMount () {
    if (this.props.params.id !== 'add') {
      this.props.lookup(this.props.params.id)
    }
  }

  componentWillUpdate (nextProps) {
    if (this.props.user !== nextProps.user) {
      this.setState({'user': nextProps.user,
        'email': nextProps.email,
        'firstName': nextProps.firstName,
        'lastName': nextProps.lastName,
        'isActive': nextProps.isActive,
        'isStaff': nextProps.isStaff,
        'isSuper': nextProps.isSuper})
    }
  }

  _onChangeHandler (e, field) {
    if (e.target.type === 'checkbox') {
      this.setState({[field]: e.target.checked})
    } else {
      this.setState({[field]: e.target.value})
    }
  }

  _onSubmit (e) {
    if (e) {
      e.preventDefault()
    }
    if (this.validateForm()) {
      const username = localStorage.getItem('user')
      if (this.props.id) {
        this.props.put(this.props.id, username, this.state)
      } else {
        this.props.post(username, this.state)
      }
    }
  }

  validatePassword () {
    const password = this.state.password
    const upper = /[A-Z]/g
    const numbers = /[0-9]/g
    const specials = /[!#$%^&*+=_-]/g
    const numberMatch = password.match(numbers)
    const specialMatch = password.match(specials)
    const upperMatch = password.match(upper)
    const weak = password.length > 6 && specialMatch && specialMatch.length >= 1 &&
    numberMatch && numberMatch.length >= 2 && upperMatch && upperMatch.length >= 1
    const strong = password.length > 10 && specialMatch && specialMatch.length >= 2 &&
    numberMatch && numberMatch.length >= 3 && upperMatch && upperMatch.length >= 2
    if (strong) {
      return 'success'
    } else if (weak) {
      return 'warning'
    } else {
      return 'error'
    }
  }

  validateConfirmPassword () {
    if (this.state.confirmPassword.length > 6 &&
      this.state.confirmPassword === this.state.password) {
      return 'success'
    } else {
      return 'error'
    }
  }

  validateName () {
    if (this.state.firstName.length > 1 && this.state.lastName.length > 1) {
      return 'success'
    } else {
      return 'error'
    }
  }

  validateUsername () {
    if (this.state.user.length < 5 || this.state.user.split(/\s+/).length > 1) {
      return 'error'
    } else {
      return 'success'
    }
  }

  validateEmail () {
    if (this.state.email.includes('@') &&
    this.state.email.split('@')[1].includes('.') &&
    this.state.email.split('@')[1].split('.')[1].length >= 2) {
      return 'success'
    } else {
      return 'error'
    }
  }

  validateForm () {
    return this.validateUsername() === 'success' &&
    this.validateEmail() === 'success' &&
    this.validateName() === 'success' &&
    (this.props.params.id !== 'add' ||
    (this.validatePassword() === 'success' || this.validatePassword() === 'warning') &&
    this.validateConfirmPassword() === 'success')
  }

  render () {
    return (
      <div className='entry-container'>
        <Breadcrumb className='entry-container__breadcrumb'>
          <Breadcrumb.Item onClick={() => ClientUrlBuilder.searchUserView('', 1)}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            {this.props.id ? `User ${this.props.id}` : 'New User'}
          </Breadcrumb.Item>
        </Breadcrumb>
        <h4> User <Label className='entry-container__overlay'> {this.props.id ? 'Edit' : 'Add'} </Label></h4>
        <br />
        <div className='entry-container__form-container'>
          { this.props.displayLoader &&
            <Spinner />
          }
          { (!this.props.displayLoader) &&
            <Form onSubmit={this._onSubmit.bind(this)} className='entry-container__form-container--form'>
              <Col xs={6} sm={4}>
                <FormGroup bsSize='sm' validationState={this.validateName()}>
                  <ControlLabel>First Name</ControlLabel>
                  <FormControl
                    type='text'
                    value={this.state.firstName}
                    onChange={(e) => this._onChangeHandler(e, 'firstName')} />
                </FormGroup>
              </Col>
              <Col xs={6} sm={4}>
                <FormGroup bsSize='sm' validationState={this.validateName()}>
                  <ControlLabel>Surname</ControlLabel>
                  <FormControl
                    type='text'
                    value={this.state.lastName}
                    onChange={(e) => this._onChangeHandler(e, 'lastName')} />
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
              <Col xs={6} sm={4}>
                <FormGroup bsSize='sm'>
                  <ControlLabel>Permissions</ControlLabel>
                  <br />
                  <Checkbox
                    checked={this.state.isActive}
                    onChange={(e) => this._onChangeHandler(e, 'isActive')}
                    inline>Active</Checkbox>
                  <Checkbox
                    checked={this.state.isStaff}
                    onChange={(e) => this._onChangeHandler(e, 'isStaff')}
                    inline>Staff</Checkbox>
                  <Checkbox
                    checked={this.state.isSuper}
                    onChange={(e) => this._onChangeHandler(e, 'isSuper')}
                    inline>Superuser</Checkbox>
                </FormGroup>
              </Col>
              <Col xs={12} sm={8}>
                <FormGroup bsSize='sm' validationState={this.validateEmail()}>
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                    type='text'
                    value={this.state.email}
                    onChange={(e) => this._onChangeHandler(e, 'email')} />
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
              <Col xs={12} sm={8}>
                <FormGroup bsSize='sm' validationState={this.validateUsername()}>
                  <ControlLabel>Username</ControlLabel>
                  <FormControl
                    type='text'
                    value={this.state.user}
                    onChange={(e) => this._onChangeHandler(e, 'user')} />
                  <FormControl.Feedback />
                </FormGroup>
              </Col>
              { this.props.params.id === 'add' &&
                <div>
                  <Col xs={12} sm={8}>
                    <FormGroup bsSize='sm' validationState={this.validatePassword()}>
                      <ControlLabel>Password</ControlLabel>
                      <FormControl
                        type='password'
                        value={this.state.password}
                        onChange={(e) => this._onChangeHandler(e, 'password')} />
                      <FormControl.Feedback />
                      <HelpBlock><span className='form__info'>Must be at least 6 characters long and contain
                        at least 1 special character from <span className='verbatim'>!#$%^&*+=_-</span>,
                        2 numbers and 1 upper case letter</span>
                      </HelpBlock>
                    </FormGroup>
                  </Col>
                  <Col xs={12} sm={8}>
                    <FormGroup bsSize='sm' validationState={this.validateConfirmPassword()}>
                      <ControlLabel>Confirm Password</ControlLabel>
                      <FormControl
                        type='password'
                        value={this.state.confirmPassword}
                        onChange={(e) => this._onChangeHandler(e, 'confirmPassword')} />
                      <FormControl.Feedback />
                    </FormGroup>
                  </Col>
                </div>
              }
              <Col xs={12} sm={8}>
                {this.validateForm()
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
                  onClick={() => this.props.safeDelete(this.props.id)}>
                  Delete
                </button> }
              </Col>
            </Form>}
        </div>
      </div>
    )
  }
}

ModelEntry.propTypes = {
  user: React.PropTypes.string.isRequired,
  email: React.PropTypes.string.isRequired,
  firstName: React.PropTypes.string.isRequired,
  lastName: React.PropTypes.string.isRequired,
  isActive: React.PropTypes.bool.isRequired,
  isStaff: React.PropTypes.bool.isRequired,
  isSuper: React.PropTypes.bool.isRequired,
  id: React.PropTypes.number,
  displayLoader: React.PropTypes.bool.isRequired
}

export default ModelEntry
