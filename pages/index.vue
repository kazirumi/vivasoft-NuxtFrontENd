<template>
    <div>
        <v-container>
        <v-row no-gutters>
        <v-col
            lg="6"
            md="5"
            sm="6"
        >
            <!-- <v-sheet class="pa-2 ma-2">
            sm-6 md-5 lg-6
            </v-sheet> -->
            <v-form @submit.prevent>
                <v-text-field
                            type="hidden"
                            v-model="store.salesMain.salesMainForm.Id"
                       />
                <v-row>
                    <v-col :cols="8">
                        
                        <v-text-field
                            label="Sales Date"
                            placeholder="Sales Date"
                            variant="outlined"
                            type="datetime-local"
                            v-model="store.salesMain.salesMainForm.SalesDate"
                       />
                    </v-col>
                    <v-col :cols="8">
                        <v-text-field
                            label="Total Amount"
                            variant="outlined"
                            v-model="store.salesMain.salesMainForm.TotalAmount"
                            type="number"
                            :value="TotalPrice"
                        ></v-text-field>
                    </v-col>
                    <v-col :cols="12">
                        <v-btn @click="addSubItems">Add Sales Sub Item</v-btn>
                        <DataTable3
                        :headers="headers"
                        :actions="actions"
                        :data="store.salesMain.salesMainForm.SalesSubs"
                        @data-delete="deleteSalesSub"
                         @data-edit="editSalesSub"
                        />
                        <br>
                        <v-btn @click="SaveSalesMain()" class="mt-3" color="success">Submit</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-col>
        <v-col
            lg="6"
            md="5"
            offset-lg="0"
            offset-md="2"
            sm="6"
        >
            <!-- <v-sheet class="pa-2 ma-2">
            .v-col-sm-6 md-5 .offset-md-2 .v-col-lg-6 .offset-lg-0
            </v-sheet> -->
        </v-col>
        </v-row>
    </v-container>
    <dialog-box
      min-width="50vw"
      :is_open="isOpen"
      @close="() => (isOpen = false)"
      :title="'Sales Sub Form'"
    >
      <SalesSubSaleSubForm
      :is_open="isOpen"
      @close-dialog="() => {isOpen = false;}"
      />
    </dialog-box>
    </div>
</template>
<script lang="ts" setup >
import type { SalesSub } from "~/interface/SalesSub";
import DataTable3 from "../components/table/DataTable3.vue";
import { useSalesMainStore } from '~/store/salesMain';

let isOpen=ref(false);
const headers = [
  { key: "Id", title: "Id" },
  { key: "ItemId", title: "Item Id" },
  { key: "Quantity", title: "Quantity" },
  { key: "TotalSubPrice", title: "Total Sub Price" },
  { title: 'Actions', key: 'actions', sortable: false },

];

const actions = [
  { value: "edit", name: "Edit", icon: "mdi-pencil", url: "" },
  { value: "delete", name: "delete", icon: "mdi-delete", url: "" },
];



// watch(()=>store.salesMain.salesMainForm.SalesSubs,(newValue)=>{
//     if(store.salesMain.salesMainForm.SalesSubs.length>0)
//     store.salesMain.salesMainForm.TotalAmount= store.salesMain.salesMainForm.SalesSubs.reduce((accumulator, currentValue) => accumulator + currentValue.TotalSubPrice,
//     0);
// })

definePageMeta({
    middleware: 'auth' // this should match the name of the file inside the middleware directory
})
// const {data,error,pending} =await useFetchAPI('/api/Users',{method:"GET"}) ;
// console.log(data.value);
let store={
    salesMain:useSalesMainStore()
}
const addSubItems=()=>{
    isOpen.value=true;
    if(!store.salesMain.salesMainForm.SalesSubs)
    store.salesMain.salesMainForm.SalesSubs=[];
    // store.salesMain.salesMainForm.SalesSubs.push({Id:null,TotalSubPrice:9897,Quantity:87,ItemId:null,SalesMainId:null});

}

let TotalPrice=computed(()=>{
    if(!store.salesMain.salesMainForm.SalesSubs)
    return 0;

      store.salesMain.salesMainForm.TotalAmount = store.salesMain.salesMainForm.SalesSubs.reduce((accumulator, currentValue) => accumulator + currentValue.TotalSubPrice,
    0);

 return store.salesMain.salesMainForm.TotalAmount;

})

let editSalesSub=(raw:any)=>{
console.log(raw);
}

let deleteSalesSub=()=>{

}

const SaveSalesMain=()=>{
    store.salesMain.saveSalesMain();
    store.salesMain.$reset();
}
onMounted(() => {

});
</script>
