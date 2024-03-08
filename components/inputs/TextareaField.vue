<template>
      <v-textarea
        :label="label"
        :append-inner-icon="icon"
        auto-grow
        :rows="rows"
        :row-height="height"
        shaped
        :autocomplete="autocomplete"
        @input="$emit('update:modelValue', $event.target['value'])"
        v-model="input"
        @keyup="validateInput"
        @blur="validateInput"
        :color="color"
        :variant="variant"
        :error="isError"
        :hint="hint"
        :name="name"
        :disabled="disabled"
        :counter="counter.toString()"
        :rules="rules"
        :id="id.toString()"
        >
        <template v-slot:append>
          <slot/>
          <v-tooltip v-if="tooltipMessage" style="text-align: justify;"  width="300px" location="top">
            <template v-slot:activator="{ props }">
              <v-icon size="x-small" color="accent" v-bind="props" :icon="appendIcon"></v-icon>
            </template>
            {{tooltipMessage}}
          </v-tooltip>
        </template>
        </v-textarea>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useFormValidation from "~~/composables/modules/useFormValidation";
let props = defineProps({
    disabled:{
      type:Boolean,
      default:false
    },
    id:{
      type:undefined,
      default:Date.now()
    },
    icon: {
      type: String,
      default: ""
    },
    type: {
      type:String,
      default: "text"
    },
    placeholder: {
      type:String,
      default: "Description"
    },
    label: {
      type:String,
      default: "Description"
    },
    autocomplete: {
      type:String,
      default: "off"
    },
    height: {
      type:String,
      default: "2rem"
    },
    color: {
      type:String,
      default: "accent"
    },
    variant:{
      type:undefined,
      default:"outlined"
    },
    name:{
      type:String,
      default:""
    },
    counter:{
      type:undefined,
      default:false
    },
    rules:{
      type:Object,
      default:[]
    },
    rows:{
      type:Number,
      default:3
    },
    hint:{
      type:String,
      default:''
    },
    appendIcon:{
      type:String,
      default:''
    },
    tooltipMessage:{
      type:String,
      default:''
    }
    });
    

    let input = ref("");
    let isError = ref(false);
    const { validateTextareaField, errors } = useFormValidation();
    const validateInput = () => {
      if(props.type){
         validateTextareaField(props.type, input.value);
      }
      if(errors['text']){
          isError.value = true;  
      }else{
          isError.value = false;  
      }
    };
  
</script>
<style scoped>
.field {
  margin-bottom: 1rem;
}
</style>




