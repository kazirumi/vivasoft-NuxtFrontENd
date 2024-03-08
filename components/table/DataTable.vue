<template>
  <v-card>
    <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items-length="totalItems"
    :items="desserts"
    :loading="loading"
    class="elevation-1"
    item-title="name"
    item-value="name"
    @update:options="loadItems"
  ></v-data-table-server>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps({
  headers: {
    type: Object,
  },
  desserts: {
    type: Object,
  }
});
</script>
