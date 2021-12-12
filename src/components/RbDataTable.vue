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
    :selected.sync="selected"
    @request="onRequest"
    @row-click="onRowClicked"
    @update:selected="onSelectionChanged"
  >
    <template
      v-for="(index, name) in $slots"
      v-slot:[name]
    >
      <slot :name="name" />
    </template>

    <template
      v-for="(index, name) in $scopedSlots"
      v-slot:[name]="data"
    >
      <slot
        :name="name"
        v-bind="data"
      ></slot>
    </template>

    <template v-slot:top>
      <div class="row full-width q-gutter-sm justify-end">
        <q-input
          v-if="showSearch"
          dense
          clearable
          clear-icon="close"
          :debounce="searchDebounce"
          v-model="searchQuery"
          :placeholder="$t('Search')"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </template>

    <template v-slot:header-cell="props">
      <q-th :props="props">
        <q-btn
          flat
          round
          dense
          icon="filter_list"
          v-if="props.col.filterable && colFilters[props.col.field]"
          @click.stop
        >
          <rb-column-auto-filter
            :rows="rows"
            :model-value="colFilters[props.col.field || props.col.name]"
            :field="props.col.field || props.col.name"
            :format="props.col.format"
            @update:modelValue="evt => onFilterChange(props.col.field || props.col.name, evt)"
          />
        </q-btn>
        {{ props.col.label }}
      </q-th>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td
        v-if="actions"
        auto-width
        :props="props"
      >
        <rb-action-menu
          :actions="actions"
          :instance="props.row"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { defineComponent } from 'vue'
import { format } from 'quasar'
import RbActionMenu from '../components/RbActionMenu'
import RbColumnAutoFilter from '../components/RbColumnAutoFilter'

const { capitalize } = format

export default defineComponent({
  name: 'RbDataTable',

  components: {
    RbActionMenu,
    RbColumnAutoFilter
  },

  props: {
    title: {
      type: String,
      default: ''
    },

    rowKey: {
      type: String,
      default: 'id'
    },

    columns: {
      type: Array,
      default: []
    },

    rows: {
      type: Array,
      default: []
    },

    actions: {
      type: Array,
      default: []
    },

    loading: {
      type: Boolean,
      default: false
    },

    selected: {
      type: String
    },

    searchDebounce: {
      type: Number,
      default: 250
    },

    showSearch: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    tableColumns () {
      const cols = (this.columns || []).map(col => {
        return {
          name: col.name,
          label: this.$t(col.title || capitalize(col.name)),
          field: col.field || col.name,
          align: col.align || (col.type === 'number' ? 'right' : 'left'),
          sortable: col.sortable,
          sort: col.sort,
          format: col.format,
          required: col.required,
          filterable: col.filterable
        }
      })
      if (this.selection) {
        cols.unshift({})
      }
      if (this.actions) {
        cols.push({
          name: 'actions',
          label: this.$t('Actions')
        })
      }
      return cols
    },

    columnsWithFilters () {
      return this.tableColumns.filter(col => !!col.filterable)
    }
  },

  data () {
    return {
      searchQuery: '',
      filteredRows: [],
      colFilters: {}
    }
  },

  mounted () {
    this.reloadColFilters()
  },

  methods: {
    reloadColFilters () {
      this.columnsWithFilters.forEach(col => {
        this.colFilters[col.field] = {}
        this.rows.forEach(row => {
          const key = row[col.field]
          this.colFilters[col.field][key] = true
        })
      })
      this.filterRows()
    },

    filterRows () {
      this.filteredRows = [...this.rows]
      this.columnsWithFilters.forEach(col => {
        const filters = this.colFilters[col.field] || {}
        this.filteredRows = this.filteredRows.filter(row => {
          const key = row[col.field]
          return !!filters[key]
        })
      })
    },

    onRowClicked (evt, row) {
      this.$emit('row-click', evt, row)
    },

    onSelectionChanged (evt) {
      this.$emit('update:selected', evt)
    },

    onFilterChange (columnName, evt) {
      const val = evt
      const old = this.colFilters[columnName]
      if (JSON.stringify(val) !== JSON.stringify(old)) {
        this.colFilters[columnName] = val
        this.filterRows()
      }
    }
  },

  watch: {
    rows () {
      this.filterRows()
    }
  }
})
</script>
