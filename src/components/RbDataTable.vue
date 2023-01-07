<template>
  <q-table
    :title="title"
    :row-key="rowKey"
    :rows="filteredRows"
    :columns="tableColumns"
    :loading="loading"
    :filter="searchQuery"
    :selection="selection || 'none'"
  >
    <template v-for="(index, name) in $slots" :key="index" #[name]="props">
      <!-- @slot https://quasar.dev/vue-components/table -->
      <slot :name="name" v-bind="props" />
    </template>

    <template #top="props">
      <!-- @slot https://quasar.dev/vue-components/table -->
      <slot name="top" v-bind="props">
        <div class="row full-width q-gutter-sm justify-end print-hide">
          <!-- @slot Use this slot to render additional actions on the top-right corner -->
          <slot name="top-actions" v-bind="props" />
          <q-input
            v-if="!hideSearch"
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
      <!-- @slot https://quasar.dev/vue-components/table -->
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
      <!-- @slot Use this slot to customize how the row actions should look like -->
      <slot name="body-cell-actions" v-bind="props">
        <q-td v-if="actions" auto-width :props="props">
          <rb-action-menu :actions="actions" :instance="props.row" />
        </q-td>
      </slot>
    </template>
  </q-table>
</template>

<script>
import { format } from "quasar";
import RbActionMenu from "../components/RbActionMenu";
import RbColumnAutoFilter from "../components/RbColumnAutoFilter";

const { capitalize } = format;

/**
 * A data table with support for search, column filters and row actions
 */
export default {
  name: "RbDataTable",

  components: {
    RbActionMenu,
    RbColumnAutoFilter,
  },

  props: {
    /**
     * The title of the table
     */
    title: {
      type: String,
      default: "",
    },

    /**
     * The field to be used as identifier of each row in the table
     */
    rowKey: {
      type: String,
      default: "id",
    },

    /**
     * The list of columns to show in the table
     */
    columns: {
      type: Array,
      default: () => [],
    },

    /**
     * The list of rows to show in the table
     */
    rows: {
      type: Array,
      default: () => [],
    },

    /**
     * The list of actions to show for each row in the table
     */
    actions: {
      type: Object,
      default: () => ({}),
    },

    /**
     * Put the table into 'loading' state
     */
    loading: {
      type: Boolean,
      default: false,
    },

    /**
     * The table selection type
     */
    selection: {
      type: String,
      default: null,
    },

    /**
     * The time (in ms) to use for debounce a search request
     */
    searchDebounce: {
      type: Number,
      default: 250,
    },

    /**
     * If true, hide the search input
     */
    hideSearch: {
      type: Boolean,
      default: false,
    },
  },

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

    onFilterChange(columnName, evt) {
      const val = evt;
      const old = this.colFilters[columnName];
      if (JSON.stringify(val) !== JSON.stringify(old)) {
        this.colFilters[columnName] = val;
      }
    },
  },
};
</script>
