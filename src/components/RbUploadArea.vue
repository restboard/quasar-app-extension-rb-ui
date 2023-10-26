<template>
  <q-file
    ref="fileInput"
    input-style="min-height:200px;min-width:200px"
    @update:model-value="onFileSelection"
  >
    <template #append>
      <div
        v-if="previewSrc"
        class="fit relative no-pointer-events"
        style="opacity: 0.7"
      >
        <rb-media
          v-if="isVideoOrImage"
          cover
          mute
          autoplay
          loop
          class="fit absolute-center"
          :src="previewSrc"
          :type="type"
        />
        <q-icon v-else name="description" size="xl" class="absolute-center" />
      </div>
      <q-btn
        v-if="!file"
        round
        color="secondary"
        class="absolute-center"
        icon="add"
        @click="$refs.fileInput.pickFiles()"
      />
      <q-btn
        v-if="file && clearable"
        flat
        round
        class="absolute-top-right q-ma-sm"
        icon="cancel"
        @click="onClear"
      />
      <q-icon
        v-if="filename"
        class="absolute-bottom q-ma-sm cursor-pointer"
        name="info"
      >
        <q-tooltip>{{ filename }} ({{ type }})</q-tooltip>
      </q-icon>
    </template>
  </q-file>
</template>

<script>
import RbMedia from "../components/RbMedia.vue";

export default {
  name: "RbUploadArea",

  components: {
    RbMedia,
  },

  props: {
    clearable: {
      type: Boolean,
    },
  },

  emits: ["update:modelValue"],

  data() {
    return {
      file: null,
      previewSrc: null,
    };
  },

  computed: {
    isVideoOrImage() {
      return (
        this.type.indexOf("video") === 0 || this.type.indexOf("image") === 0
      );
    },

    isFile() {
      return this.file && this.file instanceof File;
    },

    filename() {
      return this.file && this.file.name;
    },

    type() {
      return this.isFile ? this.file.type : "";
    },
  },

  mounted() {
    this.updatePreview();
  },

  methods: {
    updatePreview() {
      if (this.isFile) {
        const reader = new FileReader();
        const _eventHandler = () => {
          this.previewSrc = reader.result;
          reader.removeEventListener("load", _eventHandler);
        };
        reader.addEventListener("load", _eventHandler, false);
        reader.readAsDataURL(this.file);
      } else {
        this.previewSrc = null;
      }
    },

    onFileSelection(file) {
      this.file = file;
      this.updatePreview();
      this.$emit("update:modelValue", file);
    },

    onClear() {
      this.$refs.fileInput.removeAtIndex(0);
      this.file = null;
      this.updatePreview();
      this.$emit("update:modelValue", null);
    },
  },
};
</script>
