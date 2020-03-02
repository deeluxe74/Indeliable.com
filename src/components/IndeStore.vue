<template>
  <div class="align" :class="gameBack">
      <h1><span>IndyStore</span></h1>
      <br><br>

      <div v-if="load == true">
          En attente réponse Serveur 
            <div class="spinner-grow text-success" role="status">
                <span class="sr-only">Loading...</span>
            </div> 
            <div class="spinner-grow text-success" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-danger" role="status">
                <span class="sr-only">Loading...</span>
            </div>
      </div>

      <div v-else class="globalConteneur">
            
          <!-- Boucle pour chaque jeux dans le tableaux --->
            <div :class="appearDelay" @click="popUp(game)" v-for="(game,index) in gameStore" class="game">
                <h2>{{ game.price }}€</h2>
                <img :src="game.img" alt="Cover du jeux">
                <h3>{{ game.name }}</h3>
                <p>{{ game.resumer }}</p>
            </div>
      
            <div class="gameMore" :style="gameMore">
                
                <button @click="popUp()" class="close">
                    <span style="font-size:6rem" aria-hidden="true">×</span>
                    <span class="sr-only">Close</span>
                </button>
                
                <h1 class="Game_title">{{ currentGame.name }}</h1> 
                <transition name="fade"> 
                    <div v-if="loadImg" class="Game_img">
                        <img :src="currentGame.imgStore.img1" alt="Apercue du jeux">
                        <img :src="currentGame.imgStore.img2" alt="Apercue du jeux">  
                        <img :src="currentGame.imgStore.img3" alt="Apercue du jeux">
                    </div>
                </transition>
                <div style="display: flex; justify-content: space-between;">
                    <h3 class="Game_release">Plateformes : <span>{{ currentGame.plateformes }}</span></h3>
                    <h3 class="Game_release">Sortie : <span>{{ currentGame.date }}</span></h3>
                    <h3 class="Game_release">Styles : <span>{{ currentGame.style }}</span></h3>
                </div>
                <p class="Game_des" v-html="currentGame.description"></p>
                <button @click="buy(currentGame)" class="btn btn-primary">Ajouter au panier</button>
               
            </div>
      </div>
    
      
  </div>
</template>

<script>

import { log } from 'util';
import { EventBus } from './Bus.js';

export default {
    data() {
        return {
            gameStore: [],
            currentGame: {},
            load: true,
            loadImg: false,
            gameMore: "display:none;",
            opaGame : false,
            appearDelay: "nothing",
            gameBack: "none"
            
        }
    },
    methods: {
        popUp(game){
            /* Il n'est Pas afficher */
            if (this.gameMore == "display:none;"){
                this.gameBack = "gameBack";
                this.gameMore = "display:block;";
                this.currentGame = game;
                /* Je charge les images seulement maintenant */
                this.loadImg = true;   
            }else { /* Il est AFFICHER */
                this.gameBack = "none";
                this.gameMore = "display:none;";
                this.loadImg = false;
                
            }
                
        },
        buy(currentGame){
            EventBus.$emit('currGame', this.currentGame);
            
        }
    },
     created() {
        /* Attend la réponse du serveur ! */
        this.load = true;
        Vue.http.get('Jeux.json')
            .then(response => response.json())
            .then(jeux => {
                if (jeux) {
                    /* AJOUT DES PARTENAIRES BOUTIQUE */
                    this.gameStore.push(jeux.celeste); 
                    this.gameStore.push(jeux.deadCells); 
                    this.gameStore.push(jeux.superMeatBoy);                  
                }
            })
            /* J'affiche tout est ok */
            .finally(() => {    
                this.load = false;
                setTimeout(() => {
                this.appearDelay = "appearDelay1"}
                ,900) 
                
            })
    }   
}

</script>

<style scoped>

.nothing {
    opacity: 0;
}
.appearDelay1 {
    animation: Game 800ms forwards ease-out;
    opacity: 1;
}

