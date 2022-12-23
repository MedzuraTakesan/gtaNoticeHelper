<template>
  <b-col cols="4">
    <b-row v-if="process === 'exchange'">
      <b-col>
        <span>Тип</span>
        <data-names
          :value="value.type"
          :options="mainTypes"
          @change="onChangeType"
        />
      </b-col>
    </b-row>
    <transpalie-name :value="value.type"/>
    <component
      v-if="value.type !== 'flats'"
      :is="components"
      :value="value.value"
      :options="value.options"
      @change="onChangeValue"
    />
    <span v-if="value.type === 'price' && process === 'sell'">Пустое поле: Цена договорная</span>
    <span v-if="value.type === 'price' && process === 'buy'">
      0 - Цена договорная
      <br/>
      Пустое поле: Бюджет свободный
    </span>
    <b-row v-if="isVisibleMachineSettings">
      <b-col>
        <span>Настройки транспорта</span>
        <data-settings
          :value="value.machineSettings"
          @change="onChangeMachineSettings"
        />
      </b-col>
    </b-row>
    <b-row v-if="isVisibleGarages">
      <b-col>
        <span>Настройки Гаража</span>
        <data-garage
          :value="value.garageSettings"
          @change="onChangeGarageSettings"
        />
        <span>Настройки номера</span>
        <data-input
          :value="value.number"
          @change="onChangeNumber"
        />
        <span>
          Пустое поле - без номера
        </span>
        <template v-if="isVisibleGarageCounts">
          <span>
            <br/>
            Кол-во гаражей
          </span>
          <data-input
            :value="value.garageCounts"
            @change="onChangeGarageCounts"
          />
        </template>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { kind, kindOfTransportWithSettings, homes } from "~/constants/types";
import dataNames from "./dataNames.vue";
import dataInput from "./dataInput.vue";
import dataTypes from "./dataTypes.vue";
import dataSettings from "./dataSettings.vue";
import transpalieName from "./transpalieName.vue";

const initialType = Object.keys(kind)[0]

export default {
  name: "dataMoney",
  props: {
    process: {
      type: String,
      default: ''
    }
  },
  data() {
    const mainTypes = Object.keys(kind).filter((name) => name !== 'price')
    const type = this.process === 'exchange' ? initialType : 'price'
    const value = this.process === 'exchange' ? kind[initialType][0] : ''
    return {
      types: Object.keys(kind),
      mainTypes,
      value: {
        type,
        value,
        machineSettings: 'не указывать',
        garageSettings: 'не указывать',
        garageCounts: '0',
        number: '',
        options: kind[initialType],
      }
    }
  },
  components: {
    dataInput,
    dataTypes,
    dataSettings,
    transpalieName,
    dataNames
  },
  computed: {
    components () {
      return this.process === 'exchange' ? dataNames : dataInput
    },
    isVisibleMachineSettings () {
      return kindOfTransportWithSettings.includes(this.value.type)
    },
    isVisibleGarages () {
      return homes.includes(this.value.type)
    },
    isVisibleGarageCounts () {
      return homes.includes(this.value.type) && this.value.garageSettings === 'г.м'
    }
  },
  watch: {
    process () {
      if (this.process === 'exchange') {
        this.value.type = initialType
        this.value.value = kind[initialType][0]
        this.value.options = kind[initialType]

        return
      }

      this.value.type = 'price'
      this.value.value = ''
      this.value.options = kind[initialType]
    },
    value () {
      this.$emit('change', this.value)
    }
  },
  created() {
    this.$nextTick(() => {
      this.$emit('change', this.value)
    })
  },
  methods: {
    onChangeValue (value) {
      this.value.value = value
    },
    onChangeMachineSettings (value) {
      this.value.machineSettings = value
    },
    onChangeGarageSettings (value) {
      this.value.garageSettings = value
    },
    onChangeNumber (value) {
      this.value.number = value
    },
    onChangeGarageCounts (value) {
      this.value.garageCounts = value
    },
    onChangeType (value) {
      this.value.type = value
      this.value.value = kind[value][0]
      this.value.options = kind[value]
    }
  }
}
</script>

<style scoped>

</style>
