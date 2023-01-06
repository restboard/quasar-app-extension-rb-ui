<template>
  <rb-resource-collection
    v-slot="props"
    v-bind="$props"
    @loaded="onLoadedItems"
  >
    <rb-select v-bind="$attrs" :options="options" :loading="props.loading" />
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
    options() {
      return this.extraOptions.concat(
        (this.items || []).map((item) => ({
          value: this.resource.getKey(item),
          label: this.resource.stringify(item),
        }))
      );
    },
  },

  methods: {
    onLoadedItems(items) {
      this.items = items || [];
    },
  },
});
</script>
