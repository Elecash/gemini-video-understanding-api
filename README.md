# Test Gemini Video Understanding API locally

This is a simple demo app to test locally the video understanding API provided by Gemini.

Create a Gemini API key:
- https://aistudio.google.com/apikey
- Create a `.env` file with the key like this:
```text
GEMINI_API_KEY=<YOUR_GEMINI_API_KEY>
```

How to try it out:
- Run the UI: `npx nx serve ui`
- Run the API: `npx nx serve api`
- Open the app at http://localhost:4200

Please, be patient with long videos; it will take a while to get the response from Gemini.

This demo is using YouTube as a source now, which is currently free of charge.
You can read more about it on [official docs](https://ai.google.dev/gemini-api/docs/video-understanding#youtube).
