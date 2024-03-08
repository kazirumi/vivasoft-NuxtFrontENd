import type { Guid } from 'guid-ts';
import { defineStore } from 'pinia';
import type { SalesMain } from '~/interface/SalesMain';
import type { SalesSub } from '~/interface/SalesSub';



export const useSalesMainStore = defineStore('sales_main', {
    state: () => ({
        salesMainForm: {} as SalesMain,
        salesSubsFrom: {} as SalesSub,
        isSuccess: false,
        loading: false,
        config: useRuntimeConfig(),
        error_message: '',
        SnackbarTrigger: ref(false),
        SnackColor: "success" || "error"
    }),
    actions: {
        async saveSalesMain() {
            // useFetch from nuxt 3

            const { data, error, pending }: any = await useFetchAPI(this.config.public.apiURL + '/api/SalesMains', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: this.salesMainForm,
            });
            this.loading = pending;
            // console.log("sas",data?.value?.Id);
            // console.log(error?.value.data);

            //   if (data?.value?.Id) {
            //     this.error_message="User Registered";
            //     this.SnackbarTrigger=true;
            //     this.SnackColor="success";
            //     this.isSuccess=true;
            //     setTimeout(() => {
            //       this.error_message="";
            //       this.isSuccess=false;
            //     }, 2000);
            //     return true;
            //   }

            //   if(error.value?.data){
            //     this.error_message=error.value?.data;
            //     this.SnackbarTrigger=true;
            //     this.SnackColor="error";
            //     setTimeout(() => {
            //       this.error_message="";
            //       this.isSuccess=false;
            //     }, 2000);

            //   }
            return true;
        },
    },
});