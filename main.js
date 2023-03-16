
class Character{
    constructor(name,gender,mass,hairColor,height,skinColor,eyeColor,movies,pictureURL){
        this.name = name;
        this.gender = gender;
        this.height = height;
        this.mass = mass;
        this.hairColor = hairColor;
        this.skinColor = skinColor;
        this.eyeColor = eyeColor;
        this.movies = movies;
        this.pictureURL = pictureURL;
    }
}

let compareBtn = document.getElementById("compareBtn");
let getDataBtn = document.getElementById("getDataBtn");
let loadingText = document.getElementById("loadingText");

let fetchCounter = 0;

// Variables for stats text
let massTexts = document.getElementById("massTexts");
let hairColorTexts = document.getElementById("hairColorTexts");
let heightTexts = document.getElementById("heightTexts");
let skinColorTexts = document.getElementById("skinColorTexts");
let eyeColorTexts = document.getElementById("eyeColorTexts");
let moviesTexts = document.getElementById("moviesTexts");


// Variables related to character 1
let character1;
const characterSelect1 = document.getElementById("character1-select");
let cardImage1 = document.getElementById("cardImage1");
let name1 = document.getElementById("name1");
let gender1 = document.getElementById("gender1");
let mass1 = document.getElementById("mass1");
let hairColor1 = document.getElementById("hairColor1");
let height1 = document.getElementById("height1");
let skinColor1 = document.getElementById("skinColor1");
let eyeColor1 = document.getElementById("eyeColor1");


// Variables related to character 2
let character2;
const characterSelect2 = document.getElementById("character2-select");
let cardImage2 = document.getElementById("cardImage2");
let name2 = document.getElementById("name2");
let gender2 = document.getElementById("gender2");
let mass2 = document.getElementById("mass2");
let hairColor2 = document.getElementById("hairColor2");
let height2 = document.getElementById("height2");
let skinColor2 = document.getElementById("skinColor2");
let eyeColor2 = document.getElementById("eyeColor2");


  fetch("https://swapi.dev/api/people/")
  .then(response => response.json())
  .then(data => {
    const options = data.results.map(character => {
      return `<option value="${character.url}">${character.name}</option>`;
    });
    characterSelect1.innerHTML += options.join('');
    characterSelect2.innerHTML += options.join('');
  })
  .catch(error => console.error(error));
  
  characterSelect1.addEventListener("change", disableCompareBtn);
  characterSelect2.addEventListener("change", disableCompareBtn);
  
  getDataBtn.addEventListener("click", () => {
      const selectedUrl1 = characterSelect1.value;
      const selectedUrl2 = characterSelect2.value;
      
      const characterImageUrls = {
          "https://swapi.dev/api/people/1/": "assets/luke-skywalker.jpeg",
          "https://swapi.dev/api/people/2/": "assets/c3po.jpeg",
          "https://swapi.dev/api/people/3/": "assets/r2d2.jpeg",
          "https://swapi.dev/api/people/4/": "assets/darth-vader.jpeg",
          "https://swapi.dev/api/people/5/": "assets/leia-organa.jpeg",
          "https://swapi.dev/api/people/6/": "assets/owen-lars.jpeg",
          "https://swapi.dev/api/people/7/": "assets/beru-whitesun-lars.jpeg",
          "https://swapi.dev/api/people/8/": "assets/r5-d4.jpeg",
          "https://swapi.dev/api/people/9/": "assets/biggs-darklighter.jpeg",
          "https://swapi.dev/api/people/10/": "assets/obi-wan-kenobi.jpeg",
      };
        
      if (selectedUrl1) {
        showLoadingText();
        fetch(selectedUrl1)
          .then(response => response.json())
          .then(data => {
            const {
              name,
              gender,
              height,
              mass,
              hair_color: hairColor,
              skin_color: skinColor,
              eye_color: eyeColor,
              films
            } = data;
        
            const filmTitles = films.map(filmUrl => {
              return fetch(filmUrl)
                .then(response => response.json())
                .then(data => data.title)
                .catch(error => console.error(error));
            });
        
            Promise.all(filmTitles)
              .then(filmTitlesArr => {
                const pictureURL = characterImageUrls[selectedUrl1] || "assets/star-wars-logo";
                character1 = new Character(`${name}`,`${gender}`,`${mass}`,`${hairColor}`,`${height}`,`${skinColor}`,`${eyeColor}`,filmTitlesArr,`${pictureURL}`)
                console.log(character1)
                cardImage1.src=`${pictureURL}`
                name1.innerHTML=`${name}`
                name1.style.color="black";
                loadingText.style.display="none"

                fetchCounter++;
                if(fetchCounter===2){
                  hideLoadingText();
                  compareBtn.disabled=false;
                  fetchCounter=0;
                }

            })
                .catch(error => console.error(error));
            })
            .catch(error => {
              loadingText.style.display = "block";
              loadingText.innerHTML = "Failed to load information. Refresh the site and try again.";
            });
        } 

      if (selectedUrl2) {
        showLoadingText();
        fetch(selectedUrl2)
          .then(response => response.json())
          .then(data => {
            const {
              name,
              gender,
              height,
              mass,
              hair_color: hairColor,
              skin_color: skinColor,
              eye_color: eyeColor,
              films
          } = data;
        
              const filmTitles = films.map(filmUrl => {
                return fetch(filmUrl)
                  .then(response => response.json())
                  .then(data => data.title)
                  .catch(error => console.error(error));
              });
        
              Promise.all(filmTitles)
                .then(filmTitlesArr => {
                  const pictureURL = characterImageUrls[selectedUrl2] || "assets/star-wars-logo";
                  character2 = new Character(`${name}`,`${gender}`,`${mass}`,`${hairColor}`,`${height}`,`${skinColor}`,`${eyeColor}`,filmTitlesArr,`${pictureURL}`)
                  console.log(character2)
                  cardImage2.src=`${pictureURL}`
                  name2.innerHTML=`${name}`
                  name2.style.color="black";

                  fetchCounter++;
                  if(fetchCounter===2){
                    hideLoadingText();
                    compareBtn.disabled=false;
                    fetchCounter=0;
                  }
                  
                })
                .catch(error => console.error(error));
            })
            .catch(error => {
              loadingText.style.display = "block";
              loadingText.innerHTML = "Failed to load information. Refresh the site and try again.";
            });
        } 
    });
        
    
    compareBtn.addEventListener("click", () => {
      updateCharacterInformation();  
      setGradients();  
    });


