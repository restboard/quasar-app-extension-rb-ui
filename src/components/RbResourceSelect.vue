<template>
  <rb-resource-collection
    v-slot="props"
    :resource="resource"
    :filters="filters"
    :offset="offset"
    :limit="limit"
    v-bind="$attrs"
    @loaded="onLoadedItems"
  >
    <rb-select v-bind="$attrs" :options="options" :loading="props.loading" />
  </rb-resource-collection>
</template>

<script>
import RbResourceCollection from "../components/RbResourceCollection.vue";
import RbSelect from "../components/RbSelect.vue";

/**
 * A select input populated by resource instances
 */
export default {
  name: "RbResourceSelect",

  components: {
    RbResourceCollection,
    RbSelect,
  },

  props: {
    /**
     * The resource to populate options from
     */
    resource: {
      type: Object,
      required: true,
    },

    /**
     * A list of extra options to prepend to the fetched ones
     */
    extraOptions: {
      type: Array,
      default: () => [],
    },

    /**
     * A flag to indicate if original resource items should be kept in options
     */
    keepItems: {
      type: Boolean,
      default: false,
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
        (this.items || []).map((item) => {
          const opt = {
            value: this.resource.getKey(item),
            label: this.resource.stringify(item),
          };
          if (this.keepItems) {
            opt.item = item;
          }
          return opt;
        })
      );
    },
  },

  methods: {
    onLoadedItems(items) {
      this.items = items || [];
    },
  },
};
</script>
