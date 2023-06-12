<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useAuthStore } from '@/stores';
import LoggedIn from './components/LoggedIn.vue';

const authStore = useAuthStore();
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="Benvenuto alla Banca del Tempo di Luca!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>

      <h3>Procedete al <router-link :to="{ name: 'login' }">Login</router-link> o alla registrazione per poter accedere alla banca del tempo</h3>
      
      <nav v-show="authStore.user" class="navbar navbar-expand navbar-dark bg-dark">
        <h3>Infine, da qui potete fare il <router-link to="/"><a @click="authStore.logout()">Logout</a></router-link>.</h3>
        <LoggedIn/>
      </nav>


    </div>
  </header>

  <RouterView />
</template>

