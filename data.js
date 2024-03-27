export async function getPokemon(id){
    try {
        const response =await 
        fetch (`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data =await response.json();
        return data;

     
       
       
    } catch (error) {
            console.error("Error al pedir los datos",error);
    
        }
};
