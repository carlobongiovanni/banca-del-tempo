<script setup>
import { Form, Field } from 'vee-validate';
import { object, string, ref } from 'yup';

const schema = object().shape({
    username: string().required("La Username e' obbligatoria, deve essere un valido indirizzo email!").email(),
    password: string().required("La Password e' obbligatoria, minimo di 8 caratteri!").min(8, "8 caratteri grazie :)"),
    confirm_password: string().required().oneOf([ref('password')], "Le passwords inserite non coincidono.."),
    skills: string().required("Metti almeno un interesse, tra giardinaggio o falegnameria o altro!"),
});
</script>

<script>
    import { fetchWrapper } from '@/helpers';
    var baseUrl = `${import.meta.env.VITE_API_URL}/users`;
    baseUrl = "https://eu-central-1.aws.data.mongodb-api.com/app/bancadeltempo-iwvgr/endpoint/users"

    export default {
        data() {
            return {
                newUserRegistration: false
            }
        },
        methods: {
            onSubmit(values, { setErrors }) {
                const { username, password, skills, mattina, pomeriggio, lu, ma, me, gi, ve } = values;

                return this.registerUser(username, password, skills, mattina, pomeriggio, lu, ma, me, gi, ve )
                    .catch(error => setErrors({ apiError: error }));
            },
            async registerUser(username, password, skills, mattina, pomeriggio, lu, ma, me, gi, ve) {
                var dayphase = []
                var days = []

                if (mattina != "mattina") {
                    mattina = ""
                } else {
                    dayphase.push(mattina)
                }
                if (pomeriggio != "pomeriggio") {
                    pomeriggio = ""
                } else {
                    dayphase.push(pomeriggio)
                }
                if (lu != "lu") {
                    lu = ""
                } else {
                    days.push(lu)
                }
                if (ma != "ma") {
                    ma = ""
                } else {
                    days.push(ma)
                }
                if (me != "me") {
                    me = ""
                } else {
                    days.push(me)
                }
                if (gi != "gi") {
                    gi = ""
                } else {
                    days.push(gi)
                }
                if (ve != "ve") {
                    ve = ""
                } else {
                    days.push(ve)
                }
                
                const newUser = await fetchWrapper.post(`${baseUrl}/register`, { username, password, skills, dayphase, days });

                if (newUser.message == "OK") {
                    this.newUserRegistration = true;
                }

                return newUser
            },
        },
    };
</script>

<template>
    <div>
        <h2>Registrazione nuovo utente</h2>
        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
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
                <label>Confirm Password</label>
                <Field name="confirm_password" type="password" class="form-control" :class="{ 'is-invalid': errors.confirm_password }" />
                <div class="invalid-feedback">{{errors.confirm_password}}</div>
            </div>
            <div>
                <label>Interessi / competenze</label>
                <Field name="skills" type="text" class="form-control" :class="{ 'is-invalid': errors.skills }" />
                <div class="invalid-feedback">{{errors.skills}}</div>
            </div>

            <div>
                <label>Orari preferiti</label>
                <Field name="mattina" type="checkbox" value="mattina" class="form-control" /> Mattina
                <Field name="pomeriggio" type="checkbox" value="pomeriggio" class="form-control" /> Pomeriggio
            </div>

            <div>
                <label>Giorni preferiti</label>
                <Field name="lu" type="checkbox" value="lu" /> Lunedí
                <Field name="ma" type="checkbox" value="ma" /> Martedí
                <Field name="me" type="checkbox" value="me" /> Mercoledí
                <Field name="gi" type="checkbox" value="gi" /> Giovedí
                <Field name="ve" type="checkbox" value="ve" /> Venerdí
            </div>

            <div>
                <button>
                    Register
                </button>
            </div>
            <div v-if="errors.apiError">{{errors.apiError}}</div>
            <div v-if="newUserRegistration">Registrazione utente effettuata con successo, puoi adesso andare al login!</div>
        </Form>
    </div>
</template>