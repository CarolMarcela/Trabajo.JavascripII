import { getPokemon } from "./data.js";

const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/"
const characterCardContainer = document.getElementById ("chacter-card-container");
const characterInput =document.getElementById("character-input");

characterInput.addEventListener("change",async()=>{
    const characterId= characterInput.value.trim();
        if((characterId)){
       
       if(characterId <1 || characterId > 1025){
        alert("ingresa un id valido");
        characterInput.value="";
        return;
    }
}
    try {
        const characterData = await getPokemon (characterId);
        renderCharacterCard(characterData);
        
    } catch (error) {
        console.error("Error al pedir los datos", error);
        renderCharacterCard(null);
        
    }
});

function renderCharacterCard(characterData){
    if(!characterData){
        characterCardContainer.innerHTML = "";
        return;
    }
 const spritess = characterData.sprites.other["official-artwork"].front_default;
 const Name = characterData.name;
    const {abilities,types }=
    characterData;

    const CharacterCard=document.createElement("div");
    CharacterCard.classList.add("character-card");

    const sprite = document.createElement ("img");
    sprite.src = spritess;
    sprite.alt =Name;
    sprite.width='500' ;
    sprite.height= '250';

   
    
   const characterName= document.createElement("h2");
    characterName.textContent= Name;

    const characterStyle=document.createElement("p");
    if(types.length >1){
    characterStyle.textContent=`Estilo ${types[0].type.name}, ${types[1].type.name}`;
    }if(types.length==1){
    characterStyle.textContent=`Estilo ${types[0].type.name}`;
};
    
    const pokemonH = document.createElement("p");
    if(abilities.length>1){
    pokemonH.textContent=`Habilidades: ${abilities[0].ability.name}, ${abilities[1].ability.name}`;
    }if(abilities.length==1){
        pokemonH.textContent=`Habilidades: ${abilities[0].ability.name}`;
    };
  

    CharacterCard.appendChild(sprite);
    CharacterCard.appendChild(characterName);
    CharacterCard.appendChild(characterStyle);
    CharacterCard.appendChild(pokemonH);
  

    characterCardContainer.appendChild(CharacterCard);

}

characterInput.addEventListener("input", () =>{
    renderCharacterCard(null);
    
});

//-----------------------------------------------------------------
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    characterCardContainer.innerHTML = "";

    for (let i = 1; i <= 1025; i++) {
        fetch(URL+i)
            .then((response) => response.json())
            .then(data => {
                   console.log(data.types.map(type=> type.type.name));
                if(botonId === "ver-todos") {
                    renderCharacterCard(data);
                    console.log(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        renderCharacterCard(data);
                    }
                }

            })
        }}))
      ;
