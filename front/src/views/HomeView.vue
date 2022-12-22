<template>
  <div>
    <b-container>
      <data-form/>
    </b-container>
  </div>
</template>

<script>
import {ref} from "vue";
import DataForm from "../components/dataForm.vue";

export default {
  components: { DataForm} ,
  setup() {
    const key = ref(1)

    const onChangeKey = () => {
      key.value = key.value + 1
    }

    return {
      key,
      onChangeKey
    }
  }
}
</script>