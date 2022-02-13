'use strict'

let btnLogout = document.querySelector('.book__logout-btn')
let localToken = window.localStorage.getItem('token')
let searchInput = document.querySelector('.search__input')
let cardList = document.querySelector('.card__list')
let totalResult = document.querySelector('.books__total-resul-num')
let bookmarkList = document.querySelector('.bookmark__list')
let searchInputValue
let mainArr

if (!localToken) {
	window.location.replace('login.html')
}

btnLogout.addEventListener('click', () => {
	window.localStorage.removeItem('token')
	window.location.replace('login.html')
})

// BOOKMARK

const renderBookmarks = (arr, element) => {
	arr.forEach(item => {
		let htmlBookmark = `
    <li class="bookmark__item">
    <div class="bookmark__item-text">
        <h5 class="bookmark__item-heading">${item.volumeInfo?.title}</h5>
        <p class="bookmark__item-desc">${item.volumeInfo?.authors}</p>
    </div>
    <div class="bookmark__item-btns">
        <a class="bookmark__read-btn" target="_blank" href="${item.volumeInfo?.previewLink}">
            <img src="./images/bookmark-read.svg" alt="" width="24" height="24">
        </a>
        <button  class="bookmark__delete-btn">
         <img src="./images/bookmark-delete.svg" data--data-bookmark="${item.id}" class="bookmark__delete-btn-img" alt="" width="24" height="24">
        </button>
    </div>
    </li>
    `

		element.insertAdjacentHTML('beforeend', htmlBookmark)
	})
}

cardList.addEventListener('click', evt => {
	if (evt.target.matches('.btn__bookmark')) {
		const moreBtnDataset = evt.target.dataset.bookmark
		mainArr.forEach(data => {
			if (data.id == moreBtnDataset) {
				if (!bookmarksArr.includes(data)) {
					bookmarksArr.push(data)

					bookmarkList.innerHTML = null
					renderBookmarks(bookmarksArr, bookmarkList)
					window.localStorage.setItem(
						'localBookmarks',
						JSON.stringify(bookmarksArr)
					)
				}
			}
		})
	}
})

// BOOKMARK DELETE BTN

bookmarkList.addEventListener('click', e => {
	const isBookmarkDeleteBtn = e.target.matches('.bookmark__delete-btn-img')

	if (isBookmarkDeleteBtn) {
		const bookmarkDeleteBtnDataset = e.target.dataset.DataBookmark

		const foundBookIndex = bookmarksArr.findIndex(
			item => item.id == bookmarkDeleteBtnDataset
		)
		bookmarksArr.splice(foundBookIndex, 1)

		bookmarkList.innerHTML = null

		bookmarkList.innerHTML = null
		renderBookmarks(bookmarksArr, bookmarkList)
		window.localStorage.setItem('localBookmarks', JSON.stringify(bookmarksArr))
	}
})

const localBookmarks = JSON.parse(window.localStorage.getItem('localBookmarks'))
let bookmarksArr = localBookmarks || []

// RENDER BOOKS

