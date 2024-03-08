<template>
    <div>
      
      <div class="container form">
        <v-container fluid>
          <v-card variant="elevated" elevation="5" width="350" class="pa-6 mx-auto">
            <v-card-title>Login</v-card-title>
            <v-card-item>
                <v-form ref="loginForm" @submit.prevent="login">
                <InputField
                    :label="'Email'"
                    :type="'email'"
                    v-model="user.username"
                    :validate="true"
                    :rules="[(v:string) => !!v || 'email is required',(v:string) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid']"
                    class="mt-3"
                    
                />
                <InputField
                    :label="'password'"
                    :type="'password'"
                    v-model="user.password"
                    :rules="[(v:string) => !!v || 'password is required']"
                    class="mt-3"
                />
            
                    <v-btn color="success" style="width: 100%" @click.prevent="login" class="button">Login</v-btn>
                </v-form>
            </v-card-item>
            
            
          </v-card>
          
        </v-container>
        <v-snackbar :top="true"
          v-model="store.auth.SnackbarTrigger"
          location="right top"
          color="error"
          timeout="2000"
        >
            {{ store.auth.error_message }}
        </v-snackbar>
        
      </div>
      
    </div>
  </template>
  <script lang="ts" setup>
  import InputField from "~/components/inputs/InputField";
 

  import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
  import { useAuthStore } from '~/store/auth'; // import the auth store we just created
  
  
  
  const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
  
  const user = ref({
    username: 'user@example.com', 
    password: 'string',
  });

  let store={
    auth:useAuthStore()
  }

  let loginForm=ref(null);
  const router = useRouter();
  
  const login = async () => {
    const {valid, errors} = await loginForm.value?.validate();
    if(valid)
    await store.auth.authenticateUser(user.value); // call authenticateUser and pass the user object
    // redirect to homepage if user is authenticated
    
    if (authenticated) {
      router.push('/');
    }
  };
  </script>