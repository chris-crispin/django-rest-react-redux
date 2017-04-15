import FormValidationHelper from './FormValidationHelper'

export const MODELS = ['users', 'teams']

export const MODEL_HEADERS = {
  'users': ['Name', 'Surname', 'Username', 'Email', 'Active', 'Staff', 'Superuser'],
  'teams': ['Team Name', 'Stadium Name', 'Location']
}

export const MODEL_DEFAULT = {
  users: {
    write_only: {
      password: '',
      confirmPassword: ''
    },
    default: {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      is_active: true,
      is_staff: false,
      is_superuser: false
    }
  },
  'teams': {
    default: {
      team_name: '',
      stadium_name: '',
      location: ''
    }
  }
}

export const MODEL_FORM = {
  'users': {
    first_name: {
      label: 'First Name',
      type: 'text',
      validate: FormValidationHelper.validateName
    },
    last_name: {
      label: 'Surname',
      type: 'text',
      validate: FormValidationHelper.validateName
    },
    username: {
      label: 'Username',
      type: 'text',
      validate: FormValidationHelper.validateUsername
    },
    email: {
      label: 'Email',
      type: 'text',
      validate: FormValidationHelper.validateEmail
    },
    is_active: {
      label: 'Active',
      type: 'checkbox'
    },
    is_staff: {
      label: 'Staff',
      type: 'checkbox'
    },
    is_superuser: {
      label: 'Superuser',
      type: 'checkbox'
    },
    password: {
      label: 'Password',
      type: 'password',
      validate: FormValidationHelper.validatePassword
    },
    confirmPassword: {
      label: 'Confirm Password',
      type: 'password',
      validate: FormValidationHelper.validateConfirmPassword
    }
  },
  'teams': {
    team_name: {
      label: 'Team Name'
    },
    stadium_name: {
      label: 'Stadium Name'
    },
    location: {
      label: 'Location'
    }
  }
}
