<template>
    <div class="G">
        <div class="search">
            <h1>Indéliable.com</h1>
            <input v-model="userEnter" @keyup="searchData()" type="text">
            <div v-if="userEnter !== ''" class="alert alert-info searchResult">
                <h2 @click="goTo(search)" class="myResult" v-for="(search,index) in preSearch">{{ search }}</h2>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return {
            mySearch: '',
            preSearch: [],
            oldArray: [],

            userEnter: ''
        }
    },
    methods: {
        searchData(){
            /* Reinitialise mon résultat */
            this.preSearch = [];
            /* Entrer user + conversion Maj */
            const user = this.userEnter.toUpperCase();
            /* Convertit l'obj en array (jeux) */
            const arrayJeux = Object.values(this.jeux);
            arrayJeux.map((Game,index) => {
                /* Prise des nom seul du jeux en cours d'itération */
                const nameGame = Game.name.toUpperCase();
                /* Pour chaque caractère du jeux */
                let save = '';
                let deleteItem = '';
                for (let i=0; i < user.length; i++){
                    
                    /* Caractère === Caractère Game */
                    if (user[i] === nameGame[i]){
                        save = Game.name;
                    }else {
                        deleteItem = Game.name
                        /* Pas égale = casse le boucle currGame */
                        break
                    }  
                }
                if (save === ''){
                    /* Dont push empty string */
                }else {
                   this.preSearch.push(save);  
                }

                for (let C=0; C < this.preSearch.length; C++){
                    if(deleteItem.toUpperCase() === this.preSearch[C].toUpperCase()){
                        const result = this.preSearch.findIndex(mot => mot === deleteItem.toUpperCase());
                        this.preSearch.splice(result,1)  ;
                    }
                }     
            });
            
        
        },
        goTo(search){
            console.log(search);
            this.$router.push('/Game/'+ search);
        }    
    },
    created() {
        Vue.http.get('Jeux.json') /* Fourni une liste de jeux (obj) */
            .then(response => response.json())
            .then(jeux => {
                if (jeux) {
                    this.jeux = jeux;     
                }
            })
    }
}
</script>

<style scoped>
.myResult:hover {
    opacity: 0.7;
    cursor: pointer;
}
h1 {
    color: rgb(0, 172, 100);
    font-family: 'Rum Raisin', cursive;
    font-size: 7.5rem;
    margin: 10% 0 0 0%;
    text-align: center;
}
.search {
    display: flex;
    flex-direction: column;
    justify-items: center; 
}
input {
    font-family: 'Roboto Condensed', sans-serif;
    color: rgba(0, 0, 0, 0.877);
    text-align: center;
    font-size: 3.5rem;
    margin: 2% 25%;
}
.searchResult {
    text-align: center;
    margin: 0 25%;
    border-radius: 25px;
    
}
</style>