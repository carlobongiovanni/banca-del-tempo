import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';

var baseUrl = `${import.meta.env.VITE_API_URL}/users`;
baseUrl = "https://eu-central-1.aws.data.mongodb-api.com/app/bancadeltempo-iwvgr/endpoint/users"

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: {}
    }),
    actions: {
        async getAll() {
            this.users = { loading: true };
            fetchWrapper.get(baseUrl)
                .then(users => this.users = users)
                .catch(error => this.users = { error })
        }
    }
});