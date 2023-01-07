# RbDataTable

> A data table with support for search, column filters and row actions

## Props

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| `title` | `string` | The title of the table | `""` |
| `rowKey` | `string` | The field to be used as identifier of each row in the table | `"id"` |
| `columns` | `array` | The list of columns to show in the table | `[]` |
| `rows` | `array` | The list of rows to show in the table | `[]` |
| `actions` | `object` | The list of actions to show for each row in the table | `{}` |
| `loading` | `boolean` | Put the table into &#39;loading&#39; state | `false` |
| `selection` | `string` | The table selection type | `null` |
| `searchDebounce` | `number` | The time (in ms) to use for debounce a search request | `250` |
| `hideSearch` | `boolean` | If true, hide the search input | `false` |

## Slots

| Name | Description | Scoped |
| ---- | ----------- | ------ |
| `name` | https:&#x2F;&#x2F;quasar.dev&#x2F;vue-components&#x2F;table | true |
| `top` | https:&#x2F;&#x2F;quasar.dev&#x2F;vue-components&#x2F;table | true |
| `top-actions` | Use this slot to render additional actions on the top-right corner | true |
| `header-cell` | https:&#x2F;&#x2F;quasar.dev&#x2F;vue-components&#x2F;table | true |
| `body-cell-actions` | Use this slot to customize how the row actions should look like | true |

## Events

| Name | Description |
| ---- | ----------- |

## Methods