function updateCharacterInformation(){
  // Update and set Character1 information
  cardImage1.src=`${character1.pictureURL}`
  name1.innerHTML=`${character1.name}`
  gender1.innerHTML=`${character1.gender}`
  mass1.innerHTML=`${character1.mass}`  
  hairColor1.innerHTML=`${character1.hairColor}`
  height1.innerHTML=`${character1.height}`
  skinColor1.innerHTML=`${character1.skinColor}`
  eyeColor1.innerHTML=`${character1.eyeColor}`

  const movies1 = document.getElementById("movies1")
  movies1.innerHTML=""
     
  for(let i=0; i < character1.movies.length; i++) {
    let li = document.createElement("li");
    li.textContent = character1.movies[i];
    movies1.appendChild(li);
    }
    let totalLi1 = document.createElement("li");
    totalLi1.innerHTML = "Total: " + character1.movies.length;
    movies1.append(totalLi1); 


  // Update and set Character2 information
  cardImage2.src=`${character2.pictureURL}`
  name2.innerHTML=`${character2.name}`
  gender2.innerHTML=`${character2.gender}`
  mass2.innerHTML=`${character2.mass}`
  hairColor2.innerHTML=`${character2.hairColor}`
  height2.innerHTML=`${character2.height}`
  skinColor2.innerHTML=`${character2.skinColor}`
  eyeColor2.innerHTML=`${character2.eyeColor}`
  
  const movies2 = document.getElementById("movies2")
  movies2.innerHTML=""
    
  for(let i=0; i < character2.movies.length; i++) {
    let li = document.createElement("li");
    li.textContent = character2.movies[i];
    movies2.appendChild(li);
  }
    let totalLi2 = document.createElement("li");
    totalLi2.innerHTML = "Total: " + character2.movies.length;
    movies2.append(totalLi2); 
}

function setGradients(){
   
  if(character1.gender === character2.gender){
    document.getElementById("genderTexts").style.background ="linear-gradient(to left, " + "green" + ", " + "green" + ")";
  } else {
    document.getElementById("genderTexts").style.background ="orange";
  }

  if(+character1.mass > character2.mass){
    massTexts.style.background ="linear-gradient(to right, " + "green" + ", " + "red" + ")";
  } else if(+character2.mass > character1.mass) {
    massTexts.style.background ="linear-gradient(to left, " + "green" + ", " + "red" + ")";
  }  else {
    massTexts.style.background ="orange";
  }

  if(character1.hairColor === character2.hairColor){
    hairColorTexts.style.background ="linear-gradient(to right, " + "green" + ", " + "green" + ")";
  } else {
    hairColorTexts.style.background ="orange";
  }
  
  if(+character1.height > character2.height){
    heightTexts.style.background ="linear-gradient(to right, " + "green" + ", " + "red" + ")";
  } else if(+character2.height > character1.height) {
    heightTexts.style.background ="linear-gradient(to left, " + "green" + ", " + "red" + ")";
  } else {
    heightTexts.style.background ="orange";
  }

  if(character1.skinColor === character2.skinColor){
    skinColorTexts.style.background ="linear-gradient(to right, " + "green" + ", " + "green" + ")";
  } else {
    skinColorTexts.style.background ="orange";
  }

  if(character1.eyeColor === character2.eyeColor){
    eyeColorTexts.style.background ="linear-gradient(to right, " + "green" + ", " + "green" + ")";
  } else {
    eyeColorTexts.style.background ="orange";
  }

  if(character1.movies.length > character2.movies.length){
    moviesTexts.style.background ="linear-gradient(to right, " + "green" + ", " + "red" + ")";
  } else if(character2.movies.length > character1.movies.length) {
    moviesTexts.style.background ="linear-gradient(to left, " + "green" + ", " + "red" + ")";
  } else {
    moviesTexts.style.background ="green"
  }
}

function disableCompareBtn() {
  if(characterSelect1.value === "" || characterSelect2.value===""){
    getDataBtn.disabled=true;
  } else {
    getDataBtn.disabled=false;
  }
  compareBtn.disabled = true;
}

function showLoadingText() {
  loadingText.style.display = "block";
  loadingText.innerHTML = `Loading information...`
}

function hideLoadingText() {
  loadingText.style.display = "none";
}

