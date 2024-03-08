<template>
  <div class="field">
    <div class="ui left icon input big">
      <i class="lock icon"></i>
      <v-text-field
        append-inner-icon="mdi-lock-outline"
        type="password"
        placeholder="Password"
        autocomplete="off"
        v-model="input"
        @input="$emit('update:modelValue', $event.target.value)"
        @keyup="validateInput"
        @blur="validateInput"
      />
    </div>
    <div class="text-error" v-if="errors.password">
      {{ errors.password }}
    </div>
  </div>
</template>

 <script setup lang="ts">
import { ref } from "vue";
import useFormValidation from "~~/composables/modules/useFormValidation";
    let input = ref("");
    const { validatePasswordField, errors } = useFormValidation();
    const validateInput = () => {
      validatePasswordField("password", input.value);
    };
</script>