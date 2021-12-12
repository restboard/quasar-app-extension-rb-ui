<template>
  <q-page class="flex justify-center">
    <rb-container>
      <rb-resource-collection
        :resource="resource"
        v-slot="props"
      >
        <slot
          name="table"
          v-bind="{ ...$props, ...$attrs }"
        >
          <rb-data-table
            class="full-width"
            :title="props.resource.label"
            :columns="props.resource.ui.columns"
            :rows="props.items"
            :actions="props.resource.actions"
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
    resource: Object,
    required: true
  },

  methods: {
    onRowClicked (evt, row) {
      this.$emit('click-row', row);
    }
  },
});
</script>
