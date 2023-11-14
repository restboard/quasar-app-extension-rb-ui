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
            <q-time v-model="value" :mask="mask" format24h>
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
      type: String,
      default: "",
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
     * A function used to parse the value to the correct internal format
     */
    parse: {
      type: Function,
      default: (val) => (val ? new Date(`${val}`) : null),
    },

    /**
     * A function used to serialize the internal value to the correct external format
     */
    serialize: {
      type: Function,
      default: (val) => (val ? new Date(`${val}`).toISOString() : null),
    },

    /**
     * An array of valid date/time values to show as enabled (if a function is given, it should follow this signature: `val => boolean`)
     */
    options: {
      type: [Array, Function],
      default: null,
    },
  },

  emits: ["blur", "update:modelValue"],

  data() {
    return {
      value: this.parse(this.modelValue),
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
      return this.mask.replace(/[\w]/g, "#");
    },
  },

  watch: {
    modelValue() {
      this.value = this.parse(this.modelValue);
    },

    value() {
      if (!this.value) {
        this.$emit("update:modelValue", null);
      } else if (this.value.length === this.mask.length) {
        const serialized = this.serialize(this.value);
        this.$emit("update:modelValue", serialized);
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
  