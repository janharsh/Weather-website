

const weatherElement = document.querySelector('form')
const input = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherElement.addEventListener('submit', (e) => {

   e.preventDefault()

    const location = input.value

    messageOne.textContent = 'Loading Weather info.....'
    messageTwo.textContent = 

    fetch('http://localhost:3000/weather?address='+location).then((response) =>{

    response.json().then((data) => {
        if(data.error){

          messageOne.textContent = data.error
        }else{

            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast

        }

    })
})

    
})
