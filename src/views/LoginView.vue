<script setup>
import { Form, Field } from 'vee-validate';
import { object, string } from 'yup';

import { useAuthStore } from '../stores';

const schema = object().shape({
    username: string().required("La Username e' obbligatoria, deve essere l'indirizzo email usato in fase di registrazione!"),
    password: string().required("La Password e' obbligatoria!")
});

function onSubmit(values, { setErrors }) {
    const authStore = useAuthStore();
    const { username, password } = values;

    return authStore.login(username, password)
        .catch(error => setErrors({ apiError: error }));
}
</script>

<template>
    <div>
        <div>
            Username: admin@admin.com<br />
            Password: admin<br />
            Ruolo: manager<br />
            Username: test@test.com<br />
            Password: test<br />
            Ruolo: utente<br />
        </div>
        <h2>Login</h2>
        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
            <div>
                <label>Username (email)</label>
                <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
                <div class="invalid-feedback">{{errors.username}}</div>
            </div>            
            <div>
                <label>Password</label>
                <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                <div class="invalid-feedback">{{errors.password}}</div>
            </div>            
            <div>
                <button>
                    Login
                </button>
            </div>
            <div v-if="errors.apiError">{{errors.apiError}}</div>
        </Form>
    </div>
</template>