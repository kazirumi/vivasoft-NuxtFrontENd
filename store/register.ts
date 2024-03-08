import type { Guid } from 'guid-ts';
import { defineStore } from 'pinia';

export interface UserRegisterInterface {
    Id?:Guid | "" ;

    Name:string ;

    Email:string ;
   
    Phone:string ;
   
    JoinedDate:Date;
   
    Password:string ;
   
    ConfirmPassword:string ;
}

export const useRegisterStore = defineStore('register', {
  state: () => ({
    userRegisterForm: {} as UserRegisterInterface,
    isSuccess:false,
    loading: false,
    config:useRuntimeConfig(),
    error_message: '',
    SnackbarTrigger:ref(false),
    SnackColor:"success"||"error"
  }),
  actions: {
    async registerUser() {
      // useFetch from nuxt 3

      const { data, error, pending }: any = await useFetch(this.config.public.apiURL+'/api/Authentication/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: this.userRegisterForm,
      });
      this.loading = pending;
// console.log("sas",data?.value?.Id);
// console.log(error?.value.data);

      if (data?.value?.Id) {
        this.error_message="User Registered";
        this.SnackbarTrigger=true;
        this.SnackColor="success";
        this.isSuccess=true;
        setTimeout(() => {
          this.error_message="";
          this.isSuccess=false;
        }, 2000);
        return true;
      }

      if(error.value?.data){
        this.error_message=error.value?.data;
        this.SnackbarTrigger=true;
        this.SnackColor="error";
        setTimeout(() => {
          this.error_message="";
          this.isSuccess=false;
        }, 2000);
        
      }
      return false;
    },
  },
});