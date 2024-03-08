<template>
  <v-dialog
    v-model="isOpen"
    persistent
    activator="parent"
    @keyup.esc="closeDialog"
    scrollable
  >
    <v-card class="mx-auto dialog-card pa-1" :min-width="minWidth">
       <!-- <div class="d-flex"> -->
      <!-- <v-card-title>
        {{ title }}
      </v-card-title> -->
      <!-- <v-spacer></v-spacer>
        <v-btn
          class="close-icon"
          @click="closeDialog"
          
        >close</v-btn> -->
       <!-- </div> -->
       <!-- <v-divider></v-divider> -->
       <div class="d-flex ml-10 mr-10 mt-10">
          <span class="font-weight-bold text-h5">{{ title }}</span>
          <v-spacer></v-spacer>
          <v-icon
            class="close-icon"
            @click="closeDialog"
            :icon="'mdi-close'"
          ></v-icon>
       </div>
       <v-card-item class="pa-5">
        <slot />
      </v-card-item>
      <!-- <v-divider></v-divider> -->
      <v-card-actions v-if="button" color="primary"> 
         <v-spacer></v-spacer>
        <!-- <v-btn  variant="outlined" color="primary"  @click="closeDialog"> Close </v-btn> -->
        <v-btn class="mr-5 mb-5" variant="elevated" v-if="button" color="primary"  @click="emits('action')"> {{button}} </v-btn>
        
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
// import { WritableComputedRef } from "vue";

let props = defineProps({
  is_open: {
    type: Boolean,
    default: false,
  },
  minWidth: {
    type: String,
    default: "70vw",
  },
  title: {
    type: String,
    default: "",
  },
  button:{
    type:String,
    default:null
  }
});

let isOpen = computed(()=>{
  return props.is_open;
 
});

const emits = defineEmits(["close", "action"]);


const closeDialog = () => {
  emits("close");
};
</script>
<style scoped lang="scss">
  .dialog-card{
    border-top: 5px solid rgb(var(--v-theme-primary)) !important;
  }
  .close-icon{
    color: rgb(var(--v-theme-primary));
    margin-top: 5px;
  }
  .close-icon:hover{
    color: rgb(var(--v-theme-primary));
  }
  
</style>
