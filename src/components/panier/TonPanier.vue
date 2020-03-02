<template>
  <div class="G">
      <div class="panier">
          <h1 class="MonPanier">Mon Panier</h1>
          
            <div v-if="load">
                Vous n'avez aucun jeux, remediez a cela dans la boutique IndyStore !
            </div>
            <div v-else>
                <div v-for="(game,index) in currPanier" class="panierGame">
                    <img :src="game.img" alt="cover du jeux">
                        <div class="namePlateformes">
                            <h1 class="titleGame">{{ game.name }}</h1>
                        
                            <h2>Disponibilités :<span> Instantané</span></h2>
                            <h3>Plateforme : {{ game.plateformes }}</h3>
                        </div>
                        <div class="releasePrice">
                            <h3 class="releaseH3">Date de sortie : {{ game.date }}</h3>
                        
                        <h2 class="price">{{ game.price }}€</h2></div>
                    </div>
                
                <div class="buy">
                    <div class="alert alert-info">Montant de votre panier <br><span class="priceSpan">{{ cumulPrice }}€</span></div>
                    <PayPal
                        :button-style="myStyle"
                        :amount= price
                        currency="EUR"
                        :client="credentials"
                        env="sandbox"
                        :items="myItems">
                       
                    </PayPal>   
                </div>
            </div>
          
      </div>
  </div>
</template>

<script>
import PayPal from 'vue-paypal-checkout';
import { EventBus } from '../Bus.js';
import { log } from 'util';
import child from './Panier.vue';

/* Retirer les items */
/* Payer avec paypal */
export default {
    data() {
        return {
            currPanier: 0,
            load: true,
            cumulPrice: 0,
            /* PAYPAL */
            price : '',

            credentials: {
            sandbox: 'AWJL3YuixA1MH3njSkoff88JJ_s1lMtMCy80Cfo19aZXiOqZMQdJWRswCrSlYk9RhF_Z5YBiDdmgWT-q',
            production: '<production client id>'
            },
            myItems: [],
            myStyle : {
                label: 'pay',
                size:  'responsive',
                shape: 'pill',
                color: 'blue',
                
            }
        }
    }, 
    components: {
        PayPal
    },

    created(){
        /* Panier pas encore évaluer (load = true)*/
        /* Récupération du panier en cours */  
        this.currPanier = EventBus.$data.monPanier
        
        /* Lancement du panier */
        if (this.currPanier === undefined){
            /* Panier vide */
           this.load = true;   
        } else {
            /* Panier est rempli */
            
            /* Calcul du prix du panier */
            for(let i= 0; i < this.currPanier.length; i++){
                this.cumulPrice += parseFloat(this.currPanier[i].price);
                this.myItems.push({
                    "name": this.currPanier[i].name,
                    "description": this.currPanier[i].resumer,
                    "quantity": "1",
                    "price": this.currPanier[i].price,
                    "currency": "EUR"
                    })     
            }
            
            this.load = false;

            /* Conversion chiffre panier pour paypal (numb to string)*/
            this.price = this.cumulPrice.toString();
            console.log(PayPal);
            
            
        }
        
    }
}
</script>

<style scoped>

.G {
    width: 100%;
}
.priceSpan {
    font-family: 'Rum Raisin', cursive;
    color: #09AF05;
    font-size: 4rem;
    font-weight: 500;
}
button {
    font-size: 3.5rem;
    margin: 2% 3% 0% 75%;
    padding: 0.5% 2%;
}
h2 {
    margin: 5% 0;
}
h3 {
    margin: 0;
}
img {
    height: 250px;
    width: 450px;
    margin: 0 5% 0 1%;
}
span {
    color: #09AF05;
}
.MonPanier {
    margin: 1% 5%;
    text-align: center;
}
.panierGame {
    padding: 1% 2%;
    display: flex;
    flex-direction: row;
    color: white;
    background-color:rgba(0, 0, 0, 0.911);
    border-top: 6px solid rgba(5, 5, 5, 0.2)
}

.releasePrice {
   margin-top: 6%;
   display: flex;
   flex-direction: row;
}
.titleGame {
    margin-bottom: 5%;
    min-width: 550px;
}
.price {
    font-size: 4rem;
    margin: 0;
    padding-left: 180px;
    color:  #09AF05;
}
.buy {
    display: flex;
    flex-direction: column;
    margin-left: 60%;

}
.alert-info {
    font-size: 2rem;
    font-weight: 600;
    font-family: 'Roboto Condensed', sans-serif;
    color: black;
    text-align: center;
    
}
@media screen and (max-width: 1500px){
    .namePlateformes {
        max-width: 350px;
    }  
    .releaseH3 {
        padding-top: 8%;
        min-width: 300px;
    }
    .price {
        padding-left: 20px;
    }
}
</style>