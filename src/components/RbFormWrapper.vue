<template>
  <q-card class="column">
    <slot
      name="header"
      v-bind="{...$props, ...$attrs}"
    >
      <q-toolbar>
        <q-toolbar-title>
          <q-skeleton
            v-if="loading"
            type="text"
            width="150px"
          />
          <span
            v-else
            class="text-h6"
          >{{ title }}</span>
        </q-toolbar-title>
        <q-btn
          v-if="dismissible"
          flat
          round
          dense
          icon="close"
          @click="onCancel"
        />
      </q-toolbar>

      <q-separator />
    </slot>

    <q-card-section
      class="scroll"
      style="flex:1; max-width: 100%"
    >
      <component
        :is="formComponent"
        :class="formClass"
        :loading="loading"
        :saving="saving"
        v-model="model"
        @validation="onValidation"
      />
    </q-card-section>

    <slot
      name="actions"
      v-bind="{...$props, ...$attrs}"
    >
      <q-separator />

      <q-card-section>
        <div class="flex row reverse justify-between">
          <slot
            name="submit-action"
            v-bind="{...$props, ...$attrs}"
          >
            <q-skeleton
              v-if="loading"
              type="QBtn"
            />
            <q-btn
              v-else
              type="submit"
              color="primary"
              :label="$t('Save')"
              :loading="saving"
              :disable="!canSave"
              @click="onSave"
            />
          </slot>
          <slot
            name="reset-action"
            v-bind="{...$props, ...$attrs}"
          >
            <q-skeleton
              v-if="loading"
              type="QBtn"
            />
            <q-btn
              v-else
              flat
              type="reset"
              color="primary"
              :label="$t('Reset')"
              :disable="!canReset"
              @click="onReset"
            />
          </slot>
        </div>
      </q-card-section>
    </slot>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RbFormWrapper',

  props: {
    resource: {
      type: Object,
      required: true
    },

    id: {
      type: [Number, String],
      required: true
    },

    modelValue: {
      type: Object,
      required: true
    },

    loading: {
      type: Boolean,
      default: false
    },

    saving: {
      type: Boolean,
      default: false
    },

    dismissible: {
      type: Boolean,
      default: false
    },

    formClass: {
      type: String,
      default: 'full-width column q-gutter-y-md'
    }
  },

  computed: {
    title () {
      if (this.id) {
        if (!this.resource.ui.updateTitle) {
          return this.$t(`Update #${this.id}`)
        }
        if (typeof this.resource.ui.updateTitle === 'function') {
          return this.resource.ui.updateTitle(this.modelValue)
        }
        return this.$t(this.resource.ui.updateTitle)
      } else {
        if (!this.resource.ui.createTitle) {
          return this.$t(`Create`)
        }
        if (typeof this.resource.ui.createTitle === 'function') {
          return this.resource.ui.createTitle(this.modelValue)
        }
        return this.$t(this.resource.ui.createTitle)
      }
    },

    formComponent () {
      const key = this.resource.getKey(this.model)
      return key
        ? this.resource.ui.updateFormComponent
        : this.resource.ui.createFormComponent
    },

    hasChanges () {
      const valueRepr = JSON.stringify(this.modelValue)
      const modelRepr = JSON.stringify(this.model)
      return valueRepr !== modelRepr
    },

    canReset () {
      return this.hasChanges
    },

    canSave () {
      return (
        this.hasChanges &&
        this.isValid &&
        !this.loading &&
        !this.saving
      )
    }
  },

  data () {
    return {
      model: {},
      isValid: true
    }
  },

  mounted () {
    this.resetData()
  },

  methods: {
    resetData () {
      this.model = { ...this.modelValue }
    },

    async onValidation (val) {
      this.isValid = val
    },

    async onSave () {
      const data = { ...this.model }
      this.$emit('submit', data)
    },

    async onReset () {
      this.resetData()
    },

    async onCancel () {
      let confirmDismiss = true
      if (this.hasChanges) {
        confirmDismiss = await this.askForConfirm()
      }
      if (confirmDismiss) {
        this.$emit('dismiss')
      }
    },

    async askForConfirm () {
      return new Promise((resolve, reject) => {
        try {
          this.$q.dialog({
            title: this.$t('Are you really sure?'),
            message: this.$t('All pending, unsaved changes will be permanently lost!'),
            cancel: true,
            persistent: true
          })
            .onOk(() => resolve(true))
            .onCancel(() => resolve(false))
        } catch (err) {
          reject(err)
        }
      })
    }
  },

  watch: {
    modelValue: function () {
      this.resetData()
    }
  }
})
</script>
