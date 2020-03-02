<template>
  <div v-if="load">Error ! Reload Page</div>
  <div :class="anim" v-else id="carouselExampleInterval" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active" data-interval="3000">
        <img src="img/slider/slider3.png" class="d-block w-100" alt="jeux de la semaine">
      </div>
      <div class="carousel-item" data-interval="3000">
        <img src="img/slider/slider2.jpg" class="d-block w-100" alt="Nouveauté">
      </div>
      <div class="carousel-item" data-interval="3000">
        <img src="img/slider/slider1.jpg" class="d-block w-100" alt="Pub">
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleInterval" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleInterval" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
    <br>
    <div class="alignP">
      <h1 :class="appearTitle" class="alignTitle">Bienvenue sur <span class="frontTitle">IndéLiable.com</span></h1>
      <br>
      <div :class="appearCard1" class="allCard">
        <div class="card">
          <div :class="appearCard1Txt" class="card-header">
            Indéliable.com
          </div>
          <div :class="appearCard1Txt" class="card-body">
            <blockquote class="blockquote mb-0">
              <p class="desP">J’ai crée ce site afin d’exposer les créations <span>indépendantes</span> pour que les concepteurs eux même parle de leurs jeux a travers Indéliable.com.
              <br><br>
              Mais aussi de vous proposez quelque chose <span>d’unique</span> de pouvoir donné votre avis ! 
              Grace a cela le créateur pourrat connaître votre ressenti mais aussi effectuer des sondages pour obtenir le <span>meilleur</span> de sont projet.</p>
            <footer class="blockquote-footer">Parcourez tout le site !</footer>
            </blockquote>
          </div>
        </div>

        <div :class="appearCard2" class="card">
          <div :class="appearCard2Txt" class="card-header">
            IndyStore
          </div>
          <div :class="appearCard2Txt" class="card-body">
            <blockquote class="blockquote mb-0">
              <p class="desP">La <span>boutique</span> permet a chaques éditeurs qui le souhaite de proposés sont jeux.
              <br><br>
              Grace a cela vous pourrez <span>facilement</span> accèder a sont jeux ainsi que lui donné la meilleur contrepartie possible afin de<span> remunérer au mieux</span> sa réalisation et pourquoi pas en recommencer une !</p>
              <footer class="blockquote-footer">Faite plaisir aux créateurs et a vous aussi !</footer>
            </blockquote>
          </div>
        </div>

        <div :class="appearCard3" class="card">
          <div :class="appearCard3Txt" class="card-header">
            Espace Constructif
          </div>
          <div :class="appearCard3Txt" class="card-body">
            <blockquote class="blockquote mb-0">
              <p class="desP">Il permet au créateurs (partenaires) de pouvoir facilement poser une question et avoir un <span>retour rapide</span> dessus.
              <br><br>
              En plus de cela il permet de liée des personnes a ce projet et de le suivre de facon proche et <span>réel</span>. D'être impliquer dans leur projet et pouvoir les soutenirs aussi par un <span>autre moyen</span> que le financement</p>
              <footer class="blockquote-footer">Construire a plusieurs apporte une meilleur approche.</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
</div>

</template>

<script>


