<template>
  <q-card class="q-pa-xs-sm q-pa-md-lg shadow-1">
    <slot name="header">
      <q-card-section class="flex flex-center">
        <q-avatar size="128px">
          <img src="~assets/logo.svg">
        </q-avatar>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">{{ $t('Recover password') }}</div>
      </q-card-section>
    </slot>

    <slot name="form">
      <q-card-section class="column q-gutter-md">
        <q-input
          filled
          required
          v-model="email"
          :label="$t('Email')"
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
          :label="$t('Recover')"
          @click="onRecoverPassword"
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
      email: null
    }
  },

  methods: {
    onRecoverPassword () {
      this.$emit('recover-password', this.email);
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
