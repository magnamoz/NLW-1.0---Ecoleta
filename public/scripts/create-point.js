//função para buscar os estados, transformar em json e retornar para html 
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
  
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    
    .then(res => res.json())
  
    .then( states =>{
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    } )
}

populateUFs()

//função para buscar as cidades dentro de cada estado,
function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")
    
    const ufValue = event.target.value

    
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    //limpar o campo e bloquear
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then( cities =>{

        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    } )
}


//toda vez que clicar (na página) em um estado diferente muda aqui e executa função
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)



//itens de coleta
//pegar todos os li's e chamar função
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

//procurar campo escondido com o nome items
const collectedItems = document.querySelector("input[name=items]")

//array para itens selecionados
let selectedItems = []

//função vai pegar o data-id 
function handleSelectedItem (event){
    const itemLi = event.target
    
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

   // console.log(`ITEM ID: `, itemId) mostrar se está pegando


    //verificar se existem itens selecionados, se sim pegar os itens
    const alreadySelected = selectedItems.findIndex(item => item == itemId)
         

    if (alreadySelected >= 0){
        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDiferent = item != itemId
            return itemIsDiferent
        })

        selectedItems = filteredItems
    
    } else {
        //adicionar à seleção
        selectedItems.push(itemId)
    }


    //console.log('selectedItems: ', selectedItems) ver se tá pegando
    
    //atualização do campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}