export default {
  data () {
    return {
      load: true,
      anim: "nothing",
      appearTitle : "nothing",
      appearCard1: "nothing",
      appearCard2: "nothing",
      appearCard3: "nothing",
      appearCard1Txt: "nothing",
      appearCard2Txt: "nothing",
      appearCard3Txt: "nothing",   
    }
  },
  methods: {
    handleScroll(){
      screenY = window.scrollY
      if (window.screen.width > 850) {
        if (screenY > 80){
        this.appearTitle = "appearTitle";
        }else {
          this.appearTitle = "nothing";
        }
        if(screenY > 350) {
          /*CARTE 1*/
          this.appearCard1 = "appearCard";
          /*TXT*/
          setTimeout(() => {
            this.appearCard1Txt = "appearCardTxt";
          },200)
          /* CARTE 2*/
          setTimeout(() => {
            this.appearCard2 = "appearCard";
          },600)
          /*TXT*/
          setTimeout(() => {
            this.appearCard2Txt = "appearCardTxt";
          },700)
          /* CARTE 3*/
          setTimeout(() => {
            this.appearCard3 = "appearCard";
          },900)
          /*TXT*/
          setTimeout(() => {
            this.appearCard3Txt = "appearCardTxt";
          },1000)
        }else {
          this.appearCard1 = "nothing";
          this.appearCard2 = "nothing";
          this.appearCard3 = "nothing";
          this.appearCard1Txt = "nothing";
          this.appearCard2Txt = "nothing";
          this.appearCard3Txt = "nothing";
        }
      }
     
    }
  },
  
  created(){
    this.load = false;
    window.addEventListener('scroll', this.handleScroll);
    setTimeout(() => {
      this.anim = "tiltIn"
    },500)
    if (window.screen.width <= 850){
          this.appearTitle = "appearTitle";
          /*CARTE 1*/
          this.appearCard1 = "appearCard";
          /*TXT*/
          setTimeout(() => {
            this.appearCard1Txt = "appearCardTxt";
          },200)
          /* CARTE 2*/
          setTimeout(() => {
            this.appearCard2 = "appearCard";
          },600)
          /*TXT*/
          setTimeout(() => {
            this.appearCard2Txt = "appearCardTxt";
          },700)
          /* CARTE 3*/
          setTimeout(() => {
            this.appearCard3 = "appearCard";
          },900)
          /*TXT*/
          setTimeout(() => {
            this.appearCard3Txt = "appearCardTxt";
          },1000)
    }
    
  },
  destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
    }
}

</script>

<style scoped>
/* Animation*/
.nothing {
  opacity: 0;
}
.tiltIn {
  opacity: 1;
  animation: bounce-in-top 1.1s ease-in both;
}
@keyframes bounce-in-top {
  0% {
    -webkit-transform: translateY(-500px);
            transform: translateY(-500px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    -webkit-transform: translateY(-65px);
            transform: translateY(-65px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  72% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  81% {
    -webkit-transform: translateY(-28px);
            transform: translateY(-28px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  90% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  95% {
    -webkit-transform: translateY(-8px);
            transform: translateY(-8px);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
}
.appearTitle {
  animation: text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
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
.appearCard {
  animation: swing-in-left-bck 500ms cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
}
@keyframes swing-in-left-bck {
  0% {
    -webkit-transform: rotateY(-70deg);
            transform: rotateY(-70deg);
    -webkit-transform-origin: left;
            transform-origin: left;
    opacity: 0;
  }
  100% {
    -webkit-transform: rotateY(0);
            transform: rotateY(0);
    -webkit-transform-origin: left;
            transform-origin: left;
    opacity: 1;
  }
}
.appearCardTxt {
  animation: text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
}
/* Fin Anim */

img {
  height: 750px;
}
.carousel-control-prev, .carousel-control-next {
  background-color: rgba(0, 0, 0, 0.200);
  height: 750px;
    
}
span {
  color: rgba(124, 5, 5, 0.85);
  font-weight: 700;
}
.alignTitle {

  text-align: center;
}
.frontTitle {
  padding: 0.3% 0.8%;
  color: white;
  background: #00E0FF;
  border-radius: 18px;
}
.alignP {
  text-align: center;
}
p{
  padding: 0% 10%;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1.3rem;
  color: rgb(17, 17, 17);
  text-align: center;
  width: 100%;
}
/* Les cartes */
.allCard {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 0% 10%;
}
.card{
  width: 40%;
  margin: 2% 0;
}
.card-header {
  background-color: rgba(0, 0, 0, 0.86);
  color: white;
}
.card-body {
  background-color: white;
}
</style>