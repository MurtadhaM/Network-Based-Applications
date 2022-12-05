/**
 * @author: Murtadha Marzouq
 * @description: This is a Debugging Function
 */


/**
 * IMPORTING EVERY LIBRARY IN THE NPM Servers 
 */
 const Registerbutton = document.querySelector('#btn');

const formDOM = document.querySelector('.form')
const usernameInputDOM = document.querySelector('.email-input')
const passwordInputDOM = document.querySelector('.password-input')
const formAlertDOM = document.querySelector('.form-alert')
const resultDOM = document.querySelector('.result')
const btnDOM = document.querySelector('#data')
const tokenDOM = document.querySelector('.token')

formDOM.addEventListener('submit', async (e) => {
  formAlertDOM.classList.remove('text-success')
  tokenDOM.classList.remove('text-success')

  e.preventDefault()
  const email = usernameInputDOM.value
  const password = passwordInputDOM.value

  try {
    const { data } = await axios.post('/api/v1/login', { email, password })

    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = data.msg

    formAlertDOM.classList.add('text-success')
    usernameInputDOM.value = ''
    passwordInputDOM.value = ''

    localStorage.setItem('token', data.token)
    resultDOM.innerHTML = ''
    tokenDOM.textContent = 'token present'
    tokenDOM.classList.add('text-success')
  } catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = error.response.data.msg
    localStorage.removeItem('token')
    resultDOM.innerHTML = ''
    tokenDOM.textContent = 'no token present'
    tokenDOM.classList.remove('text-success')
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
  }, 2000)
})

btnDOM.addEventListener('click', async () => {
  const token = localStorage.getItem('token')
  try {
    const { data } = await axios.delete('/api/v1/logout', {
    
        Authorization: `Bearer ${token}`,
      },
    )
    resultDOM.innerHTML = `<h5>${data.msg}</h5><p>${data.secret}</p>`

    data.secret
  } catch (error) {
    localStorage.removeItem('token')
    resultDOM.innerHTML = `<p>${error.response.data.msg}</p>`
  }
})




Registerbutton.addEventListener('click', async () => {
  const token = localStorage.getItem('token')
  const email = document.querySelector('.email');
  const password = document.querySelector('.password');
  const firstName = document.querySelector('.firstName-input');
  const lastName = document.querySelector('.lastName-input');

  console.log(`{ "message": "Missing email or password" } ${email} ${password}`);
 
  try {
    const { data } = await axios.put('/api/v1/register', {
    
        Authorization: `Bearer ${token}`,
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value

      },
    )

  } 
  catch (error) {
  }
  
})


const checkToken = () => {
  tokenDOM.classList.remove('text-success')

  const token = localStorage.getItem('token')
  if (token) {
    tokenDOM.textContent = 'token present'
    tokenDOM.classList.add('text-success')
  }
}

checkToken()
