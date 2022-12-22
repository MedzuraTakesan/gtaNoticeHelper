<template>
  <b-form-select :value="value" :options="options" @change="onChangeValue"/>
</template>

<script>
export default {
  name: "dataSettings",
  data() {
    return {
      options: [
        'не указывать',
        'ET',
        'FT',
        'DT'
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
