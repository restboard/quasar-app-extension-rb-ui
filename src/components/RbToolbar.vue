<template>
  <q-toolbar>
    <q-btn
      flat
      dense
      round
      aria-label="Menu"
      :icon="isMenuOpen ? 'menu_open' : 'menu'"
      @click="onToggleMenu"
    />

    <q-toolbar-title
      class="row col-auto items-center q-gutter-md cursor-pointer"
      @click="onGoHome"
    >
      <img
        v-if="logoSrc"
        :src="logoSrc"
        height="40"
        :alt="title || 'logo'"
      />
      <span :class="{ 'gt-xs': !!logoSrc }">{{ title }}</span>
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
    },
    logoSrc: {
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
