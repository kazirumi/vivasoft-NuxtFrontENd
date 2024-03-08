<template>
  <div class="field">
    <div class="ui left icon input big">
      <i class="user icon"></i>
      <v-text-field
        :append-inner-icon="icon"
        :height="height"
        :type="'date'"
        :label="label"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        @input="$emit('update:modelValue', $event.target.value)"
        v-model="input"
        @keyup="validateInput"
        @blur="validateInput"
        :color="color"
        :variant="variant"
        :density="'compact'"
        required
        :error="isError"
        :hint="errors[props.type]"
        :name="'Date'"
      ></v-text-field>
    </div>
  </div>
</template>

 <script>
import { ref } from "vue";
import useFormValidation from "~~/composables/modules/useFormValidation";
export default {
  props: {
    icon: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "Full Name"
    },
    label: {
      type: String,
      default: "Full Name"
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
      default: ""
    },
    variant:{
      type:String,
      default:"outlined"
    },
    

  },
  setup(props) {
    let input = ref("");
    let isError = ref(false);
    const { validateNameField, validateEmailField, validatePasswordField, errors } = useFormValidation();
    const validateInput = () => {
      if(props.type){
         validateNameField(props.type, input.value);

      }
      if(errors.text){
          isError.value = true;  
      }else{
          isError.value = false;  
      }
    };
    return {isError, input, props, errors, validateInput };
  },
};
</script>
<style scoped>
.field {
  margin-bottom: 1rem;
}
</style>




