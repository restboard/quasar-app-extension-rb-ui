<template>
  <q-page class="flex justify-center">
    <q-splitter
      v-model="splitterModel"
      class="full-width"
      :horizontal="horizontal"
      :before-class="horizontal ? 'full-width' : 'full-height'"
      :after-class="horizontal ? 'full-width' : 'full-height'"
      :separator-class="horizontal ? 'q-my-lg' : 'q-mx-lg'"
    >
      <template v-slot:before>
        <rb-resource-collection
          :resource="resource"
          v-slot="props"
        >
          <slot
            name="list"
            v-bind="{ ...$props, ...$attrs }"
          >
            <rb-data-table
              :title="props.resource.label"
              :columns="props.resource.columns"
              :rows="props.items"
              :actions="props.resource.actions"
              @row-click="onRowClicked"
            />
          </slot>
        </rb-resource-collection>
      </template>
      <template v-slot:after>
        <slot
          name="detail"
          v-bind="{ ...$props, ...$attrs }"
        >
          <rb-resource-instance
            v-if="activeRow"
            ref="resourceInstance"
            :id="activeRow[resource.key]"
            :resource="resource"
            v-slot="props"
          >
            <rb-form-wrapper
              class="fit"
              dismissible
              :resource="resource"
              :id="props.id"
              :schema="props.schema"
              :loading="props.loading"
              :saving="props.saving"
              :model-value="props.instance"
              @submit="onFormSubmitted"
              @dismiss="onFormDismissed"
            />
          </rb-resource-instance>
          <div
            v-else
            class="fit column items-center"
          >
            <div
              class="column q-gutter-sm text-center"
              style="max-width: 200px"
            >
              <p>{{ $t("Select an item from the list or") }}</p>
              <q-btn
                color="primary"
                icon="add"
                :label="$t('Add new')"
                @click="onAddNewRow"
              />
            </div>
          </div>
        </slot>
      </template>
    </q-splitter>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: 'RbMasterDetailPage',

  props: {
    resource: {
      type: Object
    },
    horizontal: {
      type: Boolean
    },
    ratio: {
      type: Number,
      default: 60
    }
  },

  data () {
    return {
      activeRow: null,
      splitterModel: ref(this.ratio),
    };
  },

  methods: {
    onRowClicked (evt, row) {
      this.activeRow = row;
    },

    onAddNewRow () {
      this.activeRow = {};
    },

    onFormSubmitted (data) {
      this.$refs.resourceInstance.saveData(data)
    },

    onFormDismissed () {
      this.activeRow = null;
    },
  },
});
</script>
