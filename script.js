import {Media} from './classes/Media'
import {Film} from './classes/Film'

let inputRecherche = document.querySelector("#recherche");

function rechercher(page) {
    let titreRecherche = inputRecherche.value;
    Media.fetchJSON(titreRecherche,page).then(function(films){
        console.log(films);
        let chaineHTML="";
        for (const unFilm of films) {
            chaineHTML+=unFilm.affiche();
        }
        document.querySelector("#films").innerHTML=chaineHTML;
        })
}

window.rechercher=rechercher

inputRecherche.addEventListener("change",async function () {
  rechercher(1);
  let url = `http://www.omdbapi.com/?s=${inputRecherche.value}`;
  let APIKey = "&apikey=22b0b810";
  let reponse = await fetch(url + APIKey);
  let data = await reponse.json();
  let nbrResultat= data.totalResults;
  let nbrPages=Math.ceil(nbrResultat/10);
  let chainePage=" <span class='text-warning'>Pages : </span>";
  for(let i=1;i<=nbrPages;i++)
  {
      chainePage+=`<btn class="btn btn-secondary text-warning m-1" onclick="rechercher(this.id)" id="${i}" >${i}</btn>`
  }

  document.querySelector("#pages").innerHTML=chainePage;
})

//https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.techtribune.net%2Fanime%2Fberserk-presente-une-nouvelle-main-de-dieu%2F42500%2F&psig=AOvVaw1D55ujr7KO2aEEsyy15TTg&ust=1614076279797000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJCmgu-k_e4CFQAAAAAdAAAAABAD