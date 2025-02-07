let img = document.getElementById('fotos')
let f = document.querySelector('.f')
let search = document.getElementById('search')
let searchValue = ''

document.addEventListener('DOMContentLoaded', () => {
    getFotos()
})

search.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        img.querySelectorAll("img").forEach(img => img.remove());


        searchValue = search.value

        getFotos()
    }


})

//pegando fotos do servidor
async function getFotos() {
    try {

        const apiKey = "syZxZ-bTJIRZxA3joPHP-FQ05A81VcKDSOUsC4e4A6Q"// minha chave
        // buscar fotos com metodo GET em conteudo JSON

        const response = await fetch(`https://api.unsplash.com/photos/random/?query=${searchValue}&count=3&client_id=${apiKey}`, {
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

        //pegando os dados json e manipulando
        const data = await response.json()
        console.log(data)// mostra todos os dados
        data.forEach((element, number) => { //pega todas os dados e mostra em tela
            let fotos = document.createElement('img')
            fotos.src = element.urls.full // atribui a o link src,img a minha variavel
            img.appendChild(fotos) // guarda a imagem no elemento img 

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



    } catch (error) {
        console.error("error ao buscar a foto:", error)
    }

}




