<template>
  <q-input
    v-model="value"
    :mask="inputMask"
    :placeholder="mask"
    @blur="$emit('blur')"
  >
    <template #append>
      <div class="row q-col-gutter-xs" :class="{ reverse: timeFirst }">
        <q-icon
          v-if="dateMask && !$attrs.disable && !$attrs.readonly"
          name="event"
          class="cursor-pointer"
        >
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="value" :mask="mask" :options="optionsFn">
              <div class="row items-center justify-end">
                <q-btn
                  v-close-popup
                  flat
                  color="primary"
                  :label="$t('Close')"
                />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
        <q-icon
          v-if="timeMask && !$attrs.disable && !$attrs.readonly"
          name="access_time"
          class="cursor-pointer"
        >
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time v-model="value" :mask="mask" :format24h="!ampm">
              <div class="row items-center justify-end">
                <q-btn
                  v-close-popup
                  :label="$t('close')"
                  color="primary"
                  flat
                />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </div>
    </template>
  </q-input>
</template>

<script>
import { date } from "quasar";

/**
 * A date and/or time input with support for custom formats
 */
export default {
  name: "RbDateTimeInput",

  props: {
    /**
     * The current date and/or time value
     */
    modelValue: {
      type: [Date, String],
      default: null,
    },

    /**
     * The mask used to format the date part (if null, the input will disable the selection of the date)
     */
    dateMask: {
      type: String,
      default: "YYYY-MM-DD",
    },

    /**
     * The mask used to format the time part (if null, the input will disable the selection of the time)
     */
    timeMask: {
      type: String,
      default: "HH:mm",
    },

    /**
     * The separator used between the date and time masks
     */
    maskSeparator: {
      type: String,
      default: " ",
    },

    /**
     * Move the time part in front of the date part
     */
    timeFirst: {
      type: Boolean,
      default: false,
    },

    /**
     * Force AM/PM system instead of 24 hour time display
     */
    ampm: {
      type: Boolean,
      default: false,
    },

    /**
     * An array of valid date/time values to show as enabled (if a function is given, it should follow this signature: `val => boolean`)
     */
    options: {
      type: [Array, Function],
      default: null,
    },

    /**
     * A function used to parse the passed model value to a valid Date object
     */
    parse: {
      type: Function,
      default: (val, mask) =>
        val ? (val instanceof Date ? val : date.extractDate(val, mask)) : null,
    },

    /**
     * A function used to serialize the internal value to the correct external format
     */
    serialize: {
      type: Function,
      default: (val, mask) => val || null,
    },
  },

  emits: ["blur", "update:model-value", "update:dt"],

  data() {
    return {
      value: null,
    };
  },

  computed: {
    mask() {
      const parts = [];
      if (this.dateMask) {
        parts.push(this.dateMask);
      }
      if (this.timeMask) {
        parts.push(this.timeMask);
      }
      if (this.timeFirst) {
        parts.reverse();
      }
      return parts.join(this.maskSeparator).trim();
    },

    inputMask() {
      return this.mask?.replace(/[\w]/g, "#") || null;
    },
  },

  watch: {
    modelValue: {
      handler(val) {
        const oldValue = this.value;
        const dt = this.parse(val, this.mask);
        const value = dt ? date.formatDate(dt, this.mask) : null;
        if (value !== oldValue) {
          this.value = value;
          this.$emit("update:dt", dt);
        }
      },
      immediate: true,
    },

    value(val, old) {
      if (val === old) {
        return;
      }
      if (!val) {
        this.$emit("update:model-value", null);
      } else if (val.length === this.mask.length) {
        this.$emit("update:model-value", this.serialize(val, this.mask));
      }
    },
  },

  methods: {
    optionsFn(val) {
      if (!this.options) {
        return !!val;
      }
      if (Array.isArray(this.options)) {
        return this.options.includes(val);
      }
      return this.options(val);
    },
  },
};
</script>
