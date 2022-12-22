<template>
  <b-form-select :value="value" :options="options" @change="onChangeValue"/>
</template>

<script>
import { BFormSelect } from "bootstrap-vue"
export default {
  name: "namesSelect",
  components: {
    BFormSelect
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const onChangeValue = (value) => {
      console.log(value)
    }

    return {
      onChangeValue
    }
  }
}
</script>

<style scoped>

</style>