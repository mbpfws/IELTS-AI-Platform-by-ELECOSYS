[Gemini API](https://ai.google.dev/gemini-api/docs)     [Google AI Studio](https://aistudio.google.com/)     [Gemma](https://ai.google.dev/gemma)     [Google AI Edge](https://ai.google.dev/edge)     Tools       [Community](https://discuss.ai.google.dev/) 

 [Docs](https://ai.google.dev/gemini-api/docs)     [API Reference](https://ai.google.dev/api)     [Pricing](https://ai.google.dev/pricing) 

- [Overview](https://ai.google.dev/api)
- [API versions](https://ai.google.dev/gemini-api/docs/api-versions)
- Capabilities
- [Models](https://ai.google.dev/api/models)
- [Generating content](https://ai.google.dev/api/generate-content)
- [Tokens](https://ai.google.dev/api/tokens)
- [Files](https://ai.google.dev/api/files)
- [Caching](https://ai.google.dev/api/caching)
- [Embeddings](https://ai.google.dev/api/embeddings)
- Tuning
- Semantic retrieval
- [All methods](https://ai.google.dev/api/all-methods)
- Deprecated
- [Home](https://ai.google.dev/)
- [Gemini API](https://ai.google.dev/gemini-api)
- [API Reference](https://ai.google.dev/api)

The Gemini API supports content generation with images, audio, code, tools, and more. For details on each of these features, read on and check out the task-focused sample code, or read the comprehensive guides.

- [Text generation](https://ai.google.dev/gemini-api/docs/text-generation)
- [Vision](https://ai.google.dev/gemini-api/docs/vision)
- [Audio](https://ai.google.dev/gemini-api/docs/audio)
- [Long context](https://ai.google.dev/gemini-api/docs/long-context)
- [Code execution](https://ai.google.dev/gemini-api/docs/code-execution)
- [JSON Mode](https://ai.google.dev/gemini-api/docs/json-mode)
- [Function calling](https://ai.google.dev/gemini-api/docs/function-calling)
- [System instructions](https://ai.google.dev/gemini-api/docs/system-instructions)

## Method: models.generateContent

Generates a model response given an input `GenerateContentRequest`. Refer to the [text generation guide](https://ai.google.dev/gemini-api/docs/text-generation) for detailed usage information. Input capabilities differ between models, including tuned models. Refer to the [model guide](https://ai.google.dev/gemini-api/docs/models/gemini) and [tuning guide](https://ai.google.dev/gemini-api/docs/model-tuning) for details.

### Endpoint

post   https://generativelanguage.googleapis.com/v1beta/{model=models/*}:generateContent

## Examples of different content types (treat these as examples only)

- JSON mode

```jsx
// Make sure to include these imports:
// import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const schema = {
  description: "List of recipes",
  type: SchemaType.ARRAY,
  items: {
    type: SchemaType.OBJECT,
    properties: {
      recipeName: {
        type: SchemaType.STRING,
        description: "Name of the recipe",
        nullable: false,
      },
    },
    required: ["recipeName"],
  },
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

const result = await model.generateContent(
  "List a few popular cookie recipes.",
);
console.log(result.response.text());
```

- PDF (available at Shell CURL method)

```bash
MIME_TYPE=$(file -b --mime-type "${PDF_PATH}")
NUM_BYTES=$(wc -c < "${PDF_PATH}")
DISPLAY_NAME=TEXT

echo $MIME_TYPE
tmp_header_file=upload-header.tmp

# Initial resumable request defining metadata.
# The upload url is in the response headers dump them to a file.
curl "${BASE_URL}/upload/v1beta/files?key=${GOOGLE_API_KEY}" \
  -D upload-header.tmp \
  -H "X-Goog-Upload-Protocol: resumable" \
  -H "X-Goog-Upload-Command: start" \
  -H "X-Goog-Upload-Header-Content-Length: ${NUM_BYTES}" \
  -H "X-Goog-Upload-Header-Content-Type: ${MIME_TYPE}" \
  -H "Content-Type: application/json" \
  -d "{'file': {'display_name': '${DISPLAY_NAME}'}}" 2> /dev/null

upload_url=$(grep -i "x-goog-upload-url: " "${tmp_header_file}" | cut -d" " -f2 | tr -d "\r")
rm "${tmp_header_file}"

# Upload the actual bytes.
curl "${upload_url}" \
  -H "Content-Length: ${NUM_BYTES}" \
  -H "X-Goog-Upload-Offset: 0" \
  -H "X-Goog-Upload-Command: upload, finalize" \
  --data-binary "@${PDF_PATH}" 2> /dev/null > file_info.json

file_uri=$(jq ".file.uri" file_info.json)
echo file_uri=$file_uri

# Now generate content using that file
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=$GOOGLE_API_KEY" \
    -H 'Content-Type: application/json' \
    -X POST \
    -d '{
      "contents": [{
        "parts":[
          {"text": "Can you add a few more lines to this poem?"},
          {"file_data":{"mime_type": "application/pdf", "file_uri": '$file_uri'}}]
        }]
       }' 2> /dev/null > response.json

cat response.json
echo

jq ".candidates[].content.parts[].text" response.json
```

- As audio

```jsx
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

const prompt = "Give me a summary of this audio file.";
// Note: The only accepted mime types are some image types, image/*.
const audioPart = fileToGenerativePart(
  `${mediaPath}/samplesmall.mp3`,
  "audio/mp3",
);

const result = await model.generateContent([prompt, audioPart]);
console.log(result.response.text());
```

- As image

```jsx
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
console.log(result.response.text());
```

- As Text

```jsx
// Make sure to include these imports:
// import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Write a story about a magic backpack.";

const result = await model.generateContent(prompt);
console.log(result.response.text());
```

### Path parameters

`model`   `string`

Required. The name of the `Model` to use for generating the completion.

Format: `name=models/{model}`. It takes the form `models/{model}`.

### Request body

The request body contains data with the following structure:

Fields

`contents[]`   `object ([Content](https://ai.google.dev/api/caching#Content))`

Required. The content of the current conversation with the model.

For single-turn queries, this is a single instance. For multi-turn queries like [chat](https://ai.google.dev/gemini-api/docs/text-generation#chat), this is a repeated field that contains the conversation history and the latest request.

`tools[]`   `object ([Tool](https://ai.google.dev/api/caching#Tool))`

Optional. A list of `Tools` the `Model` may use to generate the next response.

A `Tool` is a piece of code that enables the system to interact with external systems to perform an action, or set of actions, outside of knowledge and scope of the `Model`. Supported `Tool`s are `Function` and `codeExecution`. Refer to the [Function calling](https://ai.google.dev/gemini-api/docs/function-calling) and the [Code execution](https://ai.google.dev/gemini-api/docs/code-execution) guides to learn more.

`toolConfig`   `object ([ToolConfig](https://ai.google.dev/api/caching#ToolConfig))`

Optional. Tool configuration for any `Tool` specified in the request. Refer to the [Function calling guide](https://ai.google.dev/gemini-api/docs/function-calling#function_calling_mode) for a usage example.

`safetySettings[]`   `object ([SafetySetting](https://ai.google.dev/api/generate-content#v1beta.SafetySetting))`

Optional. A list of unique `SafetySetting` instances for blocking unsafe content.

This will be enforced on the `GenerateContentRequest.contents` and `GenerateContentResponse.candidates`. There should not be more than one setting for each `SafetyCategory` type. The API will block any contents and responses that fail to meet the thresholds set by these settings. This list overrides the default settings for each `SafetyCategory` specified in the safetySettings. If there is no `SafetySetting` for a given `SafetyCategory` provided in the list, the API will use the default safety setting for that category. Harm categories HARM_CATEGORY_HATE_SPEECH, HARM_CATEGORY_SEXUALLY_EXPLICIT, HARM_CATEGORY_DANGEROUS_CONTENT, HARM_CATEGORY_HARASSMENT are supported. Refer to the [guide](https://ai.google.dev/gemini-api/docs/safety-settings) for detailed information on available safety settings. Also refer to the [Safety guidance](https://ai.google.dev/gemini-api/docs/safety-guidance) to learn how to incorporate safety considerations in your AI applications.

`systemInstruction`   `object ([Content](https://ai.google.dev/api/caching#Content))`

Optional. Developer set [system instruction(s)](https://ai.google.dev/gemini-api/docs/system-instructions). Currently, text only.

`generationConfig`   `object ([GenerationConfig](https://ai.google.dev/api/generate-content#v1beta.GenerationConfig))`

Optional. Configuration options for model generation and outputs.

`cachedContent`   `string`

Optional. The name of the content [cached](https://ai.google.dev/gemini-api/docs/caching) to use as context to serve the prediction. Format: `cachedContents/{cachedContent}`

### Example request

### Response body

If successful, the response body contains an instance of [`GenerateContentResponse`](https://ai.google.dev/api/generate-content#v1beta.GenerateContentResponse).

## Method: models.streamGenerateContent

Generates a [streamed response](https://ai.google.dev/gemini-api/docs/text-generation?lang=python#generate-a-text-stream) from the model given an input `GenerateContentRequest`.

### Endpoint

post   https://generativelanguage.googleapis.com/v1beta/{model=models/*}:streamGenerateContent

### Path parameters

`model`   `string`

Required. The name of the `Model` to use for generating the completion.

Format: `name=models/{model}`. It takes the form `models/{model}`.

### Request body

The request body contains data with the following structure:

Fields

`contents[]`   `object ([Content](https://ai.google.dev/api/caching#Content))`

Required. The content of the current conversation with the model.

For single-turn queries, this is a single instance. For multi-turn queries like [chat](https://ai.google.dev/gemini-api/docs/text-generation#chat), this is a repeated field that contains the conversation history and the latest request.

`tools[]`   `object ([Tool](https://ai.google.dev/api/caching#Tool))`

Optional. A list of `Tools` the `Model` may use to generate the next response.

A `Tool` is a piece of code that enables the system to interact with external systems to perform an action, or set of actions, outside of knowledge and scope of the `Model`. Supported `Tool`s are `Function` and `codeExecution`. Refer to the [Function calling](https://ai.google.dev/gemini-api/docs/function-calling) and the [Code execution](https://ai.google.dev/gemini-api/docs/code-execution) guides to learn more.

`toolConfig`   `object ([ToolConfig](https://ai.google.dev/api/caching#ToolConfig))`

Optional. Tool configuration for any `Tool` specified in the request. Refer to the [Function calling guide](https://ai.google.dev/gemini-api/docs/function-calling#function_calling_mode) for a usage example.

`safetySettings[]`   `object ([SafetySetting](https://ai.google.dev/api/generate-content#v1beta.SafetySetting))`

Optional. A list of unique `SafetySetting` instances for blocking unsafe content.

This will be enforced on the `GenerateContentRequest.contents` and `GenerateContentResponse.candidates`. There should not be more than one setting for each `SafetyCategory` type. The API will block any contents and responses that fail to meet the thresholds set by these settings. This list overrides the default settings for each `SafetyCategory` specified in the safetySettings. If there is no `SafetySetting` for a given `SafetyCategory` provided in the list, the API will use the default safety setting for that category. Harm categories HARM_CATEGORY_HATE_SPEECH, HARM_CATEGORY_SEXUALLY_EXPLICIT, HARM_CATEGORY_DANGEROUS_CONTENT, HARM_CATEGORY_HARASSMENT are supported. Refer to the [guide](https://ai.google.dev/gemini-api/docs/safety-settings) for detailed information on available safety settings. Also refer to the [Safety guidance](https://ai.google.dev/gemini-api/docs/safety-guidance) to learn how to incorporate safety considerations in your AI applications.

`systemInstruction`   `object ([Content](https://ai.google.dev/api/caching#Content))`

Optional. Developer set [system instruction(s)](https://ai.google.dev/gemini-api/docs/system-instructions). Currently, text only.

`generationConfig`   `object ([GenerationConfig](https://ai.google.dev/api/generate-content#v1beta.GenerationConfig))`

Optional. Configuration options for model generation and outputs.

`cachedContent`   `string`

Optional. The name of the content [cached](https://ai.google.dev/gemini-api/docs/caching) to use as context to serve the prediction. Format: `cachedContents/{cachedContent}`

### Example request

### Response body

If successful, the response body contains a stream of [`GenerateContentResponse`](https://ai.google.dev/api/generate-content#v1beta.GenerateContentResponse) instances.

## GenerateContentResponse

Response from the model supporting multiple candidate responses.

Safety ratings and content filtering are reported for both prompt in `GenerateContentResponse.prompt_feedback` and for each candidate in `finishReason` and in `safetyRatings`. The API: - Returns either all requested candidates or none of them - Returns no candidates at all only if there was something wrong with the prompt (check `promptFeedback`) - Reports feedback on each candidate in `finishReason` and `safetyRatings`.

Fields

`candidates[]`   `object ([Candidate](https://ai.google.dev/api/generate-content#v1beta.Candidate))`

Candidate responses from the model.

`promptFeedback`   `object ([PromptFeedback](https://ai.google.dev/api/generate-content#PromptFeedback))`

Returns the prompt's feedback related to the content filters.

`usageMetadata`   `object ([UsageMetadata](https://ai.google.dev/api/generate-content#UsageMetadata))`

Output only. Metadata on the generation requests' token usage.

JSON representation

---

```
{
  "candidates": [
    {
      object (Candidate)
    }
  ],
  "promptFeedback": {
    object (PromptFeedback)
  },
  "usageMetadata": {
    object (UsageMetadata)
  }
}
```

---

## PromptFeedback

A set of the feedback metadata the prompt specified in `GenerateContentRequest.content`.

Fields

`blockReason`   `enum ([BlockReason](https://ai.google.dev/api/generate-content#BlockReason))`

Optional. If set, the prompt was blocked and no candidates are returned. Rephrase the prompt.

`safetyRatings[]`   `object ([SafetyRating](https://ai.google.dev/api/generate-content#v1beta.SafetyRating))`

Ratings for safety of the prompt. There is at most one rating per category.

JSON representation

---

```
{
  "blockReason": enum (BlockReason),
  "safetyRatings": [
    {
      object (SafetyRating)
    }
  ]
}
```

---

## BlockReason

Specifies the reason why the prompt was blocked.

| Enums |  |
| --- | --- |
| `BLOCK_REASON_UNSPECIFIED` | Default value. This value is unused. |
| `SAFETY` | Prompt was blocked due to safety reasons. Inspect `safetyRatings` to understand which safety category blocked it. |
| `OTHER` | Prompt was blocked due to unknown reasons. |
| `BLOCKLIST` | Prompt was blocked due to the terms which are included from the terminology blocklist. |
| `PROHIBITED_CONTENT` | Prompt was blocked due to prohibited content. |

## UsageMetadata

Metadata on the generation request's token usage.

Fields

`promptTokenCount`   `integer`

Number of tokens in the prompt. When `cachedContent` is set, this is still the total effective prompt size meaning this includes the number of tokens in the cached content.

`cachedContentTokenCount`   `integer`

Number of tokens in the cached part of the prompt (the cached content)

`candidatesTokenCount`   `integer`

Total number of tokens across all the generated response candidates.

`totalTokenCount`   `integer`

Total token count for the generation request (prompt + response candidates).

JSON representation

---

```
{
  "promptTokenCount": integer,
  "cachedContentTokenCount": integer,
  "candidatesTokenCount": integer,
  "totalTokenCount": integer
}
```

---

## Candidate

A response candidate generated from the model.

Fields

`content`   `object ([Content](https://ai.google.dev/api/caching#Content))`

Output only. Generated content returned from the model.

`finishReason`   `enum ([FinishReason](https://ai.google.dev/api/generate-content#FinishReason))`

Optional. Output only. The reason why the model stopped generating tokens.

If empty, the model has not stopped generating tokens.

`safetyRatings[]`   `object ([SafetyRating](https://ai.google.dev/api/generate-content#v1beta.SafetyRating))`

List of ratings for the safety of a response candidate.

There is at most one rating per category.

`citationMetadata`   `object ([CitationMetadata](https://ai.google.dev/api/generate-content#v1beta.CitationMetadata))`

Output only. Citation information for model-generated candidate.

This field may be populated with recitation information for any text included in the `content`. These are passages that are "recited" from copyrighted material in the foundational LLM's training data.

`tokenCount`   `integer`

Output only. Token count for this candidate.

`groundingAttributions[]`   `object ([GroundingAttribution](https://ai.google.dev/api/generate-content#GroundingAttribution))`

Output only. Attribution information for sources that contributed to a grounded answer.

This field is populated for `GenerateAnswer` calls.

`groundingMetadata`   `object ([GroundingMetadata](https://ai.google.dev/api/generate-content#GroundingMetadata))`

Output only. Grounding metadata for the candidate.

This field is populated for `GenerateContent` calls.

`avgLogprobs`   `number`

Output only.

`logprobsResult`   `object ([LogprobsResult](https://ai.google.dev/api/generate-content#LogprobsResult))`

Output only. Log-likelihood scores for the response tokens and top tokens

`index`   `integer`

Output only. Index of the candidate in the list of response candidates.

JSON representation

---

```
{
  "content": {
    object (Content)
  },
  "finishReason": enum (FinishReason),
  "safetyRatings": [
    {
      object (SafetyRating)
    }
  ],
  "citationMetadata": {
    object (CitationMetadata)
  },
  "tokenCount": integer,
  "groundingAttributions": [
    {
      object (GroundingAttribution)
    }
  ],
  "groundingMetadata": {
    object (GroundingMetadata)
  },
  "avgLogprobs": number,
  "logprobsResult": {
    object (LogprobsResult)
  },
  "index": integer
}
```

---

## FinishReason

Defines the reason why the model stopped generating tokens.

| Enums |  |
| --- | --- |
| `FINISH_REASON_UNSPECIFIED` | Default value. This value is unused. |
| `STOP` | Natural stop point of the model or provided stop sequence. |
| `MAX_TOKENS` | The maximum number of tokens as specified in the request was reached. |
| `SAFETY` | The response candidate content was flagged for safety reasons. |
| `RECITATION` | The response candidate content was flagged for recitation reasons. |
| `LANGUAGE` | The response candidate content was flagged for using an unsupported language. |
| `OTHER` | Unknown reason. |
| `BLOCKLIST` | Token generation stopped because the content contains forbidden terms. |
| `PROHIBITED_CONTENT` | Token generation stopped for potentially containing prohibited content. |
| `SPII` | Token generation stopped because the content potentially contains Sensitive Personally Identifiable Information (SPII). |
| `MALFORMED_FUNCTION_CALL` | The function call generated by the model is invalid. |

## GroundingAttribution

Attribution for a source that contributed to an answer.

Fields

`sourceId`   `object ([AttributionSourceId](https://ai.google.dev/api/generate-content#AttributionSourceId))`

Output only. Identifier for the source contributing to this attribution.

`content`   `object ([Content](https://ai.google.dev/api/caching#Content))`

Grounding source content that makes up this attribution.

JSON representation

---

```
{
  "sourceId": {
    object (AttributionSourceId)
  },
  "content": {
    object (Content)
  }
}
```

---

## AttributionSourceId

Identifier for the source contributing to this attribution.

Fields

Union field `source`.

`source` can be only one of the following:

`groundingPassage`   `object ([GroundingPassageId](https://ai.google.dev/api/generate-content#GroundingPassageId))`

Identifier for an inline passage.

`semanticRetrieverChunk`   `object ([SemanticRetrieverChunk](https://ai.google.dev/api/generate-content#SemanticRetrieverChunk))`

Identifier for a `Chunk` fetched via Semantic Retriever.

JSON representation

---

```
{

  // Union fieldsource can be only one of the following:
  "groundingPassage": {
    object (GroundingPassageId)
  },
  "semanticRetrieverChunk": {
    object (SemanticRetrieverChunk)
  }
  // End of list of possible types for union fieldsource.
}
```

---

## GroundingPassageId

Identifier for a part within a `GroundingPassage`.

Fields

`passageId`   `string`

Output only. ID of the passage matching the `GenerateAnswerRequest`'s `GroundingPassage.id`.

`partIndex`   `integer`

Output only. Index of the part within the `GenerateAnswerRequest`'s `GroundingPassage.content`.

JSON representation

---

```
{
  "passageId": string,
  "partIndex": integer
}
```

---

## SemanticRetrieverChunk

Identifier for a `Chunk` retrieved via Semantic Retriever specified in the `GenerateAnswerRequest` using `SemanticRetrieverConfig`.

Fields

`source`   `string`

Output only. Name of the source matching the request's `SemanticRetrieverConfig.source`. Example: `corpora/123` or `corpora/123/documents/abc`

`chunk`   `string`

Output only. Name of the `Chunk` containing the attributed text. Example: `corpora/123/documents/abc/chunks/xyz`

JSON representation

---

```
{
  "source": string,
  "chunk": string
}
```

---

## GroundingMetadata

Metadata returned to client when grounding is enabled.

Fields

`groundingChunks[]`   `object ([GroundingChunk](https://ai.google.dev/api/generate-content#GroundingChunk))`

List of supporting references retrieved from specified grounding source.

`groundingSupports[]`   `object ([GroundingSupport](https://ai.google.dev/api/generate-content#GroundingSupport))`

List of grounding support.

`webSearchQueries[]`   `string`

Web search queries for the following-up web search.

`searchEntryPoint`   `object ([SearchEntryPoint](https://ai.google.dev/api/generate-content#SearchEntryPoint))`

Optional. Google search entry for the following-up web searches.

`retrievalMetadata`   `object ([RetrievalMetadata](https://ai.google.dev/api/generate-content#RetrievalMetadata))`

Metadata related to retrieval in the grounding flow.

JSON representation

---

```
{
  "groundingChunks": [
    {
      object (GroundingChunk)
    }
  ],
  "groundingSupports": [
    {
      object (GroundingSupport)
    }
  ],
  "webSearchQueries": [
    string
  ],
  "searchEntryPoint": {
    object (SearchEntryPoint)
  },
  "retrievalMetadata": {
    object (RetrievalMetadata)
  }
}
```

---

## SearchEntryPoint

Google search entry point.

Fields

`renderedContent`   `string`

Optional. Web content snippet that can be embedded in a web page or an app webview.

`sdkBlob`   `string ([bytes](https://developers.google.com/discovery/v1/type-format) format)`

Optional. Base64 encoded JSON representing array of <search term, search url> tuple.

A base64-encoded string.

JSON representation

---

```
{
  "renderedContent": string,
  "sdkBlob": string
}
```

---

## GroundingChunk

Grounding chunk.

Fields

Union field `chunk_type`. Chunk type. `chunk_type` can be only one of the following:

`web`   `object ([Web](https://ai.google.dev/api/generate-content#Web))`

Grounding chunk from the web.

JSON representation

---

```
{

  // Union fieldchunk_type can be only one of the following:
  "web": {
    object (Web)
  }
  // End of list of possible types for union fieldchunk_type.
}
```

---

## Web

Chunk from the web.

Fields

`uri`   `string`

URI reference of the chunk.

`title`   `string`

Title of the chunk.

JSON representation

---

```
{
  "uri": string,
  "title": string
}
```

---

## GroundingSupport

Grounding support.

Fields

`groundingChunkIndices[]`   `integer`

A list of indices (into 'grounding_chunk') specifying the citations associated with the claim. For instance [1,3,4] means that grounding_chunk[1], grounding_chunk[3], grounding_chunk[4] are the retrieved content attributed to the claim.

`confidenceScores[]`   `number`

Confidence score of the support references. Ranges from 0 to 1. 1 is the most confident. This list must have the same size as the groundingChunkIndices.

`segment`   `object ([Segment](https://ai.google.dev/api/generate-content#Segment))`

Segment of the content this support belongs to.

JSON representation

---

```
{
  "groundingChunkIndices": [
    integer
  ],
  "confidenceScores": [
    number
  ],
  "segment": {
    object (Segment)
  }
}
```

---

## Segment

Segment of the content.

Fields

`partIndex`   `integer`

Output only. The index of a Part object within its parent Content object.

`startIndex`   `integer`

Output only. Start index in the given Part, measured in bytes. Offset from the start of the Part, inclusive, starting at zero.

`endIndex`   `integer`

Output only. End index in the given Part, measured in bytes. Offset from the start of the Part, exclusive, starting at zero.

`text`   `string`

Output only. The text corresponding to the segment from the response.

JSON representation

---

```
{
  "partIndex": integer,
  "startIndex": integer,
  "endIndex": integer,
  "text": string
}
```

---

## RetrievalMetadata

Metadata related to retrieval in the grounding flow.

Fields

`googleSearchDynamicRetrievalScore`   `number`

Optional. Score indicating how likely information from google search could help answer the prompt. The score is in the range [0, 1], where 0 is the least likely and 1 is the most likely. This score is only populated when google search grounding and dynamic retrieval is enabled. It will be compared to the threshold to determine whether to trigger google search.

JSON representation

---

```
{
  "googleSearchDynamicRetrievalScore": number
}
```

---

## LogprobsResult

Logprobs Result

Fields

`topCandidates[]`   `object ([TopCandidates](https://ai.google.dev/api/generate-content#TopCandidates))`

Length = total number of decoding steps.

`chosenCandidates[]`   `object ([Candidate](https://ai.google.dev/api/generate-content#Candidate))`

Length = total number of decoding steps. The chosen candidates may or may not be in topCandidates.

JSON representation

---

```
{
  "topCandidates": [
    {
      object (TopCandidates)
    }
  ],
  "chosenCandidates": [
    {
      object (Candidate)
    }
  ]
}
```

---

## TopCandidates

Candidates with top log probabilities at each decoding step.

Fields

`candidates[]`   `object ([Candidate](https://ai.google.dev/api/generate-content#Candidate))`

Sorted by log probability in descending order.

JSON representation

---

```
{
  "candidates": [
    {
      object (Candidate)
    }
  ]
}
```

---

## Candidate

Candidate for the logprobs token and score.

Fields

`token`   `string`

The candidate’s token string value.

`tokenId`   `integer`

The candidate’s token id value.

`logProbability`   `number`

The candidate's log probability.

JSON representation

---

```
{
  "token": string,
  "tokenId": integer,
  "logProbability": number
}
```

---

## CitationMetadata

A collection of source attributions for a piece of content.

Fields

`citationSources[]`   `object ([CitationSource](https://ai.google.dev/api/generate-content#CitationSource))`

Citations to sources for a specific response.

JSON representation

---

```
{
  "citationSources": [
    {
      object (CitationSource)
    }
  ]
}
```

---

## CitationSource

A citation to a source for a portion of a specific response.

Fields

`startIndex`   `integer`

Optional. Start of segment of the response that is attributed to this source.

Index indicates the start of the segment, measured in bytes.

`endIndex`   `integer`

Optional. End of the attributed segment, exclusive.

`uri`   `string`

Optional. URI that is attributed as a source for a portion of the text.

`license`   `string`

Optional. License for the GitHub project that is attributed as a source for segment.

License info is required for code citations.

JSON representation

---

```
{
  "startIndex": integer,
  "endIndex": integer,
  "uri": string,
  "license": string
}
```

---

## GenerationConfig

Configuration options for model generation and outputs. Not all parameters are configurable for every model.

Fields

`stopSequences[]`   `string`

Optional. The set of character sequences (up to 5) that will stop output generation. If specified, the API will stop at the first appearance of a `stop_sequence`. The stop sequence will not be included as part of the response.

`responseMimeType`   `string`

Optional. MIME type of the generated candidate text. Supported MIME types are: `text/plain`: (default) Text output. `application/json`: JSON response in the response candidates. `text/x.enum`: ENUM as a string response in the response candidates. Refer to the [docs](https://ai.google.dev/gemini-api/docs/prompting_with_media#plain_text_formats) for a list of all supported text MIME types.

`responseSchema`   `object ([Schema](https://ai.google.dev/api/caching#Schema))`

Optional. Output schema of the generated candidate text. Schemas must be a subset of the [OpenAPI schema](https://spec.openapis.org/oas/v3.0.3#schema) and can be objects, primitives or arrays.

If set, a compatible `responseMimeType` must also be set. Compatible MIME types: `application/json`: Schema for JSON response. Refer to the [JSON text generation guide](https://ai.google.dev/gemini-api/docs/json-mode) for more details.

`candidateCount`   `integer`

Optional. Number of generated responses to return.

Currently, this value can only be set to 1. If unset, this will default to 1.

`maxOutputTokens`   `integer`

Optional. The maximum number of tokens to include in a response candidate.

Note: The default value varies by model, see the `Model.output_token_limit` attribute of the `Model` returned from the `getModel` function.

`temperature`   `number`

Optional. Controls the randomness of the output.

Note: The default value varies by model, see the `Model.temperature` attribute of the `Model` returned from the `getModel` function.

Values can range from [0.0, 2.0].

`topP`   `number`

Optional. The maximum cumulative probability of tokens to consider when sampling.

The model uses combined Top-k and Top-p (nucleus) sampling.

Tokens are sorted based on their assigned probabilities so that only the most likely tokens are considered. Top-k sampling directly limits the maximum number of tokens to consider, while Nucleus sampling limits the number of tokens based on the cumulative probability.

Note: The default value varies by `Model` and is specified by the`Model.top_p` attribute returned from the `getModel` function. An empty `topK` attribute indicates that the model doesn't apply top-k sampling and doesn't allow setting `topK` on requests.

`topK`   `integer`

Optional. The maximum number of tokens to consider when sampling.

Gemini models use Top-p (nucleus) sampling or a combination of Top-k and nucleus sampling. Top-k sampling considers the set of `topK` most probable tokens. Models running with nucleus sampling don't allow topK setting.

Note: The default value varies by `Model` and is specified by the`Model.top_p` attribute returned from the `getModel` function. An empty `topK` attribute indicates that the model doesn't apply top-k sampling and doesn't allow setting `topK` on requests.

`presencePenalty`   `number`

Optional. Presence penalty applied to the next token's logprobs if the token has already been seen in the response.

This penalty is binary on/off and not dependant on the number of times the token is used (after the first). Use [`frequencyPenalty`](https://ai.google.dev/api/generate-content#FIELDS.frequency_penalty) for a penalty that increases with each use.

A positive penalty will discourage the use of tokens that have already been used in the response, increasing the vocabulary.

A negative penalty will encourage the use of tokens that have already been used in the response, decreasing the vocabulary.

`frequencyPenalty`   `number`

Optional. Frequency penalty applied to the next token's logprobs, multiplied by the number of times each token has been seen in the respponse so far.

A positive penalty will discourage the use of tokens that have already been used, proportional to the number of times the token has been used: The more a token is used, the more dificult it is for the model to use that token again increasing the vocabulary of responses.

Caution: A *negative* penalty will encourage the model to reuse tokens proportional to the number of times the token has been used. Small negative values will reduce the vocabulary of a response. Larger negative values will cause the model to start repeating a common token until it hits the [`maxOutputTokens`](https://ai.google.dev/api/generate-content#FIELDS.max_output_tokens) limit: "...the the the the the...".

`responseLogprobs`   `boolean`

Optional. If true, export the logprobs results in response.

`logprobs`   `integer`

Optional. Only valid if [`responseLogprobs=True`](https://ai.google.dev/api/generate-content#FIELDS.response_logprobs). This sets the number of top logprobs to return at each decoding step in the [`Candidate.logprobs_result`](https://ai.google.dev/api/generate-content#FIELDS.logprobs_result).

JSON representation

---

```
{
  "stopSequences": [
    string
  ],
  "responseMimeType": string,
  "responseSchema": {
    object (Schema)
  },
  "candidateCount": integer,
  "maxOutputTokens": integer,
  "temperature": number,
  "topP": number,
  "topK": integer,
  "presencePenalty": number,
  "frequencyPenalty": number,
  "responseLogprobs": boolean,
  "logprobs": integer
}
```

---

## HarmCategory

The category of a rating.

These categories cover various kinds of harms that developers may wish to adjust.

| Enums |  |
| --- | --- |
| `HARM_CATEGORY_UNSPECIFIED` | Category is unspecified. |
| `HARM_CATEGORY_DEROGATORY` | **PaLM** - Negative or harmful comments targeting identity and/or protected attribute. |
| `HARM_CATEGORY_TOXICITY` | **PaLM** - Content that is rude, disrespectful, or profane. |
| `HARM_CATEGORY_VIOLENCE` | **PaLM** - Describes scenarios depicting violence against an individual or group, or general descriptions of gore. |
| `HARM_CATEGORY_SEXUAL` | **PaLM** - Contains references to sexual acts or other lewd content. |
| `HARM_CATEGORY_MEDICAL` | **PaLM** - Promotes unchecked medical advice. |
| `HARM_CATEGORY_DANGEROUS` | **PaLM** - Dangerous content that promotes, facilitates, or encourages harmful acts. |
| `HARM_CATEGORY_HARASSMENT` | **Gemini** - Harassment content. |
| `HARM_CATEGORY_HATE_SPEECH` | **Gemini** - Hate speech and content. |
| `HARM_CATEGORY_SEXUALLY_EXPLICIT` | **Gemini** - Sexually explicit content. |
| `HARM_CATEGORY_DANGEROUS_CONTENT` | **Gemini** - Dangerous content. |
| `HARM_CATEGORY_CIVIC_INTEGRITY` | **Gemini** - Content that may be used to harm civic integrity. |

## SafetyRating

Safety rating for a piece of content.

The safety rating contains the category of harm and the harm probability level in that category for a piece of content. Content is classified for safety across a number of harm categories and the probability of the harm classification is included here.

Fields

`category`   `enum ([HarmCategory](https://ai.google.dev/api/generate-content#v1beta.HarmCategory))`

Required. The category for this rating.

`probability`   `enum ([HarmProbability](https://ai.google.dev/api/generate-content#HarmProbability))`

Required. The probability of harm for this content.

`blocked`   `boolean`

Was this content blocked because of this rating?

JSON representation

---

```
{
  "category": enum (HarmCategory),
  "probability": enum (HarmProbability),
  "blocked": boolean
}
```

---

## HarmProbability

The probability that a piece of content is harmful.

The classification system gives the probability of the content being unsafe. This does not indicate the severity of harm for a piece of content.

| Enums |  |
| --- | --- |
| `HARM_PROBABILITY_UNSPECIFIED` | Probability is unspecified. |
| `NEGLIGIBLE` | Content has a negligible chance of being unsafe. |
| `LOW` | Content has a low chance of being unsafe. |
| `MEDIUM` | Content has a medium chance of being unsafe. |
| `HIGH` | Content has a high chance of being unsafe. |

## SafetySetting

Safety setting, affecting the safety-blocking behavior.

Passing a safety setting for a category changes the allowed probability that content is blocked.

Fields

`category`   `enum ([HarmCategory](https://ai.google.dev/api/generate-content#v1beta.HarmCategory))`

Required. The category for this setting.

`threshold`   `enum ([HarmBlockThreshold](https://ai.google.dev/api/generate-content#HarmBlockThreshold))`

Required. Controls the probability threshold at which harm is blocked.

JSON representation

---

```
{
  "category": enum (HarmCategory),
  "threshold": enum (HarmBlockThreshold)
}
```

---

## HarmBlockThreshold

Block at and beyond a specified harm probability.

| Enums |  |
| --- | --- |
| `HARM_BLOCK_THRESHOLD_UNSPECIFIED` | Threshold is unspecified. |
| `BLOCK_LOW_AND_ABOVE` | Content with NEGLIGIBLE will be allowed. |
| `BLOCK_MEDIUM_AND_ABOVE` | Content with NEGLIGIBLE and LOW will be allowed. |
| `BLOCK_ONLY_HIGH` | Content with NEGLIGIBLE, LOW, and MEDIUM will be allowed. |
| `BLOCK_NONE` | All content will be allowed. |
| `OFF` | Turn off the safety filter. |

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.