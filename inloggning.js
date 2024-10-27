class Inloggning {
  constructor (username, password) {
    this.username = username
    this.password = password
  }

  checkUsername (username, password) {
    // Om text wrong... då är det fel användarnamn eller lösenord
    if (username === this.username && password === this.password) {
      return true
    }
    return 'Wrong username or password'
  }

  checkPassword (password) {
    const regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,})/
    return regularExpression.test(password)
  }

  createUser (username, password) {
    if (username === this.username) {
      return 'Username already exists'
    }
    if (!this.checkPassword(password)) {
      return 'Password does not meet the security requirements'
    }
    return { username, password }
  }

  changePassword (user, oldPassword, newPassword) {
    if (user !== this.username) {
      return 'Wrong username'
    }
    if (oldPassword !== this.password) {
      return 'Wrong password'
    }
    if (oldPassword === newPassword) {
      return 'New password must be different from old password'
    }
    if (!this.checkPassword(newPassword)) {
      return 'New password does not meet the security requirements'
    }
    // Update new password here
    this.password = newPassword
    return true
  }
}

module.exports = Inloggning
