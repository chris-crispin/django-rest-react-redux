import FormValidationHelper from './FormValidationHelper'

export const MODELS = {
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
    },
    table: {
      first_name: 'Name',
      last_name: 'Surname',
      username: 'Username',
      email: 'Email',
      is_active: 'Active',
      is_staff: 'Staff',
      is_superuser: 'Superuser'
    }
  },
  'teams': {
    default: {
      team_name: '',
      stadium_name: '',
      location: ''
    },
    table: {
      team_name: 'Team Name',
      stadium_name: 'Stadium Name',
      location: 'Location'
    }
  },
  'players': {
    default: {
      name: '',
      position: '',
      nationality: ''
    },
    table: {
      name: 'Name',
      position: 'Position',
      nationality: 'Nationality'
    }
  }
}

export const MODEL_FORMS = {
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
      type: 'email',
      validate: FormValidationHelper.validateEmail
    },
    is_active: {
      label: 'Active',
      type: 'checkbox',
      readOnly: true
    },
    is_staff: {
      label: 'Staff',
      type: 'checkbox',
      readOnly: true
    },
    is_superuser: {
      label: 'Superuser',
      type: 'checkbox',
      readOnly: true
    },
    password: {
      label: 'Password',
      type: 'password',
      validate: FormValidationHelper.validatePassword
    },
    confirmPassword: {
      label: 'Confirm Password',
      type: 'password',
      validate: FormValidationHelper.validateConfirmPassword,
      validateArgs: ['password']
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
    },
    players: {
      label: 'Players',
      readOnly: true
    }
  },
  'players': {
    name: {
      label: 'Name'
    },
    position: {
      label: 'Position'
    },
    nationality: {
      label: 'Nationality'
    },
    team: {
      label: 'Team',
      readOnly: true
    }
  }
}
