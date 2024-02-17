# RbDataCard

> A component used to render a content card

It provides a standard layout for card header with support
for title, subtitle, overline and actions.

## Props

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| `overline` | `string` | The content of the header overline section | `null` |
| `title` | `string` | The content of the header title section | `null` |
| `subtitle` | `string` | The content of the header subtitle section | `null` |
| `overlineClass` | `string, object` | The CSS classes to apply to the header overline section | `null` |
| `titleClass` | `string, object` | The CSS classes to apply to the header title section | `null` |
| `subtitleClass` | `string, object` | The CSS classes to apply to the header subtitle section | `null` |
| `loading` | `boolean` | If true, render the skeleton loading section instead | `` |

## Slots

| Name | Description | Scoped |
| ---- | ----------- | ------ |
| `skeleton` | Use this slot to customize what should be rendered during loading | true |
| `header` | Use this slot to customize the card header | true |
| `header-overline` | Use this slot to customize the header overline section | true |
| `header-title` | Use this slot to customize the header title section | true |
| `header-actions` | Use this slot to customize the header actions section | true |
| `header-subtitle` | Use this slot to customize the header subtitle section | true |
| `default` | Use this slot to add content to the card | true |
| `footer` | Use this slot to add content to the card footer | true |

## Events

| Name | Description |
| ---- | ----------- |

## Methods
