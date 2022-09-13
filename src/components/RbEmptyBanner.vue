<template>
  <q-banner
    inline-actions
    rounded
    class="text-center bg-transparent text-grey-8"
  >
    <div class="column flex flex-center">
      <q-icon
        v-if="icon"
        :name="icon"
        size="xl"
        class="q-mb-sm"
        style="opacity: 0.5"
      />
      <slot />
    </div>
  </q-banner>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "RbEmptyBanner",

  props: {
    icon: {
      type: String,
      default: "not_interested",
    },
  },
});
</script>
