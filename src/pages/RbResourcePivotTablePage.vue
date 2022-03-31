<template>
  <q-page class="flex justify-center">
    <rb-container :full-width="fullWidth">
      <rb-resource-collection
        :keep-on-empty="keepOnEmpty"
        :resource="resource"
        :filters="filters"
        :offset="offset"
        :limit="limit"
      >
        <template #default="props">
          <slot
            name="table"
            v-bind="{ ...$props, ...$attrs, ...props }"
          >
            <rb-pivot-data-table
              class="full-width"
              :title="props.resource.label"
              :model-value="props.items"
              :pagination="props.pagination"
              :column-key="columnKey"
              :row-key="rowKey"
              :cell-key="cellKey"
            />
          </slot>
        </template>

        <template #empty>
          <slot
            name="empty"
            v-bind="{ ...$props, ...$attrs, ...props }"
          >
            <rb-empty-banner>{{ $t('No results') }}</rb-empty-banner>
          </slot>
        </template>
      </rb-resource-collection>
    </rb-container>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import RbEmptyBanner from "../components/RbEmptyBanner.vue";

export default defineComponent({
  name: "RbResourcePivotTablePage",

  components: {
    RbEmptyBanner
  },

  props: {
    resource: {
      type: Object
    },

    filters: {
      type: Object
    },

    offset: {
      type: Number,
      default: 0
    },

    limit: {
      type: Number
    },

    fullWidth: {
      type: Boolean
    },

    keepOnEmpty: {
      type: Boolean
    },

    rowKey: {
      type: String
    },

    columnKey: {
      type: String
    },

    cellKey: {
      type: String
    }
  }
});
</script>
