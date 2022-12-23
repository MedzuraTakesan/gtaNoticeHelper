<template>
  <b-container>
    <b-row>
      <b-nav tabs>
        <b-nav-item
          :active="currentTab === 'market'"
          @click="changeTab('market')"
        >
          Маркет
        </b-nav-item>
        <b-nav-item
          :active="currentTab === 'people'"
          @click="changeTab('people')"
        >
          Знакомства/поиск
        </b-nav-item>
      </b-nav>
    </b-row>
    <b-row>
      <component :is="tab"/>
    </b-row>
    <b-row>
        <b-col>
          <span>{{phrase}}</span>
        </b-col>
        <b-col>
          <b-button @click="getCompile"> Скомпилировать фразу </b-button>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
import dataForm from "~/components/dataForm";
import dataPeople from "~/components/dataPeople";
import { compileBus } from "~/constants/buses";
import {start} from "~/helpers/compile";

export default {
  name: 'IndexPage',
  data () {
    return {
      phrase: '',
      currentTab: 'market'
    }
  },
  components: {
    dataForm,
    dataPeople
  },
  created() {
    compileBus.$on('send-compile', this.compile)
  },
  beforeDestroy() {
    compileBus.$off('send-compile', this.compile)
  },
  computed: {
    tab () {
      if (this.currentTab === 'people') {
        return dataPeople
      }

      return dataForm
    }
  },
  methods: {
    getCompile() {
      compileBus.$emit('get-compile')
    },
    compile(value) {
      this.phrase = start(value, this.currentTab)
    },
    changeTab(value) {
      this.currentTab = value
    }
  }
}
</script>
