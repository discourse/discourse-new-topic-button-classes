# New Topic Button Permission Classes

A Discourse theme component that adds CSS classes to the "New Topic" button based on user permissions.

## What it does

This component adds one of two CSS classes to the "New Topic" button:
- `can-create-topic` - When the user has permission to create a topic in the current context
- `cannot-create-topic` - When the user cannot create a topic in the current context

This allows themes to style the button differently based on permissions (e.g., showing a visual indicator when a user can't post).

## Installation

1. Go to Admin > Customize > Themes
2. Click "Install" and select "From a git repository"
3. Enter the repository URL
4. Click "Install"

## Usage

Once installed, the button will automatically have the appropriate class applied. You can then style it in your theme's CSS:

```css
/* Style when user can create topics */
.btn.can-create-topic {
  /* your styles */
}

/* Style when user cannot create topics */
.btn.cannot-create-topic {
  opacity: 0.6;
  /* your styles */
}
```

## How it works

This component uses Discourse's value transformer API to hook into the `create-topic-button-class` transformer. It checks the `disabled` prop passed to the CreateTopicButton component and returns the appropriate class.

## Compatibility

- Minimum Discourse version: 3.4.0
- Works with all themes

## License

MIT