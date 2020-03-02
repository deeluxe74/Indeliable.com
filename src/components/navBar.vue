<template>
    <div class="navLeft" :class="navAnim" >
        <router-link go to="/"><img style="height: 100px; width:250px"  src="img/logo.png" alt="Logo indéliable.com"></router-link>
        <ul>  
        
            <li class="blueOpa"><router-link go to="/IndeStore"><div style="color:white;">IndyStore</div></router-link></li>
            <li class="blueOpa"><router-link go to="/EspaceConstructif"><div style="color:white;">Espace Constructif</div></router-link></li>
            <li class="blueOpa"><router-link go to="/Actualites"><div style="color:white;">Actualités</div></router-link></li>

                <li class="nav-item dropdown mediaLi">
                    <a class="nav-link dropdown-toggle blueOpa" style="color:white;" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Espace</a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item"><router-link go to="/Recherche"><div>Recherche</div></router-link></a>
                        <a class="dropdown-item"><router-link go to="/ReleaseThisWeek"><div>Sortie de la semaine</div></router-link></a>
                        <a class="dropdown-item"><router-link go to="/MonPanier"><div>Panier</div></router-link></a>
                    </div>
                </li>
        </ul>
        <a class="lienTwitter" href="https://twitter.com/Indéliable.com"><img class="lien" src="img/twitter.png" alt="Twitter de indéliable.com"></a>
        <a class="lienGmail" href="mailto:rollet.raphael@gmail.com"><img class="lien" src="img/gmail.png" alt="Gmail de indéliable.com"></a>

        
            
    </div>
</template>

<script>

export default {
    data(){
        return{
            
            navAnim: 'none'
        }
    },
    methods: {        
        watchY(){
            this.screenY = window.scrollY;
            if(this.screenY > 50){
                this.navAnim = 'navAnim';    
            }else {
                this.navAnim ='navAnimReverse'
            }
        }
    },
    created() {
        window.addEventListener('scroll', this.watchY);
    },
    destroyed () {
        window.removeEventListener('scroll', this.watchY);
    }
}
</script>

<style scoped>
.navLeft {
    width: 100%;
    z-index: 2;
    position: relative;
    display: flex;
    background-color: rgba(31, 31, 31, 0.9);
    
}
.navAnim {
      animation: puff-out-ver 0.9s cubic-bezier(0.165, 0.840, 0.440, 1.000) both;
}
.navAnimReverse {
    animation: puff-in-hor 0.5s cubic-bezier(0.470, 0.000, 0.745, 0.715) both;
}
@keyframes puff-in-hor {
  0% {
    -webkit-transform: scaleX(2);
            transform: scaleX(2);
    -webkit-filter: blur(4px);
            filter: blur(4px);
    opacity: 0;
  }
  100% {
    -webkit-transform: scaleX(1);
            transform: scaleX(1);
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
}
@keyframes puff-out-ver {
  0% {
            transform: scaleY(1);
            filter: blur(0px);
    opacity: 1;
  }
  100% {
            transform: scaleY(2.8);
            filter: blur(4px);
    opacity: 0;
  }
}
ul {
    list-style-type: none;
    height: 100px;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
}

.mediaLi {
    padding-top: 1.5%;
}
li {
    cursor: pointer;
    font-size: 35px;
    font-weight: 600;
    padding-top: 2%;
    text-align: center;
    list-style-type:none;
}
.blueOpa:hover {
    transform: rotate(-15deg);
    opacity: 0.7;
    
}
a {
    color: rgb(0, 0, 0);
    text-decoration: none;
}
.dropdown-item {
    font-size: 2rem;
}

.lien {
    margin-top: 20px;
    height: 65px;   
}
.lienGmail {
 margin-right: 3%;
 cursor: pointer;
}
.lienTwitter {
 margin-right: 2%;
 cursor: pointer;
}
.lienTwitter:hover {
 opacity: 0.6;
}
.lienGmail:hover {
 opacity: 0.6;
}
@media screen and (max-width: 1300px){
    li{
        font-size: 30px;
        padding-top: 3.5%;
        list-style-type: none;
    }
    .mediaLi {
        padding-top: 3%;
    }
    ul {
    list-style-type: none;
    }
}
</style>