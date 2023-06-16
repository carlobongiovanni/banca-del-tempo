<script setup>
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);
</script>

<script>
    export default {
        methods: {
            generateDayphaseComment(arr) {
                if (arr.length == 1 && arr[0] == "mattina") {
                    return "Preferisci lavorare alla " + arr[0]
                } else if (arr.length == 1 && arr[0] == "pomeriggio") {
                    return "Preferisci lavorare al " + arr[0]
                } else if (arr.length == 2) {
                    return "Preferisci lavorare al " + arr[0] + " e al " + arr[1]
                }  
                return arr
            },
            generateDaysComment(arr) {
                var message = "Hai dato disponibilitá per questi giorni: "
                var returnMessage = ""
                if (arr.length == 0) {
                    return arr
                } else {
                    for(var i = 0; i < arr.length; i++) {
                        var day = ""
                        if (arr[i] == "lu") {
                            day = "Lunedí"
                        } else if (arr[i] == "ma") {
                            day = "Martedí"
                        } else if (arr[i] == "me") {
                            day = "Mercoledí"
                        } else if (arr[i] == "gi") {
                            day = "Giovedí"
                        } else if (arr[i] == "ve") {
                            day = "Venerdí"
                        }
                        message += day + " "
                    }
                }
                return message
            }
        }
    }
</script>

<template>
    <div>
        <h1>Ciao {{authUser?.email}}!</h1>
        <p>Hai effettuato il login con successo!</p>
        <p>Il ruolo a te assegnato e': {{ authUser?.role }}</p>
        <p>{{ authUser?.skills ? "Hai messo come skills: " + authUser?.skills : "Non hai fornito skills in fase di registrazione" }}</p>
        <p>{{ authUser?.dayphase ? generateDayphaseComment(authUser?.dayphase) : "Non hai fornito momenti del giorno preferito in fase di registrazione" }}</p>
        <p>{{ authUser?.days ? generateDaysComment(authUser?.days) : "Non hai fornito giorni preferiti in cui desideri contribuire." }}</p>
    </div>
</template>