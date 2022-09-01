<template>
    <q-input v-model="value" :mask="inputMask" :placeholder="mask" :label="label" :error="error" @blur="$emit('blur')">
      <template v-slot:append>
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
                    flat
                    v-close-popup
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
  export default {
    name: 'RbDateTimeInput',
  
    emits: ['blur', 'update:modelValue'],
  
    props: {
      modelValue: {
        type: String,
        default: ''
      },
  
      dateMask: {
        type: String,
        default: 'YYYY-MM-DD'
      },
  
      timeMask: {
        type: String,
        default: 'HH:mm'
      },
  
      maskSeparator: {
        type: String,
        default: ' '
      },
  
      timeFirst: {
        type: Boolean,
        default: false
      },
  
      label: {
        type: String,
        default: ' '
      },
  
      parse: {
        type: Function,
        default: val => `${val}`
      },
  
      serialize: {
        type: Function,
        default: val => `${val}`
      },
  
      options: {
        type: [Array, Function],
        default: null
      },
  
      error: {
        type: Boolean,
        default: false
      }
    },
  
    computed: {
      mask () {
        const parts = []
        if (this.dateMask) {
          parts.push(this.dateMask)
        }
        if (this.timeMask) {
          parts.push(this.timeMask)
        }
        if (this.timeFirst) {
          parts.reverse()
        }
        return parts.join(this.maskSeparator).trim()
      },
  
      inputMask () {
        return this.mask.replace(/[\w]/g, '#')
      }
    },
  
    data () {
      return {
        value: this.parse(this.modelValue)
      }
    },
  
    methods: {
      optionsFn (val) {
        if (this.options) {
          return this.options(val)
        }
        return !!val
      }
    },
  
    watch: {
      modelValue () {
        this.value = this.parse(this.modelValue)
      },
  
      value () {
        if (!this.value) {
          this.$emit('update:modelValue', null)
        } else if (this.value.length === this.mask.length) {
          const serialized = this.serialize(this.value)
          this.$emit('update:modelValue', serialized)
        }
      }
    }
  }
  </script>
  