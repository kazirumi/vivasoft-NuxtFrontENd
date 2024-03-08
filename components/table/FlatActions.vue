<template>
      <div  class="d-flex align-center">
        <template v-for="({value, name, icon}, index) in actions" :key="index">
        <v-btn-toggle divided>
          <v-btn
            @click="emits('data-edit')"
            size="small"
            v-if="value === 'edit'"
          >
            <v-tooltip :text="name" location="top">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" color="primary">{{ icon }}</v-icon>
              </template>
            </v-tooltip>
          </v-btn>
          <v-btn
            @click="emits('data-view')"
            size="small"
            v-if="value === 'view'"
          >
            <v-tooltip :text="name" location="top">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" color="primary">{{ icon }}</v-icon>
              </template>
            </v-tooltip>
          </v-btn>
          <v-btn
            size="small"
            @click="emits('data-delete')"
            v-if="value === 'delete'"
          >
            <v-tooltip :text="name" location="top">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" color="error">{{ icon }}</v-icon>
              </template>
            </v-tooltip>
          </v-btn>
        </v-btn-toggle>
        </template> 
      </div>
</template>
<script setup lang="ts">
let props = defineProps({
  actions: {
    type: Array<{ name: string; value: string; icon: string; url: string }>,
  },
});

let emits = defineEmits([
  "data-edit",
  "data-delete",
  "data-resend",
  "data-view",
]);
</script>
<style scoped lang="scss">
.action-tool-bar {
  background: transparent;
  width: 115px;
}
</style>
