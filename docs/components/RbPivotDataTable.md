# RbPivotDataTable

> A responsive pivot table to show aggregate groups of values

This component is useful to create reports, statistics, etc.

## Props

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| `modelValue` | `array` | The list of items to extract rows, columns and aggregate values from | `[]` |
| `accumulate` | `boolean` | If true, every cell will show the sum of values matching row and column | `false` |
| `header` | `string` | The string to show in the top-left cell of the pivot table | `""` |
| `rowKey` | `string, func` | The attribute to aggregate rows from, shown as row headers | `"id"` |
| `columnKey` | `string, func` | The attribute to aggregate columns from, shown as column headers | `"id"` |
| `cellKey` | `string, func|array` | The attribute to aggregate &#x2F; extract table cells from | `"id"` |
| `sortColumnsFn` | `func` | The function used to sort the table columns | `null` |
| `sumRowTotalFn` | `func` | The function used to sum each row total value | `` |
| `sumColumnTotalFn` | `func` | The function used to sum each column total value | `` |
| `formatFn` | `func` | The function used to format each table cell value | `` |
| `withRowTotal` | `boolean` | If true, an additional total value will be shown for each row | `` |
| `withColumnTotal` | `boolean` | If true, an additional total value will be shown for each column | `` |
| `withTotal` | `boolean` | If true, a grand total value will be shown at the bottom-right corner | `` |

## Slots

| Name | Description | Scoped |
| ---- | ----------- | ------ |
| `top-actions` | Use this slot to render additional actions on the top-right corner | true |
| `body-cell-cellKey` | Use this slot to customize the content of each table cell | true |
| `&#x60;body-cell-cellKey-${key}&#x60;` | Use this slot to customize the content of a specific table cell | true |
| `body-cell-rowKey` | Use this slot to customize the content of each row header | true |

## Events

| Name | Description |
| ---- | ----------- |

## Methods
