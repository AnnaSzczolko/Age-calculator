// inputs
const inputDay = document.querySelector('#day')
const inputMonth = document.querySelector('#month')
const inputYear = document.querySelector('#year')
const inputs = document.querySelectorAll('.input-item')

const btn = document.querySelector('img')

// the results
const reslutYear = document.querySelector('.years')
const reslutMonths = document.querySelector('.months')
const reslutDays = document.querySelector('.days')

const now = new Date()

const nowYear = now.getFullYear()
const nowMonth = now.getMonth() + 1
const nowDay = now.getDate()

let userAge
let userDay
let userMonth
let userYear

let lastedYears
let lastedMonth
let lastedDays

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const monthsNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

const checkInput = () => {
	inputs.forEach(input => {
		if (input.value === '') {
			showError(input)
		} else {
			hideError(input)
		}
	})

	checkDays()
	checkMonth()
	checkYear()

}

const showError = errorItem => {
	errorItem.nextElementSibling.classList.add('active')
	errorItem.previousElementSibling.classList.add('red')
	errorItem.classList.add('input-item-error')
}

const hideError = correctItem => {
	correctItem.nextElementSibling.classList.remove('active')
	correctItem.previousElementSibling.classList.remove('red')
	correctItem.classList.remove('input-item-error')
}

const checkDays = () => {
	userMonth = parseInt(inputMonth.value)
	userDay = parseInt(inputDay.value)

	if (userDay > daysInMonth[userMonth - 1]) {
		showError(inputDay)
		inputDay.nextElementSibling.textContent = `${monthsNames[userMonth - 1]} has ${daysInMonth[userMonth - 1]} days. `
	}
	else if (userDay > 31) {
		showError(inputDay)
	}  


}

const checkMonth = () => {
	if (userMonth > 12) {
		showError(inputMonth)
		inputMonth.nextElementSibling.textContent = `Year has ${monthsNames.length} months. `
	}

}

const checkYear = () => {


	userYear = parseInt(inputYear.value)

	if (userYear > nowYear) {
		showError(inputYear)
		inputYear.nextElementSibling.textContent = `Give the date from past`
	} else if (userYear == nowYear && userMonth == nowMonth && userDay >= nowDay) {
		showError(inputYear)
		inputYear.nextElementSibling.textContent = `Give the date from past`
	} else {
		countTime()
	}


}

const countTime = () => {
	userAge = new Date(`${inputYear.value}, ${inputMonth.value}, ${inputDay.value}`)

	const userMonth = userAge.getMonth()
	const nowMonth = now.getMonth()
	const nowDay = now.getDate()
	const userDay = userAge.getDate()

	if (nowMonth < userMonth) {
		lastedYears = now.getFullYear() - userAge.getFullYear() - 1
	} else {
		lastedYears = now.getFullYear() - userAge.getFullYear()
	}


	if (userMonth < nowMonth) {
		if (userDay > nowDay) {
			lastedMonth = nowMonth - userMonth - 1
		} else {
			lastedMonth = nowMonth - userMonth
		}
	} else if (userMonth == nowMonth) {
		lastedMonth = 0
	} else {
		lastedMonth = 12 - userMonth + nowMonth
	}

	if (userDay >= nowDay) {
		lastedDays = daysInMonth[userMonth] - userDay + nowDay
	} else {
		lastedDays = nowDay - userDay
	}

	reslutYear.textContent = lastedYears
	reslutMonths.textContent = lastedMonth
	reslutDays.textContent = lastedDays
}

const enterStart = (e) => {
	if (e.keyCode === 13){
		checkInput()
	}
}

btn.addEventListener('click', checkInput)
inputs.forEach( input => {
	input.addEventListener('keyup', enterStart)

})