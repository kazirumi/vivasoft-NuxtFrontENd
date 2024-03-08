<template lang="">
    <div>
        <v-form ref="salesSubForm">
            <v-row>
            <v-col>
                <InputField
                v-model="store.SalesMain.salesSubsFrom.Id"
                type="hidden"
                />
                <InputField
                v-model="store.SalesMain.salesSubsFrom.SalesMainId"
                type="hidden"
                />
                <v-select
                    :label="'Items'"
                    v-model="store.SalesMain.salesSubsFrom.ItemId"
                    item-title="Name"
                    item-value="Id"
                    :items="item"
                    :clearable="true"
                    :rules="rules.selectRule"
                    @update:modelValue="calculateTotalSub()"
                ></v-select>
                <v-text-field
                v-model="store.SalesMain.salesSubsFrom.Quantity"
                :type="'number'"
                :label="'Quantity'"
                :rules="rules.quantiryRule"
                @update:modelValue="calculateTotalSub()">
                </v-text-field>

                <v-text-field
                v-model="store.SalesMain.salesSubsFrom.TotalSubPrice"
                :label="'Total Sub Price'"
                :type="'number'"
                :readonly="true"
                :rules="rules.totalPriceRule"
                >
                
            </v-text-field>

            </v-col>
            
            </v-row>
            <v-row justify="end">
            
                <v-btn
                color="red"
                class="ma-3"
                @click="()=>{emits('close-dialog');salesSubForm?.reset();}"
                >
                Cancel 
                </v-btn>
                <v-btn
                color="primary"
                class="ma-3"
                @click="saveSalesSubs()"
                >
                Save 
                </v-btn>
            <!-- <v-btn
                v-if="!store.respondent.is_edit"
                color="primary"
                class="ma-2"
                @click="saveRespondent"
            >
                Save <v-icon>mdi-content-save-outline</v-icon>
            </v-btn>
            <v-btn
                v-if="store.respondent.is_edit"
                color="primary"
                class="ma-2"
                @click="updateRespondent"
            >
                Update <v-icon>mdi-content-save-outline</v-icon>
            </v-btn> -->
            </v-row>
        </v-form>
    </div>
</template>
<script setup lang="ts">
import { useSalesMainStore } from '~/store/salesMain';
import InputField from "../../components/inputs/InputField.vue";
import SelectField from "../../components/inputs/SelectField.vue";


let salesSubForm= ref<HTMLFormElement>();

const emits = defineEmits(['close-dialog']);

let store={
    SalesMain:useSalesMainStore()
}
const {data:{value:item},error,pending} =await useFetchAPI('api/Items',{method:"GET"}) ;
// console.log(item);
let items=item as any[];

let rules = {
  totalPriceRule: [(v:string) => !!v || "Total Price is required"  ],
  quantiryRule: [(v:any) => !!v || "Quantity is required",(v:any) => v>0 || "should be positive number",(v:any)=> /^[0-9]*$/.test(v)|| "only integer allowed"],
  selectRule:[(v:string) => !!v || "item is required" ]
}

let calculateTotalSub=()=>{
    // console.log("hahaha")
    if(store.SalesMain.salesSubsFrom.ItemId && store.SalesMain.salesSubsFrom.Quantity>0){
        let price=items.find(element => element.Id==store.SalesMain.salesSubsFrom.ItemId);
        store.SalesMain.salesSubsFrom.TotalSubPrice=store.SalesMain.salesSubsFrom.Quantity * (item as any[]).find(x=>x.Id==store.SalesMain.salesSubsFrom.ItemId).Price;
    }
    
}

let saveSalesSubs = async ()=>{
    const {valid, errors} = await salesSubForm.value?.validate();
    if(valid){
        store.SalesMain.salesMainForm.SalesSubs.push({...store.SalesMain.salesSubsFrom});
        salesSubForm.value?.reset();
        emits('close-dialog');
    }
}
</script>
<style>
    
</style>