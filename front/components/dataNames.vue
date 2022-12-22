<template>
  <b-form-select :value="value" :options="options" @change="onChangeValue"/>
</template>

<script>
export default {
  name: "namesSelect",
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
  methods: {
    onChangeValue(value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style scoped>

</style>
