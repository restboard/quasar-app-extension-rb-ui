<template>
  <q-table
    :title="title"
    :row-key="rowKey"
    :rows="filteredRows"
    :columns="tableColumns"
    :loading="loading"
    :grid="$q.screen.xs"
    :filter="searchQuery"
    :selection="selection"
  >
    <template v-for="(index, name) in $slots" :key="index" #[name]="props">
      <slot :name="name" v-bind="props" />
    </template>

    <template #top="props">
      <slot name="top" v-bind="props">
        <div class="row full-width q-gutter-sm justify-end">
          <slot name="top-actions" v-bind="props" />
          <q-input
            v-if="showSearch"
            v-model="searchQuery"
            borderless
            dense
            clearable
            clear-icon="close"
            :debounce="searchDebounce"
            :placeholder="$t('Search')"
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </slot>
    </template>

    <template #header-cell="props">
      <slot name="header-cell" v-bind="props">
        <q-th :props="props">
          <q-btn
            v-if="props.col.filterable && colFilters[props.col.field]"
            flat
            round
            dense
            icon="filter_list"
            @click.stop
          >
            <rb-column-auto-filter
              :rows="rows"
              :model-value="colFilters[props.col.field || props.col.name]"
              :field="props.col.field || props.col.name"
              :format="props.col.format"
              @update:model-value="
                (evt) => onFilterChange(props.col.field || props.col.name, evt)
              "
            />
          </q-btn>
          {{ props.col.label }}
        </q-th>
      </slot>
    </template>

    <template #body-cell-actions="props">
      <slot name="body-cell-actions" v-bind="props">
        <q-td v-if="actions" auto-width :props="props">
          <rb-action-menu :actions="actions" :instance="props.row" />
        </q-td>
      </slot>
    </template>
  </q-table>
</template>

<script>
import { defineComponent } from "vue";
import { format } from "quasar";
import RbActionMenu from "../components/RbActionMenu";
import RbColumnAutoFilter from "../components/RbColumnAutoFilter";

const { capitalize } = format;

export default defineComponent({
  name: "RbDataTable",

  components: {
    RbActionMenu,
    RbColumnAutoFilter,
  },

  props: {
    title: {
      type: String,
      default: "",
    },

    rowKey: {
      type: String,
      default: "id",
    },

    columns: {
      type: Array,
      default: () => [],
    },

    rows: {
      type: Array,
      default: () => [],
    },

    actions: {
      type: Object,
      default: () => ({}),
    },

    loading: {
      type: Boolean,
      default: false,
    },

    selection: {
      type: String,
      default: null,
    },

    searchDebounce: {
      type: Number,
      default: 250,
    },

    showSearch: {
      type: Boolean,
      default: true,
    },
  },

  emits: ["row-click", "update:selected"],

  data() {
    return {
      searchQuery: "",
      colFilters: {},
    };
  },

  computed: {
    hasActions() {
      return this.actions && Object.keys(this.actions).length > 0;
    },

    tableColumns() {
      const cols = (this.columns || []).map((col) => {
        return {
          name: col.name,
          label: this.$t(col.title || capitalize(col.name)),
          field: col.field || col.name,
          align: col.align || (col.type === "number" ? "right" : "left"),
          sortable: col.sortable,
          sort: col.sort,
          format: col.format,
          required: col.required,
          filterable: col.filterable,
        };
      });
      if (this.hasActions) {
        cols.push({
          name: "actions",
          label: this.$t("Actions"),
        });
      }
      return cols;
    },

    columnsWithFilters() {
      return this.tableColumns.filter((col) => !!col.filterable);
    },

    filteredRows() {
      let rows = Array.isArray(this.rows) ? this.rows : [];
      this.columnsWithFilters.forEach((col) => {
        const filters = this.colFilters[col.field] || {};
        rows = rows.filter((row) => {
          const key = row[col.field];
          return key === null || !!filters[key];
        });
      });
      return rows;
    },
  },

  watch: {
    columns() {
      this.reloadColFilters();
    },

    rows() {
      this.reloadColFilters();
    },
  },

  mounted() {
    this.reloadColFilters();
  },

  methods: {
    reloadColFilters() {
      for (const col of this.columnsWithFilters) {
        if (!col.field) {
          continue;
        }
        this.colFilters[col.field] = {};
      }
      if (!Array.isArray(this.rows)) {
        return;
      }
      for (const row of this.rows) {
        for (const col of this.columnsWithFilters) {
          if (col.field && col.field in row) {
            const key = row[col.field];
            this.colFilters[col.field][key] = true;
          }
        }
      }
    },

    onRowClicked(evt, row) {
      this.$emit("row-click", evt, row);
    },

    onSelectionChanged(evt) {
      this.$emit("update:selected", evt);
    },

    onFilterChange(columnName, evt) {
      const val = evt;
      const old = this.colFilters[columnName];
      if (JSON.stringify(val) !== JSON.stringify(old)) {
        this.colFilters[columnName] = val;
      }
    },
  },
});
</script>
