// Import the inloggning class
const Inloggning = require('./inloggning.js')

// Import the prompt-sync library
const prompt = require('prompt-sync')({ sigint: true })

// Skapa en array med 5 användare
const users = []
for (let i = 0; i < 5; i++) {
  users[i] = new Inloggning('username' + i, '1Password' + i)
}

let userIndex = 0

function menyPrint () {
  console.log('1. Skapa ny user')
  console.log('2. Logga in')
  console.log('3. Ändra lösenord')
  console.log('4. Avsluta')
}

function printUsers () {
  console.log('Användare: ')
  for (let ui of users) {
    console.log('Namn: ' + ui.username + ' Lösenord: ' + ui.password)
  }
}

function createNewUser () {
  const username = prompt('Ange användarnamn: ')
  const password = prompt('Ange lösenord: ')
  users.push(new Inloggning(username, password))
  console.log('Ny användare skapad')
  printUsers()
}

function loginUser () {
  const username = prompt('Ange användarnamn: ')
  const password = prompt('Ange lösenord: ')
  let login = false
  for (let i = 0; i < users.length; i++) {
    if (users[i].checkUsername(username, password)) {
      login = true
      userIndex = i
      break
    }
  }
  if (login) {
    console.log('Inloggning lyckades ' + username + ' ' + password)
  } else {
    console.log('Inloggning misslyckades')
  }
}

function newChangePassword () {
  const newPassword = prompt('Ange nya lösenord: ')
  if (users[userIndex].changePassword(users[userIndex].username, users[userIndex].password, newPassword) === 0) {
    users[userIndex].password = newPassword
    console.log('Lösenordet har ändrats')
  }
}

printUsers()

let commandLoop = true
let command
while (commandLoop) {
  menyPrint()
  command = prompt('Ange kommando: ')
  switch (command) {
    case '1':
      createNewUser()
      break
    case '2':
      loginUser()
      break
    case '3':
      newChangePassword()
      break
    case '4':
      commandLoop = false
      break
    default:
      console.log('Ogiltigt kommando')
      break
  }
}
console.log('Nu ere slut: ')
process.exit(0)
