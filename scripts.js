// Import the inloggning class
const Inloggning = require('./inloggning.js')
// Skapa en array med 5 användare
const users = []
for (let i = 0; i < 5; i++) {
  users[i] = new Inloggning('username' + i, '1Password' + i)
}

// Simmulera input från användaren
let username = 'username3'
let password = '1Password3'

// Kolla om användaren finns i arrayen och logga in
let logout = true
for (let i = 0; i < 5; i++) {
  if (users[i].checkUsername(username, password)) {
    console.log('Inloggning lyckades ' + users[i].username + ' ' + users[i].password)
    logout = false
    break
  }
}
