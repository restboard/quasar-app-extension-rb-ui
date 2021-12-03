<template>
  <div>
    <slot
      v-if="instance || loading || saving"
      name="default"
      v-bind="$props"
      :schema="schema"
      :instance="instance"
      :loading="loading"
      :saving="saving"
    >
    </slot>
    <slot
      v-else
      name="empty"
    >
      Invalid or missing instance
    </slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RbResourceInstance',

  props: {
    resource: {
      type: Object,
      required: true
    },

    id: {
      type: [Number, String],
      required: true
    }
  },

  computed: {
    schema () {
      let resourceSchema = {}
      if (
        this.id &&
        this.resource.updateSchema &&
        Object.keys(this.resource.updateSchema.properties).length > 0
      ) {
        resourceSchema = this.resource.updateSchema
      } else if (
        this.resource.createSchema &&
        Object.keys(this.resource.createSchema.properties).length > 0
      ) {
        resourceSchema = this.resource.createSchema
      }
      return {
        type: 'object',
        required: resourceSchema.required || [],
        additionalProperties: resourceSchema.additionalProperties || false,
        properties: {
          ...resourceSchema.properties
        }
      }
    }
  },

  data () {
    return {
      instance: null,
      loading: true,
      saving: false
    }
  },

  mounted () {
    this.reloadData()
  },

  methods: {
    async reloadData () {
      this.loading = true
      try {
        if (this.id) {
          const res = await this.resource.getOne({ id: this.id })
          this.instance = res.data
        } else {
          this.instance = {}
        }
      } catch (err) {
        this.$emit('error', err)
        this.instance = null
      }
      this.loading = false
      this.$emit('loaded', this.instance)
    },

    async saveData (data) {
      this.saving = true
      let res = {}
      try {
        if (this.id) {
          data[this.resource.key || 'id'] = this.id
          res = await this.resource.updateOne(data)
        } else {
          res = await this.resource.createOne(data)
        }
        this.instance = res.data
      } catch (err) {
        this.$emit('error', err)
        this.instance = null
      }
      this.saving = false
      this.$emit('saved', this.instance)
    }
  },

  watch: {
    resource: function () {
      this.reloadData()
    },

    id () {
      this.reloadData()
    }
  }
})
</script>
