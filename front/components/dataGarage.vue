<template>
  <b-form-select :value="value" :options="options" @change="onChangeValue"/>
</template>

<script>
export default {
  name: "dataGarage",
  data() {
    return {
      options: [
        'не указывать',
        'г.м',
        'без г.м'
      ]
    }
  },
  props: {
    value: {
      type: String,
      default: 'не указывать'
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
