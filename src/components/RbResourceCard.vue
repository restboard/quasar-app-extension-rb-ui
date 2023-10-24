<template>
  <rb-data-card :loading="loading" :title="resource.stringify(item)">
    <template #actions>
      <rb-action-menu :actions="resource.getActions()" :instance="item" />
    </template>

    <template #default>
      <!-- @slot Use this slot to customize the body of the card -->
      <slot>
        <q-separator />
        <q-list v-if="resource.ui.columns" separator>
          <q-item v-for="col of resource.ui.columns" :key="col.name">
            <q-item-section>
              <div class="text-caption text-uppercase">
                {{ $t(col.label || col.name) }}
              </div>
              <div v-if="item" class="text-body2">
                {{
                  col.format ? col.format(item) : item[col.field || col.name]
                }}
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
};
</script>
