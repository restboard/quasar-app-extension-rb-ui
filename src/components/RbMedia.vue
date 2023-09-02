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
/**
 * A responsive viewer for media files like images or videos
 *
 * This component is useful to create a media gallery with mixed contents like
 * images, videos, etc.
 */
export default {
  name: "RbMedia",

  props: {
    /**
     * The source URI of the media content
     */
    src: {
      type: String,
      default: null,
    },

    /**
     * The mimetype of the media content (e.g. images/png)
     */
    type: {
      type: String,
      default: null,
    },

    /**
     * If set to true, a CSS cover positioning will be applied to the media
     */
    cover: {
      type: Boolean,
      default: false,
    },

    /**
     * The aspect ratio of the media content
     */
    ratio: {
      type: [String, Number],
      default: 1,
    },

    /**
     * If set to true, the video will show a poster when not playing
     */
    poster: {
      type: String,
      default: null,
    },

    /**
     * If set to true, the video will play automatically after loading
     */
    autoplay: {
      type: Boolean,
      default: false,
    },

    /**
     * If set to true, the video will play in loop
     */
    loop: {
      type: Boolean,
      default: false,
    },

    /**
     * If set to true, the video will play muted
     */
    mute: {
      type: Boolean,
      default: false,
    },

    /**
     * If set to true, the default player controls will be displayed
     */
    controls: {
      type: Boolean,
      default: false,
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
};
</script>
