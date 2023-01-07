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
      <!-- @slot Use this slot to show additional content (e.g. a message) -->
      <slot />
    </div>
  </q-banner>
</template>

<script>
/**
 * A banner used to notify when a container doesn't contain any content
 */
export default {
  name: "RbEmptyBanner",

  props: {
    /**
     * The icon to show in the banner
     */
    icon: {
      type: String,
      default: "not_interested",
    },
  },
};
</script>
