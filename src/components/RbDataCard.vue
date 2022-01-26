<template>
  <q-card>
    <q-card-section>
      <div class="row no-wrap q-col-gutter-sm">
        <div class="col">
          <slot
            name="skeleton"
            v-if="loading"
          >
            <q-skeleton
              type="rect"
              style="max-width:200px"
            />
          </slot>
          <template v-else>
            <slot
              v-if="overline"
              name="overline"
            >
              <div class="text-overline">{{ overline }}</div>
            </slot>
            <slot name="title">
              <div class="text-h6">{{ title }}</div>
            </slot>
            <slot
              v-if="subtitle"
              name="subtitle"
            >
              <div class="text-subtitle1">{{ subtitle }}</div>
            </slot>
          </template>
        </div>
        <div class="col-auto">
          <slot name="actions">
          </slot>
        </div>
      </div>
    </q-card-section>
    <slot></slot>
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "RbDataCard",

  props: {
    overline: {
      type: String
    },

    title: {
      type: String
    },

    subtitle: {
      type: String
    },

    loading: {
      type: Boolean
    }
  }
});
</script>
