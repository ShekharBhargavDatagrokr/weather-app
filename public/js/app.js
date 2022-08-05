console.log('Client side javaScript file is loaded!')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

const weatherForm = document.querySelector('form')
const search_latitude = document.querySelector('#latitude')
const search_longitude = document.querySelector('#longitude')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent='Loading...'
    messageTwo.textContent=''

    const latitude = search_latitude.value
    const longitude = search_longitude.value

    fetch('http://localhost:3000/weather?latitude='+latitude+'&longitude'+longitude).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent=data.error
        }else{
            messageOne.textContent=data.forcast
        }
    })
})
})