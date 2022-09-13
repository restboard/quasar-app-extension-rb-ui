<template>
  <q-select
    use-input
    :options="options"
    :loading="loading"
    @filter="onFilter"
  />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "RbSelect",

  props: {
    items: {
      type: Array,
      default: () => [],
    },

    loading: {
      type: Boolean,
    },

    valueKey: {
      type: String,
      default: "id",
    },

    labelKey: {
      type: String,
      default: "name",
    },
  },

  data() {
    return {
      query: "",
    };
  },

  computed: {
    options() {
      return (this.items || [])
        .map((item) => ({
          value: item[this.valueKey],
          label: item[this.labelKey],
        }))
        .filter(
          (item) =>
            !this.query || item.label.toLowerCase().indexOf(this.query) > -1
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
