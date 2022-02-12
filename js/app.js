'use strict'

const localToken = window.localStorage.getItem('token')
if (!localToken) {
	window.location('login.html')
}
