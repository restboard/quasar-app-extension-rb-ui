<template>
  <div class="row q-gutter-sm">
    <div v-if="showIdentity">
      {{ userIdentity }}
    </div>
    <q-btn
      class="q-ml-sm"
      flat
      round
      dense
      :icon="icon"
    >
      <slot
        name="menu"
        v-bind="$props"
      >
        <rb-user-menu
          :avatar="userAvatar"
          :identity="userIdentity"
          :tenantIdentity="tenantIdentity"
          @profile="evt => $emit('profile', evt)"
          @logout="evt => $emit('logout', evt)"
        />
      </slot>
    </q-btn>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import RbUserMenu from '../components/RbUserMenu.vue'

export default defineComponent({
  name: 'RbUserArea',

  components: {
    RbUserMenu
  },

  props: {
    showIdentity: {
      type: Boolean
    },
    userAvatar: {
      type: String
    },
    userIdentity: {
      type: String
    },
    tenantIdentity: {
      type: String
    },
    icon: {
      type: String,
      default: 'account_circle'
    }
  }
})
</script>
