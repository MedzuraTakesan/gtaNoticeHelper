<template>
  <b-form-input :value="value" @change="onChangeValue"/>
</template>

<script>
export default {
  name: "dataInput",
  props: {
    value: {
      type: String,
      default: ''
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
