<template>
  <q-list :separator="separator">
    <slot
      name="header"
      :resources="resources"
      :visibileResources="visibileResources"
    ></slot>

    <slot
      name="menu"
      :resources="resources"
      :visibileResources="visibileResources"
    >
      <slot name="menu-root-item">
        <q-item
          clickable
          v-ripple
          to="/"
          exact
          v-if="!hideRootLink"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>{{ $t('Dashboard') }}</q-item-section>
        </q-item>
      </slot>
      <slot
        v-for="resource in visibileResources"
        :key="resource.name"
        :name="`menu-resource-${resource.name}-item`"
        :resource="resource"
      >
        <q-item
          :to="resource.path"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon :name="resource.ui.icon" />
          </q-item-section>
          <q-item-section>{{ resource.label || resource.name }}</q-item-section>
        </q-item>
      </slot>
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

export default defineComponent({
  name: 'RbSidebar',

  props: {
    resources: {
      type: Array
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
      return Array.from(this.resources || [])
        .filter(resource => !resource.ui.excludeSidebar)
    }
  }
})
</script>
