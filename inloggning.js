function checkUsername (username, password) {
  // Om text wrong... då är det fel användarnamn eller lösenord
  if (username === 'username' && password === 'password') {
    return true
  } else {
    return 'Wrong username or password'
  }
}

function createUser(username, password) {
  function checkPassword(password) {
    const regularExpression = /^[a-zA-Z0-9]{8,}$/;
    return regularExpression.test(password);
  }

  if (username === 'username') {
    return 'Username already exists';
  } else if (!checkPassword(password)) {
    return 'Password does not meet the security requirements';
  } else {
    return { username, password };
  }
}

module.exports = { checkUsername, createUser }
