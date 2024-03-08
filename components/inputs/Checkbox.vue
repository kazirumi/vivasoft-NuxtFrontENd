<template>
    <v-checkbox
      v-model="input"
      :label="label"
      @click="$emit('update:modelValue', $event.target['value'])"
      :color="color"
      :id="id"
    >
    <template  v-slot:append>
      <v-tooltip v-if="tooltipMessage" style="text-align: justify;"  width="300px" location="top left">
        <template v-slot:activator="{ props }">
          <v-icon size="x-small" color="accent" v-bind="props" :icon="appendIcon"></v-icon>
        </template>
        {{tooltipMessage}}
      </v-tooltip>
    </template>
    </v-checkbox>
</template>
<script setup lang="ts">
  let input = ref("")
let props = defineProps({
  label:{
    type:String,
    default:"Checkbox"
  },
  color:{
    type:String,
    default:'secondary'
  },
  id:{
    type:String,
    default:""
  },
  appendIcon:{
    type:String,
    default:''
  },
  tooltipMessage:{
    type:String,
    default:''
  }
})
</script>