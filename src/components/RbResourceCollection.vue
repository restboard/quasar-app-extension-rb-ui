<template>
  <div>
    <slot
      v-if="items.length || loading"
      name="default"
      v-bind="$props"
      :items="items"
      :loading="loading"
      :hasMore="hasMore"
    >
    </slot>
    <slot
      v-else
      name="empty"
    >
      {{ $t("No results") }}
    </slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RbResourceCollection',

  props: {
    resource: {
      type: Object,
      required: true
    },

    filters: {
      type: Object
    },

    offset: {
      type: Number,
      default: 0
    },

    limit: {
      type: Number
    },

    paginated: {
      type: Boolean
    }
  },

  computed: {
    key () {
      return this.resource.key || 'id'
    }
  },

  data () {
    return {
      items: [],
      loading: true,
      hasMore: true
    }
  },

  mounted () {
    this.clearAndReloadData()
  },

  methods: {
    clear () {
      this.items = []
      this.hasMore = true
    },

    async reloadData () {
      this.loading = true
      let newItems = []
      try {
        const opts = {
          offset: this.offset || 0,
          filters: {
            ...this.filters,
            ...this.resource.defaultParams.filters
          }
        }
        if (this.paginated) {
          opts.offset += this.itemCount
        }
        if (this.limit) {
          opts.limit = this.limit
        }
        const res = await this.resource.getMany(opts)
        newItems = res.data || []
        this.hasMore = newItems.length === opts.limit
        if (this.paginated) {
          this.items.splice(this.itemCount, 0, newItems)
        } else {
          this.items = newItems
        }
      } catch (err) {
        this.$emit('error', err)
      }
      this.loading = false
      this.$emit('loaded', newItems ? newItems.length : 0)
    },

    async clearAndReloadData () {
      this.clear()
      return this.reloadData()
    }
  },

  watch: {
    resource: function () {
      this.clearAndReloadData()
    },

    filters: function () {
      this.clearAndReloadData()
    },

    offset: function () {
      this.clearAndReloadData()
    },

    limit: function () {
      this.clearAndReloadData()
    },

    '$route.query': function () {
      this.clearAndReloadData()
    }
  }
})
</script>
