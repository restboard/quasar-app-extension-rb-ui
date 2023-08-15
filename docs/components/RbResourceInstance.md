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

### `reloadData()`

Refetch the current resource instance

On success, a &#x60;loaded&#x60; event is emitted.
On error, a &#x60;error&#x60; event is emitted.

#### Params

| Name | Type | Description |
| ---- | ---- | ----------- |

#### Returns


### `saveData(data)`

Store changes to the current resource instance

If a &#x60;key&#x60; value is not set on the resource instance,
the resource &#x60;createOne()&#x60; method will be called.
If a &#x60;key&#x60; value is set, the resource &#x60;updateOne()&#x60;
method will be called instaed.

On success, a &#x60;loaded&#x60; event is emitted.
On error, a &#x60;error&#x60; event is emitted.

#### Params

| Name | Type | Description |
| ---- | ---- | ----------- |
| `data` | `` | The resource instance data to save |

#### Returns

