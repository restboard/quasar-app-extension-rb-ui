<template>
  <q-card>
    <q-card-section>
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
        <div class="row no-wrap q-col-gutter-sm">
          <div class="col">
            <slot
              name="overline"
              v-if="overline"
            >
              <div
                class="text-overline"
                :class="overlineClass"
              >{{ overline }}</div>
            </slot>
            <slot
              name="title"
              v-else
            >
              <div
                class="text-subtitle1"
                :class="titleClass"
              >{{ title }}</div>
            </slot>
          </div>
          <div class="col-auto">
            <slot name="actions">
            </slot>
          </div>
        </div>
        <slot
          name="title"
          v-if="overline"
        >
          <div
            class="text-subtitle1"
            :class="titleClass"
          >{{ title }}</div>
        </slot>
        <slot
          v-if="subtitle"
          name="subtitle"
        >
          <div
            class="text-subtitle2"
            :class="subtitleClass"
          >{{ subtitle }}</div>
        </slot>
      </template>
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

    overlineClass: {
      type: [String, Object]
    },

    titleClass: {
      type: [String, Object]
    },

    subtitleClass: {
      type: [String, Object]
    },

    loading: {
      type: Boolean
    }
  }
});
</script>
