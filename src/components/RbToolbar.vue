<template>
  <q-toolbar class="q-py-sm">
    <q-btn
      flat
      dense
      round
      aria-label="Menu"
      :icon="isMenuOpen ? 'menu_open' : 'menu'"
      @click="onToggleMenu"
    />

    <q-toolbar-title class="row items-center q-gutter-md">
      <img
        src="~assets/logo.svg"
        class="cursor-pointer"
        height="40"
        :alt="title || 'logo'"
        @click="onGoHome"
      />
      <div class="gt-xs">{{ title }}</div>
    </q-toolbar-title>

    <slot
      name="left"
      v-bind="$props"
    >
    </slot>

    <q-space />

    <slot
      name="default"
      v-bind="$props"
    >
    </slot>
  </q-toolbar>
</template>

<script>
export default {
  name: 'RbToolbar',

  props: {
    isMenuOpen: {
      type: Boolean
    },
    title: {
      type: String
    }
  },

  methods: {
    onGoHome () {
      this.$router.push('/')
    },

    onToggleMenu () {
      this.$emit('toggle-menu')
    }
  }
}
</script>
