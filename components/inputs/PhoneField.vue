<template>
  <div class="field">
    <div class="ui left icon input big">
      <i class="phone icon"></i>
      <v-text-field
        append-inner-icon="mdi-phone-outline"
        type="number"
        placeholder="Phone"
        autocomplete="off"
        v-model="input"
        @input="$emit('update:modelValue', $event.target.value)"
        @keyup="validateInput"
        @blur="validateInput"
      />
    </div>
    <div class="text-error" v-if="errors.phone">
      {{ errors.phone }}
    </div>
  </div>
</template>

 <script>
import { ref, toRefs } from "vue";
import useFormValidation from "~~/composables/modules/useFormValidation";
export default {
  setup(props) {
    let input = ref("");
    const textField = toRefs(props);
    const { validatePhoneField, errors } = useFormValidation();
    const validateInput = () => {
      validatePhoneField("phone", input.value);
    };
    return { input, errors, validateInput, textField };
  },
};
</script>
