<template>
  <rb-data-table
    class="rb-pivot-data-table"
    dense
    :class="{ 'with-row-total': withRowTotal || withTotal, 'with-col-total': withColumnTotal || withTotal}"
    :rows-per-page-options="[0]"
    :row-key="rowKey"
    :rows="rows"
    :columns="columns"
  >
    <template
      v-if="withColumnTotal || withTotal"
      #bottom-row
    >
      <q-tr>
        <q-td
          v-for="column in columns"
          :key="column.name"
          class="text-right"
        >
          {{ colTotals[column.field || column.name] }}
        </q-td>
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

    header: {
      type: String,
      default: null
    },

    rowKey: {
      type: [String, Function],
      default: 'id'
    },

    columnKey: {
      type: [String, Function],
      default: 'id'
    },

    cellKey: {
      type: [String, Function],
      default: 'id'
    },

    withRowTotal: {
      type: Boolean
    },

    withColumnTotal: {
      type: Boolean
    },

    withTotal: {
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
        const rowValue = typeof this.rowKey === 'function'
          ? this.rowKey(row)
          : row[this.rowKey]
        const colValue = typeof this.columnKey === 'function'
          ? this.columnKey(row)
          : row[this.columnKey]
        const cellValue = typeof this.cellKey === 'function'
          ? this.cellKey(row)
          : row[this.cellKey]

        const colKey = `${colValue}`
        cols.add(colKey)

        rows[rowValue] = rows[rowValue] || {}
        rows[rowValue][colKey] = (rows[rowValue][colKey] || 0) + cellValue

        if (this.withRowTotal) {
          if ('row-total' in rows[rowValue]) {
            rows[rowValue]['row-total'] += cellValue
          } else {
            rows[rowValue]['row-total'] = cellValue
          }
        } else {
          rows[rowValue]['row-total'] = ''
        }

        if (this.withColumnTotal) {
          if (colKey in colTotals) {
            colTotals[colKey] += cellValue
          } else {
            colTotals[colKey] = cellValue
          }
        } else {
          colTotals[colKey] = ''
        }

        if (this.withTotal) {
          colTotals['row-total'] = (colTotals['row-total'] || 0) + cellValue
        }
      }

      let colList = Array.from(cols)
      colList.sort()
      colList = colList.map(name => ({
        name,
        align: 'right'
      }))
      colList.unshift({
        name: this.header || `${this.rowKey} / ${this.columnKey}`,
        field: `${this.rowKey}`,
        required: true,
      })

      if (this.withRowTotal || this.withTotal) {
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

      this.rows =  rowList
      this.colTotals = colTotals
      this.columns = colList
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
