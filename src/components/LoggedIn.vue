<script setup>
import { storeToRefs } from 'pinia';

import { useAuthStore, useUsersStore } from '@/stores';

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

//usersStore.getAll();
</script>

<template>
    <div>
        <h1>Ciao {{authUser?.email}}!</h1>
        <p>Hai effettuato il login con successo!</p>
    </div>
</template>