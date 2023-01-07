<template>
  <div class="full-width" :style="style">
    <!-- @slot Use this slot to add content to the container -->
    <slot />
  </div>
</template>

<script>
/**
 * A responsive container used to limit the width of the inner content
 */
export default {
  name: "RbContainer",

  props: {
    /**
     * The max width of the inner content
     */
    maxWidth: {
      type: String,
      default: "1000px",
    },

    /**
     * If true, the container will take the full width of the parent component
     */
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
};
</script>
