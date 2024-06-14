# RbResourceCollection

> Fetch a collection of a resource instances and provide them to its children

## Props

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| `resource` | `object` | The resource to fetch instances from | `` |
| `filters` | `object` | A dictionary of filters to apply when fetching resource instances | `null` |
| `offset` | `number` | The offset to apply when fetching resource instances | `0` |
| `limit` | `number` | The limit to apply when fetching resource instances | `null` |
| `infinite` | `boolean` | With infinite mode, new fetched items are appended to the previous ones | `false` |
| `keepOnEmpty` | `boolean` | Show the default slot even when no results are fetched | `false` |

## Slots

| Name | Description | Scoped |
| ---- | ----------- | ------ |
| `default` | Use this slot to render the fetched resource instances | true |
| `empty` | Use this slot to render a component when no results are fetched | true |

## Events

| Name | Description |
| ---- | ----------- |
| `loaded` | Emitted when new resource instances are loaded |
| `error` | Emitted when an error occurs during loading |

## Methods

### `clear()`

Clear all the fetched resource instances

#### Params

| Name | Type | Description |
| ---- | ---- | ----------- |

#### Returns


### `reloadData()`

Refetch resource instances

On success, a &#x60;loaded&#x60; event is emitted.
On error, a &#x60;error&#x60; event is emitted.

#### Params

| Name | Type | Description |
| ---- | ---- | ----------- |

#### Returns


### `clearAndReloadData()`

Clear and reload resource instances

#### Params

| Name | Type | Description |
| ---- | ---- | ----------- |

#### Returns

