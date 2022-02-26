<template>
  <div v-intersection.once="onIntersection">
    <template v-if="intersected">
      <q-responsive
        class="fit"
        v-if="isVideo"
        :ratio="ratio"
      >
        <video
          :autoplay="autoplay"
          :mute="mute"
          :controls="controls"
          :poster="poster"
          :style="cover ? 'object-fit:cover' : 'object-fit:contain'"
        >
          <source
            :src="src"
            :type="type"
          >
        </video>
      </q-responsive>
      <q-img
        v-else
        class="fit"
        spinner-color="primary"
        :ratio="ratio"
        :fit="cover ? 'cover' : 'contain'"
        :src="src"
      />
    </template>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RbMedia',

  props: {
    src: {
      type: String
    },

    type: {
      type: String
    },

    cover: {
      type: Boolean,
      default: false
    },

    poster: {
      auto: String
    },

    autoplay: {
      auto: Boolean,
      default: false
    },

    mute: {
      type: Boolean,
      default: false
    },

    controls: {
      type: Boolean,
      default: false
    },

    ratio: {
      type: [String, Number],
      default: 1
    }
  },

  computed: {
    isVideo () {
      return this.type && this.type.indexOf('video/') === 0
    }
  },

  data () {
    return {
      intersected: false
    }
  },

  methods: {
    onIntersection (entry) {
      this.intersected = entry.isIntersecting
    }
  }
})
</script>
