<template>
  <q-card>
    <q-card-section>
      <slot v-if="loading" name="skeleton">
        <q-skeleton type="rect" style="max-width: 200px" />
      </slot>
      <template v-else>
        <div class="row no-wrap q-col-gutter-sm">
          <div class="col">
            <slot v-if="overline" name="overline">
              <div class="text-overline" :class="overlineClass">
                {{ overline }}
              </div>
            </slot>
            <slot v-else name="title">
              <div class="text-subtitle1" :class="titleClass">
                {{ title }}
              </div>
            </slot>
          </div>
          <div class="col-auto">
            <slot name="actions" />
          </div>
        </div>
        <slot v-if="overline" name="title">
          <div class="text-subtitle1" :class="titleClass">
            {{ title }}
          </div>
        </slot>
        <slot v-if="subtitle" name="subtitle">
          <div class="text-subtitle2" :class="subtitleClass">
            {{ subtitle }}
          </div>
        </slot>
      </template>
    </q-card-section>
    <slot />
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "RbDataCard",

  props: {
    overline: {
      type: String,
      default: null,
    },

    title: {
      type: String,
      default: null,
    },

    subtitle: {
      type: String,
      default: null,
    },

    overlineClass: {
      type: [String, Object],
      default: null,
    },

    titleClass: {
      type: [String, Object],
      default: null,
    },

    subtitleClass: {
      type: [String, Object],
      default: null,
    },

    loading: {
      type: Boolean,
    },
  },
});
</script>
