<template>
  <q-list :separator="separator">
    <slot
      name="header"
      :resources="resources"
      :visibileResources="visibileResources"
    ></slot>

    <slot name="root" v-if="!hideRootLink">
      <q-item
        clickable
        v-ripple
        to="/"
        exact
      >
        <slot name="root-link">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>{{ $t('Dashboard') }}</q-item-section>
        </slot>
      </q-item>
    </slot>

    <slot
      name="resources"
      :resources="resources"
      :visibileResources="visibileResources"
    >
      <rb-resource-link
        v-for="resource in visibileResources"
        :key="resource.name"
        :resource="resource"
      />
    </slot>

    <slot
      name="footer"
      :resources="resources"
      :visibileResources="visibileResources"
    ></slot>
  </q-list>
</template>

<script>
import { defineComponent } from 'vue'
import RbResourceLink from '../components/RbResourceLink.vue'

export default defineComponent({
  name: 'RbSidebar',

  components: {
    RbResourceLink
  },

  props: {
    resources: {
      type: Object
    },

    separator: {
      type: Boolean,
      default: true
    },

    hideRootLink: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    visibileResources () {
      return Object.values(this.resources || {})
        .filter(resource => !resource.excludeSidebar)
    }
  }
})
</script>
