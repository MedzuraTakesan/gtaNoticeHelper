<template>
  <b-form-input :value="value" @change="onChangeValue"/>
</template>

<script>
import { BFormInput } from "bootstrap-vue"

export default {
  name: "namesSelect",
  components: {
    BFormInput
  },
  props: {
    value: {
      type: String,
      default: ''
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