<template>
  <div>
    <v-menu activator="parent">
      <template v-slot:activator="{ props }">
        <v-icon v-bind="props" icon="mdi-dots-horizontal"></v-icon>
      </template>

      <v-list>
        <v-list-item  v-for="({ name, value, icon }, index) in actions" :key="index" :value="index">
          <v-list-item-title
            v-if="value === 'edit'"
            @click="$emit('data-edit')"
            >
            <v-icon color="accentLight" size="small">mdi-pencil</v-icon> {{ name }}
            </v-list-item-title
          >
          <v-list-item-title
            v-if="value === 'delete'"
            @click="$emit('data-delete')"
            >
            <v-icon color="error" size="small">mdi-delete</v-icon>{{ name }}
            </v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script setup lang="ts">
let props = defineProps({
  actions: {
    type: Array<{ name: string; value: string; icon: string; url: string }>,
  },
});
</script>
