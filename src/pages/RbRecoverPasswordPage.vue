<template>
  <q-card class="q-pa-xs-sm q-pa-md-lg shadow-1">
    <slot name="header">
      <q-card-section class="column items-center q-gutter-md">
        <q-avatar size="128px">
          <img src="~assets/logo.svg">
        </q-avatar>
        <div class="text-h6">{{ $t('Password recovery') }}</div>
      </q-card-section>
    </slot>

    <slot name="form">
      <q-card-section class="column q-gutter-md">
        <q-input
          filled
          required
          v-model="username"
          :label="$t('Username or email')"
        />
      </q-card-section>
    </slot>

    <slot name="actions">
      <q-card-actions
        vertical
        class="q-pa-md"
      >
        <q-btn
          class="q-mb-sm"
          color="primary"
          :label="$t('Recover password')"
          @click="onRecoverPasswordRequest"
        />
      </q-card-actions>
    </slot>
  </q-card>
</template>

<script >
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RbRecoverPasswordPage',

  data () {
    return {
      username: null
    }
  },

  methods: {
    onRecoverPasswordRequest () {
      this.$emit('recover-password', {
        username: this.username
      });
    }
  }
})
</script>

<style scoped lang="sass">
.q-card
  min-width: 320px

  @media (min-width: $breakpoint-md-min)
    min-width: 400px
</style>
