<template>
  <b-row>
    <data-money process="exchange" @change="onChangeFirstValue"/>
    <b-col cols="2">
      <span>Вид сделки</span>
      <data-types :value="process" :options="processes" @change="onChangeProcess"/>
      <template v-if="process === 'exchange'">
        <span>Доплата</span>
        <data-input
          :value="additionalPayment"
          @change="onChangeAdditionalPayment"
        />
        <span>
          Пустое поле - без доплаты
          <br/>
          0 - Доплата: договорная
        </span>
      </template>
      <template v-if="process === 'sell'">
        <b-form-checkbox v-model="bargain" size="lg">
          <span>Торг</span>
        </b-form-checkbox>
      </template>
    </b-col>
    <data-money :process="process" @change="onChangeSecondValue"/>
  </b-row>
</template>

<script>
import { process } from "~/constants/types";
import { compileBus } from "~/constants/buses";

export default {
  name: "dataForm",
  data() {
    return {
      process: process[0],
      additionalPayment: '',
      bargain: false,
      firstValue: {},
      secondValue: {},
      processes: process
    }
  },
  created() {
    compileBus.$on('get-compile', this.getValues)
  },
  beforeDestroy() {
    compileBus.$off('get-compile', this.getValues)
  },
  methods: {
    onChangeProcess (value) {
      this.process = value
    },
    onChangeFirstValue (value) {
      this.firstValue = value
    },
    onChangeSecondValue (value) {
      this.secondValue = value
    },
    onChangeAdditionalPayment (value) {
      this.additionalPayment = value
    },
    getValues () {
      compileBus.$emit('send-compile', {
        process: this.process,
        bargain: this.bargain,
        additionalPayment: this.additionalPayment,
        firstValue: this.firstValue,
        secondValue: this.secondValue
      })
    }
  }
}
</script>

<style scoped>

</style>
