const API_KEY = 'live_XTZtxCEP8EjJwFLUYJ1njrWaahD3aElXsBBEvrVLfDkXbf4sA2xwZY98dqKSOKAc'
const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=3&api_key=" + API_KEY
const API_URL_FAV = "https://api.thecatapi.com/v1/favourites?api_key=" + API_KEY
const API_URL_FAV_DELETE = (id) => "https://api.thecatapi.com/v1/favourites/" + id + "?api_key=" + API_KEY

const changeButton = document.getElementById("newCat")
const img1 = document.getElementById("gatito1")
const img2 = document.getElementById("gatito2")
const img3 = document.getElementById("gatito3")
const btn1= document.getElementById("btn1")
const btn2= document.getElementById("btn2")
const btn3= document.getElementById("btn3")
const spanError = document.getElementById('error')
const favSection = document.getElementById('fav-kitties')
const favTitle =  document.getElementById('fav-title')

async function showRandomCat() {
    const res = await fetch(API_URL_RANDOM)
    
    if (res.status !== 200 /* res.status = HTTP Status Code */) {
        showError(res.status)
    } else {
        const data = await res.json()

        img1.src = data[0].url
        img2.src = data[1].url
        img3.src = data[2].url

        btn1.onclick = () => addFavCat(data[0].id)
        btn2.onclick = () => addFavCat(data[1].id)
        btn3.onclick = () => addFavCat(data[2].id)

        console.log('showRandomCat')
        console.log(data)
    }
}

async function showFavCat() {
    const res = await fetch(API_URL_FAV)
    
    if (res.status !== 200) {
        showError(res.status)
    } else {
        const data = await res.json()
        
        favSection.innerHTML = ""
        favSection.appendChild(favTitle)

        let catContainer = document.createElement('div')
        catContainer.classList.add('catContainer')

        let counter = 0

        data.forEach(cat => {
            catContainer = createCatContainer(catContainer, counter)

            counter++

            const div = document.createElement('div')

            const img = document.createElement('img')
            img.src = cat.image.url
            
            const btn = document.createElement('button')
            btn.classList.add('fav-cat-btn')
            btn.onclick = () => removeFavCat(cat.id)

            div.appendChild(img)
            div.appendChild(btn)
            catContainer.appendChild(div)
            favSection.appendChild(catContainer)
        })

        console.log('showFavCat')
        console.log(data)
    }
}

function createCatContainer(actualContainer, counter) {
    if (counter % 3 == 0) {
       const newContainer = document.createElement('div')
       newContainer.classList.add('catContainer')
       return newContainer 
    } return actualContainer
}

async function addFavCat(catID) {
    const res = await fetch(API_URL_FAV, {
        method: "POST", // method => tipo de solicitud
        headers: { // headers => tipo de contenido/respuesta que estamos esperando
            'Content-Type': 'application/json', // estamos trabajando en json (aunque el 99.9% de las veces las API REST se comunican con json, pero por ejemplo, hay formas de mandar una imagen, que no viaja en formato json, sino en un formato de imagen)
        },
        body: JSON.stringify({// body => contenido
            image_id: catID
        }),
    })

    if (res.status !== 200) {
        showError(res.status)
    }

    showFavCat()

    console.log('ADDED')
    console.log(catID);
}

async function removeFavCat(catID) {
    const res = await fetch(API_URL_FAV_DELETE(catID), {
        method: "DELETE", // no tengo que enviarle un body, porque lo que enviaria sería el id y ya lo estoy enviando en el endpoint. Al no tener que enviarle un body, no necesito enviar un header para especificar nada.
    })

    if (res.status !== 200) {
        showError(res.status)
    }

    showFavCat()

    console.log('DELETED')
    console.log(catID);
}

async function postCat() {
    
}

function showError(status){
    spanError.innerHTML = 'There was an error ' + status
}

showRandomCat()
showFavCat()