# RbResourceCollection

> Fetch a collection of a resource instances and provide them to its children

## Props

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| `resource` | `object` | The resource to fetch instances from | `` |
| `filters` | `object` | A dictionary of filters to apply when fetching resource instances | `null` |
| `offset` | `number` | The offset to apply when fetching resource instances | `0` |
| `limit` | `number` | The limit to apply when fetching resource instances | `null` |
| `infinite` | `boolean` | Fetch a collection of a resource instances and provide them to its children | `` |
| `keepOnEmpty` | `boolean` | Fetch a collection of a resource instances and provide them to its children | `` |

## Slots

| Name | Description | Scoped |
| ---- | ----------- | ------ |
| `default` | Fetch a collection of a resource instances and provide them to its children | true |
| `empty` | Fetch a collection of a resource instances and provide them to its children | true |

## Events

| Name | Description |
| ---- | ----------- |
| `loaded` | Fetch a collection of a resource instances and provide them to its children |
| `error` | Fetch a collection of a resource instances and provide them to its children |

## Methods
