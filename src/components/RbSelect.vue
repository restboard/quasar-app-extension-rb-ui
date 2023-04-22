<template>
  <q-select
    use-input
    :options="filteredOptions"
    :loading="loading"
    @filter="onFilter"
  />
</template>

<script>
export default {
  name: "RbSelect",

  props: {
    loading: {
      type: Boolean,
    },

    options: {
      type: Array,
      default: () => [],
    },

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
