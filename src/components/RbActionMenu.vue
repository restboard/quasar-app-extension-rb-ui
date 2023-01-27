<template>
  <div v-if="visibleActions" class="row no-wrap items-center">
    <!-- @slot Use this slot to add additional content before the action menu -->
    <slot name="before" />
    <template v-if="visibleActions.length <= collapseAfter">
      <q-btn
        v-for="action in visibleActions"
        :key="action.name"
        flat
        :size="size"
        :round="!action.alwaysShowLabel || !action.label"
        :rounded="!!(action.alwaysShowLabel && action.label)"
        :class="action.class || actionClass"
        :disable="action.disable"
        :icon="action.icon"
        :label="action.alwaysShowLabel && $t(action.label)"
        @click.stop="executeAction(action)"
      />
    </template>
    <q-btn
      v-else
      round
      flat
      icon="more_vert"
      :class="actionClass"
      :size="size"
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
              @click="executeAction(action)"
            >
              <q-item-section>{{ $t(action.label) }}</q-item-section>
              <q-item-section avatar>
                <q-icon :class="action.class" :name="action.icon" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </q-popup-proxy>
    </q-btn>
    <!-- @slot Use this slot to add additional content after the action menu -->
    <slot name="after" />
  </div>
</template>

<script>
import { format } from "quasar";

const { capitalize } = format;

/**
 * A dropdown menu of executable actions
 */
export default {
  name: "RbActionMenu",

  props: {
    /**
     * A dictionary of actions to show
     */
    actions: {
      type: Object,
      default: null,
    },

    /**
     * The instance the actions will be executed on
     */
    instance: {
      type: Object,
      default: null,
    },

    /**
     * The transition used when showing the action menu.
     */
    transitionShow: {
      type: String,
      default: "scale",
    },

    /**
     * The transition used when hiding the action menu
     */
    transitionHide: {
      type: String,
      default: "scale",
    },

    /**
     * The number of actions to show before collapsing them in the action menu
     */
    collapseAfter: {
      type: Number,
      default: 3,
    },

    /**
     * The size used for action buttons
     */
    size: {
      type: String,
      default: "sm",
    },

    /**
     * The CSS classes used for action buttons
     */
    actionClass: {
      type: [String, Object],
      default: "",
    },
  },

  computed: {
    actionParams() {
      return {
        quasar: this.$q,
        router: this.$router,
        store: this.$store,
        translate: this.$t.bind(this),
      };
    },

    visibleActions() {
      if (!this.instance) {
        return [];
      }
      return (
        Object.keys(this.actions)
          // Filter out invisible actions
          .filter((actionName) => {
            const action = this.actions[actionName];
            return (
              // An action is visible if there are no specific rules set...
              !action.isVisible ||
              // ...or if the "isVisible" method returns true
              action.isVisible(this.instance, this.actionParams)
            );
          })
          // Enrich action details
          .map((actionName) => {
            const action = this.actions[actionName];
            let label = action.label;
            if (label && typeof action.label !== "string") {
              label = label(this.instance, this.actionParams);
            }
            return {
              ...action,
              label: label || capitalize(actionName),
              name: actionName,
            };
          })
      );
    },
  },

  methods: {
    /**
     * Execute the given action on the current instance
     *
     * @public
     * @param {Object|Function} action - The action to execute
     * @returns {mixed} The action result (if any)
     */
    executeAction(action) {
      if (action.run) {
        return action.run(this.instance, this.actionParams);
      } else {
        return action(this.instance, this.actionParams);
      }
    },
  },
};
</script>