.close {
    font-size: 4.5rem;
    cursor: pointer;
    position: absolute;
    right: 5%;
    
}
.align {
    padding-top: 3%;
    text-align: center;
    width: 100%;
}

h1 {
    animation: Game 1s forwards ease-out;
    animation: float 3s ease-in-out infinite;
    padding-top: 40px;
    letter-spacing: 15px;
    font-size: 8rem;
    font-weight: 900;
    color: white;
}
h2 {
    text-shadow: #00C78B 3px 0px 0px;
    font-size: 6rem;
}
h3 {
    text-shadow: rgba(0, 0, 0, 0.916) 3px 0px 2px;
    padding: 2% 0%;
    font-size: 3.5rem;
    color:#00C78B;
}
span {
    background-color: rgba(1, 188, 177, 1);
    padding: 1% 7%;
    border-radius: 20px;
}
p {
    font-family: 'Courier Prime', monospace;
    max-width: 400px; 
    font-size: 1.5rem;
    text-shadow: 0 1px 0 #ccc,
               0 2px 0px #c9c9c9,
               0 3px 1px #bbb,
               0 4px 2px #b9b9b9,
               0 5px 3px #aaa,
               0 6px 4px rgba(0,0,0,.1),
               0 0 6px rgba(0,0,0,.1),
               0 1px 8px rgba(0,0,0,.3),
               0 3px 10px rgba(0,0,0,.2),
               0 5px 15px rgba(0,0,0,.25),
               0 10px 18px rgba(0,0,0,.2),
               0 20px 20px rgba(0,0,0,.15);
}
img {
    cursor: pointer;
    height: 250px;
    width: 250px;
    box-shadow: rgba(0, 0, 0, 0.5) 14px 16px 13px 0px;
}
.globalConteneur {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
}
.game {

    cursor: pointer;
    margin:  0 5%;
    margin-bottom: 5%;
    
}
@keyframes float {
	0% {
		transform: translateY(0px);
	}
	50% {
		transform: translateY(-20%);
	}
	100% {
		transform: translateY(0px);
	}
}


@keyframes Game {
    
    0% { transform: scale(0);
    }
    85% {
    transform: scale(1.1);
    }
    90% {
    transform: scale(0.95)
    }
    100% {
    transform: scale(1);
    }
        
}

/* POP UP */
.gameMore {
    position: absolute;
    background-color: rgba(248, 248, 248, 0.97);
    border: solid 21px rgba(0, 0, 0, 1);
    min-height: 800px;
    min-width: 70%; max-width: 70%; 
    animation: Game 500ms forwards ease-in;
    padding: 0 8%;
}
.gameBack {
    background-color: rgba(0, 0, 0, 0.9);
    
}
.Game_title {
    animation: inherit;
    color: rgb(0, 199, 139);
    font-size: 6.5rem;
    font-family: 'Roboto',sans-serif;
    letter-spacing: 5px;
    padding: 2% 0 2% 0;

}
.gameMore span {
    background: inherit;
    font-weight: 1000;
    padding: inherit;
    color: #00C78B;
}
.Game_release {
    padding-top: 4%;
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 1.5rem;
    color: rgb(10, 3, 3);
    text-shadow: inherit;
    text-align: left;
}
.Game_img {
    display: flex;
    justify-content: space-around;
    
}
.Game_img img {

    width: 34%;
    height: 225px;
    margin: 0 0.9%;
    box-shadow: 7px 10px 11px rgba(0, 0, 0, 0.78);
    
}
.Game_des {
    color: rgb(0, 0, 0);
    font-size: 1.6rem;
    padding: 3% 0;
    min-width: 100%;
    text-shadow: none;
}
.btn-primary {
    font-size: 2.5rem;
    border-radius: 20px;
    margin: 0 3% 3% 3%;
}

@media screen and (max-width: 1200px){
    .gameMore {
        min-width: 1200px;
    }
}

</style>