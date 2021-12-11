<template>
  <div
    class="row no-wrap items-center"
    v-if="visibleActions"
  >
    <slot name="before"></slot>
    <template v-if="visibleActions.length <= collpaseAfter">
      <q-btn
        v-for="action in visibleActions"
        :key="action.name"
        dense
        flat
        :round="!action.alwaysShowLabel || !action.label"
        :rounded="!!(action.alwaysShowLabel && action.label)"
        :class="action.class"
        :disable="action.disable"
        :icon="action.icon"
        :label="action.alwaysShowLabel && $t(action.label)"
        @click.stop="onActionClick(action)"
      />
    </template>
    <q-btn
      v-else
      round
      dense
      flat
      icon="more_vert"
      @click.stop
    >
      <q-popup-proxy
        auto-close
        :transition-show="transitionShow"
        :transition-hide="transitionHide"
      >
        <q-card>
          <q-list separator>
            <q-item
              v-for="action in visibleActions"
              :key="action.name"
              clickable
              :disable="action.disable"
              @click="onActionClick(action)"
            >
              <q-item-section>{{ $t(action.label) }}</q-item-section>
              <q-item-section avatar>
                <q-icon
                  :class="action.class"
                  :name="action.icon"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </q-popup-proxy>
    </q-btn>
    <slot name="after"></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { format } from 'quasar'

const { capitalize } = format

export default defineComponent({
  name: 'RbActionMenu',

  props: {
    actions: {
      type: Object
    },

    instance: {
      type: Object
    },

    transitionShow: {
      type: String,
      default: 'scale'
    },

    transitionHide: {
      type: String,
      default: 'scale'
    },

    collpaseAfter: {
      type: Number,
      default: 3
    }
  },

  computed: {
    actionParams () {
      return {
        quasar: this.$q,
        router: this.$router,
        store: this.$store,
        translate: this.$t.bind(this)
      }
    },

    visibleActions () {
      if (!this.instance) {
        return []
      }
      return Object.keys(this.actions)
        // Filter out invisible actions
        .filter(actionName => {
          const action = this.actions[actionName]
          return (
            // An action is visible if there are no specific rules set, or...
            Object.keys(action).indexOf('isVisible') === -1 ||
            // ...if the "isVisible" method returns true
            action.isVisible(this.instance, this.actionParams)
          )
        })
        // Enrich action details
        .map(actionName => {
          const action = this.actions[actionName]
          let label = action.label
          if (label && typeof action.label !== 'string') {
            label = label(this.instance, this.actionParams)
          }
          return {
            ...action,
            label: label || capitalize(actionName),
            name: actionName
          }
        })
    }
  },

  methods: {
    onActionClick (action) {
      if (action.run) {
        return action.run(this.instance, this.actionParams)
      } else {
        return action(this.instance, this.actionParams)
      }
    }
  }
})
</script>
