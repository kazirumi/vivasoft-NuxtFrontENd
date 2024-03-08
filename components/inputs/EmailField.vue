<template>
  <div class="field">
    <div class="ui left icon input big">
      <i class="mail icon"></i>

      <v-text-field
        append-inner-icon="mdi-email-outline"
        type="email"
        placeholder="Email"
        autocomplete="off"
        @input="$emit('update:modelValue', $event.target.value)"
        v-model="input"
        @keyup="validateInput"
        @blur="validateInput"
      />
    </div>
    <div class="text-error" v-if="errors.email">
      {{ errors.email }}
    </div>
  </div>
</template>

 <script>
import { ref } from "vue";
//import useFormValidation from "@/modules/useFormValidation";
import useFormValidation from "~~/composables/modules/useFormValidation";
export default {
  setup() {
    let input = ref("");
    const { validateEmailField, errors } = useFormValidation();
    const validateInput = () => {
      validateEmailField("email", input.value);
    };
    return { input, errors, validateInput };
  },
};
</script>
