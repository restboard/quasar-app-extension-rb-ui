<template>
  <rb-data-table
    class="rb-pivot-data-table"
    dense
    :class="{ 'with-row-total': withRowTotal, 'with-col-total': withColumnTotal}"
    :rows-per-page-options="[0]"
    :row-key="rowKey"
    :rows="rows"
    :columns="columns"
  >
    <template
      v-if="withColumnTotal"
      #bottom-row
    >
      <q-tr>
        <q-th
          v-for="column in columns"
          :key="column.name"
        >
          {{ colTotals[column.field || column.name] }}
        </q-th>
      </q-tr>
    </template>
  </rb-data-table>
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
    },

    withRowTotal: {
      type: Boolean
    },

    withColumnTotal: {
      type: Boolean
    }
  },

  mounted () {
    this.reloadColumnsAndRows()
  },

  data () {
    return {
      columns: [],
      rows: [],
      colTotals: {}
    }
  },

  methods: {
    reloadColumnsAndRows () {
      const rows = {}
      const cols = new Set()

      const colTotals = {}

      for (const row of this.modelValue) {
        const rowValue = row[this.rowKey]
        const colValue = row[this.columnKey]
        cols.add(JSON.stringify({
          name: `${colValue}`
        }))
        if (!(rowValue in rows)) {
          rows[rowValue] = {}
        }
        const colKey = `${colValue}`
        const cellValue = row[this.cellKey]
        rows[rowValue][colKey] = cellValue
        if (this.withRowTotal) {
          if ('row-total' in rows[rowValue]) {
            rows[rowValue]['row-total'] += cellValue
          } else {
            rows[rowValue]['row-total'] = cellValue
          }
        }
        if (this.withColumnTotal) {
          if (colKey in colTotals) {
            this.colTotals[colKey] += cellValue
          } else {
            this.colTotals[colKey] = cellValue
          }
        }
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

      if (this.withRowTotal) {
        colList.push({
          name: 'total',
          align: 'right',
          field: 'row-total',
        })
      }

      const rowList = Array.from(Object.keys(rows).map(rowKey => ({
        [this.rowKey]: rowKey,
        ...rows[rowKey]
      })))

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
  height: 100%
  max-height: 80vh

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th,
  tbody tr td:first-child
    background-color: #fff

  thead tr:first-child th,
  tbody tr td:first-child
    position: sticky
    z-index: 1

  thead tr:first-child th,
  tbody tr td:first-child
    top: 0

  thead tr:first-child th:first-child,
  tbody tr td:first-child
    left: 0

  tbody tr td:first-child
    z-index: 2

  thead tr:first-child th:first-child
    z-index: 3

.rb-pivot-data-table.with-row-total
  thead tr:first-child th:last-child,
  tbody tr td:last-child
    background-color: #fff
    position: sticky
    right: 0

  thead tr:first-child th:last-child
    z-index: 3

  tbody tr td:last-child
    z-index: 2

.rb-pivot-data-table.with-col-total
  tbody tr:last-child th
    background-color: #fff
    position: sticky
    z-index: 1
    bottom: 0

  tbody tr:last-child th:first-child
    z-index: 2
</style>
