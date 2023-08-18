<template>
  <!-- @slot Use this slot to render the fetched resource instances -->
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
  <!-- @slot Use this slot to render a component when no results are fetched -->
  <slot
    v-else
    name="empty"
    v-bind="$props"
    :reload-data="reloadData"
    :clear-and-reload-data="clearAndReloadData"
  >
    {{ $t("No results") }}
  </slot>
</template>

<script>
/**
 * Fetch a collection of a resource instances and provide them to its children
 */
export default {
  name: "RbResourceCollection",

  props: {
    /**
     * The resource to fetch instances from
     */
    resource: {
      type: Object,
      required: true,
    },

    /**
     * A dictionary of filters to apply when fetching resource instances
     */
    filters: {
      type: Object,
      default: null,
    },

    /**
     * The offset to apply when fetching resource instances
     */
    offset: {
      type: Number,
      default: 0,
    },

    /**
     * The limit to apply when fetching resource instances
     */
    limit: {
      type: Number,
      default: null,
    },

    /**
     * With infinite mode, new fetched items are appended to the previous ones
     */
    infinite: {
      type: Boolean,
      default: false,
    },

    /**
     * Show the default slot even when no results are fecthed
     */
    keepOnEmpty: {
      type: Boolean,
      default: false,
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

    filters: function (val, old) {
      if (JSON.stringify(val) !== JSON.stringify(old)) {
        this.clearAndReloadData();
      }
    },

    offset: function (val, old) {
      if (val !== old) {
        this.clearAndReloadData();
      }
    },

    limit: function (val, old) {
      if (val !== old) {
        this.clearAndReloadData();
      }
    },
  },

  beforeUnmount() {
    this.resource.removeListener(this.clearAndReloadData);
  },

  methods: {
    /**
     * Clear all the fetched resource instances
     *
     * @public
     */
    clear() {
      this.items = [];
      this.hasMore = true;
    },

    /**
     * Refetch resource instances
     *
     * On success, a `loaded` event is emitted.
     * On error, a `error` event is emitted.
     *
     * @public
     */
    async reloadData() {
      if (!this.resource) {
        return;
      }
      try {
        this.loading = true;
        let newItems = [];
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
        this.$emit("loaded", newItems);
      } catch (err) {
        this.$emit("error", err);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Clear and reload resource instances
     *
     * @public
     */
    async clearAndReloadData() {
      this.clear();
      return this.reloadData();
    },
  },
};
</script>
