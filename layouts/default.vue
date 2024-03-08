<template>
    <div>
        
        <v-app>
          <v-toolbar density="compact" style="position:relative;" color="gray">
          <template v-slot:prepend>
            <div class="text-h5">Title</div>
          </template>

          <v-divider
            class="ms-3"
            inset
            vertical
          ></v-divider>

          <v-toolbar-title>My Home</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-spacer></v-spacer>

          <v-toolbar-items>
            <v-btn  variant="text"><nuxt-link to="/">Home</nuxt-link></v-btn>

            <v-divider vertical></v-divider>

            <v-btn variant="text"><nuxt-link to="/about">About</nuxt-link></v-btn>

            <v-divider vertical></v-divider>

            <v-btn v-if="!authenticated" variant="text"><nuxt-link to="/login">Login</nuxt-link></v-btn>
            <v-btn v-if="authenticated" variant="text"><nuxt-link @click="logout" to="/login">Logout</nuxt-link></v-btn>
            
            <v-divider vertical></v-divider>
            
            <v-btn v-if="!authenticated" variant="text"><nuxt-link to="/register">Register</nuxt-link></v-btn>

          </v-toolbar-items>

          <v-divider vertical></v-divider>

          <v-app-bar-nav-icon class="ms-2"></v-app-bar-nav-icon>
        </v-toolbar>
      
      
        <div style="position:relative;" class="mainContent ma-5">
            <slot />
        </div>
        </v-app>

     
      <footer>
        <h1>Footer</h1>
      </footer>
    </div>
  </template>
  <script lang="ts" setup>
  import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
  import { useAuthStore } from '~/store/auth'; // import the auth store we just created
  
  const router = useRouter();
  
  
  const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
  const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs
  
  const logout = () => {
    logUserOut();
    router.push('/login');
  };
  </script>
