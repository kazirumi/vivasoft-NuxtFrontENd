<template>
      <v-text-field
        ref="contentRef"
        :append-inner-icon="icon"
        :height="height"
        :type="type"
        :label="label"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        @input="$emit('update:modelValue', $event.target['value'])"
        v-model="input"
        @keyup="validateInput"
        @blur="validateInput"
        :color="color"
        :variant="variant"
        :density="density"
        required
        :error="error || isError"
        :hint="hint"
        :validate="validate"
        :disabled="disabled"
        :prepend-inner-icon="prependInnerIcon"
        :clearable="clearable"
        :rules="rules"
        class="custom-field"
      >

        <template v-slot:append>
          <slot/>
          <!-- <v-tooltip v-if="tooltipMessage" style="text-align: justify;"  width="300px" location="top">
            <template v-slot:activator="{ props }">
              <v-icon size="x-small" color="accent" v-bind="props" :icon="appendIcon"></v-icon>
            </template>
            {{tooltipMessage}}
          </v-tooltip> -->
        </template>
      </v-text-field>
</template>

 <script setup lang="ts">
import { ref } from "vue";
import useFormValidation from "~~/composables/modules/useFormValidation";
let isError = ref(false);
let props = defineProps({
    density:{
     type:String,
     default:'compact'
    },
    clearable:{
       type:Boolean,
       default:false
    },
    icon: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    autocomplete: {
      type: String,
      default: "off"
    },
    height: {
      type: String,
      default: "2rem"
    },
    color: {
      type: String,
      default: "accent"
    },
    variant:{
      type:String,
      default:"outlined"
    },
    validate:{
      type:Boolean,
      default:false
    },
    disabled:{
      type:Boolean,
      default:false
    },
    error:{
      type:Boolean,
      default:false
    },
    hint:{
      type:String,
      default:""
    },
    prependInnerIcon:{
        type:String,
        default:""
    },
    rules:{
        type:Object,
        default:[]
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
  
  const contentRef=ref(0);

  defineExpose({
    contentRef
  });

    let input = ref("");
    const { validateTextField, errors } = useFormValidation();
    const validateInput = () => {
      if(props.type && props.validate){
         validateTextField(props.type, input.value);
      }
      if(props.validate && Object.keys(errors) && errors[props.type].length > 0){
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
<style>
.custom-field.v-input--horizontal .v-input__append {
    margin-inline-start: 0px !important
}
</style>




