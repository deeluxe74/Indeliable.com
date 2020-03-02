<template>
  <div class="G">
      <h1 class="float" :class="appearDelay1">Espace <span class="spanConstructif">Constructif</span></h1>
        <br>
        <div class="cadre">
          <div class="cadre2">
            
                <img :class="appearItem" class="img1" @click="choiceGame('superMeatBoy')" style="animation-delay : 300ms; width:320px;" src="img/partenaires/partenaire1.jpg" alt="image du jeux">
                <img :class="appearItem" class="img2"  @click="choiceGame('deadCells')" style="animation-delay : 600ms; height: 450px;" src="img/partenaires/partenaire3.png" alt="image du jeux">
                <img :class="appearItem" class="img3"  @click="choiceGame('celeste')" style="animation-delay : 900ms;" src="img/partenaires/partenaire2.jpg" alt="image du jeux">     
                <img :class="appearItem" class="img4" @click="choiceGame('OverWorld')" style="animation-delay : 1.2s; width: 400px; position: absolute; bottom:30px" src="img/partenaires/partenaire4.jpg" alt="image du jeux">
      
                <img :class="appearItem" class="img5" @click="choiceGame('Other')" style="animation-delay : 1.5s; width: 550px; position: absolute; bottom:20px  " src="img/partenaires/partenaire5.png" alt="image du jeux">
          </div>
        </div>

        <div v-if="launchGame == false">
            <br>
            <p class="pFalse">Le principe est très <span>simple</span> choisit un jeux parmis nos <span>partenaire</span> juste au dessus. Et tu pourras <span>participé</span> au dévelopement !!</p>
        </div>

        <!-- LE JEUX EST CHARGER --->
        <div v-else>
            <br>
            <h2 :class="appearTitle" style="font-size:4rem;">Vous avez choisit <span style="color: #A90B0B; font-size:6rem;">{{ currentGame.name }}</span></h2>
            <hr :class="appearTitle" style="width:80%; border: 2px solid #027C6E;">

            <h3 :class="appearCreateur">Le créateur <span>{{ currentGame.createur }}</span> vous ouvre les coulisses de sont projet:</h3>
            <div class="presJeux" >
                <img :class="appearImgDes" class="imgGame" :src="imgGame" alt="Image De Super Meat Boy">
                <p :class="appearImgDes" class="pGame" v-html="description"></p>
            </div>
            <div :class="appearBloc2" class="presCreateur">
                <img :class="appearItemBloc2" class="imgCreateur" :src="currentGame.equipe.img" alt="Image du createur">
                <div :class="appearItemBloc2" class="alignVert">
                    <div class="leCreateur">
                        <h2 class="titleCrea">Le Créateur</h2>
                        <p style="margin-top: 2%;" v-html="createurDes">  
                        </p>
                    </div>
                    <div style="max-width: 50%; border-left: #ffffff 6px solid ;">
                        <h2 class="titleCrea">Le studio</h2>
                        <p style="margin-top: 2%" v-html="studioDes">
                        </p>
                    </div>
                    </div>
            </div>
            <div class="Ganswers">
                <h1 :class="appearItemBloc3" class="needYou">Aujourd'hui <span>{{ currentGame.createur }}</span> et sont équipe on besoin de toi !</h1>
                <hr :class="appearItemBloc3" style="width:80%; border: 2px solid #027C6E;">
                <br>
                <div :class="appearBlocImg3" class="answers" v-html="question"></div>
                    <div class="alignAnswers" style="font-family: 'Roboto Condensed', sans-serif; font-weight: 600;">
                        
                        <div v-for="(rep,index) in reponse" v-if="rep != undefined" :class="appearBlocImg3" class="rep1">
                            <img :src="imgReponse[index]" alt="Reponse numéro 1">
                            <div v-html="rep" style="width: 550px;"></div>
                            <br>
                            <button v-if="btnNone == 'nn'" @click="submit(currentGame.name,index)" :class="[appearBlocButton3, btnNone]" class="btn btn-primary">Vote !</button>
                            <div class="alert alert-info" v-else>Vote soumis !</div>
                            </div> 
                            
                        </div>
                    </div> 
                </div>    
            </div>
       
</template>

<script>

import { log } from 'util';

