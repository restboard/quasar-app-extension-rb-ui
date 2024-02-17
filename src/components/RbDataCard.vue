<template>
  <q-card>
    <q-card-section>
      <!-- @slot Use this slot to customize what should be rendered during loading -->
      <slot v-if="loading" name="skeleton" v-bind="$props">
        <q-skeleton type="rect" style="max-width: 200px" />
      </slot>
      <!-- @slot Use this slot to customize the card header -->
      <slot v-else name="header" v-bind="$props">
        <div class="row no-wrap q-col-gutter-sm">
          <div class="col">
            <!-- @slot Use this slot to customize the header overline section -->
            <slot v-if="overline" name="header-overline" v-bind="$props">
              <div class="text-overline" :class="overlineClass">
                {{ overline }}
              </div>
            </slot>

            <!-- @slot Use this slot to customize the header title section -->
            <slot v-else name="header-title" v-bind="$props">
              <div class="text-subtitle1" :class="titleClass">
                {{ title }}
              </div>
            </slot>
          </div>

          <div class="col-auto">
            <!-- @slot Use this slot to customize the header actions section -->
            <slot name="header-actions" v-bind="$props" />
          </div>
        </div>

        <!-- @slot Use this slot to customize the header title section -->
        <slot v-if="overline" name="header-title" v-bind="$props">
          <div class="text-subtitle1" :class="titleClass">
            {{ title }}
          </div>
        </slot>

        <!-- @slot Use this slot to customize the header subtitle section -->
        <slot v-if="subtitle" name="header-subtitle" v-bind="$props">
          <div class="text-subtitle2" :class="subtitleClass">
            {{ subtitle }}
          </div>
        </slot>
      </slot>
    </q-card-section>

    <!-- @slot Use this slot to add content to the card -->
    <slot v-bind="$props" />

    <!-- @slot Use this slot to add content to the card footer -->
    <slot name="footer" v-bind="$props" />
  </q-card>
</template>

<script>
/**
 * A component used to render a content card
 *
 * It provides a standard layout for card header with support
 * for title, subtitle, overline and actions.
 */
export default {
  name: "RbDataCard",

  props: {
    /**
     * The content of the header overline section
     */
    overline: {
      type: String,
      default: null,
    },

    /**
     * The content of the header title section
     */
    title: {
      type: String,
      default: null,
    },

    /**
     * The content of the header subtitle section
     */
    subtitle: {
      type: String,
      default: null,
    },

    /**
     * The CSS classes to apply to the header overline section
     */
    overlineClass: {
      type: [String, Object],
      default: null,
    },

    /**
     * The CSS classes to apply to the header title section
     */
    titleClass: {
      type: [String, Object],
      default: null,
    },

    /**
     * The CSS classes to apply to the header subtitle section
     */
    subtitleClass: {
      type: [String, Object],
      default: null,
    },

    /**
     * If true, render the skeleton loading section instead
     */
    loading: {
      type: Boolean,
    },
  },
};
</script>
