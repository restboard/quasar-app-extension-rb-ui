# RbDataTable

> 

## Props

| Name       | Type          | Description     | Default                  |
|------------|---------------|-----------------|--------------------------|
| `title` | `string` |  | `""` |
| `rowKey` | `string` |  | `"id"` |
| `columns` | `array` |  | `[]` |
| `rows` | `array` |  | `[]` |
| `actions` | `object` |  | `{}` |
| `loading` | `boolean` |  | `false` |
| `selection` | `string` |  | `null` |
| `searchDebounce` | `number` |  | `250` |
| `showSearch` | `boolean` |  | `true` |

## Slots

| Name       | Scoped        |
|------------|---------------|
| `default` | true |
| `top` | true |
| `top-actions` | true |
| `header-cell` | true |
| `body-cell-actions` | true |

## Events

| Name       |
|------------|
| `row-click` |
| `update:selected` |

## Methods

| Name       | Description     |
|------------|-----------------|
