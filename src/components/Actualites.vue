<template>
    <div class="G">
      <br>
      <h1 class="float">Dernières<span>Actualités</span></h1>
      <br>

        <div v-if="load == true" class="alignAll">
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

        <div class="alignAll" id="getInsert" v-else>  
            <div :class="actuCom" id="test" v-for="(actu,index) in actualites"> 
                  
                <div class="actuDiv">
                    <div class="nameImg">
                        <p class="date">Publiée le {{createActu(index,'date')}}</p>
                        <img id="img1" alt="Photo de présentation" :src="createActu(index,'img')">
                    </div>

                    <div class="alignActu">
                        <div class="nameActu"><h2>{{ createActu(index,'name') }}</h2></div>
                        <div class="actuGame"> {{ createActu(index,'actu') }} </div> 
                        <br>
                        <div  class="messageGame">" {{ createActu(index,'message') }}  "</div>
                    </div>
                </div>
                <hr class="floatHr" style="width:70%; border: 1px solid #00E0FF; margin: 1% auto;"> 
            </div>
            
            </div>
        
        </div>
    
</template>

<script>

import { log } from 'util';

export default {
    data(){
        return {
        name : '',
        load: true,
        count: 1,
        actuCom: "nothing"
        }
    },
    methods: {
       createActu(index,genre){
            let txt = null;
                if (genre ==='name') {
                    txt = this.actualitesReverse[index].name;
                }
                else if (genre === 'actu') {
                    txt = this.actualitesReverse[index].actu;
                }
                else if (genre === 'date') {
                    txt = this.actualitesReverse[index].date;
                }
                else if (genre === 'img') {
                    txt = this.actualitesReverse[index].img;
                }
                else if (genre === 'message') {
                    txt = this.actualitesReverse[index].message;
                }
                else {
                
                    txt = '';
                }
                return txt
        },
        
           
    },
    created() {
        /* Attend la réponse du serveur ! */
        this.load = true;

        Vue.http.get('actualites.json')
            .then(response => response.json())
            .then(actualites => {
                if (actualites) {
                    this.actualites = actualites;
                    this.actualitesReverse = this.actualites.slice().reverse();
                }
            })
            /* J'affiche tout est ok */
            .finally(() => {
                setTimeout(()=>{
                    this.actuCom = "actuCom";
                },800);
                
                this.load = false;
                
            })
    }
}


</script>

<style scoped>
/* ANIMATION */
/* Float */
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
.floatHr {
    animation: floatHr 6s ease infinite;
}
@keyframes floatHr {
	0% {
		transform: scale(0.8);
	}
	50% {
		transform: scale(1.1);
	}
	100% {
		transform: scale(0.8);
	}
}
img {
    width: 700px;
    height: 450px;
    box-shadow: 13px 16px 8px 0px rgba(0,0,0,0.8);
}
h1 {
    font-size: 5rem;
    color: rgb(0, 0, 0);
    text-align: center;
}
h1 span {
    margin-left: 1%;
    padding: 0.3% 0.8%;
    color: white;
    background: #00E0FF;
    border-radius: 18px;

}
h2 {
    font-size: 5rem;
}
.alignAll {
    text-align: center;
    font-size: 2.5rem;
    color: rgb(0, 0, 0);
}
.actuDiv {
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 2%;
    
}
.alignActu {
    font-family: 'Roboto Condensed', sans-serif;
    font-size: 2rem;
    margin-left: 2%;
}
.nameActu {
    font-family: 'Rum Raisin', sans-serif;
    color: rgb(3, 65, 90);   
    font-weight: 800;
}
.nameImg {
    display: flex;
    flex-direction: column;
}
.actuGame {
    text-align: justify;
    font-size: 1.7rem;
    
}
.messageGame {
    font-size: 1.9rem;
    font-family: 'Rum Raisin', sans-serif;
    color: #00E0FF;
}
.date {
    font-family: 'Roboto', sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    color: rgb(255, 255, 255);
    text-align: center;
    background-color: black;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding-top: 1%;
    padding-bottom: 1%;
    min-width: 40%;
    max-width: 40%;
    height: 10%;
    margin: 0 0;
}
.nothing {
    opacity: 0;
}
.actuCom {
    opacity: 1;
    animation: tilt-in-fwd-tr 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
@keyframes tilt-in-fwd-tr {
  0% {
    transform: rotateY(20deg) rotateX(35deg) translate(300px, -300px) skew(-35deg, 10deg);
    opacity: 0;
  }
  100% {
    transform: rotateY(0) rotateX(0deg) translate(0, 0) skew(0deg, 0deg);
    opacity: 1;
  }
}
@media screen and (max-width: 1300px){
img {
    width: 500px;
    height: 300px;
    box-shadow: 13px 16px 8px 0px rgba(0,0,0,0.8);
}
.actuGame, .messageGame{
    font-size: 1.4rem;
}
.nameActu {
    font-size: 2.8rem;
}
.date {
    font-size: 1.2rem;
    text-align: left;
    height: 8%;
}

}
</style>