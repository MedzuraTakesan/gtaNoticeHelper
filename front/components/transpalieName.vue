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

      if (['machines', 'chinese machines'].includes(this.value)) {
        return 'Модель машины'
      }

      if (this.value === 'water transport') {
        return 'Модель транспорта'
      }

      if (this.value === 'homes') {
        return 'Район'
      }

      if (['bikes', 'chinese bikes'].includes(this.value)) {
        return 'Модель байки'
      }

      return  ''
    }
  }
}
</script>

<style scoped>

</style>