const renderBooks = (books, element) => {
	element.innerHTML = null

	books.forEach(book => {
		const htmlCard = `
        <li class="card__item">
        <div class="card main__card">
        <div class="card__header">
            <img class="card__header-img" src="${book.volumeInfo?.imageLinks.thumbnail}" alt="...">
        </div>
        <div class="card-body">
          <h3 class="card-title">${book.volumeInfo?.title}</h3>
          <p class="card-text mb-1">${book.volumeInfo?.authors}</p>
          <p class="card-text">${book.volumeInfo?.publishedDate}</p>
          <div class="card__btns">
            <button type="button" data-bookmark="${book.id}" class="btn btn-warning btn__bookmark">Bookmark</button>
            <button type="button" data-bookmark="${book.id}" class="btn btn-info btn__more type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"">More Info</button>
          </div>
          <a class="btn btn-secondary btn__read w-100" href="${book.volumeInfo?.previewLink}" target="_blank">Read</a>
        </div>
      </div>
        </li>
        `

		let newModal = document.createElement('div')
		let newModalHeader = document.createElement('div')
		let newModalHeaderHeading = document.createElement('h5')
		let newModalHeaderBtn = document.createElement('button')
		let newModalBody = document.createElement('div')
		let newModalImg = document.createElement('img')
		let newModalDesc = document.createElement('p')
		let newModaTexts = document.createElement('div')
		let newModalAutor = document.createElement('p')
		let newModalAutorText = document.createElement('span')
		let newModalPub = document.createElement('p')
		let newModalPubText = document.createElement('span')
		let newModalPubSher = document.createElement('p')
		let newModalPubSherText = document.createElement('span')
		let newModalFooter = document.createElement('div')
		let newModalFooterBtn = document.createElement('a')

		newModal.setAttribute('class', 'offcanvas offcanvas-end')
		newModal.setAttribute('tabindex', '-1')
		newModal.setAttribute('id', 'offcanvasRight')
		newModal.setAttribute('aria-labelledby', 'offcanvasRightLabel')
		newModalHeader.setAttribute('class', 'offcanvas-header modal__header')
		newModalHeaderHeading.setAttribute(
			'id',
			'offcanvasRightLabel modal__heading'
		)
		newModalHeaderBtn.setAttribute('type', 'button')
		newModalHeaderBtn.setAttribute('class', 'btn-close text-reset')
		newModalHeaderBtn.setAttribute('data-bs-dismiss', 'offcanvas')
		newModalHeaderBtn.setAttribute('aria-label', 'Close')
		newModalBody.setAttribute('class', 'offcanvas-body modal__body')
		newModalImg.setAttribute('class', 'modal__img')
		newModalDesc.setAttribute('class', 'modal__desc')
		newModaTexts.setAttribute('class', 'modal__texts')
		newModalAutor.setAttribute('class', 'modal__autor')
		newModalAutorText.setAttribute('class', 'modal__autor-text')
		newModalPub.setAttribute('class', 'modal__autor')
		newModalPubText.setAttribute('class', 'modal__autor-text')
		newModalPubSher.setAttribute('class', 'modal__autor')
		newModalPubSherText.setAttribute('class', 'modal__autor-text')
		newModalFooter.setAttribute('class', 'modal__footer')
		newModalFooterBtn.setAttribute('target', '_blank')
		newModalFooterBtn.setAttribute('class', 'btn btn-secondary')

		newModalAutor.textContent = ' Author : '
		newModalPub.textContent = ' Published : '
		newModalPubSher.textContent = ' Publishers : '
		newModalFooterBtn.textContent = 'Read'

		cardList.addEventListener('click', e => {
			if (e.target.matches('.btn__more')) {
				const moreBtnDataset = e.target.dataset.bookmark
				mainArr.forEach(data => {
					if (data.id == moreBtnDataset) {
						newModalHeaderHeading.textContent = data.volumeInfo?.title
						newModalImg.setAttribute(
							'src',
							`${data.volumeInfo?.imageLinks.thumbnail}`
						)
						newModalDesc.textContent = data.volumeInfo?.description
						newModalAutorText.textContent = data.volumeInfo?.authors.join(',  ')
						newModalPubText.textContent = data.volumeInfo?.publishedDate
						newModalPubSherText.textContent = data.volumeInfo?.publisher
						newModalFooterBtn.setAttribute(
							'href',
							`${data.volumeInfo?.previewLink}`
						)
					}
				})
			}
		})

		element.insertAdjacentHTML('beforeend', htmlCard)

		element.appendChild(newModal)
		newModal.appendChild(newModalHeader)
		newModalHeader.appendChild(newModalHeaderHeading)
		newModalHeader.appendChild(newModalHeaderBtn)
		newModal.appendChild(newModalBody)
		newModalBody.appendChild(newModalImg)
		newModalBody.appendChild(newModalDesc)
		newModalBody.appendChild(newModaTexts)
		newModaTexts.appendChild(newModalAutor)
		newModalAutor.appendChild(newModalAutorText)
		newModaTexts.appendChild(newModalPub)
		newModalPub.appendChild(newModalPubText)
		newModaTexts.appendChild(newModalPubSher)
		newModalPubSher.appendChild(newModalPubSherText)
		newModal.appendChild(newModalFooter)
		newModalFooter.appendChild(newModalFooterBtn)
	})
}

const getBooks = async () => {
	const request = await fetch(
		`https://www.googleapis.com/books/v1/volumes?q=search+${searchInputValue}`
	)

	const data = await request.json()
	totalResult.textContent = data.totalItems
	mainArr = data.items
	renderBooks(data.items, cardList)
	searchInput.value = ''
}

searchInput.addEventListener('change', () => {
	searchInputValue = searchInput.value
	getBooks()
})
