<template>
  <component
    :is="itemComponent"
    clickable
    :icon="icon || resource.icon"
    :label="label || resource.label || resource.name"
    :caption="caption || resource.caption"
    :to="hasLinks ? null : mainLink"
    :key="resource.name"
    :disable="disable"
  >
    <q-list
      separator
      v-if="hasLinks"
    >
      <slot
        name="links"
        :resource="resource"
        :links="subLinks"
      >
        <q-item
          v-for="link in subLinks"
          :key="link.to"
          clickable
          v-ripple
          :inset-level="1"
          :to="link.to"
        >
          <q-item-section>{{ link.label }}</q-item-section>
        </q-item>
      </slot>
    </q-list>
    <template v-else>
      <q-item-section avatar>
        <q-icon :name="icon || resource.icon" />
      </q-item-section>
      <q-item-section>{{ label || resource.label || resource.name }}</q-item-section>
    </template>
  </component>
</template>

<script>
import { defineComponent } from 'vue'
import { QExpansionItem, QItem } from 'quasar'

export default defineComponent({
  name: 'RbResourceLink',

  props: {
    resource: {
      type: Object
    },

    links: {
      type: Array
    },

    linkResource: {
      type: Object
    },

    icon: {
      type: String,
      default: ''
    },

    label: {
      type: String,
      default: ''
    },

    caption: {
      type: String,
      default: ''
    },

    disable: {
      type: Boolean,
      default: false
    },

    separator: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    mainLink () {
      return this.link || `/${this.resource.name}`
    },

    hasLinks () {
      return (
        (this.links && this.links.length > 0) ||
        (this.linksFromResource && this.linksFromResource.length > 0)
      )
    },

    itemComponent () {
      return this.hasLinks
        ? QExpansionItem
        : QItem
    },

    subLinks () {
      return this.links || this.linksFromResource
    }
  },

  data () {
    return {
      linksFromResource: []
    }
  },

  mounted () {
    this.reloadLinksFromResource()
  },

  methods: {
    async reloadLinksFromResource () {
      if (this.linkResource) {
        const res = await this.linkResource.getMany()
        const linkSources = res.data || []
        this.linksFromResource = linkSources.map(instance => Object.freeze({
          label: this.linkResource.stringify(instance),
          to: this.linkResource.getPermalink(instance)
        }))
      } else {
        this.linksFromResource = []
      }
    }
  },

  watch: {
    linkResource: function () {
      this.reloadLinksFromResource()
    }
  }
})
</script>
