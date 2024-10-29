const Inloggning = require('./inloggning.js')

describe('Inloggning', () => {
  let myInloggning
  let username
  let password

  // Before All
  beforeAll(() => {
    myInloggning = new Inloggning('username', '1Password')
  })

  // Before each
  beforeEach(() => {
    username = 'username'
    password = '1Password'
    myInloggning.username = username
    myInloggning.password = password
  })

  it('Kolla upp korrekt username och password, return true', () => {
    const result = myInloggning.checkUsername(username, password)
    expect(result).toBeTruthy()
  })

  it('Kolla upp username och fel password, return error text', () => {
    const password = 'wrong'
    const result = myInloggning.checkUsername(username, password)
    expect(result).toBeFalsy()
  })

  it('Kolla upp fel username och password, return error text', () => {
    const username = 'wrong'
    const result = myInloggning.checkUsername(username, password)
    expect(result).toBeFalsy()
  })

  it('Kolla upp fel username och fel password, return error text', () => {
    const username = 'wrong'
    const password = 'wrong'
    const result = myInloggning.checkUsername(username, password)
    expect(result).toBeFalsy()
  })

  it('Kolla upp tom username och korrekt password, return error text', () => {
    let username
    const result = myInloggning.checkUsername(username, password)
    expect(result).toBeFalsy()
  })

  it('Kolla upp korrekt username och tom password, return error text', () => {
    let password
    const result = myInloggning.checkUsername(username, password)
    expect(result).toBeFalsy()
  })

  it('Kolla upp tom username och tom password, return error text', () => {
    let username
    let password
    const result = myInloggning.checkUsername(username, password)
    expect(result).toBeFalsy()
  })
})

describe('Skapa ny user', () => {
  let myInloggning
  let username
  let password

  // Before all
  beforeAll(() => {
    myInloggning = new Inloggning('username', '1Password')
  })

  // Before each
  beforeEach(() => {
    username = 'NewUsername'
    password = '1Password'
    myInloggning.username = 'username'
    myInloggning.password = password
  })

  it('Skapa ny user, return username, password', () => {
    password = '1NewPassword'
    const result = myInloggning.createUser(username, password)
    expect(result.username).toBe(username)
    expect(result.password).toBe(password)
  })

  it('Skapa ny user med befintligt username, return error text', () => {
    username = 'username'
    const result = myInloggning.createUser(username, password)
    expect(result).toBe('Username already exists')
  })

  it('Skapa ny user med under 8 tecken password, return error text', () => {
    password = '1Passwo'
    const result = myInloggning.createUser(username, password)
    expect(result).toBe('Password does not meet the security requirements')
  })

  it('Skapa ny user fel password A-Z, return error text', () => {
    password = '1password'
    const result = myInloggning.createUser(username, password)
    expect(result).toBe('Password does not meet the security requirements')
  })

  it('Skapa ny user fel password a-z, return error text', () => {
    password = '1PASSWORD'
    const result = myInloggning.createUser(username, password)
    expect(result).toBe('Password does not meet the security requirements')
  })

  it('Skapa ny user fel password 0-9, return error text', () => {
    password = 'Password'
    const result = myInloggning.createUser(username, password)
    expect(result).toBe('Password does not meet the security requirements')
  })
})

describe('Ändra lösenordet på användare', () => {
  let myInloggning
  let user
  let oldPassword
  let newPassword

  // Before all
  beforeAll(() => {
    myInloggning = new Inloggning(user, oldPassword)
  })

  // Before each
  beforeEach(() => {
    user = 'username'
    oldPassword = '1Password'
    newPassword = '1NewPassword'
    myInloggning.username = user
    myInloggning.password = oldPassword
  })

  it('Ändra på en användare som finns, return 0', () => {
    const result = myInloggning.changePassword(user, oldPassword, newPassword)
    expect(result).toBe(0)
    expect(myInloggning.password).toBe(newPassword)
  })

  it('Ändra på en användare som inte finns, return 1', () => {
    user = 'NotaUser'
    const result = myInloggning.changePassword(user, oldPassword, newPassword)
    expect(result).toBe(1)
    expect(myInloggning.password).toBe(oldPassword)
  })

  it('Ändra på en användare som har fel password, return 2', () => {
    oldPassword = '1OldPassword'
    const result = myInloggning.changePassword(user, oldPassword, newPassword)
    expect(result).toBe(2)
    expect(myInloggning.password).toBe('1Password')
  })

  it('Ändra på en användare som har samma password, return 3', () => {
    newPassword = '1Password'
    const result = myInloggning.changePassword(user, oldPassword, newPassword)
    expect(result).toBe(3)
    expect(myInloggning.password).toBe(oldPassword)
  })

  it('Ändra på en användare som har fel password securiy req, return 4', () => {
    newPassword = '1password'
    const result = myInloggning.changePassword(user, oldPassword, newPassword)
    expect(result).toBe(4)
    expect(myInloggning.password).toBe(oldPassword)
  })
})
