<template>
     <v-select
        :label="label"
        :items="items"
        @input="$emit('update:modelValue', $event.target['value'])"
        v-model="input"
        @keyup="validateInput"
        @blur="validateInput"
        :variant="variant"
        :density="'compact'"
        :required="required"
        :error="isError"
        :hint="errors['select']"
        :validate="validate"
        item-text="text"
        item-value="value"
        :color="color"
        :rules="rules"
        >
        <template v-slot:append>
          <v-tooltip v-if="tooltipMessage" style="text-align: justify;" width="300px" location="top">
            <template v-slot:activator="{ props }">
              <v-icon size="x-small" color="accent" v-bind="props" :icon="appendIcon"></v-icon>
            </template>
            {{tooltipMessage}}
          </v-tooltip>
        </template>
        </v-select>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import useFormValidation from "~~/composables/modules/useFormValidation";
const { validateSelectField, errors } = useFormValidation();
let input = ref("")
let isError = ref(false);

const props = defineProps({
  validate:{
      type:Boolean,
      default:false
  },
  required:{
    type:String,
    default:""
  },
  items:{
   type:Array,
   default:[]
  },
  itemText:{
      type:String,
      default:""
  },
  itemValue:{
    type:String,
    default:""
  },
  color:{
   type:String,
   default:"accent"
  },
  value:{
      type:Array,
      default:[]
  },
  label:{
   type:String,
   default:"Select"
  },
    variant:{
      type:String,
      default:"outlined"
    },
    rules:{
      type:Object,
      default:[{}]
    },
    appendIcon:{
      type:String,
      default:''
    }
    ,
    tooltipMessage:{
      type:String,
      default:''
    }
});
const validateInput = () =>{
     validateSelectField("select", input.value)
}
</script>