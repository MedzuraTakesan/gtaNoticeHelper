<template>
  <b-container>
    <b-row>
      <data-form />
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
import { compileBus } from "~/constants/buses";
import {start} from "~/helpers/compile";

export default {
  name: 'IndexPage',
  data () {
    return {
      phrase: ''
    }
  },
  components: {
    dataForm
  },
  created() {
    compileBus.$on('send-compile', this.compile)
  },
  beforeDestroy() {
    compileBus.$off('send-compile', this.compile)
  },
  methods: {
    getCompile() {
      compileBus.$emit('get-compile')
    },
    compile(value) {
      this.phrase = start(value)
    }
  }
}
</script>
