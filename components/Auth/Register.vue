<template>
    <div>
        <v-container fluid>
          <v-card variant="elevated" elevation="5" width="350" class="pa-6 mx-auto">
            <v-card-title>Register</v-card-title>
            <v-card-item>
                <v-form ref="registerForm" @submit.prevent="registerUser()">
                    <InputField
                    :label="'Name'"
                    :type="'text'"
                    v-model="store.register.userRegisterForm.Name"
                    :rules="[(v:string) => !!v || 'Name is required']"
                    class="mt-3"
                    />
                    <InputField
                        :label="'Email'"
                        :type="'email'"
                        v-model="store.register.userRegisterForm.Email"
                        :validate="true"
                        :rules="[(v:string) => !!v || 'email is required',(v:string) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid']"
                        class="mt-3"
                        
                    />
                    <InputField
                        :label="'Join Date'"
                        :type="'datetime-local'"
                        v-model="store.register.userRegisterForm.JoinedDate"
                        :validate="true"
                        :rules="[(v:Date) => !!v || 'join date is required']"
                        class="mt-3"
                        
                    />
                    <InputField
                        :label="'Phone'"
                        :type="'text'"
                        v-model="store.register.userRegisterForm.Phone"
                        :validate="true"
                        :rules="[(v:string) => !!v || 'phone number is required',(v:string) => !!/^[-+]?[0-9]*\.?[0-9]*$/.test(v) || 'phone number is invalid']"
                        class="mt-3"
                        
                    />
                    <InputField
                        :label="'password'"
                        :type="'password'"
                        v-model="store.register.userRegisterForm.Password"
                        :rules="[(v:string) => !!v || 'password is required']"
                        class="mt-3"
                       
                    />
                    <InputField
                        :label="'Confirm Password'"
                        :type="'password'"
                        v-model="store.register.userRegisterForm.ConfirmPassword"
                        :rules="[(v:string) => !!v || 'confirm password is required',(v:string)=> v === store.register.userRegisterForm.Password || 'The password confirmation does not match.']"
                        class="mt-3"
                  
                    />
            
                    <v-btn color="success" style="width: 100%"  type="submit" >Submit</v-btn>
                </v-form>
            </v-card-item>
            <!-- {{store.register.error_message}}{{store.register.SnackbarTrigger}} -->
            
          </v-card>
          <v-snackbar :top="false"
          v-model="store.register.SnackbarTrigger"
          location="right top"
          :color="store.register.SnackColor"
          timeout="2000"
        >
            {{ store.register.error_message }}
        </v-snackbar>
        </v-container>
    </div>
</template>
<script setup lang="ts">
import InputField from "~/components/inputs/InputField";
import { useRegisterStore } from "~/store/register";



let registerForm = ref<HTMLFormElement>();

let store={
    register:useRegisterStore()
}

const registerUser = async ()=>{
    const {valid, errors} = await registerForm.value?.validate();
    if(valid){
         await store.register.registerUser().then(res=>{
            if(res){
                setTimeout(() => {
                    store.register.$reset();
                }, 2000);
            }
            
         });
         registerForm.value?.reset();
    }
    
}

onUnmounted(() => {
    store.register.$reset();
});
</script>
<style>
    
</style>