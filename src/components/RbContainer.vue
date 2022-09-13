<template>
  <div class="full-width" :style="style">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "RbContainer",

  props: {
    maxWidth: {
      type: String,
      default: "1000px",
    },

    fullWidth: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    style() {
      return !this.fullWidth && `max-width:${this.maxWidth}`;
    },
  },
});
</script>
