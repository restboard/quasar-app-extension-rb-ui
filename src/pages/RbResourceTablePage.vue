<template>
  <q-page class="flex justify-center">
    <rb-container :full-width="fullWidth">
      <rb-resource-collection
        :resource="resource"
        :filters="filters"
        :offset="offset"
        :limit="limit"
        v-slot="props"
      >
        <slot
          name="table"
          v-bind="{ ...$props, ...$attrs, ...props }"
        >
          <rb-data-table
            class="full-width"
            :title="props.resource.label"
            :columns="props.resource.ui.columns"
            :row-key="props.resource.key"
            :rows="props.items"
            :actions="props.resource.actions"
            :selection="selection"
            :selected="selected"
            :pagination="props.pagination"
            @update:selected="onUpdateSelected"
            @row-click="onRowClicked"
          />
        </slot>
      </rb-resource-collection>
    </rb-container>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "RbResourceTablePage",

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

    selection: {
      type: String,
      default: null
    },

    selected: {
      type: Array
    }
  },

  methods: {
    onUpdateSelected (evt) {
      this.$emit('update:selected', evt)
    },

    onRowClicked (evt, row) {
      this.$emit('row-click', row);
    }
  },
});
</script>
