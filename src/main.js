
import App from './App.vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import Accueil from './components/Accueil.vue';
import IndeStore from './components/IndeStore.vue';
import Actualites from './components/Actualites.vue';
import ReleaseThisWeek from './components/ReleaseThisWeek.vue';
import EspaceConstructif from './components/EspaceConstructif.vue';
import TonPanier from './components/panier/TonPanier.vue';
import Recherche from './components/Recherche.vue';
import Game from './components/games/Game.vue';



Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.root= 'https://vuejs-http-f9908.firebaseio.com/';

let componentArr = [];

Vue.http.get('Jeux.json')
  .then(response => response.json())
    .then(jeux => {
      let arrJeux = Object.values(jeux);
      for (let i=0; i < arrJeux.length; i++){
        componentArr.push(arrJeux[i]);
      }
       
})

export const routes = [
  {path: '' , component: Accueil},
  {path: '/IndeStore', component: IndeStore},
  {path: '/ReleaseThisWeek', component: ReleaseThisWeek},
  {path: '/Actualites', component: Actualites},
  {path: '/EspaceConstructif', component: EspaceConstructif},
  {path: '/MonPanier', component: TonPanier},
  {path: '/Recherche', component: Recherche},
  {path: '/Game/:name', name:componentArr , component: Game}
]

const router = new VueRouter({routes});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
