
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


  const characterSelect1 = document.getElementById("character1-select");
  const infoContainer1 = document.getElementById("info-container1");

  const characterSelect2 = document.getElementById("character2-select");
  const infoContainer2 = document.getElementById("info-container2");
  let compareBtn = document.getElementById("compareBtn");
  let getDataBtn = document.getElementById("getDataBtn");

  let character1;
  let character2;

  let cardImage1 = document.getElementById("cardImage1")
  let cardImage2 = document.getElementById("cardImage2")

  let dataGot = false;
  if(dataGot === false){
    compareBtn.disabled=true;
  }


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

    getDataBtn.addEventListener("click", () => {
        const selectedUrl1 = characterSelect1.value;
        const selectedUrl2 = characterSelect2.value;
        console.log(selectedUrl1)
        console.log(selectedUrl2)

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
                  document.getElementById("cardImage1").src=`${pictureURL}`
                  document.getElementById("name1").innerHTML=`${name}`
                  document.getElementById("name1").style.color="black";
                  compareBtn.disabled=false;
                })
                .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
        } else {
          infoContainer1.innerHTML = "";
        }

        if (selectedUrl2) {
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
                  document.getElementById("cardImage2").src=`${pictureURL}`
                  document.getElementById("name2").innerHTML=`${name}`
                  document.getElementById("name2").style.color="black";
                  compareBtn.disabled=false;
                })
                .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
        } else {
          infoContainer2.innerHTML = "";
        }
    });
        
    
    compareBtn.addEventListener("click", () => {

      // char 1
      document.getElementById("cardImage1").src=`${character1.pictureURL}`
      document.getElementById("name1").innerHTML=`${character1.name}`
      document.getElementById("gender1").innerHTML=`${character1.gender}`
      document.getElementById("mass1").innerHTML=`${character1.mass}`  
      document.getElementById("hairColor1").innerHTML=`${character1.hairColor}`
      document.getElementById("height1").innerHTML=`${character1.height}`
      document.getElementById("skinColor1").innerHTML=`${character1.skinColor}`
      document.getElementById("eyeColor1").innerHTML=`${character1.eyeColor}`

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

      // char 2
      document.getElementById("cardImage2").src=`${character2.pictureURL}`
      document.getElementById("name2").innerHTML=`${character2.name}`
      document.getElementById("gender2").innerHTML=`${character2.gender}`
      document.getElementById("mass2").innerHTML=`${character2.mass}`
      document.getElementById("hairColor2").innerHTML=`${character2.hairColor}`
      document.getElementById("height2").innerHTML=`${character2.height}`
      document.getElementById("skinColor2").innerHTML=`${character2.skinColor}`
      document.getElementById("eyeColor2").innerHTML=`${character2.eyeColor}`

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

      setGradients();  
    });


function setGradients(){

  if(character1.gender === character2.gender){
    document.getElementById("genderTexts").style.background ="linear-gradient(to left, " + "green" + ", " + "green" + ")";
  } else {
    document.getElementById("genderTexts").style.background ="orange";
  }

  if(+character1.mass > character2.mass){
    document.getElementById("massTexts").style.background ="linear-gradient(to right, " + "green" + ", " + "red" + ")";
  } else if(+character2.mass > character1.mass) {
    document.getElementById("massTexts").style.background ="linear-gradient(to left, " + "green" + ", " + "red" + ")";
  }  else {
    document.getElementById("massTexts").style.background ="orange";
  }

  if(character1.hairColor === character2.hairColor){
    document.getElementById("hairColorTexts").style.background ="linear-gradient(to right, " + "green" + ", " + "green" + ")";
  } else {
    document.getElementById("hairColorTexts").style.background ="orange";
  }
  
  if(+character1.height > character2.height){
    document.getElementById("heightTexts").style.background ="linear-gradient(to right, " + "green" + ", " + "red" + ")";
  } else if(+character2.height > character1.height) {
    document.getElementById("heightTexts").style.background ="linear-gradient(to left, " + "green" + ", " + "red" + ")";
  } 

  if(character1.skinColor === character2.skinColor){
    document.getElementById("skinColorTexts").style.background ="linear-gradient(to right, " + "green" + ", " + "green" + ")";
  } else {
    document.getElementById("skinColorTexts").style.background ="orange";
  }

  if(character1.eyeColor === character2.eyeColor){
    document.getElementById("eyeColorTexts").style.background ="linear-gradient(to right, " + "green" + ", " + "green" + ")";
  } else {
    document.getElementById("eyeColorTexts").style.background ="orange";
  }

  if(character1.movies.length > character2.movies.length){
    document.getElementById("moviesTexts").style.background ="linear-gradient(to right, " + "green" + ", " + "red" + ")";
  } else if(character2.movies.length > character1.movies.length) {
    document.getElementById("moviesTexts").style.background ="linear-gradient(to left, " + "green" + ", " + "red" + ")";
  } else {
    document.getElementById("moviesTexts").style.background ="green"
  }
}

