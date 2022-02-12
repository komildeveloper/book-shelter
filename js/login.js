'use strict'

const elForm = document.querySelector('.form')
const elUserName = document.querySelector('.user__name')
const elUserPassword = document.querySelector('.user__password')

elForm.addEventListener('submit', e => {
	e.preventDefault()

	const inputUserName = elUserName.value
	const inputUserPassword = elUserPassword.value

	fetch('https://reqres.in/api/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: inputUserName,
			password: inputUserPassword
		})
	})
		.then(request => request.json())
		.then(data => {
			if (data?.token) {
				window.localStorage.setItem('token', data.token)

				window.location.replace('index.html')
			}
		})
})
