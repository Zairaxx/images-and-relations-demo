let renderPets = async () => {
    let response = await axios.get("http://localhost:1337/api/pets?populate=*");
    let pets = response.data.data;
    console.log(pets);
    
    pets.forEach(pet => {
        let name = document.createElement("p");
        let candies = document.createElement("p");
        candies.innerText = "Favorite candies: "
        name.innerText = "Name: " + pet.attributes.name;

        let portrait = document.createElement("img");
        if(pet.attributes.portrait.data) {
        portrait.src = "http://localhost:1337" + pet.attributes.portrait.data.attributes.url;
        }
        pet.attributes.favorite_candies.data.forEach(candy => {
            candies.innerText += candy.attributes.name + " ";
        })

        document.querySelector("#pet-container").append(name, candies, portrait);
    });
}

renderPets()

let adoptPet = async () => {
    let name = document.querySelector("#name").value;
    let favorite_candies = document.querySelector("#candies").value;

    //Hämtar ut filen och placerar den i en FormData
    let img = document.querySelector("#portraitImg").files;
    let imgData = new FormData();
    imgData.append("files", img[0])

    // Laddar upp filen i Strapi.
    await axios.post("http://localhost:1337/api/upload", imgData)
    .then((response) => {
        //Placerar den uppladdade filens ID i vårt nya djur vi vill lägga till.
        axios.post("http://localhost:1337/api/pets", {
            data: {
                name,
                favorite_candies:[favorite_candies],
                portrait: response.data[0].id
            }
        })
    })
}