<template>
  <b-row>
    <span>Причина</span>
    <b-form-select :value="type" :options="types.causes" @change="onChangeType"/>
    <span>Почему</span>
    <b-form-select :value="variable" :options="currentVariables" @="onChangeVariable"/>
    <template v-if="visibleName">
      <span>Инициалы</span>
      <data-input :value="name" @change="onChangeName"/>
    </template>
    <span>Действие</span>
    <b-form-select :value="answer" :options="currentAnswers" @change="onChangeAnswer"/>
  </b-row>
</template>

<script>
import { types } from "@/constants/peoples";
import { compileBus } from "@/constants/buses";

export default {
  name: "dataPeople",
  data () {
    const initialType = types.causes[0]
    return {
      type: initialType,
      variable: types.variables[initialType][0],
      answer: types.answers[initialType][0],
      name: '',
      types: types
    }
  },
  computed: {
    currentVariables () {
      return types.variables[this.type]
    },
    currentAnswers () {
      return types.answers[this.type]
    },
    visibleName () {
      return this.type === 'Поиск людей'
    }
  },
  created() {
    compileBus.$on('get-compile', this.getValues)
  },
  beforeDestroy() {
    compileBus.$off('get-compile', this.getValues)
  },
  methods: {
    onChangeType (value) {
      this.type = value
      this.variable = types.variables[this.type][0]
      this.answer = types.answers[this.type][0]
    },
    onChangeVariable (variable) {
      this.variable = variable
    },
    onChangeName (name) {
      this.name = name
    },
    onChangeAnswer (answer) {
      this.answer = answer
    },
    getValues () {
      compileBus.$emit('send-compile', {
        type: this.type,
        variable: this.variable,
        name: this.name,
        answer: this.answer
      })
    }
  }
}
</script>

<style scoped>

</style>
