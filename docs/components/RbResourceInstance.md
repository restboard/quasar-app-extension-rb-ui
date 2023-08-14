# RbResourceInstance

> Fetch a single resource instance and provide it to its children

## Props

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| `resource` | `object` | The resource to fetch an instance from | `` |
| `id` | `number, string` | The identifier of the resource instance to fetch | `` |
| `filters` | `object` | A dictionary of filters to apply when fetching the resource instance | `null` |

## Slots

| Name | Description | Scoped |
| ---- | ----------- | ------ |
| `default` | Fetch a single resource instance and provide it to its children | true |
| `empty` | Fetch a single resource instance and provide it to its children | true |

## Events

| Name | Description |
| ---- | ----------- |
| `error` | Fetch a single resource instance and provide it to its children |
| `loaded` | Fetch a single resource instance and provide it to its children |
| `saved` | Fetch a single resource instance and provide it to its children |

## Methods
