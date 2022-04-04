<template>
  <rb-data-table
    class="rb-pivot-data-table"
    :row-key="rowKey"
    :rows="rows"
    :columns="columns"
  />
</template>

<script>
import { defineComponent } from 'vue'
import RbDataTable from '../components/RbDataTable.vue'

export default defineComponent({
  name: 'RbPivotDataTable',

  components: {
    RbDataTable
  },

  props: {
    modelValue: {
      type: Array,
      default: () => []
    },

    rowKey: {
      type: String,
      default: 'id'
    },

    columnKey: {
      type: String,
      default: 'id'
    },

    cellKey: {
      type: String,
      default: 'id'
    }
  },

  mounted () {
    this.reloadColumnsAndRows()
  },

  data () {
    return {
      columns: [],
      rows: []
    }
  },

  methods: {
    reloadColumnsAndRows () {
      const rows = {}
      const cols = new Set()

      for (const row of this.modelValue) {
        const rowValue = row[this.rowKey]
        const colValue = row[this.columnKey]
        cols.add(JSON.stringify({
          name: `${colValue}`
        }))
        if (!(rowValue in rows)) {
          rows[rowValue] = []
        }
        rows[rowValue][`${colValue}`] = row[this.cellKey]
      }

      const colList = Array.from(cols).map(JSON.parse)
      colList.sort(function (a, b) {
        return (a.name || '') - (b.name || '');
      })
      colList.unshift({
        name: `${this.rowKey} / ${this.columnKey}`,
        field: `${this.rowKey}`,
        required: true,
      })
      const rowList = Array.from(Object.keys(rows).map(rowKey => ({
        [this.rowKey]: rowKey,
        ...rows[rowKey]
      })))

      console.log(colList)
      console.log(rowList)

      this.columns = colList
      this.rows = rowList
    }
  },

  watch: {
    modelValue () {
      this.reloadColumnsAndRows()
    }
  }
})
</script>

<style lang="sass">
.rb-pivot-data-table
  th:first-child,
  td:first-child
    background-color: #fff
    position: sticky
    left: 0
    z-index: 1
</style>
