<template>
  <q-select
    use-input
    :options="filteredOptions"
    :loading="loading"
    @filter="onFilter"
  />
</template>

<script>
/**
 * A select input with filter-on-type support
 */
export default {
  name: "RbSelect",

  props: {
    /**
     * If set to true, the input will show a loading indicator
     */
    loading: {
      type: Boolean,
      default: false,
    },

    /**
     * The list of options to display
     */
    options: {
      type: Array,
      default: () => [],
    },

    /**
     * A function to filter the list of available options
     */
    filterFn: {
      type: Function,
      default: (item, query) =>
        !query || item.label.toLowerCase().indexOf(query) > -1,
    },
  },

  data() {
    return {
      query: "",
    };
  },

  computed: {
    filteredOptions() {
      return (this.options || []).filter((item) =>
        this.filterFn(item, this.query)
      );
    },
  },

  methods: {
    onFilter(val, update) {
      update(() => {
        this.query = (val || "").toLowerCase();
      });
    },
  },
};
</script>
