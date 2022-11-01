<template>
  <div>
    <slot
      v-if="itemCount || loading || keepOnEmpty"
      name="default"
      v-bind="$props"
      :items="items"
      :loading="loading"
      :has-more="hasMore"
      :pagination="pagination"
      :reload-data="reloadData"
      :clear-and-reload-data="clearAndReloadData"
    />
    <slot
      v-else
      name="empty"
      v-bind="$props"
      :reload-data="reloadData"
      :clear-and-reload-data="clearAndReloadData"
    >
      {{ $t("No results") }}
    </slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "RbResourceCollection",

  props: {
    resource: {
      type: Object,
      required: true,
    },

    filters: {
      type: Object,
      default: null,
    },

    offset: {
      type: Number,
      default: 0,
    },

    limit: {
      type: Number,
      default: null,
    },

    infinite: {
      type: Boolean,
    },

    keepOnEmpty: {
      type: Boolean,
    },
  },

  emits: ["loaded", "error"],

  data() {
    return {
      items: [],
      loading: true,
      hasMore: true,
    };
  },

  computed: {
    key() {
      return this.resource.key || "id";
    },

    itemCount() {
      return this.items ? this.items.length : 0;
    },

    pagination() {
      return {
        rowsPerPage: this.limit || 0,
        page: this.limit ? Math.ceil(this.offset / this.limit) + 1 : 1,
      };
    },
  },

  watch: {
    resource: {
      handler(val, old) {
        if (val !== old) {
          val && val.addListener(this.clearAndReloadData);
          old && old.removeListener(this.clearAndReloadData);
          this.clearAndReloadData();
        }
      },
      // force registering listener on first load
      immediate: true,
    },

    filters: function () {
      this.clearAndReloadData();
    },

    offset: function () {
      this.clearAndReloadData();
    },

    limit: function () {
      this.clearAndReloadData();
    },
  },

  beforeUnmount() {
    this.resource.removeListener(this.clearAndReloadData);
  },

  methods: {
    clear() {
      this.items = [];
      this.hasMore = true;
    },

    async reloadData() {
      if (!this.resource) {
        return;
      }
      this.loading = true;
      let newItems = [];
      try {
        const opts = {
          offset: this.offset || 0,
          filters: {
            ...this.filters,
            ...this.resource.defaultParams.filters,
          },
        };
        if (this.infinite) {
          opts.offset += this.itemCount;
        }
        if (this.limit) {
          opts.limit = this.limit;
        }
        const res = await this.resource.getMany(opts);
        newItems = res.data || [];
        this.hasMore = newItems.length === opts.limit;
        if (this.infinite) {
          this.items = this.items.concat(newItems);
        } else {
          this.items = newItems;
        }
      } catch (err) {
        this.$emit("error", err);
      }
      this.loading = false;
      this.$emit("loaded", newItems);
    },

    async clearAndReloadData() {
      this.clear();
      return this.reloadData();
    },
  },
});
</script>
