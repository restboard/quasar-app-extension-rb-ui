<template>
  <q-popup-proxy>
    <q-card style="min-width:280px">
      <div class="row no-gutter">
        <div class="col-xs-6">
          <q-btn
            flat
            dense
            class="full-width"
            @click="resetFilters(true)"
          >
            {{ $t("Select all") }}
          </q-btn>
        </div>
        <div class="col-xs-6">
          <q-btn
            flat
            dense
            class="full-width"
            @click="resetFilters(false)"
          >
            {{ $t("Deselect all") }}
          </q-btn>
        </div>
      </div>
      <q-separator />
      <q-list dense>
        <q-item
          v-for="itemKey in filterKeys"
          :key="itemKey"
          clickable
          @click="toggleFilter(itemKey)"
        >
          <q-item-section
            side
            top
          >
            <q-checkbox
              :model-value="filters[itemKey]"
              @update:model-value="toggleFilter(itemKey)"
            />
          </q-item-section>
          <q-item-section>{{ labels[itemKey] }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-popup-proxy>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RbColumnAutoFilter',

  props: {
    rows: {
      type: Array,
      required: true
    },

    field: {
      type: String,
      required: true
    },

    value: {
      type: Object
    },

    format: {
      type: Function
    }
  },

  data () {
    return {
      filters: {},
      labels: {}
    }
  },

  computed: {
    filterKeys () {
      return Object.keys(this.filters || {})
    }
  },

  mounted () {
    this.reloadFilters()
  },

  methods: {
    reloadFilters () {
      const _filters = {}
      const _labels = {}
      for (const row of this.rows) {
        const rowKey = row[this.field]
        if (!rowKey) {
          continue
        }
        if (rowKey in this.value) {
          _filters[rowKey] = this.value[rowKey]
        } else {
          _filters[rowKey] = true
        }
        _labels[rowKey] = this.format
          ? this.format(rowKey, row)
          : (row[rowKey] || rowKey)
      }
      this.filters = _filters
      this.labels = _labels
      this.$emit('input', { ...this.filters })
    },

    resetFilters (value) {
      Object.keys(this.filters || {}).forEach(key => {
        this.filters[key] = value
      })
      this.$emit('input', { ...this.filters })
    },

    toggleFilter (key) {
      this.filters[key] = !this.filters[key]
      this.$emit('input', { ...this.filters })
    }
  },

  watch: {
    rows: function () {
      this.reloadFilters()
    },

    field: function () {
      this.reloadFilters()
    },

    format: function () {
      this.reloadFilters()
    },

    value: function () {
      this.reloadFilters()
    }
  }
})
</script>
