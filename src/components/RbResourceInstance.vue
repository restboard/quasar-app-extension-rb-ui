<template>
  <!-- @slot Use this slot to render the fetched resource instance -->
  <slot
    v-if="instance || loading || saving || keepOnEmpty"
    name="default"
    v-bind="$props"
    :schema="schema"
    :instance="instance"
    :loading="loading"
    :saving="saving"
    :reload-data="reloadData"
    :save-data="saveData"
  />
  <!-- @slot Use this slot to render a component when no result is fetched -->
  <slot
    v-else
    name="empty"
    v-bind="$props"
    :schema="schema"
    :save-data="saveData"
  >
    {{ $t("Invalid or missing instance") }}
  </slot>
</template>

<script>
/**
 * Fetch a single resource instance and provide it to its children
 */
export default {
  name: "RbResourceInstance",

  props: {
    /**
     * The resource to fetch an instance from
     */
    resource: {
      type: Object,
      required: true,
    },

    /**
     * The identifier of the resource instance to fetch
     */
    id: {
      type: [Number, String],
      required: true,
    },

    /**
     * A dictionary of filters to apply when fetching the resource instance
     */
    filters: {
      type: Object,
      default: null,
    },

    /**
     * Show the default slot even when no result is fecthed
     */
    keepOnEmpty: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["error", "loaded", "saved"],

  data() {
    return {
      instance: null,
      loading: true,
      saving: false,
    };
  },

  computed: {
    schema() {
      let resourceSchema = {};
      if (
        this.id &&
        this.resource.updateSchema &&
        Object.keys(this.resource.updateSchema.properties).length > 0
      ) {
        resourceSchema = this.resource.updateSchema;
      } else if (
        this.resource.createSchema &&
        Object.keys(this.resource.createSchema.properties).length > 0
      ) {
        resourceSchema = this.resource.createSchema;
      }
      return {
        type: "object",
        required: resourceSchema.required || [],
        additionalProperties: resourceSchema.additionalProperties || false,
        properties: {
          ...resourceSchema.properties,
        },
      };
    },
  },

  watch: {
    resource: {
      handler(val, old) {
        if (val !== old) {
          val && val.addListener(this.reloadData);
          old && old.removeListener(this.reloadData);
          this.reloadData();
        }
      },
      // force registering listener on first load
      immediate: true,
    },

    filters(val, old) {
      if (JSON.stringify(val) !== JSON.stringify(old)) {
        this.reloadData();
      }
    },

    id(val, old) {
      if (val !== old) {
        this.reloadData();
      }
    },
  },

  beforeUnmount() {
    this.abort?.abort();
    this.resource.removeListener(this.reloadData);
  },

  methods: {
    /**
     * Refetch the current resource instance
     *
     * On success, a `loaded` event is emitted.
     * On error, a `error` event is emitted.
     *
     * @public
     */
    async reloadData() {
      if (!this.resource || this.loading) {
        return;
      }
      this.abort?.abort();
      try {
        this.loading = true;
        if (this.id) {
          const params = {
            filters: {
              ...this.filters,
              ...this.resource.defaultParams.filters,
            },
            abort: new AbortController(),
          };
          this.abort = params.abort;
          const res = await this.resource.getOne(this.id, params);
          this.instance = res.data;
        } else {
          this.instance = {};
        }
        this.$emit("loaded", this.instance);
      } catch (err) {
        this.$emit("error", err);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Store changes to the current resource instance
     *
     * If a `key` value is not set on the resource instance,
     * the resource `createOne()` method will be called.
     * If a `key` value is set, the resource `updateOne()`
     * method will be called instaed.
     *
     * On success, a `saved` event is emitted.
     * On error, a `error` event is emitted.
     *
     * @public
     * @param {Object} data The resource instance data to save
     */
    async saveData(data) {
      if (!this.resource || this.saving) {
        return;
      }
      try {
        this.saving = true;
        let res = {};
        if (this.id) {
          data[this.resource.key || "id"] = this.id;
          res = await this.resource.updateOne(this.id, data);
        } else {
          res = await this.resource.createOne(data);
        }
        this.instance = res.data;
        this.$emit("saved", this.instance);
      } catch (err) {
        this.$emit("error", err);
      } finally {
        this.saving = false;
      }
    },
  },
};
</script>
