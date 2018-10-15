BASE_URL = 'https://pokeapi.co/api/v2/'
let max = 802 //we found that anythign above 802 returns an error

$(document).ready(function(){

    // //getting using callback hell
    // let pokemon1name = null,
    //     pokemon2name = null,
    //     pokemon3name = null

    // $.get(`${BASE_URL}/pokemon/`,function(resp){
    //     $.get(`${BASE_URL}/pokemon/${randomNum(max)}/`,function(resp){
    //         pokemon1name = resp.forms[0].name
    //         $.get(`${resp.species.url}`,function(resp){
    //             console.log(pokemon1name)
    //             for(let i=0;i<resp.flavor_text_entries.length;i++){
    //                 if(resp.flavor_text_entries[i].language.name==='en'){
    //                     console.log(resp.flavor_text_entries[i].flavor_text)
    //                     break;
    //                 }
    //             }
    //         })
    //     })
    //     $.get(`${BASE_URL}/pokemon/${randomNum(max)}/`,function(resp){
    //         pokemon2name = resp.forms[0].name
    //         $.get(`${resp.species.url}`,function(resp){
    //             console.log(pokemon2name)
    //             for(let i=0;i<resp.flavor_text_entries.length;i++){
    //                 if(resp.flavor_text_entries[i].language.name==='en'){
    //                     console.log(resp.flavor_text_entries[i].flavor_text)
    //                     break;
    //                 }
    //             }
    //         })
    //     })
    //     $.get(`${BASE_URL}/pokemon/${randomNum(max)}/`,function(resp){
    //         pokemon3name = resp.forms[0].name
    //         $.get(`${resp.species.url}`,function(resp){
    //             console.log(pokemon3name)
    //             for(let i=0;i<resp.flavor_text_entries.length;i++){
    //                 if(resp.flavor_text_entries[i].language.name==='en'){
    //                     console.log(resp.flavor_text_entries[i].flavor_text)
    //                     break;
    //                 }
    //             }
    //         })
    //     })
    // })

    // //get using promises

    // let promiseArr = []

    // for(i=0;i<3;i++){
    //     promiseArr.push($.get(`${BASE_URL}/pokemon/${randomNum(max)}/`))
    // }
    
    // Promise.all(promiseArr)
    //     .then(pokemon => {
    //     pokemon.forEach(poke => {
    //     $.get(`${poke.species.url}`)
    //         .then(resp => {
    //             for(let i=0;i<resp.flavor_text_entries.length;i++){
    //                 if(resp.flavor_text_entries[i].language.name==='en'){
    //                     console.log(poke.forms[0].name)
    //                     console.log(resp.flavor_text_entries[i].flavor_text)
    //                     break;
    //                 }
    //             }
    //         })
    //     })
    // })
    // .catch(error => console.log(error))

    //get using async and await
    // getPokemon()
    // getPokemon()
    // getPokemon()

    $('#pokemonButton').on('click',function(){
        $('#pokemon').text('')
        getPokemon()
        getPokemon()
        getPokemon()
    })
})

function randomNum(max){
    return Math.floor(Math.random() * max) + 1
}

async function getPokemon(){
    let pokemon_resp = await $.get(`${BASE_URL}/pokemon/${randomNum(max)}/`)
    let poke_species = await $.get(`${pokemon_resp.species.url}`)
    
    
    for(let i=0;i<poke_species.flavor_text_entries.length;i++){
        if(poke_species.flavor_text_entries[i].language.name==='en'){
            
            var pokemonName = pokemon_resp.forms[0].name
            var englishDescription = poke_species.flavor_text_entries[i].flavor_text
            var pokemonImage = pokemon_resp.sprites.front_default
            break;
        }
    }

    appendPokemon(pokemonName,englishDescription,pokemonImage)
}

function appendPokemon(name, description, img){
    $('#pokemon').append(`<div>${name}<br><img src=${img}><br><p>${description}</p></div>`)    
}