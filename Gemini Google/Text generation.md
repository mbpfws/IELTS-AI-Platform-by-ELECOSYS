![text-generation.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/881c9b70-d383-476f-bfa5-d8eb75634e1d/0ad70028-c212-433c-8274-6bc76f6b0ccd/text-generation.png)

Grounding with Google Search is now available! [Learn more](https://developers.googleblog.com/en/gemini-api-and-ai-studio-now-offer-grounding-with-google-search)

- [Home](https://ai.google.dev/)
- [Gemini API](https://ai.google.dev/gemini-api)
- [Docs](https://ai.google.dev/gemini-api/docs)

The Gemini API can generate text output when provided text, images, video, and audio as input.

This guide shows you how to generate text using the [`generateContent`](https://ai.google.dev/api/rest/v1/models/generateContent) and [`streamGenerateContent`](https://ai.google.dev/api/rest/v1/models/streamGenerateContent) methods. To learn about working with Gemini's vision and audio capabilities, refer to the [Vision](https://ai.google.dev/gemini-api/docs/vision) and [Audio](https://ai.google.dev/gemini-api/docs/audio) guides.

## Before you begin: Set up your project and API key

Before calling the Gemini API, you need to set up your project and configure your API key.

## Generate text from text-only input

The simplest way to generate text using the Gemini API is to provide the model with a single text-only input, as shown in this example:

```
// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Write a story about a magic backpack.";

const result = await model.generateContent(prompt);
console.log(result.response.text());text_generation.js
```

In this case, the prompt ("Write a story about a magic backpack") doesn't include any output examples, system instructions, or formatting information. It's a [zero-shot](https://ai.google.dev/gemini-api/docs/models/generative-models#zero-shot-prompts) approach. For some use cases, a [one-shot](https://ai.google.dev/gemini-api/docs/models/generative-models#one-shot-prompts) or [few-shot](https://ai.google.dev/gemini-api/docs/models/generative-models#few-shot-prompts) prompt might produce output that's more aligned with user expectations. In some cases, you might also want to provide [system instructions](https://ai.google.dev/gemini-api/docs/system-instructions) to help the model understand the task or follow specific guidelines.

## Generate text from text-and-image input

The Gemini API supports multimodal inputs that combine text with media files. The following example shows how to generate text from text-and-image input:

```
// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

const prompt = "Describe how this product might be manufactured.";
// Note: The only accepted mime types are some image types, image/*.
const imagePart = fileToGenerativePart(
  `${mediaPath}/jetpack.jpg`,
  "image/jpeg",
);

const result = await model.generateContent([prompt, imagePart]);
console.log(result.response.text());text_generation.js
```

As with text-only prompting, multimodal prompting can involve various approaches and refinements. Depending on the output from this example, you might want to add steps to the prompt or be more specific in your instructions. To learn more, see [File prompting strategies](https://ai.google.dev/gemini-api/docs/file-prompting-strategies).

## Generate a text stream

By default, the model returns a response after completing the entire text generation process. You can achieve faster interactions by not waiting for the entire result, and instead use streaming to handle partial results.

The following example shows how to implement streaming using the [`streamGenerateContent`](https://ai.google.dev/api/rest/v1/models/streamGenerateContent) method to generate text from a text-only input prompt.

```
// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Write a story about a magic backpack.";

const result = await model.generateContentStream(prompt);

// Print text as it comes in.
for await (const chunk of result.stream) {
  const chunkText = chunk.text();
  process.stdout.write(chunkText);
}text_generation.js
```

## Build an interactive chat

You can use the Gemini API to build interactive chat experiences for your users. Using the chat feature of the API lets you collect multiple rounds of questions and responses, allowing users to step incrementally toward answers or get help with multipart problems. This feature is ideal for applications that require ongoing communication, such as chatbots, interactive tutors, or customer support assistants.

The following code example shows a basic chat implementation:

```
// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "Hello" }],
    },
    {
      role: "model",
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
  ],
});
let result = await chat.sendMessage("I have 2 dogs in my house.");
console.log(result.response.text());
result = await chat.sendMessage("How many paws are in my house?");
console.log(result.response.text());chat.js
```

## Enable chat streaming

You can also use streaming with chat, as shown in the following example:

```
// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "Hello" }],
    },
    {
      role: "model",
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
  ],
});
let result = await chat.sendMessageStream("I have 2 dogs in my house.");
for await (const chunk of result.stream) {
  const chunkText = chunk.text();
  process.stdout.write(chunkText);
}
result = await chat.sendMessageStream("How many paws are in my house?");
for await (const chunk of result.stream) {
  const chunkText = chunk.text();
  process.stdout.write(chunkText);
}chat.js
```

## Configure text generation

Every prompt you send to the model includes [parameters](https://ai.google.dev/gemini-api/docs/models/generative-models#model-parameters) that control how the model generates responses. You can use [`GenerationConfig`](https://ai.google.dev/api/rest/v1/GenerationConfig) to configure these parameters. If you don't configure the parameters, the model uses default options, which can vary by model.

The following example shows how to configure several of the available options.

```
// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    candidateCount: 1,
    stopSequences: ["x"],
    maxOutputTokens: 20,
    temperature: 1.0,
  },
});

const result = await model.generateContent(
  "Tell me a story about a magic backpack.",
);
console.log(result.response.text());model_configuration.js
```

`candidateCount` specifies the number of generated responses to return. Currently, this value can only be set to 1. If unset, this will default to 1.

`stopSequences` specifies the set of character sequences (up to 5) that will stop output generation. If specified, the API will stop at the first appearance of a stop_sequence. The stop sequence won't be included as part of the response.

`maxOutputTokens` sets the maximum number of tokens to include in a candidate.

`temperature` controls the randomness of the output. Use higher values for more creative responses, and lower values for more deterministic responses. Values can range from [0.0, 2.0].

You can also configure individual calls to `generateContent`:

```
const result = await model.generateContent({
  contents: [
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        }
      ],
    }
  ],
  generationConfig: {
    maxOutputTokens: 1000,
    temperature: 0.1,
  },
});
console.log(result.response.text());

```

Any values set on the individual call override values on the model constructor.

## What's next

Now that you have explored the basics of the Gemini API, you might want to try:

- [Vision understanding](https://ai.google.dev/gemini-api/docs/vision): Learn how to use Gemini's native vision understanding to process images and videos.
- [System instructions](https://ai.google.dev/gemini-api/docs/system-instructions): System instructions let you steer the behavior of the model based on your specific needs and use cases.
- [Audio understanding](https://ai.google.dev/gemini-api/docs/audio): Learn how to use Gemini's native audio understanding to process audio files.