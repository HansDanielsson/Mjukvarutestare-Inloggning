class Inloggning {
  constructor (username, password) {
    this.username = username
    this.password = password
  }

  checkUsername (username, password) {
    // Return true if username and password is correct, else return false
    // Change specification to match with no error messages.
    return (username === this.username && password === this.password)
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

  // Har bytt returnvärdet från True till 0 för att undvika olika return värden
  changePassword (user, oldPassword, newPassword) {
    if (user !== this.username) {
      return 1
    }
    if (oldPassword !== this.password) {
      return 2
    }
    if (oldPassword === newPassword) {
      return 3
    }
    if (!this.checkPassword(newPassword)) {
      return 4
    }
    // Update new password here
    this.password = newPassword
    return 0
  }
}

module.exports = Inloggning
