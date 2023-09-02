# RbMedia

> A responsive viewer for media files like images or videos

This component is useful to create a media gallery with mixed contents like
images, videos, etc.

## Props

| Name | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
| `src` | `string` | The source URI of the media content | `null` |
| `type` | `string` | The mimetype of the media content (e.g. images&#x2F;png) | `null` |
| `cover` | `boolean` | If set to true, a CSS cover positioning will be applied to the media | `false` |
| `ratio` | `string, number` | The aspect ratio of the media content | `1` |
| `poster` | `string` | If set to true, the video will show a poster when not playing | `null` |
| `autoplay` | `boolean` | If set to true, the video will play automatically after loading | `false` |
| `loop` | `boolean` | If set to true, the video will play in loop | `false` |
| `mute` | `boolean` | If set to true, the video will play muted | `false` |
| `controls` | `boolean` | If set to true, the default player controls will be displayed | `false` |

## Slots

| Name | Description | Scoped |
| ---- | ----------- | ------ |

## Events

| Name | Description |
| ---- | ----------- |

## Methods
