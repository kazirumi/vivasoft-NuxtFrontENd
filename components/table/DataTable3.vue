<template>
  <div v-if="data && data.length > 0">
    <v-data-table flat  :density="density" :loading="loading" fixed-header  class="pa-4" :headers="headers" :items="data">
        <!-- <template v-slot:loading>
          <VSkeletonLoader type="table-row@10"></VSkeletonLoader>
        </template> -->
        <template v-slot:item.actions="{ item }">
            <template  class="d-flex align-center" v-for="({value, name, icon}, index) in actions" :key="index">
               
              <v-tooltip :text="name" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    v-if="value=='edit'"
                    size="small"
                    class="me-2"
                    color="primary"
                    @click="emits('data-edit', item.raw.id)"
                  >
                    {{ name }}
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip :text="name" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    v-if="value=='delete'"
                    size="small"
                    class="me-2"
                    color="error"
                    @click="emits('data-delete', item.raw.id)"
                  >
                  {{ name }}
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip :text="name" location="top">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    v-if="value=='view'"
                    size="small"
                    class="me-2"
                    @click="emits('data-view', item.raw.id)"
                  >
                  {{ icon }}
                  </v-btn>
                </template>
              </v-tooltip>
              <!-- <v-tooltip :text="name" location="top">
                <template v-slot:activator="{ props }">
                  <v-icon
                    v-bind="props"
                    v-if="value=='resend'"
                    size="small"
                    @click="emits('data-resend', item.raw.id)"
                  >
                  {{ icon }}
                  </v-icon>
                </template>
              </v-tooltip> -->
            </template>
        </template>
        <template #bottom></template>
    </v-data-table>
  
    <!-- <Pagination
      v-if="show_pagination"
      :pagination="pagination"
      v-model:current="page"
      @next-page="nextPage"
    /> -->
  </div>
</template>
<script setup lang="ts">
// import { VDataTable } from 'vuetify/labs/VDataTable'

import MenuActions from "./MenuActions.vue";
import FlatActions from "./FlatActions.vue";
// import { Pagination } from "#components";

let emits = defineEmits(['next-page', 'data-delete', 'data-edit', 'data-resend', 'data-view'])

let page = ref(1);

const nextPage = (page:number) =>{
   emits('next-page', page);
}

let props = defineProps({
  fixedHeader: {
    type: Boolean,
    default: false,
  },
  page: {
    type: Number,
    default:1
  },
  height: {
    type: String,
    default: "auto",
  },
  density: {
    type: String,
    default: "comfortable",
  },
  theme: {
    type: String,
    default: "light",
  },
  headers: {
    type: Object,
    default:[]
  },
  data: {
    type:Object,
    default: [] as any,
  },
  actions: {
    type: Array<any>,
    default: [],
  },
  actionType: {
    type: String,
    default: "flat",
  },
  pagination: {
    type: Object,
    default:null
  },
  show_pagination: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

let action = {
  flat: FlatActions,
  menu: MenuActions,
};

const print = (data: any, value: string): string => {
  if (Array.isArray(data[value])) {
    return data[value].join(", ");
  }
  if (/[:]/.test(value)) {
    let str = value.split(":");
    if (str && data[str[0]]) {
      return data[str[0]][str[1]];
    }
  }
  return data[value];
};
</script>
<style scoped lang="scss">
.thead-bg {
  background: rgb(var(--v-theme-accentLight));
}
.data-table {
  border-radius: 5px;
  box-shadow: 0px 2px 3px #e7e1e1;
}
tbody tr:nth-of-type(even) {
  background-color: rgba(248 250 252);
}

tbody tr:nth-of-type(odd) {
  background-color: rgb(var(--v-theme-white));
}
.YES{
  color: rgb(var(--v-theme-success));
}
.NO{
  color: rgb(var(--v-theme-error));
}
</style>
