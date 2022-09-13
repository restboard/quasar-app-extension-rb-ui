<template>
  <div>
    <slot v-if="isEmpty && !loading" name="empty">
      {{ $t("No results") }}
    </slot>
    <div
      v-for="(itemRow, rowIdx) in itemRows"
      v-else
      :key="rowIdx"
      :class="`row q-col-gutter-${gutter} q-mb-${gutter}`"
    >
      <div
        v-for="(item, colIdx) in itemRow"
        :key="colIdx"
        class="col"
        :style="`min-height:${itemHeight}`"
      >
        <template v-if="loading">
          <slot name="skeleton">
            <div class="fit flex flex-center">
              <q-spinner color="primary" size="3em" />
            </div>
          </slot>
        </template>
        <template v-else>
          <slot v-if="item" :item="item" :row="rowIdx" :col="colIdx">
            {{ rowIdx }} / {{ colIdx }}
          </slot>
          <slot v-else name="empty-item" :row="rowIdx" :col="colIdx">
            <div class="empty-item fit" />
          </slot>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "RbDataGrid",

  props: {
    items: {
      type: Array,
      default: () => [],
    },

    itemsPerRow: {
      type: Number,
      default: 4,
    },

    loading: {
      type: Boolean,
      default: false,
    },

    gutter: {
      type: String,
      default: "md",
    },

    itemHeight: {
      type: String,
      default: "280px",
    },

    skeletonRows: {
      type: Number,
      default: 2,
    },
  },

  computed: {
    itemCount() {
      return this.items && this.items.length;
    },

    isEmpty() {
      return !this.itemCount;
    },

    rowCount() {
      if (!this.itemsPerRow) {
        return 0;
      }
      return Math.ceil(this.itemCount / this.itemsPerRow);
    },

    itemRows() {
      if (this.loading) {
        return Array(this.skeletonRows).fill(Array(this.itemsPerRow));
      }

      const res = [];
      const size = this.itemsPerRow;
      const rowCount = this.rowCount;
      for (let i = 0; i < rowCount; ++i) {
        const start = i * size;
        const end = start + size;
        const rowItems = this.items.slice(start, end);
        const filler = new Array(size - rowItems.length).fill(null);
        res.push(rowItems.concat(filler));
      }

      return res;
    },
  },
});
</script>

<style scoped lang="sass">
.empty-item
  border: 2px dashed $separator-color
  border-radius: $button-rounded-border-radius
</style>
