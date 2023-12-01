let listaPaises = []

const fetchPaises = async () => {
    const response = await fetch("https://restcountries.com/v3/all")
    const paises = await response.json()
    paises.forEach((pais) => {
        let {name: {common}, flags, capital, population, car: {side} } = pais
        capital = capital !== undefined? capital[0] : "None";
        listaPaises.push({name: common, flag: flags[1], capital: capital, population: population, side: side})
    })
    listaPaises.sort((a,b) => a.name.localeCompare(b.name))
    return listaPaises
}

const pintaPaises = (listaPaises) => {
    const container = document.getElementById('countries-list')
    let contador = 0;
    listaPaises.forEach((pais) => {
        container.innerHTML += `<div class="country" id="${contador++}">
        <img src="${pais.flag}" alt="${pais.name} flag"/>
        <span>${pais.name}</span>
        </div>`
    })
    return listaPaises
}

const ventanaFlotante = document.querySelector('.ventana');
ventanaFlotante.style.visibility = "hidden";

const paisesDOM = (listaPaises) => {
    const paisesDOM = document.querySelectorAll("#countries-list div")
    paisesDOM.forEach((pais) => {
        pais.addEventListener('click', () => {
            let paisSeleccionado = listaPaises[pais.id]
            ventanaFlotante.style.visibility = "visible";
            ventanaFlotante.innerHTML = `
            <div class="imgandbutton">
                <img src="${paisSeleccionado.flag}" alt="${paisSeleccionado.name}"/>
                <button>Cerrar</button>
            </div>
            <div class="info">
                <p>${paisSeleccionado.name}</p>
                <span>Capital: ${paisSeleccionado.capital}</span>
                <span>Población: ${paisSeleccionado.population}</span>
                <span>Lado de la carretera: ${paisSeleccionado.side}</span>
            </div>`
            const boton = document.querySelector('.ventana button')
            boton.addEventListener('click', () => {
                ventanaFlotante.innerHTML = ""
                ventanaFlotante.style.visibility = "hidden";
            })
        })
        })
    }
    

fetchPaises().then((listaPaises) => pintaPaises(listaPaises)).then((listaPaises) => paisesDOM(listaPaises))
