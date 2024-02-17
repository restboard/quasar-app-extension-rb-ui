<template>
  <rb-data-card :loading="loading" :title="resource.stringify(item)">
    <template v-for="(index, name) in $slots" :key="index" #[name]="props">
      <!-- @slot see RbDataCard -->
      <slot :name="name" v-bind="{ ...props, ...$props }" />
    </template>

    <template #header-actions="props">
      <!-- @slot Use this slot to customize the header actions section -->
      <slot name="header-actions" v-bind="{ ...props, ...$props }">
        <rb-action-menu :actions="resource.getActions()" :instance="item" />
      </slot>
    </template>

    <template #default="props">
      <!-- @slot Use this slot to customize the body of the card -->
      <slot v-bind="{ ...props, ...$props, getLabel, getValue }">
        <q-separator />
        <q-list v-if="resource.ui.columns" separator>
          <q-item v-for="col of resource.ui.columns" :key="col.name">
            <q-item-section>
              <div class="text-caption text-uppercase">
                {{ getLabel(col) }}
              </div>
              <div v-if="item" class="text-body2">
                {{ getValue(col) }}
              </div>
              <q-skeleton v-else type="text" style="max-width: 150px" />
            </q-item-section>
          </q-item>
        </q-list>
      </slot>
    </template>
  </rb-data-card>
</template>

<script>
/**
 * A card component to show resource instances in a consistent way accross the app
 */
export default {
  name: "RbResourceCard",

  props: {
    /**
     * The resource used to configure the card appearance
     */
    resource: {
      type: Object,
      required: true,
    },

    /**
     * The resource instance used to populate the card content
     */
    item: {
      type: Object,
      default: null,
    },

    /**
     * A loading status flag
     */
    loading: {
      type: Boolean,
    },
  },

  methods: {
    getLabel(col) {
      return col ? this.$t(col.label || col.name) : null;
    },

    getValue(col) {
      if (!this.item || !col) {
        return null;
      }

      const field =
        typeof col.field === "function"
          ? col.field(this.item)
          : this.item[col.field || col.name];

      return col.format ? col.format(field) : field;
    },
  },
};
</script>
