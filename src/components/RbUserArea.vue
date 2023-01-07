<template>
  <div class="row items-center q-gutter-sm">
    <div v-if="showIdentity">
      {{ userIdentity }}
    </div>
    <q-btn class="q-ml-sm" flat round dense :icon="icon">
      <slot name="menu" v-bind="$props">
        <rb-user-menu
          :avatar="userAvatar"
          :identity="userIdentity"
          :tenant-identity="tenantIdentity"
          @profile="(evt) => $emit('profile', evt)"
          @logout="(evt) => $emit('logout', evt)"
        />
      </slot>
    </q-btn>
  </div>
</template>

<script>
import RbUserMenu from "../components/RbUserMenu.vue";

export default {
  name: "RbUserArea",

  components: {
    RbUserMenu,
  },

  props: {
    showIdentity: {
      type: Boolean,
    },

    userAvatar: {
      type: String,
      default: null,
    },

    userIdentity: {
      type: String,
      default: null,
    },

    tenantIdentity: {
      type: String,
      default: null,
    },

    icon: {
      type: String,
      default: "account_circle",
    },
  },

  emits: ["profile", "logout"],
};
</script>
