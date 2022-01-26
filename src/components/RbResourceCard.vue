<template>
  <rb-data-card
    :loading="loading"
    :title="resource.stringify(item)"
  >
    <template v-slot:actions>
      <rb-action-menu
        :actions="resource.actions"
        :instance="item"
      />
    </template>
    <template v-slot:default>
      <slot>
        <q-separator />
        <q-list separator>
          <q-item
            v-for="col of resource.ui.columns"
            :key="col.name"
          >
            <q-item-section>
              <div class="text-caption text-uppercase">{{ $t(col.label || col.name) }}</div>
              <div
                v-if="item"
                class="text-body2"
              >{{ col.format ? col.format(item) : item[col.field || col.name] }}</div>
              <q-skeleton
                v-else
                type="text"
                style="max-width:150px"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </slot>
    </template>
  </rb-data-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RbResourceCard',

  props: {
    resource: {
      type: Object,
      required: true
    },

    item: {
      type: Object
    },

    loading: {
      type: Boolean
    }
  }
})
</script>
