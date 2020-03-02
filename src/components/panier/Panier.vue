<template>
    <div class="G">     
        <div @click="routerPanier()" class="panier">
            <div :class="animPanier" class="numberPanier">{{ counterShop }}</div>
                <img src="img/shop.png" alt="Votre panier">
            </div>
        <img v-if="screenY > 200" class="arrow" @click="goTop()" src="img/goTop.png" alt="Aller en haut de la page">
    </div>
</template>

<script>
import { EventBus } from '../Bus.js';

export default {
    data(){
        return {
            counterShop: 0,
            gamePanier:[],
            animPanier: 'none',
            screenY: window.scrollY,
        }
    },
    methods: {
       routerPanier() {
        this.$router.push('/MonPanier');
        },
        goTop(){
            /* Arrow go to top */
            window.scroll({
                top: 0, 
                left: 0, 
                behavior: 'smooth'
            });
        },   
        watchY(){
            this.screenY = window.scrollY;
        }
    },
    created(){
        window.addEventListener('scroll', this.watchY);
        EventBus.$on('currGame', event => {
            /* Interception jeux en cours */
            /* Push de chaque jeux dans panier */
            this.gamePanier.push(event);
             
            /* Actualisation nombre de jeux */
            this.counterShop = this.gamePanier.length;

            /* Animation panier */
            this.animPanier = 'appear';

            /* Reset Anim */
            setTimeout(()=> {
                this.animPanier = 'none';
            },400)

            /* Donner les infos au panier (component) */

            EventBus.$data.monPanier =  this.gamePanier;
            });
            
    },
    destroyed () {
        window.removeEventListener('scroll', this.watchY);
    }

}
</script>

<style scoped>
/* Animation */
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
/* Fin animation */
.arrow {
    width: 3%;
    top: 75%;
    left: 95%;
    position: fixed;
    
}
.arrow:hover {
    transition: 300ms all ease-out;
    width: 3.2%;
    left: 94%;
    opacity: 0.6;
    cursor: pointer;
}

.panier {
    z-index: 3;
    position: fixed;
    right: 2%;
    top: 15%;
    cursor: pointer;
}
img {
    height: 55px;
}
.numberPanier {
    color: white;
    background-color: rgba(7, 185, 7, 0.425);
    border-radius: 50% 50% 50% 50%; 
    text-align: center;
    padding-bottom: 50px;
    height: 40px;
    width: 40px;
}
</style>