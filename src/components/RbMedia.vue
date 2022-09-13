<template>
  <div v-intersection.once="onIntersection">
    <template v-if="intersected">
      <q-responsive v-if="isVideo" class="fit" :ratio="ratio">
        <video
          :autoplay="autoplay"
          :loop="loop"
          :mute="mute"
          :controls="controls"
          :poster="poster"
          :style="cover ? 'object-fit:cover' : 'object-fit:contain'"
        >
          <source :src="src" :type="type" />
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
import { defineComponent } from "vue";

export default defineComponent({
  name: "RbMedia",

  props: {
    src: {
      type: String,
      default: null,
    },

    type: {
      type: String,
      default: null,
    },

    cover: {
      type: Boolean,
      default: false,
    },

    poster: {
      type: String,
      default: null,
    },

    autoplay: {
      type: Boolean,
      default: false,
    },

    loop: {
      type: Boolean,
      default: false,
    },

    mute: {
      type: Boolean,
      default: false,
    },

    controls: {
      type: Boolean,
      default: false,
    },

    ratio: {
      type: [String, Number],
      default: 1,
    },
  },

  data() {
    return {
      intersected: false,
    };
  },

  computed: {
    isVideo() {
      return this.type && this.type.indexOf("video/") === 0;
    },
  },

  methods: {
    onIntersection(entry) {
      this.intersected = entry.isIntersecting;
    },
  },
});
</script>
