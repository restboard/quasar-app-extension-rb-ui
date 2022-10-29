<template>
  <rb-resource-collection
    v-slot="props"
    v-bind="$props"
    @loaded="onLoadedItems"
  >
    <rb-select
      v-bind="$attrs"
      :items="options"
      :loading="props.loading"
      :label-key="labelKey"
      :value-key="valueKey"
    />
  </rb-resource-collection>
</template>

<script>
import { defineComponent } from "vue";
import RbResourceCollection from "./RbResourceCollection.vue";
import RbSelect from "./RbSelect.vue";

export default defineComponent({
  name: "RbResourceSelect",

  components: {
    RbResourceCollection,
    RbSelect,
  },

  props: {
    resource: {
      type: Object,
      required: true,
    },

    filters: {
      type: Object,
      default: null,
    },

    offset: {
      type: Number,
      default: 0,
    },

    limit: {
      type: Number,
      default: null,
    },

    paginated: {
      type: Boolean,
    },

    extraOptions: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      items: [],
    };
  },

  computed: {
    labelKey() {
      return (
        this.$attrs.labelKey || this.resource.displayAttr || this.resource.key
      );
    },

    valueKey() {
      return this.$attrs.valueKey || this.resource.key;
    },

    options() {
      return this.extraOptions.concat(
        this.items.map((item) => ({
          [this.valueKey]: item[this.valueKey],
          [this.labelKey]: this.resource.stringify(item),
        }))
      );
    },
  },

  methods: {
    onLoadedItems(items) {
      this.items = items;
    },
  },
});
</script>
