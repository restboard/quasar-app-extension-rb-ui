# RbResourceCard

> A card component to show resource instances in a consistent way accross the app

## Props

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| `resource` | `object` | The resource used to configure the card appearance | `` |
| `item` | `object` | The resource instance used to populate the card content | `null` |
| `loading` | `boolean` | A loading status flag | `` |

## Slots

| Name | Description | Scoped |
| ---- | ----------- | ------ |
| `name` | see RbDataCard | true |
| `header-actions` | Use this slot to customize the header actions section | true |
| `default` | Use this slot to customize the body of the card | true |

## Events

| Name | Description |
| ---- | ----------- |

## Methods
