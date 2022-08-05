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
    <template
      v-for="(index, name) in $slots"
      :key="index"
      v-slot:[name]="props"
    >
      <slot :name="name" v-bind="props"/>
    </template>

    <template v-slot:top="props">
      <slot name="top" v-bind="props">
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
      </slot>
    </template>

    <template v-slot:header-cell="props">
      <slot name="header-cell" v-bind="props">
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
      </slot>
    </template>

    <template v-slot:body-cell-actions="props">
      <slot name="body-cell-actions" v-bind="props">
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
      </slot>
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
      default: () => []
    },

    rows: {
      type: Array,
      default: () => []
    },

    actions: {
      type: Object,
      default: () => ({})
    },

    loading: {
      type: Boolean,
      default: false
    },

    selection: {
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
    hasActions () {
      return this.actions && Object.keys(this.actions).length > 0
    },

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
      if (this.hasActions) {
        cols.push({
          name: 'actions',
          label: this.$t('Actions')
        })
      }
      return cols
    },

    columnsWithFilters () {
      return this.tableColumns.filter(col => !!col.filterable)
    },

    filteredRows () {
      let rows = this.rows ? [...this.rows] : []
      this.columnsWithFilters.forEach(col => {
        const filters = this.colFilters[col.field] || {}
        rows = rows.filter(row => {
          const key = row[col.field]
          return key === null || !!filters[key]
        })
      })
      return rows
    }
  },

  data () {
    return {
      searchQuery: '',
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
      }
    }
  },

  watch: {
    columns () {
      this.reloadColFilters()
    },

    rows () {
      this.reloadColFilters()
    }
  }
})
</script>
