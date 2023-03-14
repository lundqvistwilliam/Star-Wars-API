
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

    getDataBtn.addEventListener("click", () => {
        compareBtn.disabled=false;
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
                                  <img src="${pictureURL}">
                                  `
                                  // infoContainer1.innerHTML = infoStr; 
                                  console.log(character1)
                                  document.getElementById("cardImage1").src=`${pictureURL}`
                                  document.getElementById("name1").innerHTML=`${name}`
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
                                    <img src="${pictureURL}">`;
                  // infoContainer2.innerHTML = infoStr;
                  document.getElementById("cardImage2").src=`${pictureURL}`
                  document.getElementById("name2").innerHTML=`${name}`
                  console.log(character2)
                });
              })
              .catch(error => console.error(error));
          } else {
            infoContainer2.innerHTML = "";
          }
        }); 
    


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
                                  // infoContainer1.innerHTML = infoStr; 
                                  console.log(character1)
                                  document.getElementById("cardImage1").src=`${pictureURL}`
                                  document.getElementById("name1").innerHTML=`${name}`
                                  document.getElementById("gender1").innerHTML=`${gender}`
                                  document.getElementById("mass1").innerHTML=`${mass}`
                                  document.getElementById("hairColor1").innerHTML=`${hairColor}`
                                  document.getElementById("height1").innerHTML=`${height}`
                                  document.getElementById("skinColor1").innerHTML=`${skinColor}`
                                  document.getElementById("eyeColor1").innerHTML=`${eyeColor}`
                                  document.getElementById("movies1").innerHTML=`${filmTitlesArr}`

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
                // infoContainer2.innerHTML = infoStr;
                console.log(character2)
                document.getElementById("cardImage2").src=`${pictureURL}`
                document.getElementById("name2").innerHTML=`${name}`
                document.getElementById("gender2").innerHTML=`${gender}`
                document.getElementById("mass2").innerHTML=`${mass}`
                document.getElementById("hairColor2").innerHTML=`${hairColor}`
                document.getElementById("height2").innerHTML=`${height}`
                document.getElementById("skinColor2").innerHTML=`${skinColor}`
                document.getElementById("eyeColor2").innerHTML=`${eyeColor}`
                document.getElementById("movies2").innerHTML=`${filmTitlesArr}`



              });
            })
            .catch(error => console.error(error));
        } else {
          infoContainer2.innerHTML = "";
        }
      });