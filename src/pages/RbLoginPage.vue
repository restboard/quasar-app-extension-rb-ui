<template>
  <q-card class="q-pa-sm shadow-1">
    <slot name="header">
      <q-card-section class="column items-center q-gutter-md">
        <q-avatar size="128px">
          <img src="~assets/logo.svg">
        </q-avatar>
        <div class="text-h6">{{ $t('Sign in') }}</div>
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
        <q-input
          filled
          required
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
          :label="$t('Password')"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div class="row justify-between">
          <q-checkbox
            dense
            v-model="keepLogged"
            :label="$t('Remember me')"
          />
          <q-btn
            flat
            dense
            no-caps
            :label="$t('Forgot password?')"
            @click="onForgotPassword"
          />
        </div>
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
          :label="$t('Sign in')"
          @click="onLoginClicked"
        />
      </q-card-actions>
    </slot>
  </q-card>
</template>

<script >
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RbLoginPage',

  data () {
    return {
      username: null,
      password: null,
      isPwd: true,
      keepLogged: false
    }
  },

  methods: {
    onLoginClicked () {
      this.$emit('login', {
        username: this.username,
        password: this.password,
        keepLogged: this.keepLogged
      });
    },

    onForgotPassword () {
      this.$emit('forgot-password');
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
