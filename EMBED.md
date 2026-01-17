# Embedding the Chatbot

This chatbot can be embedded on any website using an iframe. Follow these steps:

## Setup

1. Make sure you have set your Gemini API key in the `.env` file:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy the `dist` folder to your hosting service (Netlify, Vercel, etc.)

## Method 1: Full Page Embed

Embed the entire chatbot application in an iframe:

```html
<iframe
  src="https://your-deployed-url.com"
  width="100%"
  height="600px"
  frameborder="0"
  title="AI Chatbot"
></iframe>
```

## Method 2: Widget Embed

To embed just the chat widget (floating button) on your website:

```html
<iframe
  src="https://your-deployed-url.com"
  style="position: fixed; bottom: 0; right: 0; width: 450px; height: 650px; border: none; z-index: 9999;"
  title="Chat Widget"
></iframe>
```

## Method 3: Standalone Widget Component

For a more integrated approach, you can create a standalone widget version:

1. Create a minimal HTML file that only loads the Chatbot component
2. Deploy it separately
3. Embed using iframe

## Configuration

The chatbot is configured through environment variables in the `.env` file:

- `VITE_GEMINI_API_KEY`: Your Google Gemini API key (required)

## Getting a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key"
4. Create a new API key
5. Copy the key and add it to your `.env` file

## Customization

You can customize the chatbot by modifying:

- `src/components/Chatbot.tsx` - Main chatbot UI and behavior
- `src/components/ChatMessage.tsx` - Message display styling
- `src/components/ChatInput.tsx` - Input field styling
- `src/services/gemini.ts` - AI service configuration

## CORS Considerations

When embedding the chatbot, make sure your hosting service allows iframe embedding. Some hosts may have CORS restrictions that prevent embedding.

## Security Notes

- Never expose your API key in client-side code in production
- Consider implementing a backend proxy for API calls in production environments
- The current implementation is suitable for development and testing
