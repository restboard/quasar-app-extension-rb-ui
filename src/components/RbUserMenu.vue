<template>
  <q-menu transition-show="jump-down" transition-hide="jump-up">
    <div class="user-details column items-center q-pa-md">
      <q-avatar v-if="avatar" size="80px">
        <img alt="avatar" :src="avatar" />
      </q-avatar>
      <div class="text-subtitle2 q-mt-sm q-mb-xs">
        {{ identity }}
      </div>
      <div v-if="tenantIdentity" class="text-caption q-mb-xs">
        {{ tenantIdentity }}
      </div>
    </div>
    <q-separator />
    <q-list separator>
      <q-item clickable @click="$emit('profile')">
        <q-item-section>
          <q-item-label>{{ $t("My Profile") }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="badge" />
        </q-item-section>
      </q-item>

      <slot name="links" />

      <q-item clickable @click="$emit('logout')">
        <q-item-section>
          <q-item-label>{{ $t("Logout") }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="exit_to_app" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script>
export default {
  name: "RbUserMenu",

  props: {
    avatar: {
      type: String,
      default: null,
    },

    identity: {
      type: String,
      default: null,
    },

    tenantIdentity: {
      type: String,
      default: null,
    },
  },

  emits: ["profile", "logout"],
};
</script>

<style scoped lang="sass">
.user-details
  min-width: 250px !important
</style>
