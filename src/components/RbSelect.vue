<template>
  <q-select
    :options="options"
    :loading="loading"
  />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RbSelect',

  props: {
    items: {
      type: Array
    },

    loading: {
      type: Boolean
    },

    valueKey: {
      type: String,
      default: 'id'
    },

    labelKey: {
      type: String,
      default: 'name'
    }
  },

  computed: {
    options () {
      return (this.items || []).map(item => ({
        value: item[this.valueKey],
        label: item[this.labelKey]
      }))
    }
  }
})
</script>
