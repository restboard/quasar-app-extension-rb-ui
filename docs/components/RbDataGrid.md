# RbDataGrid

> A responsive grid showing block-like items (e.g. an image gallery)

## Props

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| `items` | `array` | The list of items to show in the grid | `[]` |
| `itemsPerRow` | `number` | The number of items to show in a row | `4` |
| `loading` | `boolean` | If true, render the skeleton loading section instead | `false` |
| `gutter` | `string` | The gutter used to space rows and columns | `"md"` |
| `itemHeight` | `string` | The default height of the grid items | `"280px"` |
| `skeletonRows` | `number` | The number of rows to show during loading | `2` |

## Slots

| Name | Description | Scoped |
| ---- | ----------- | ------ |
| `empty` | Use this slot to customize what should be rendered when the grid is empty |  |
| `skeleton` | Use this slot to customize what should be rendered during loading |  |
| `default` | Use this slot to customize what should be rendered for each element of the grid | true |
| `empty-item` | Use this slot to customize how an empty item in a grid row should look like | true |

## Events

| Name | Description |
| ---- | ----------- |

## Methods
