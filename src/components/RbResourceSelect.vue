<template>
  <rb-resource-collection
    v-bind="$props"
    v-slot="props"
  >
    <rb-select
      v-bind="$attrs"
      :items="extraOptions.concat(props.items)"
      :loading="props.loading"
      :label-key="$attrs.labelKey || resource.displayAttr || resource.key"
      :value-key="$attrs.valueKey || resource.key"
    />
  </rb-resource-collection>
</template>

<script>
import { defineComponent } from 'vue'
import RbResourceCollection from './RbResourceCollection.vue'
import RbSelect from './RbSelect.vue'

export default defineComponent({
  name: 'RbResourceSelect',

  components: {
    RbResourceCollection,
    RbSelect
  },

  props: {
    resource: {
      type: Object,
      required: true
    },

    filters: {
      type: Object
    },

    offset: {
      type: Number,
      default: 0
    },

    limit: {
      type: Number
    },

    paginated: {
      type: Boolean
    },

    extraOptions: {
      type: Array,
      default: () => []
    }
  }
})
</script>