export default {
    data(){
        return {
            launchGame: false,
            game:'',
            reponse: [],
            imgReponse: [],
            appearDelay1: "nothing",
            appearItem: "nothing",
            appearTitle: "nothing",
            appearCreateur : "nothing",
            appearImgDes: "nothing",
            appearBloc2: "nothing",
            appearItemBloc2: "nothing",
            appearBloc3: "nothing",
            appearItemBloc3: "nothing",
            appearBlocImg3: "nothing",
            appearBlocButton3: "nothing",
            btnNone : 'nn'
        }
    },
    methods: {
        submit(game,index){
            let currCounter = 0;
            /* Méthode de vote */
            Vue.http.get(`gameVote/${game}/counter${index}.json`)
            .then(counter => counter.json())
            .then(counter => {
                currCounter = counter + 1;
                Vue.http.put(`gameVote/${game}/counter${index}.json`, currCounter);
                console.log(currCounter);
                this.btnNone = 'btnNone'
            })
            
        },

        choiceGame(game){  
            /* Reset du jeux */
             this.reponse = [];
             this.imgReponse= [];
            /* Arret de la page pour rechargement données*/
            this.launchGame = false

            if (game === 'celeste'){
                this.currentGame = this.jeux.celeste;
            }
            else if (game === 'superMeatBoy') {
                this.currentGame = this.jeux.superMeatBoy;
            }
            else if (game === 'deadCells') {
                this.currentGame = this.jeux.deadCells;
            }
            this.description = this.currentGame.description;
            this.createurDes = this.currentGame.createurDes;
            this.studioDes = this.currentGame.studioDes;
            this.imgGame = this.currentGame.img;
            /* Accès au questions */
            this.question = this.currentGame.demande.question;

            this.reponse.push(this.currentGame.demande.reponse1);
            this.reponse.push(this.currentGame.demande.reponse2);
            this.reponse.push(this.currentGame.demande.reponse3);
            this.reponse.push(this.currentGame.demande.reponse4);
            /* Image */
            
            this.imgReponse.push(this.currentGame.demande.img1);
            this.imgReponse.push(this.currentGame.demande.img2);
            this.imgReponse.push(this.currentGame.demande.img3);
            this.imgReponse.push(this.currentGame.demande.img4);
            
            /* VALIDATION */        
            this.launchGame = true;

        },
        handleScroll() {
            const screen = window.scrollY;
            /* Si la résolution est plus grande que */
            if (window.screen.width > 800) {
                
            /* BLOC JEUX */
            /* Title game */
            if ( screen > 280 && screen <= 1000){
                this.appearTitle = "appear";
            }else {
                this.appearTitle = "nothing"}
            /* Createur (first bloc) */
            /* Title */
            if (screen > 350 && screen <= 1100){
                this.appearCreateur = "appear";               
                }
                else {
                    this.appearCreateur = "nothing";      
            }
            /* Img & desc */
            if (screen > 550 && screen <= 1600){
                this.appearImgDes = "appear";               
                }
                else {
                    this.appearImgDes = "nothing";      
            }
            /* BLOC 2 (des studio + createur) */ 
            if (screen > 1200 && screen <= 2400){
                this.appearBloc2= "appear";
                this.appearItemBloc2 = "appear";
            }else {
                this.appearItemBloc2 = "nothing"
                this.appearBloc2= "nothing";
            }
            /* BLOC 3 (Question) */ 
            if (screen > 1900 && screen < 2850){
                this.appearItemBloc3 = "appear";
                
            }else {
                this.appearItemBloc3= "nothing";
            }
            /* Les image */
            if (screen > 2200 && screen < 4000){
                this.appearBlocImg3= "appear";               
            }else {
                this.appearBlocImg3= "nothing";
            }
            /* Les boutton */
            if (screen > 2650 && screen < 4000){
                this.appearBlocButton3= "appear";               
            }else {
                this.appearBlocButton3= "nothing";
            }
            /* Si elle est plus petite que (800) */
            }else {
                if (screen > 300 && screen < 1850){
                this.appearItemBloc3 = "appear";
                
            }else {
                this.appearItemBloc3= "nothing";
            }
            /* Les image */
            if (screen > 350 && screen < 4000){
                this.appearBlocImg3= "appear";               
            }else {
                this.appearBlocImg3= "nothing";
            }
            /* Les boutton */
            if (screen > 400 && screen < 4000){
                this.appearBlocButton3= "appear";               
            }else {
                this.appearBlocButton3= "nothing";
            }
            }
            
        }
    },
    created() {
        /* Attend la réponse du serveur ! */
        this.load = true;

        Vue.http.get('Jeux.json')
            .then(response => response.json())
            .then(jeux => {
                if (jeux) {
                    this.jeux = jeux;
                }
            })
            /* J'affiche tout est ok */
            .finally(() => {
                this.load = false;
                /* Le titre arrive */
                this.appearDelay1 = "appearDelay1";
                /* delais sur les items */
                setTimeout(() => {
                this.appearItem = "appearItem"}
                ,800) 

                window.addEventListener('scroll', this.handleScroll);

                /* Si la résolution est plus petite que */
                if (window.screen.width < 800) {
                    this.appearTitle = "appear";
                    this.appearCreateur = "appear";
                    this.appearImgDes = "appear";
                    this.appearBloc2= "appear";
                    this.appearItemBloc2 = "appear";

                }
            });            
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
    }

}
</script>

<style scoped>
/* CLASS ANIMATION */
.nothing {
    opacity: 0;
    transition: opacity 200ms ease-out;   
}
/* For Title game */

