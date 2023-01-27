<template>
  <rb-data-table
    dense
    class="rb-pivot-data-table"
    :class="{
      'with-row-total': withRowTotal || withTotal,
      'with-col-total': withColumnTotal || withTotal,
    }"
    :rows-per-page-options="[0]"
    :row-key="rowKey"
    :rows="rows"
    :columns="columns"
  >
    <template #header-cell="props">
      <th v-bind="props.col">
        {{ props.col.label }}
        <div
          v-if="
            cellKeys.length > 1 &&
            props.col.name !== rowKey &&
            props.col.field !== rowKey
          "
          class="row"
        >
          <div v-for="key in cellKeys" :key="key" class="col">
            {{ key }}
          </div>
        </div>
      </th>
    </template>

    <template #body-cell="props">
      <td v-bind="props.col">
        <slot
          v-if="props.col.field !== rowKey && props.col.name !== rowKey"
          name="body-cell-cellKey"
          v-bind="props"
        >
          <div v-if="props.row[props.col.field || props.col.name]" class="row">
            <div
              v-for="key in Object.keys(
                props.row[props.col.field || props.col.name]
              )"
              :key="key"
              class="col"
            >
              <slot :name="`body-cell-cellKey-${key}`" v-bind="props">
                {{
                  formatFn(props.row[props.col.field || props.col.name][key])
                }}
              </slot>
            </div>
          </div>
        </slot>
        <slot v-else name="body-cell-rowKey" v-bind="props">
          {{ props.row[props.col.field || props.col.name] }}
        </slot>
      </td>
    </template>

    <template v-if="withColumnTotal || withTotal" #bottom-row="props">
      <q-tr :props="props">
        <q-td v-for="column in columns" :key="column.name" class="text-right">
          <div v-if="colTotals[column.field || column.name]" class="row">
            <div
              v-for="key in Object.keys(colTotals[column.field || column.name])"
              :key="key"
              class="col"
            >
              {{ formatFn(colTotals[column.field || column.name][key]) }}
            </div>
          </div>
        </q-td>
      </q-tr>
    </template>
  </rb-data-table>
</template>

<script>
import RbDataTable from "../components/RbDataTable.vue";

export default {
  name: "RbPivotDataTable",

  components: {
    RbDataTable,
  },

  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },

    accumulate: {
      type: Boolean,
      default: false,
    },

    header: {
      type: String,
      default: "",
    },

    rowKey: {
      type: [String, Function],
      default: "id",
    },

    columnKey: {
      type: [String, Function],
      default: "id",
    },

    cellKey: {
      type: [String, Function, Array],
      default: "id",
    },

    sortColumnsFn: {
      type: Function,
      default: null,
    },

    sumRowTotalFn: {
      type: Function,
      default: (val, total) => Number(total || 0) + Number(val || 0),
    },

    sumColumnTotalFn: {
      type: Function,
      default: (val, total) => Number(total || 0) + Number(val || 0),
    },

    formatFn: {
      type: Function,
      default: (value) => value,
    },

    withRowTotal: {
      type: Boolean,
    },

    withColumnTotal: {
      type: Boolean,
    },

    withTotal: {
      type: Boolean,
    },
  },

  data() {
    return {
      columns: [],
      rows: [],
      colTotals: {},
    };
  },

  computed: {
    cellKeys() {
      return Array.isArray(this.cellKey) ? this.cellKey : [this.cellKey];
    },
  },

  watch: {
    modelValue() {
      this.reloadColumnsAndRows();
    },
  },

  mounted() {
    this.reloadColumnsAndRows();
  },

  methods: {
    reloadColumnsAndRows() {
      const rows = {};
      const cols = new Set();
      const colTotals = {
        "row-total": {},
      };

      if (Array.isArray(this.modelValue)) {
        for (const row of this.modelValue) {
          const rowValue =
            typeof this.rowKey === "function"
              ? this.rowKey(row)
              : row[this.rowKey];
          const colValue =
            typeof this.columnKey === "function"
              ? this.columnKey(row)
              : row[this.columnKey];
          const cellValue =
            typeof this.cellKey === "function"
              ? this.cellKey(row)
              : Object.fromEntries(this.cellKeys.map((key) => [key, row[key]]));

          const colKey = `${colValue}`;
          cols.add(colKey);

          rows[rowValue] = rows[rowValue] || {};
          rows[rowValue][colKey] = rows[rowValue][colKey] || {};
          rows[rowValue]["row-total"] = rows[rowValue]["row-total"] || {};

          for (const key of Object.keys(cellValue)) {
            const value = cellValue[key];

            if (key in rows[rowValue][colKey] && this.accumulate) {
              rows[rowValue][colKey][key] += value;
            } else {
              rows[rowValue][colKey][key] = value;
            }

            if (this.withRowTotal) {
              rows[rowValue]["row-total"][key] = this.sumRowTotalFn(
                rows[rowValue]["row-total"][key],
                value
              );
            } else {
              rows[rowValue]["row-total"][key] = "";
            }

            if (this.withColumnTotal) {
              if (colKey in colTotals) {
                colTotals[colKey][key] = this.sumColumnTotalFn(
                  colTotals[colKey][key],
                  value
                );
              } else {
                colTotals[colKey] = { [key]: value };
              }
            } else {
              colTotals[colKey] = "";
            }

            if (this.withTotal) {
              colTotals["row-total"][key] = this.sumRowTotalFn(
                colTotals["row-total"][key],
                value
              );
            }
          }
        }
      }

      let colList = Array.from(cols);
      colList.sort(this.sortColumnsFn);
      colList = colList.map((name) => ({
        name,
        align: "right",
      }));
      colList.unshift({
        name: this.header || `${this.rowKey} / ${this.columnKey}`,
        field: `${this.rowKey}`,
        required: true,
      });

      if (this.withRowTotal || this.withTotal) {
        colList.push({
          name: "",
          align: "right",
          field: "row-total",
        });
      }

      const rowList = Array.from(
        Object.keys(rows).map((rowKey) => ({
          [this.rowKey]: rowKey,
          ...rows[rowKey],
        }))
      );

      this.rows = rowList;
      this.colTotals = colTotals;
      this.columns = colList;
    },
  },
};
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
    font-style: italic

  tbody tr:last-child th:first-child
    z-index: 2

.rb-pivot-data-table.with-row-total tbody tr td:last-child,
.rb-pivot-data-table.with-col-total tbody tr:last-child td
  font-weight: bold
</style>
