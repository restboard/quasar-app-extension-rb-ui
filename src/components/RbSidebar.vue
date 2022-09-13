<template>
  <q-list :separator="separator">
    <slot
      name="header"
      :resources="resources"
      :visibile-resources="visibileResources"
    />

    <slot
      name="menu"
      :resources="resources"
      :visibile-resources="visibileResources"
    >
      <slot name="menu-root-item">
        <q-item v-if="!hideRootLink" v-ripple clickable to="/" exact>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>{{ $t("Dashboard") }}</q-item-section>
        </q-item>
      </slot>
      <slot
        v-for="resource in visibileResources"
        :key="resource.name"
        :name="`menu-resource-${resource.name}-item`"
        :resource="resource"
      >
        <q-item v-ripple :to="`/${resource.name}`" clickable>
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
      :visibile-resources="visibileResources"
    />
  </q-list>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "RbSidebar",

  props: {
    resources: {
      type: Array,
      default: () => [],
    },

    separator: {
      type: Boolean,
      default: true,
    },

    hideRootLink: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    visibileResources() {
      return Array.from(this.resources || []).filter(
        (resource) => !resource.ui.excludeSidebar
      );
    },
  },
});
</script>
