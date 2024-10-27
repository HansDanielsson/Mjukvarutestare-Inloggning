const Inloggning = require('./inloggning.js')

describe('Inloggning', () => {
  let myInloggning

  // Before All
  beforeAll(() => {
    myInloggning = new Inloggning('username', '1Password')
  })

  // Before each
  beforeEach(() => {
    myInloggning.username = 'username'
    myInloggning.password = '1Password'
  })

  it('Kolla upp korrekt username och password, return true', () => {
    const username = 'username'
    const password = '1Password'
    const result = myInloggning.checkUsername(username, password)
    expect(result).toBeTruthy()
  })

  it('Kolla upp username och fel password, return error text', () => {
    const username = 'username'
    const password = 'wrong'
    const result = myInloggning.checkUsername(username, password)
    expect(result).toBe('Wrong username or password')
  })

  it('Kolla upp fel username och password, return error text', () => {
    const username = 'wrong'
    const password = '1Password'
    const result = myInloggning.checkUsername(username, password)
    expect(result).toBe('Wrong username or password')
  })

  it('Kolla upp fel username och fel password, return error text', () => {
    const username = 'wrong'
    const password = 'wrong'
    const result = myInloggning.checkUsername(username, password)
    expect(result).toBe('Wrong username or password')
  })

  it('Kolla upp tom username och korrekt password, return error text', () => {
    let username
    const password = '1Password'
    const result = myInloggning.checkUsername(username, password)
    expect(result).toBe('Wrong username or password')
  })

  it('Kolla upp korrekt username och tom password, return error text', () => {
    const username = 'username'
    let password
    const result = myInloggning.checkUsername(username, password)
    expect(result).toBe('Wrong username or password')
  })

  it('Kolla upp tom username och tom password, return error text', () => {
    let username
    let password
    const result = myInloggning.checkUsername(username, password)
    expect(result).toBe('Wrong username or password')
  })
})

describe('Skapa ny user', () => {
  let myInloggning

  // Before all
  beforeAll(() => {
    myInloggning = new Inloggning('username', '1Password')
  })

  // Before each
  beforeEach(() => {
    myInloggning.username = 'username'
    myInloggning.password = '1Password'
  })

  it('Skapa ny user, return username, password', () => {
    const username = 'New username'
    const password = '1Password'
    const result = myInloggning.createUser(username, password)
    expect(result.username).toBe(username)
    expect(result.password).toBe(password)
  })

  it('Skapa ny user med befintligt username, return error text', () => {
    const username = 'username'
    const password = '1Password'
    const result = myInloggning.createUser(username, password)
    expect(result).toBe('Username already exists')
  })

  it('Skapa ny user med under 8 tecken password, return error text', () => {
    const username = 'New username'
    const password = '1Passwo'
    const result = myInloggning.createUser(username, password)
    expect(result).toBe('Password does not meet the security requirements')
  })

  it('Skapa ny user fel password A-Z, return error text', () => {
    const username = 'New username'
    const password = '1password'
    const result = myInloggning.createUser(username, password)
    expect(result).toBe('Password does not meet the security requirements')
  })

  it('Skapa ny user fel password a-z, return error text', () => {
    const username = 'New username'
    const password = '1PASSWORD'
    const result = myInloggning.createUser(username, password)
    expect(result).toBe('Password does not meet the security requirements')
  })

  it('Skapa ny user fel password 0-9, return error text', () => {
    const username = 'New username'
    const password = 'Password'
    const result = myInloggning.createUser(username, password)
    expect(result).toBe('Password does not meet the security requirements')
  })
})

describe('Ändra lösenordet på användare', () => {
  // let myInloggning

  // Before all
  beforeAll(() => {
    myInloggning = new Inloggning('username', '1Password')
  })

  // Before each
  beforeEach(() => {
    myInloggning.username = 'username'
    myInloggning.password = '1Password'
  })

  it('Ändra på en användare som finns, return true', () => {
    const user = 'username'
    const oldPassword = '1Password'
    const newPassword = '1NewPassword'
    const result = myInloggning.changePassword(user, oldPassword, newPassword)
    expect(result).toBeTruthy()
  })

  it('Ändra på en användare som inte finns, return error text', () => {
    const user = 'Not a user'
    const oldPassword = '1Password'
    const newPassword = '1NewPassword'
    const result = myInloggning.changePassword(user, oldPassword, newPassword)
    expect(result).toBe('Wrong username')
  })

  it('Ändra på en användare som har fel password, return error text', () => {
    const user = 'username'
    const oldPassword = '1OldPassword'
    const newPassword = '1NewPassword'
    const result = myInloggning.changePassword(user, oldPassword, newPassword)
    expect(result).toBe('Wrong password')
  })

  it('Ändra på en användare som har samma password, return error text', () => {
    const user = 'username'
    const oldPassword = '1Password'
    const newPassword = '1Password'
    const result = myInloggning.changePassword(user, oldPassword, newPassword)
    expect(result).toBe('New password must be different from old password')
  })

  it('Ändra på en användare som har nya password securiy req, return error text', () => {
    const user = 'username'
    const oldPassword = '1Password'
    const newPassword = '1password'
    const result = myInloggning.changePassword(user, oldPassword, newPassword)
    expect(result).toBe('New password does not meet the security requirements')
  })
})
