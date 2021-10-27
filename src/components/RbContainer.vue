<template>
  <div
    class="full-width"
    :style="`max-width:${maxWidth}`"
  >
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RbContainer',

  props: {
    maxWidth: {
      type: String,
      default: '1000px'
    }
  }
})
</script>
