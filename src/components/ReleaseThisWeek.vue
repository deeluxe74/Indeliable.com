<template>
    <div class="align">
        <h1 class="float" style="padding: 2% 0;">Release This <span class="titleFront">Week</span> !</h1>
        <br>
        <div v-if="load == true ">
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

        <div :class="releaseCom" v-else class="game" v-for="(game,index) in thisWeek">
            <div style="display:flex; flex-direction:row;">
                <img :src="createWeek(index,'img')" alt="jaquette officiel studio">
                
                <div class="alignDetail">
                    <div style="display:flex; flex-direction:row; justify-content:space-between; padding-right:1%;">
                        <h2>{{ createWeek(index,'name') }}</h2>
                        <h3 style="text-decoration:underline; margin-top:2%; ">Plateforme<h4 style="text-decoration: underline white;" id="test">{{ createWeek(index,'plateforme') }}</h4></h3>
                    </div>
                    <h4>{{ createWeek(index,'style') }}</h4>
                        
                    <h3>Création du studio <span>{{ createWeek(index,'studio') }}</span></h3>
                    
                    <p class="pActu">{{ createWeek(index,'phrase') }}</p>
                    <p class="pResume">{{ createWeek(index,'descriptif') }}</p>
            </div>
            </div>
            <br>
            <hr class="floatHr" style="width:90%; border: 1px solid #00E08F; margin: 3% auto;">
            <br>

        </div>

        
     
    </div>
</template>

<script>


export default {
    data() {
        return {
            load: true,
            counterThisWeek: 0,
            thisWeek: [],
            releaseCom: "nothing"
        }
            
    },
    methods: {
        createWeek(index,genre){
            let txt = null;

            if (genre ==='name') {               
                txt = this.thisWeekReverse[index].name;
            }
            else if (genre === 'style') {
                txt = this.thisWeekReverse[index].style;
            }
            else if (genre === 'studio') {
                txt = this.thisWeekReverse[index].studio;
            }
            else if (genre === 'phrase') {
                txt = this.thisWeekReverse[index].phrase;
            }
            else if (genre === 'descriptif') {
                txt = this.thisWeekReverse[index].descriptif;
            }
            else if (genre === 'plateforme') {
                txt = this.thisWeekReverse[index].plateforme;
            }
            else if (genre === 'img') {
                txt = this.thisWeekReverse[index].img;
            }
            /*Pour cas vide*/
            else {
                
                txt = '';
            }
            return txt 
        }  

    },
    created() {
        /* Attend la réponse du serveur ! */
        this.load = true;

        Vue.http.get('thisWeek.json')
            .then(response => response.json())
            .then(thisWeek => {
                if (thisWeek) {
                    this.thisWeek = thisWeek;
                    this.thisWeekReverse = this.thisWeek.slice().reverse();
                    
                }
            })
            /* J'affiche tout est ok */
            .finally(() => {
                setTimeout(()=>{
                    this.releaseCom = "releaseCom";
                },300);
                this.load = false;
            });            
    }  
     
}
</script>

<style scoped>
/* ANIMATION */
.nothing {
    opacity: 0;
}
.releaseCom {
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
.float {
    animation: float 3s ease-in-out infinite;
}
@keyframes float {
	0% {
		transform: translateY(0px);
	}
	50% {
		transform: translateY(-10%);
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

/* CSS design */
.align {
    padding-top: 3%;
    padding: 0 5%;
    text-align: center;
    width: 100%;
}
img {
    width: 400px;
    box-shadow: 10px 13px 9px 0px rgba(0,0,0,0.8);
}
.titleFront {
    padding: 0.3% 1%;
    color: white;
    background: #00E08F;
    border-radius: 18px;
}
h2 {
    color: rgba(0, 217, 255, 0.904); 
    font-size: 5rem;
    font-weight: 600;
    
}
h3 {
    font-size: 1.5rem;
    font-weight: 600;
}
h4 {
    color: rgb(65, 65, 65);
    font-size: 1.5rem;
}
span {
    color: red;
    font-weight: 900;
}
.game{
    display: flex;
    flex-direction: column;
    font-family: 'Roboto', sans-serif;
}
.alignDetail {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 0 3%;
}
.pActu {
    padding: 1% 0;
    font-size: 1.7rem;
    text-align: center;
    font-weight: 600;
}
.pResume {
    color: #878787;
    font-size: 1.8rem;

}
@media screen and (max-width: 1300px){
  img {
    width: 400px;
  }
}
</style>