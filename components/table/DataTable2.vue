<template>
  <div v-if="data && data.length > 0">
    <v-table
      :theme="theme"
      :fixed-header="fixedHeader"
      :density="density"
      :height="height"
      class="data-table"
    >
      <thead class="thead-bg">
        <tr>
          <th
            v-for="({ text }, index) in headers"
            :key="index"
            class="text-left"
          >
            {{ text }}
          </th>
          <th v-if="actions.length > 0">Actions</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, index) in data" :key="index">
          <tr>
            <td v-for="({ value }, index) in headers" :key="index" :class="`${print(item, value)} `">
              {{ print(item, value) }}
            </td>
            <td v-if="actions.length > 0">
              <component
                :is="action[actionType]"
                @data-delete="emits('data-delete', item['id'])"
                @data-edit="emits('data-edit', item['id'])"
                @data-resend="emits('data-resend', item['id'])"
                @data-view="emits('data-view', item['id'])"
                :actions="actions"
                :data="item"
              ></component>
            </td>
          </tr>
        </template>
      </tbody>
      <slot/>
    </v-table>
    <Pagination
      v-if="show_pagination"
      :pagination="pagination"
      v-model:current="page"
      @next-page="nextPage"
    />
  </div>
</template>
<script setup lang="ts">
import MenuActions from "./MenuActions.vue";
import FlatActions from "./FlatActions.vue";
import { Pagination } from "#components";

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
  },
  data: {
    type:Object,
    default: [],
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
