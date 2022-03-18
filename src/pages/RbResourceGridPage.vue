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
            name="grid"
            v-bind="{ ...$props, ...$attrs, ...props }"
          >
            <rb-data-grid
              class="full-width"
              :items="props.items"
              :itemsPerRow="itemsPerRow"
              :loading="props.loading"
            >
              <template v-slot:default="slotProps">
                <component
                  :is="cardComponent"
                  class="fit"
                  :resource="resource"
                  :item="slotProps.item"
                />
              </template>
              <template v-slot:skeleton>
                <component
                  :is="cardComponent"
                  class="fit"
                  loading
                  :resource="resource"
                />
              </template>
            </rb-data-grid>
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
  name: "RbResourceGridPage",

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

    xs: {
      type: Number,
      default: 1
    },

    sm: {
      type: Number,
      default: 2
    },

    md: {
      type: Number,
      default: 3
    },

    lg: {
      type: Number,
      default: 4
    },

    xl: {
      type: Number,
      default: 4
    }
  },

  computed: {
    itemsPerRow () {
      if (this.$q.screen.xs) {
        return this.xs
      }
      if (this.$q.screen.sm) {
        return this.sm
      }
      if (this.$q.screen.md) {
        return this.md
      }
      if (this.$q.screen.lg) {
        return this.lg
      }
      return this.xl
    },

    cardComponent () {
      return this.resource.ui.cardComponent || 'rb-resource-card'
    }
  }
});
</script>
