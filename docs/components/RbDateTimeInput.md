# RbDateTimeInput

> A date and&#x2F;or time input with support for custom formats

## Props

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| `modelValue` | `string` | The current date and&#x2F;or time value | `""` |
| `dateMask` | `string` | The mask used to format the date part (if null, the input will disable the selection of the date) | `"YYYY-MM-DD"` |
| `timeMask` | `string` | The mask used to format the time part (if null, the input will disable the selection of the time) | `"HH:mm"` |
| `maskSeparator` | `string` | The separator used between the date and time masks | `" "` |
| `timeFirst` | `boolean` | Move the time part in front of the date part | `false` |
| `parse` | `func` | A function used to parse the value to the correct internal format | `` |
| `serialize` | `func` | A function used to serialize the internal value to the correct external format | `` |
| `options` | `array, func` | An array of valid date&#x2F;time values to show as enabled (if a function is given, it should follow this signature: &#x60;val &#x3D;&gt; boolean&#x60;) | `null` |

## Slots

| Name | Description | Scoped |
| ---- | ----------- | ------ |

## Events

| Name | Description |
| ---- | ----------- |
| `blur` | A date and&#x2F;or time input with support for custom formats |
| `update:modelValue` | A date and&#x2F;or time input with support for custom formats |

## Methods
