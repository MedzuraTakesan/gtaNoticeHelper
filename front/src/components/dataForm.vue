<template>
  <b-row>
    <b-col>
      <component
          :is="components.main"
          :value="value.value"
          :options="value.options"
      />
    </b-col>
    <b-col>
      <component
          :is="components.exchange"
          :value="value.exchangeValue"
          :options="value.exchangeOptions"
      />
    </b-col>
  </b-row>
</template>

<script>
import { kind, process } from "../constants/types";
import { ref, watch, computed} from "vue";
import { BRow, BCol } from "bootstrap-vue"
import dataSelect from "./dataSelect.vue";
import dataPrice from "./dataPrice.vue";

export default {
  name: "dataForm",
  components: {
    dataPrice,
    dataSelect,
    BCol,
    BRow
  },
  setup () {
    const initialType = Object.keys(kind)[0]
    const isExchange = ref(false)
    const value = ref({
      process: process[0],
      type: initialType,
      exchangeType: 'price',
      value: kind[initialType][0],
      options: kind[initialType],
      exchangeValue: '',
      exchangeOptions: kind[initialType]
    })

    const onExchangeUpdate = () => {
      if (isExchange) {
        value.value.exchangeType = initialType
        value.value.exchangeValue = kind[initialType][0]
      }

      value.value.exchangeType = 'price'
      value.value.exchangeValue = ''
    }

    watch(isExchange, onExchangeUpdate)

    const components = computed(() => {
      return {
        main: value.value.type === 'price' ? dataPrice : dataSelect,
        exchange: value.value.exchangeType === 'price' ? dataPrice : dataSelect
      }
    })



    return {
      isExchange,
      value,
      components
    }
  }
}
</script>

<style scoped>

</style>