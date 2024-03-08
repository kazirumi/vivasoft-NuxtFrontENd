import { defineStore } from 'pinia';

export interface UserPayloadInterface {
  username: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
    config:useRuntimeConfig(),
    error_message: '',
    SnackbarTrigger:ref(false)
  }),
  actions: {
    async authenticateUser({ username, password }: UserPayloadInterface) {
      // useFetch from nuxt 3

      const { data,error, pending }: any = await useFetch(this.config.public.apiURL+'/api/Authentication/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email:username,
          password,
        },
      });
      this.loading = pending;

      if (data.value) {
        const token = useCookie('token'); // useCookie new hook in nuxt 3
        token.value = data?.value?.token; // set token to cookie
        this.authenticated = true; // set authenticated  state value to true
      }

      if(error.value?.data){
        this.error_message=error.value?.data;
        this.SnackbarTrigger=true;
        setTimeout(() => {
          this.error_message="";
        }, 2000);
      }

    },
    logUserOut() {
      const token = useCookie('token'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
    },
  },
});