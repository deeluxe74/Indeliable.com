<template>
  <div id="app">
    <div class="dispo">
      <app-nav-bar></app-nav-bar>
      <app-panier></app-panier>
      <transition name="slideScreen" mode="out-in" appear>
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import navBar from './components/navBar.vue';
import Accueil from './components/Accueil.vue';
import Panier from './components/panier/Panier.vue';

export default {
  name: 'app',
  components: {
    appNavBar : navBar,
    appAccueil : Accueil,
    appPanier: Panier
  }
}
</script>

<style>
.dispo {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.slideScreen-enter-active {
  animation: slideIn 800ms cubic-bezier(.60,.74,.61,1.30)   forwards;
}
.slideScreen-leave-active {
  animation: slideOut 800ms cubic-bezier(.48,.15,1,1) forwards;
}
@keyframes slideIn {
  from {transform: translateY(100%)}
  to {transform: translateY(0px)}
}
@keyframes slideOut {
  from {transform: translateY(0px)}
  to {transform: translateY(-100%)}
}

#app {
  width: 100%;
  display: flex;
  flex-direction: row;
}
body {
  width: 100%;
  min-height: 1500px;
  margin: 0;
  padding: 0;
  font-family: 'Rum Raisin', sans-serif;
  font-size: 35px;
  color: black;
  background-color: rgb(255, 255, 255);
}
h1 {
  font-size: 5rem;
}
h2 {
  font-size: 1.5rem;
}

p {
  font-family: 'Roboto Condensed', sans-serif;
}

@media screen and (max-width: 1300px){
  body {
    width: 1300px;
  }
}
</style>
