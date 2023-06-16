<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useAuthStore } from '@/stores';
import UserProfile from './views/UserProfileView.vue';

const authStore = useAuthStore();
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="Benvenuto alla Banca del Tempo di Luca!" />

      <nav>
        <RouterLink to="/">Home </RouterLink>
        <RouterLink to="/about">About </RouterLink>
        <!-- will appear only if user is not logged in -->
        <RouterLink to="/register" v-show="!authStore.user">Register </RouterLink>
        <RouterLink to="/login" v-show="!authStore.user">Login </RouterLink>
        <!-- will appear only if user is logged in -->
        <RouterLink to="/profile" v-show="authStore.user">Profilo </RouterLink>
        <RouterLink to="/calendar" v-show="authStore.user">Calendario </RouterLink>
        <router-link to="/"><a @click="authStore.logout()" v-show="authStore.user">Logout</a></router-link>
      </nav>

    </div>
  </header>

  <RouterView />
</template>