.appear {
    opacity: 1;
    animation: focus-in 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940);
}
@keyframes focus-in {
  0% {
    letter-spacing: -0.5em;
    -webkit-transform: translateZ(-800px);
            transform: translateZ(-800px);
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
  }
}
.appearDelay1 {
    animation: text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
   
}
.appearItem {
    animation: puff-in-center 1s ease-out both;
}


@keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
}
@keyframes puff-in-center {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 0;
  } 40% {filter: blur(9px);}
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
}
/* Title float */
.float {
    animation: float 3s ease-in-out infinite;
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
/* Style */
.G {
    padding: 3% 0;
    text-align: center;
    width: 100%;
}
h1 {
    color: #0ECBA9;
}
h3 {
    font-size: 2.5rem;
    font-weight: 600;
    text-align: left;
    padding: 3% 4%;
}
p {
    font-family: 'Roboto Condensed', sans-serif;
    font-style: normal;
    font-weight: 100;
    font-size: 1.6rem;
    width: 50%;
    margin: 0 10%;
}
.spanConstructif {
    padding: 0.3% 0.8%;
    color: rgb(255, 255, 255);
    background: #00E0FF;
    border-radius: 25px;
}
.cadre {
    position: relative;
    height: 600px;
    background-color: rgba(3, 3, 3, 0.08);
}
.cadre2 {
    padding: 2%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  
}
.cadre img {  
    cursor: pointer; 
    height: 250px;
    box-shadow: 3px 5px 11px #000000;
    border-radius: 50px;
}
.img4 {
    left:50px;
}
.img5 {
    right:70px;
}
.pFalse {
    margin: 0 25%;
    font-family: 'Rum Raisin', sans-serif;
}
span {
    font-weight:900;
    color: #A90B0B;
}
.presJeux {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}
.imgGame {
    width: 700px;
    height: 500px;
    border-radius: 50px;
    margin-bottom: 5%;
    margin-left: 5%;
    box-shadow: 18px 25px 18px 0px rgba(0,0,0,0.6);
}
.pGame {
    text-align: justify;
    margin-bottom: 2%;

}
.presCreateur{
    background: rgba(0, 0, 0, 0.86);
    color: rgb(255, 255, 255);
    display: flex;
    flex-direction: row-reverse;
    
}
.presCreateur p {
    font-weight: 600;
    min-width: 85%; max-width: 85%;
    min-height: 60%; max-height: 80%;
    background-color: rgb(255, 255, 255);
    color: black;
    border-radius: 55px;
    padding: 5% 3% 1% 3%;
    box-shadow: 15px 25px 20px 1px rgba(7, 7, 7, 0.91);
    
}
.leCreateur {
    max-width: 50%; 
    border-left: #ffffff 9px solid ;
}
.imgCreateur {
    height: 600px;
    margin: 3% 2% 5% 2%;
    border-radius: 60px;
}
.titleCrea {
    margin-top: 5%;
    font-size: 5rem;
    color: rgb(255, 255, 255);    
}
.alignVert {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;  
}

/* ANSWERS BLOC */
.Ganswers {
    text-align: center;
    color: black;

}
.alignAnswers {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding: 0 8%;
}
.needYou {
    padding-top: 4%;
    font-weight: 600;
    color: black;
    font-size: 3.5rem;
}
.answers {
    margin: 0 10%;
    color: white;
    background-color: rgba(0, 0, 0, 0.86);
    padding: 1% 3%;
    width: 80%;
    border-radius: 40px;
    font-family: 'Roboto Condensed', sans-serif;
}
.Ganswers img {
    box-shadow: 25px 23px 40px 1px rgba(7, 7, 7, 0.641);
    border-radius: 35px;
    width: 350px;
    height: 350px;
    margin: 80px 0;
}
.rep1, .rep2 {
    font-size: 2rem;
    align-items: center;
    display: flex;
    flex-direction: column;
    
}
.btnNone {
    opacity: 0;
    transition: opacity 500ms ;
}
.btn {
    
    font-size: 3rem;
    font-family: 'Rum Raisin', sans-serif;
    letter-spacing: 3px;
}
@media screen and (max-width: 1800px){
    .cadre {
        max-height: 560px;
    }
    .cadre2 {
        padding: 1%;
    }
    .img1 {
        max-width: 450px;
    }
    .img2 {
        max-width: 450px;
    }
    .img3 {
        max-width: 450px;
    }
    .img4 {
        max-width: 300px;
        left: 30px;
    }
    .img5 {
        max-width: 420px;
        right: 20px;
    }
    /* Bloc 1 */
    .imgGame {
        width: 480px;
        height: 400px;
        border-radius: 20px;
        margin-bottom: 3%;
        margin-left: 1%;
        box-shadow: 18px 25px 18px 0px rgba(0,0,0,0.6);
    }
    .pGame {
        font-size: 1.5rem;
        margin: 1%
    }
    /* Bloc 2 */ 
    .imgCreateur {
        width: 350px;
        height: 400px;
    }
    /* Bloc 3 */
    .alignAnswers {
        padding: 1%;

    }
}
</style>