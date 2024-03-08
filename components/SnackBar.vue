<template>
     <v-snackbar :top="top"
      v-model="trigger"
      :timeout="timeout"
      :color="color"
      location="top"
    >
   <v-icon>{{icon}}</v-icon> {{message}}
     </v-snackbar>
</template>
<script setup lang="ts">

let props = defineProps({
    message:{
        type:String,
        default:""
    },
    trigger:{
        type:Boolean,
        default:false
    },
    timeout:{
        type:Number,
        default:2000
    },
    color:{
        type:String,
        default:"success"
    },
    top:{
        type:Boolean,
        default:false
    },
    icon:{
        type:String,
        default:"mdi-check"
    }

})

</script>