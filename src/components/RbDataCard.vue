<template>
  <q-card>
    <q-card-section>
      <div class="row no-wrap q-col-gutter-sm">
        <div
          v-if="loading"
          class="col"
        >
          <q-skeleton
            type="text"
            style="max-width:200px"
          />
        </div>
        <template v-else>
          <div class="col">
            <slot name="title">
              <div class="text-caption">{{ title }}</div>
            </slot>
          </div>
          <div class="col-auto">
            <slot name="actions">
            </slot>
          </div>
        </template>
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
    title: {
      type: String
    },

    loading: {
      type: Boolean
    }
  }
});
</script>
