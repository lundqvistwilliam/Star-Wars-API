
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
  let compareBtn = document.getElementById("compareBtn")

  let character1;
  let character2;


    fetch("https://swapi.dev/api/people/")
    .then(response => response.json())
    .then(data => {
      data.results.forEach(character => {
        const option1 = document.createElement("option");
        const option2 = document.createElement("option");
        option1.value = character.url;
        option1.text = character.name;
        option2.value = character.url;
        option2.text = character.name;
        characterSelect1.add(option1);
        characterSelect2.add(option2);
      });
    })
    .catch(error => console.error(error));

    compareBtn.addEventListener("click", () => {
        const selectedUrl1 = characterSelect1.value;
        const selectedUrl2 = characterSelect2.value;
        console.log(selectedUrl1)
        console.log(selectedUrl2)
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
      
              Promise.all(filmTitles).then(filmTitlesArr => {
                let pictureURL = "assets/star-wars-logo";
                switch(selectedUrl1){
                    case "https://swapi.dev/api/people/1/":
                        pictureURL = "assets/luke-skywalker.jpeg";
                        break;
                    case "https://swapi.dev/api/people/2/":
                        pictureURL = "assets/c3po.jpeg";
                        break;
                    case "https://swapi.dev/api/people/3/":
                        pictureURL = "assets/r2d2.jpeg";
                        break;
                    case "https://swapi.dev/api/people/4/":
                        pictureURL = "assets/darth-vader.jpeg";
                        break;
                    case "https://swapi.dev/api/people/5/":
                        pictureURL = "assets/leia-organa.jpeg";
                        break;
                    case "https://swapi.dev/api/people/6/":
                        pictureURL = "assets/owen-lars.jpeg";
                        break;
                    case "https://swapi.dev/api/people/7/":
                        pictureURL = "assets/beru-whitesun-lars.jpeg";
                        break;
                    case "https://swapi.dev/api/people/8/":
                        pictureURL = "assets/r5-d4.jpeg";
                        break;
                    case "https://swapi.dev/api/people/9/":
                        pictureURL = "assets/biggs-darklighter.jpeg";
                        break;
                    case "https://swapi.dev/api/people/10/":
                        pictureURL = "assets/obi-wan-kenobi.jpeg";
                        break;
                }
                character1 = new Character(`${name}`,`${gender}`,`${mass}`,`${hairColor}`,`${height}`,`${skinColor}`,`${eyeColor}`,`${filmTitlesArr}`,`${pictureURL}`)
                const infoStr = `Name: ${name}<br>
                                  Gender: ${gender}<br>
                                  Height: ${height}cm<br>
                                  Mass: ${mass}kg<br>
                                  Hair color: ${hairColor}<br>
                                  Skin color: ${skinColor}<br>
                                  Eye color: ${eyeColor}<br>
                                  Films: ${filmTitlesArr.join(", ")}<br>
                                  <img src="${pictureURL}">
                                  `
                                  infoContainer1.innerHTML = infoStr; 
                                  console.log(character1)

              });
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
      
              Promise.all(filmTitles).then(filmTitlesArr => {
                let pictureURL = "assets/star-wars-logo";
                switch(selectedUrl2){
                    case "https://swapi.dev/api/people/1/":
                        pictureURL = "assets/luke-skywalker.jpeg";
                        break;
                    case "https://swapi.dev/api/people/2/":
                        pictureURL = "assets/c3po.jpeg";
                        break;
                    case "https://swapi.dev/api/people/3/":
                        pictureURL = "assets/r2d2.jpeg";
                        break;
                    case "https://swapi.dev/api/people/4/":
                        pictureURL = "assets/darth-vader.jpeg";
                        break;
                    case "https://swapi.dev/api/people/5/":
                        pictureURL = "assets/leia-organa.jpeg";
                        break;
                    case "https://swapi.dev/api/people/6/":
                        pictureURL = "assets/owen-lars.jpeg";
                        break;
                    case "https://swapi.dev/api/people/7/":
                        pictureURL = "assets/beru-whitesun-lars.jpeg";
                        break;
                    case "https://swapi.dev/api/people/8/":
                        pictureURL = "assets/r5-d4.jpeg";
                        break;
                    case "https://swapi.dev/api/people/9/":
                        pictureURL = "assets/biggs-darklighter.jpeg";
                        break;
                    case "https://swapi.dev/api/people/10/":
                        pictureURL = "assets/obi-wan-kenobi.jpeg";
                        break;
                }
                character2 = new Character(`${name}`,`${gender}`,`${mass}`,`${hairColor}`,`${height}`,`${skinColor}`,`${eyeColor}`,`${filmTitlesArr}`,`${pictureURL}`)
                const infoStr = `Name: ${name}<br>
                                  Gender: ${gender}<br>
                                  Height: ${height}cm<br>
                                  Mass: ${mass}kg<br>
                                  Hair color: ${hairColor}<br>
                                  Skin color: ${skinColor}<br>
                                  Eye color: ${eyeColor}<br>
                                  Films: ${filmTitlesArr.join(", ")}<br>
                                  <img src="${pictureURL}">`;
                infoContainer2.innerHTML = infoStr;
                console.log(character2)
              });
            })
            .catch(error => console.error(error));
        } else {
          infoContainer2.innerHTML = "";
        }
      });