let img = document.getElementById('fotos')
let f = document.querySelector('.f')
let search = document.getElementById('search')
let searchValue = ''
let lupa = document.getElementById('lupa')
let backgroundInput = document.getElementById('background-input')
let backgroundLupa = document.getElementById('background-lupa')
let searchLupa = document.getElementById('search-lupa')

document.addEventListener('DOMContentLoaded', () => {
    getFotos()
})

search.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        img.querySelectorAll("img").forEach(img => img.remove());
        backgroundInput.style.display = 'none'
        searchLupa.style.display = 'none'
        searchValue = search.value
        document.querySelector('.load').style.display = 'flex'

        getFotos()
    }
})

lupa.addEventListener('click', () => {
    backgroundInput.style.display = 'flex'
    searchLupa.style.display = 'flex'

})

document.getElementById('lupa-input').addEventListener('click', () => {
    if (!search.value) {
        console.log(!search.value)
    } else {
        img.querySelectorAll("img").forEach(img => img.remove());
        backgroundInput.style.display = 'none'
        searchLupa.style.display = 'none'
        searchValue = search.value
        document.querySelector('.load').style.display = 'flex'

        getFotos()

    }
})
document.getElementById('background-input').addEventListener('click', () => {
    backgroundInput.style.display = 'none'
    searchLupa.style.display = 'none'

})

//pegando fotos do servidor
async function getFotos() {
    try {

        const apiKey = "FapmCjLQ0Xv2GFlKDHvzFlaDl73lk6ORFSASerxlbNE"// minha chave
        // buscar fotos com metodo GET em conteudo JSON

        const response = await fetch(`https://api.unsplash.com/photos/random/?query=${searchValue}&count=30&client_id=${apiKey}`, {
            method: 'GET',
            headers: {
                'content-Type': 'application/json'
            }
        })
        console.log(response)
        //verifica se buscar deu certo        
        if (!response.ok) {
            throw new Error('error', response.status)
        }
        let div = document.createElement('div')
        div.classList.add('div-divisao')
        div.style.display = 'none'

        //pegando os dados json e manipulando
        const data = await response.json()
        console.log(data)// mostra todos os dados
        data.forEach((element, number) => { //pega todas os dados e mostra em tela
            let fotos = document.createElement('img')
            fotos.src = element.urls.regular // atribui a o link src,img a minha variavel
            div.appendChild(fotos)
            img.appendChild(div) // guarda a imagem no elemento img 

            document.addEventListener('click', (e) => { // evento de click
                if (e.target === fotos) {              //se meu parametro for igual a imagem clicada 
                    f.style.display = 'flex'           // a classList escondida aparece
                    document.body.style.overflow = 'hidden'; // cancela o scroll do mouse   
                    let showImagem = document.querySelector('.img-falso')
                    console.log("dados", showImagem)
                    showImagem.src = fotos.src // atribui a imagem clicada para a imagem falso
                    f.appendChild(showImagem) // adiciona a imagem falso no elemento f
                    console.log(f)

                }
            })

            f.addEventListener('click', () => {
                f.style.display = 'none'
                document.body.style.overflow = 'auto';
            })

        });
        setTimeout(() => {
            img.style.display = 'block'
            div.style.display = 'block'
            document.querySelector('.load').style.display = 'none'


            
        }, 4000)

    } catch (error) {
        if(error) {
            document.querySelector('.erro').innerHTML = 'Verifique sua conexão com a internet'
            img.style.display = 'none'
    
           // window.alert('erro')
            console.error("error ao buscar a foto:", error.message)

        }
    }
}



window.addEventListener('touchmove', () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
       let load =  document.querySelector('.load')
       load.style.display = 'flex'
       load.style.marginTop = '0px'
       load.style.marginBottom = '30px'
            getFotos()
       
    }
})
window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
       let load =  document.querySelector('.load')
       load.style.display = 'flex'
       load.style.marginTop = '0px'
       load.style.marginBottom = '30px'
            getFotos()
       
    }
})