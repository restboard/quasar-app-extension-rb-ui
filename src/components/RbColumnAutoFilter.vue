<template>
  <q-popup-proxy>
    <q-card style="min-width: 280px">
      <div class="row no-gutter">
        <div class="col">
          <q-btn flat dense class="full-width" @click="resetFilters(true)">
            {{ $t("Select all") }}
          </q-btn>
        </div>
        <div class="col">
          <q-btn flat dense class="full-width" @click="resetFilters(false)">
            {{ $t("Deselect all") }}
          </q-btn>
        </div>
      </div>
      <q-separator />
      <q-virtual-scroll
        v-slot="{ item }"
        style="max-height: 350px"
        :items="filterKeys"
        separator
      >
        <q-item :key="item" clickable dense @click="toggleFilter(item)">
          <q-item-section side top>
            <q-checkbox
              :model-value="filters[item]"
              @update:model-value="toggleFilter(item)"
            />
          </q-item-section>
          <q-item-section>{{ labels[item] }}</q-item-section>
        </q-item>
      </q-virtual-scroll>
    </q-card>
  </q-popup-proxy>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "RbColumnAutoFilter",

  props: {
    rows: {
      type: Array,
      required: true,
    },

    field: {
      type: String,
      required: true,
    },

    modelValue: {
      type: Object,
      default: null,
    },

    format: {
      type: Function,
      default: null,
    },
  },

  emits: ["update:modelValue"],

  data() {
    return {
      filters: {},
      labels: {},
    };
  },

  computed: {
    filterKeys() {
      return Object.keys(this.filters || {});
    },
  },

  watch: {
    rows: function () {
      this.reloadFilters();
    },

    field: function () {
      this.reloadFilters();
    },

    format: function () {
      this.reloadFilters();
    },

    modelValue: function () {
      this.reloadFilters();
    },
  },

  mounted() {
    this.reloadFilters();
  },

  methods: {
    reloadFilters() {
      const _filters = {};
      const _labels = {};
      if (Array.isArray(this.rows)) {
        for (const row of this.rows) {
          const rowKey = row[this.field];
          if (!rowKey) {
            continue;
          }
          if (rowKey in this.modelValue) {
            _filters[rowKey] = this.modelValue[rowKey];
          } else {
            _filters[rowKey] = true;
          }
          _labels[rowKey] = this.format
            ? this.format(rowKey, row)
            : row[rowKey] || rowKey;
        }
      }
      this.filters = _filters;
      this.labels = _labels;
      this.$emit("update:modelValue", { ...this.filters });
    },

    resetFilters(value) {
      Object.keys(this.filters || {}).forEach((key) => {
        this.filters[key] = value;
      });
      this.$emit("update:modelValue", { ...this.filters });
    },

    toggleFilter(key) {
      this.filters[key] = !this.filters[key];
      this.$emit("update:modelValue", { ...this.filters });
    },
  },
});
</script>
