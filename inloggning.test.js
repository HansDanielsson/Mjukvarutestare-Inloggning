const { checkUsername, createUser } = require('./inloggning.js')

describe('Inloggning', () => {
  it('Kolla upp korrekt username och password, return true', () => {
    const username = 'username'
    const password = 'password'
    const result = checkUsername(username, password)
    expect(result).toBe(true)
  })

  it('Kolla upp username och fel password, return error text', () => {
    const username = 'username'
    const password = 'wrong'
    const result = checkUsername(username, password)
    expect(result).toBe('Wrong username or password')
  })

  it('Kolla upp fel username och password, return error text', () => {
    const username = 'wrong'
    const password = 'password'
    const result = checkUsername(username, password)
    expect(result).toBe('Wrong username or password')
  })

  it('Kolla upp fel username och fel password, return error text', () => {
    const username = 'wrong'
    const password = 'wrong'
    const result = checkUsername(username, password)
    expect(result).toBe('Wrong username or password')
  })

  it('Kolla upp tom username och korrekt password, return error text', () => {
    let username
    const password = 'password'
    const result = checkUsername(username, password)
    expect(result).toBe('Wrong username or password')
  })

  it('Kolla upp korrekt username och tom password, return error text', () => {
    const username = 'username'
    let password
    const result = checkUsername(username, password)
    expect(result).toBe('Wrong username or password')
  })

  it('Kolla upp tom username och tom password, return error text', () => {
    let username
    let password
    const result = checkUsername(username, password)
    expect(result).toBe('Wrong username or password')
  })
})

describe('Skapa ny user', () => {
  it('Skapa ny user, return username, password', () => {
    const username = 'New username'
    const password = '1Passwor'
    const result = createUser(username, password)
    expect(result.username).toBe(username)
    expect(result.password).toBe(password)
  })

  it('Skapa ny user med befintligt username, return error text', () => {
    const username = 'username'
    const password = '1Password'
    const result = createUser(username, password)
    expect(result).toBe('Username already exists')
  })

  it('Skapa ny user med under 8 tecken password, return error text', () => {
    const username = 'New username'
    const password = '1Passwo'
    const result = createUser(username, password)
    expect(result).toBe('Password does not meet the security requirements')
  })

  it('Skapa ny user fel password A-Z, return error text', () => {
    const username = 'New username'
    const password = '1password'
    const result = createUser(username, password)
    expect(result).toBe('Password does not meet the security requirements')
  })

  it('Skapa ny user fel password a-z, return error text', () => {
    const username = 'New username'
    const password = 'PASSWORD'
    const result = createUser(username, password)
    expect(result).toBe('Password does not meet the security requirements')
  })

  it('Skapa ny user fel password 0-9, return error text', () => {
    const username = 'New username'
    const password = 'Password'
    const result = createUser(username, password)
    expect(result).toBe('Password does not meet the security requirements')
  })
})
