# RbActionMenu

> A dropdown menu of executable actions.

## Props

| Name       | Type          | Description     | Default                  |
|------------|---------------|-----------------|--------------------------|
| `actions` | `object` | A dictionary of actions to show. | `null` |
| `instance` | `object` | The instance the actions will be executed on. | `null` |
| `transitionShow` | `string` | The transition used when showing the action menu. | `"scale"` |
| `transitionHide` | `string` | The transition used when hiding the action menu | `"scale"` |
| `collpaseAfter` | `number` | The number of actions to show before collapsing them in the action menu | `3` |
| `size` | `string` | The size used for action buttons | `"sm"` |
| `actionClass` | `string, object` | The CSS classes used for action buttons | `""` |

## Slots

| Name       | Scoped        |
|------------|---------------|
| `before` |  |
| `after` |  |

## Events

| Name       |
|------------|

## Methods

| Name       | Description     |
|------------|-----------------|
