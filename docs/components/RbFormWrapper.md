# RbFormWrapper

> A card-like wrapper for a resource form

## Props

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| `resource` | `object` | The resource to show the form for | `` |
| `modelValue` | `object` | The resource instance shown in the form | `` |
| `loading` | `boolean` | Put the form into &#39;loading&#39; state | `false` |
| `saving` | `boolean` | Put the form into &#39;saving&#39; state | `false` |
| `dismissible` | `boolean` | If true, show a form dismiss button | `false` |
| `hideResourceActions` | `boolean` | Hide the resource action menu in the header | `false` |
| `hiddenResourceActions` | `array` | The list of resource actions to always hide | `["create", "edit"]` |
| `headerClass` | `string, object` | The CSS classes to apply to the header section | `""` |
| `formClass` | `string, object` | The CSS classes to apply to the form section | `""` |
| `formProps` | `object` | The additional props to pass to the form section | `{}` |
| `actionsClass` | `string, object` | The CSS classes to apply to the bottom actions section | `"row reverse items-center justify-between q-gutter-md q-pa-md"` |
| `discardChangesTitle` | `string, object` | The title of the confirm dialog to show when the form has pending changes | `"Are you sure?"` |
| `discardChangesMsg` | `string, object` | The message of the confirm dialog to show when the form has pending changes | `"All pending, unsaved changes will be permanently lost!"` |

## Slots

| Name | Description | Scoped |
| ---- | ----------- | ------ |
| `header` | Use this slot to customize the header section | true |
| `header-title` | Use this slot to customize the title section of the header | true |
| `header-actions` | Use this slot to render additional actions in the header | true |
| `actions` | Use this slot to customize the bottom actions section | true |
| `submit-action` | Use this slot to customize the submit action | true |
| `reset-action` | Use this slot to customize the reset action | true |

## Events

| Name | Description |
| ---- | ----------- |
| `submit` | This event is sent when the form has been submitted |
| `dismiss` | This event is sent when the form has been dismissed |

## Methods
