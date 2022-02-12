'use strict'

const localToken = window.localStorage.getItem('token')
if (!localToken) {
	window.location.replace('login.html')
}

logout.addEventListener('click', () => {
	window.localStorage.removeItem('token')
	window.location.replace('login.html') // cityslicka
})
