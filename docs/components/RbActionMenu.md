# RbActionMenu

> A dropdown menu of executable actions

## Props

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| `actions` | `object` | A dictionary of actions to show | `null` |
| `instance` | `object` | The instance the actions will be executed on | `null` |
| `transitionShow` | `string` | The transition used when showing the action menu. | `"scale"` |
| `transitionHide` | `string` | The transition used when hiding the action menu | `"scale"` |
| `collpaseAfter` | `number` | The number of actions to show before collapsing them in the action menu | `3` |
| `size` | `string` | The size used for action buttons | `"sm"` |
| `actionClass` | `string, object` | The CSS classes used for action buttons | `""` |

## Slots

| Name | Description | Scoped |
| ---- | ----------- | ------ |
| `before` | Use this slot to add additional content before the action menu |  |
| `after` | Use this slot to add additional content after the action menu |  |

## Events

| Name | Description |
| ---- | ----------- |

## Methods

### `executeAction(action)`

Execute the given action on the current instance

#### Params

| Name | Type | Description |
| ---- | ---- | ----------- |
| `action` | `Object, Function` | The action to execute |

#### Returns

`mixed` The action result (if any)
