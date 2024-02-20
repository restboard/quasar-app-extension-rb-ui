<template>
  <q-card class="column no-wrap">
    <!-- @slot Use this slot to customize the header section -->
    <slot name="header" v-bind="{ ...$props, ...$attrs }">
      <q-toolbar :class="headerClass">
        <q-toolbar-title>
          <!-- @slot Use this slot to customize the title section of the header -->
          <slot name="header-title" v-bind="{ ...$props, ...$attrs, title }">
            <q-skeleton v-if="loading" type="text" width="150px" />
            <template v-else>{{ title }}</template>
          </slot>
        </q-toolbar-title>
        <!-- @slot Use this slot to render additional actions in the header -->
        <slot name="header-actions" v-bind="{ ...$props, ...$attrs }">
          <rb-action-menu
            v-if="!hideResourceActions"
            :actions="resource.getActions()"
            :hidden-actions="hiddenResourceActions"
            :instance="modelValue"
          />
        </slot>
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

    <q-card-section class="scroll" style="flex: 1; max-width: 100%">
      <component
        :is="formComponent"
        v-bind="formProps"
        :model-value="modelValue"
        :resource="resource"
        :schema="schema"
        :class="formClass"
        :loading="loading"
        :saving="saving"
        @validation="onValidation"
        @update:model-value="onModelUpdate"
      />
    </q-card-section>

    <!-- @slot Use this slot to customize the bottom actions section -->
    <slot name="actions" v-bind="{ ...$props, ...$attrs }">
      <q-separator />

      <q-card-actions :class="actionsClass">
        <!-- @slot Use this slot to customize the submit action -->
        <slot name="submit-action" v-bind="{ ...$props, ...$attrs }">
          <q-skeleton v-if="loading" type="QBtn" />
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
        <!-- @slot Use this slot to customize the reset action -->
        <slot name="reset-action" v-bind="{ ...$props, ...$attrs }">
          <q-skeleton v-if="loading" type="QBtn" />
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
      </q-card-actions>
    </slot>
  </q-card>
</template>

<script>
import RbActionMenu from "../components/RbActionMenu.vue";

/**
 * A card-like wrapper for a resource form
 */
export default {
  name: "RbFormWrapper",

  components: {
    RbActionMenu,
  },

  beforeRouteUpdate(to, from, next) {
    this.askForConfirm().then((ok) => (ok ? next() : next(false)));
  },

  beforeRouteLeave(to, from, next) {
    this.askForConfirm().then((ok) => (ok ? next() : next(false)));
  },

  props: {
    /**
     * The resource to show the form for
     */
    resource: {
      type: Object,
      required: true,
    },

    /**
     * The resource instance shown in the form
     */
    modelValue: {
      type: Object,
      required: true,
    },

    /**
     * Put the form into 'loading' state
     */
    loading: {
      type: Boolean,
      default: false,
    },

    /**
     * Put the form into 'saving' state
     */
    saving: {
      type: Boolean,
      default: false,
    },

    /**
     * If true, show a form dismiss button
     */
    dismissible: {
      type: Boolean,
      default: false,
    },

    /**
     * Hide the resource action menu in the header
     */
    hideResourceActions: {
      type: Boolean,
      default: false,
    },

    /**
     * The list of resource actions to always hide
     */
    hiddenResourceActions: {
      type: Array,
      default: () => ["create", "edit"],
    },

    /**
     * The CSS classes to apply to the header section
     */
    headerClass: {
      type: [String, Object],
      default: "",
    },

    /**
     * The CSS classes to apply to the form section
     */
    formClass: {
      type: [String, Object],
      default: "",
    },

    /**
     * The additional props to pass to the form section
     */
    formProps: {
      type: Object,
      default: () => ({}),
    },

    /**
     * The CSS classes to apply to the bottom actions section
     */
    actionsClass: {
      type: [String, Object],
      default: "row reverse items-center justify-between q-gutter-md q-pa-md",
    },

    /**
     * The title of the confirm dialog to show when the form has pending changes
     */
    discardChangesTitle: {
      type: [String, Object],
      default: "Are you sure?",
    },

    /**
     * The message of the confirm dialog to show when the form has pending changes
     */
    discardChangesMsg: {
      type: [String, Object],
      default: "All pending, unsaved changes will be permanently lost!",
    },
  },

  emits: [
    /** This event is sent when the form has been submitted */
    "submit",

    /** This event is sent when the form has been dismissed */
    "dismiss",
  ],

  data() {
    return {
      model: {},
      isValid: true,
    };
  },

  computed: {
    title() {
      if (this.isUpdating) {
        if (!this.resource.ui.updateTitle) {
          return this.resource.stringify(this.modelValue) || this.$t("Update");
        }
        if (typeof this.resource.ui.updateTitle === "function") {
          return this.resource.ui.updateTitle(this.modelValue);
        }
        return this.$t(this.resource.ui.updateTitle);
      } else {
        if (!this.resource.ui.createTitle) {
          return this.$t("Create");
        }
        if (typeof this.resource.ui.createTitle === "function") {
          return this.resource.ui.createTitle(this.modelValue);
        }
        return this.$t(this.resource.ui.createTitle);
      }
    },

    isUpdating() {
      return !!this.resource.getKey(this.modelValue || {});
    },

    formComponent() {
      return this.isUpdating
        ? this.resource.ui.updateFormComponent
        : this.resource.ui.createFormComponent;
    },

    schema() {
      return this.isUpdating
        ? this.resource.updateSchema
        : this.resource.createSchema;
    },

    hasChanges() {
      const valueRepr = JSON.stringify(this.modelValue);
      const modelRepr = JSON.stringify(this.model);
      return valueRepr !== modelRepr;
    },

    canReset() {
      return this.hasChanges;
    },

    canSave() {
      return this.hasChanges && this.isValid && !this.loading && !this.saving;
    },
  },

  watch: {
    modelValue: function () {
      this.resetData();
    },
  },

  mounted() {
    this.resetData();
  },

  methods: {
    resetData() {
      this.model = JSON.parse(JSON.stringify(this.modelValue));
    },

    onModelUpdate(val) {
      this.model = val;
    },

    async onValidation(val) {
      this.isValid = val;
    },

    async onSave() {
      const data = { ...this.model };
      this.$emit("submit", data);
    },

    async onReset() {
      const confirmDismiss = await this.askForConfirm();
      if (confirmDismiss) {
        this.resetData();
      }
    },

    async onCancel() {
      const confirmDismiss = await this.askForConfirm();
      if (confirmDismiss) {
        this.$emit("dismiss");
      }
    },

    async askForConfirm() {
      if (!this.hasChanges) {
        return true;
      }
      return new Promise((resolve, reject) => {
        try {
          this.$q
            .dialog({
              title: this.discardChangesTitle,
              message: this.discardChangesMsg,
              cancel: true,
              persistent: true,
            })
            .onOk(() => resolve(true))
            .onCancel(() => resolve(false));
        } catch (err) {
          reject(err);
        }
      });
    },
  },
};
</script>
