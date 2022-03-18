<template>
  <q-page class="flex justify-center">
    <q-splitter
      v-model="splitterModel"
      class="full-width"
      :horizontal="horizontal"
      :before-class="horizontal ? 'full-width q-pa-xs' : 'full-height q-pa-xs'"
      :after-class="horizontal ? 'full-width q-pa-xs' : 'full-height q-pa-xs'"
      :separator-class="horizontal ? 'q-my-lg' : 'q-mx-lg'"
    >
      <template v-slot:before>
        <rb-resource-collection
          :keep-on-empty="keepOnEmpty"
          :resource="resource"
          :filters="filters"
          :offset="offset"
          :limit="limit"
        >
          <template #default="props">
            <slot
              name="master"
              v-bind="{ ...$props, ...$attrs, ...props }"
            >
              <rb-data-table
                :loading="props.loading"
                :title="props.resource.label"
                :columns="props.resource.ui.columns"
                :row-key="props.resource.key"
                :rows="props.items"
                :actions="props.resource.actions"
                :selection="selection"
                :selected="selectedRows"
                :pagination="props.pagination"
                @update:selected="onUpdateSelected"
                @row-click="onRowClicked"
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
import RbEmptyBanner from "../components/RbEmptyBanner.vue";

export default defineComponent({
  name: 'RbMasterDetailPage',

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

    keepOnEmpty: {
      type: Boolean
    },

    selection: {
      type: String
    },

    selected: {
      type: Array
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
      selectedRows: this.selected || undefined,
      splitterModel: ref(this.ratio),
    };
  },

  methods: {
    onUpdateSelected (evt) {
      this.selectedRows = evt
      this.$emit('update:selected', evt)
    },

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

  watch: {
    selected (val) {
      this.selectedRows = val || undefined
    }
  }
});
</script>
