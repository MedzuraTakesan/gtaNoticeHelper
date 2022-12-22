<template>
  <b-row>
    <data-money process="exchange" @change="onChangeFirstValue"/>
    <b-col cols="2">
      <span>Вид сделки</span>
      <data-types :value="process" :options="processes" @change="onChangeProcess"/>
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
    getValues () {
      compileBus.$emit('send-compile', {
        process: this.process,
        firstValue: this.firstValue,
        secondValue: this.secondValue
      })
    }
  }
}
</script>

<style scoped>

</style>
