<template>
  <span>{{ transpileValue }}</span>
</template>

<script>
export default {
  name: "transpalieName",
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    transpileValue () {
      if (this.value === 'price') {
        return 'Цена'
      }

      if (this.value === 'machines') {
        return 'Модель машины'
      }

      if (this.value === 'homes') {
        return 'Район'
      }

      return  ''
    }
  }
}
</script>

<style scoped>

</style>
