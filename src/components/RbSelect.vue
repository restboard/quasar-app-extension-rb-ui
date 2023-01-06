<template>
  <q-select
    use-input
    :options="filteredOptions"
    :loading="loading"
    @filter="onFilter"
  />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "RbSelect",

  props: {
    loading: {
      type: Boolean,
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
      return (this.$attrs.options || []).filter((item) =>
        this.searchFn(item, this.query)
      );
    },
  },

  methods: {
    onFilter(val, update) {
      const needle = (val || "").toLowerCase();
      update(() => {
        this.query = needle;
      });
    },
  },
});
</script>
