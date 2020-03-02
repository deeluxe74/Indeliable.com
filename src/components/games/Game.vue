<template>
    <div v-if="load" style="text-align:center; margin:10%;" class="alert alert-warning">
    Votre recherche ne correspond a aucun résultat,<br> Veuillez réssayer</div>
    
    <div v-else class="G">  
        <h1 class="title"><span class="titleSpan">{{ gameLoad.name }}</span></h1>

        <div class="studio">
                <img class="imgGame" :src="gameLoad.img" alt="image du jeux">
                <div class="alignBloc">
                    <div class="equipe">
                        <h2>L'équipe</h2>
                        <h3>Créateur : <span>{{ gameLoad.createur }}</span></h3>
                        <h3>Développeur : <span>{{ gameLoad.equipe.developpeur }}</span></h3>
                        <h3>Modeleur : <span>{{ gameLoad.equipe.modeleur }}</span></h3>
                    </div>
                    
                    <h2>Info</h2>
                    <div class="info">
                        <h4>Plateformes <br><span>{{ gameLoad.plateformes }}</span></h4>
                        <h4>Date de sortie <br><span>{{ gameLoad.date }}</span></h4>
                        <h4>Style <br> <span>{{ gameLoad.style }}</span></h4>
                    </div>
                </div>
                <img class="imgProfil" :src="gameLoad.equipe.img" alt="image du profil">
        </div>

        <div class="description">
                <h2 class="titleDes">Descriptif</h2>
                <p class="desP" v-html="gameLoad.description">
                    
                </p>
        </div>

        <div class="message">
                <h2 class="titleStudio">Mot du studio</h2>
                <p v-html="gameLoad.motStudio">
                   
                </p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            load: true,
            arrGame: this.$route.name,
            gameLoad:[]
        }
    },
    methods: {
        tryGame(){
            /* Tableau Jeux */
            /* Path === a mon ArrayJeux ? (1 charger)*/ 
            for (let i=0; i < this.arrGame.length; i++){
                let pathGame = '/Game/' + this.arrGame[i].name;       
                if (pathGame === this.$route.path){
                    this.gameLoad = this.arrGame[i];
                    this.load = false;
                }else {
                    /* Tout les chemins faux */   
                }
            }      
        }
    },
    created(){
        setTimeout(this.tryGame,500)
    }
}
</script>

<style scoped>
h1 {
    animation: float 3s ease-in-out infinite;
    font-size: 6rem;
    margin: 4.4% 0;
}
h2 {
    margin: 4% 0;
}
h3 {
    margin-bottom: 2.5%;
    font-size: 2.5rem;
    color: white;
}
h4 {
    color: white;
    font-size: 2.5rem;
    margin: 0 0 5% 0;
}
.titleSpan {
    color: white;
    background-color: rgba(0, 224, 255, 1);
    border-radius: 35px;
    padding: 1.5% 3%
}

.G {
    font-size: 2.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;  
}

.studio {
    padding: 3% 5%;
    background-color: rgba(54, 54, 54, 1);
    display: flex;
    justify-content: space-between;
    flex-direction: row;
}
.studio h2 {
    color: rgba(0, 224, 255);
    font-size: 4rem;
}
.studio span {
    color: rgba(166, 0, 0, 1);
    font-size: 2.5rem;
}
.studio img {
    border-radius: 25px;
    width: 30%;
    height: 450px;
    
}
.alignBloc {
    width: 100%;
}
.description {
    background-color: rgba(0, 224, 143, 1);
    padding: 0 0 3% 0;
}
.titleDes {
    font-weight: 900;
    font-size: 6rem;
}
p {
    margin: 0 8%;
    font-size: 2rem;
    margin-bottom: 5%;
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
}


.message {
    background-color: rgba(54, 54, 54, 1);
}
.titleStudio {
    font-size: 6rem;
    color: white;
}
.title {
    text-align: center;
}

/* ANIMATION */
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

@media screen and (max-width: 1700px){
    h4 {
        font-size: 2rem;
    }
    .studio span {
        font-size: 2rem;
}
}
</style>