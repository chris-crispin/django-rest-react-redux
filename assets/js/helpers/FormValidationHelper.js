
export default class FormHelper {

  static validatePassword (password) {
    if (password) {
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
    return 'error'
  }

  static validateConfirmPassword (password, originalPassword) {
    // if (password) {
    //   if (password.length > 6 &&
    //     password === originalPassword) {
    //     return 'success'
    //   } else {
    //     return 'error'
    //   }
    // }
    // return 'error'
    return 'success'
  }

  static validateName (name) {
    if (name.length > 1) {
      return 'success'
    } else {
      return 'error'
    }
  }

  static validateUsername (username) {
    if (username.length < 5 || username.split(/\s+/).length > 1) {
      return 'error'
    } else {
      return 'success'
    }
  }

  static validateEmail (email) {
    if (email.includes('@') &&
    email.split('@')[1].includes('.') &&
    email.split('@')[1].split('.')[1].length >= 2) {
      return 'success'
    } else {
      return 'error'
    }
  }
}
