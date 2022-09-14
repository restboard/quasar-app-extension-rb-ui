# RbActionMenu

A dropdown menu of executable actions.

## Props

| Name       | Type          | Description     |
|------------|---------------|-----------------|
| `actions` | object | A dictionary of actions to show. |
| `instance` | object | The instance the actions will be executed on. |
| `transitionShow` | string | The transition used when showing the action menu. |
| `transitionHide` | string | The transition used when hiding the action menu |
| `collpaseAfter` | number | The number of actions to show before collapsing them in the action menu |
| `size` | string | The size used for action buttons |
| `actionClass` | string|object | The CSS classes used for action buttons |

## Slots

| Name       | Scoped        |
|------------|---------------|
| `before` |  |
| `after` |  |

## Events

| Name       |
|------------|
