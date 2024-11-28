The Gemini API supports uploading media files separately from the prompt input, allowing your media to be reused across multiple requests and multiple prompts. For more details, check out the [Prompting with media](https://ai.google.dev/gemini-api/docs/prompting_with_media) guide.

## Example for different file types (treat these as examples only)

1. For PDF (only available in Python)
2. 

```python
model = genai.GenerativeModel("gemini-1.5-flash")
sample_pdf = genai.upload_file(media / "test.pdf")
response = model.generate_content(["Give me a summary of this pdf file.", sample_pdf])
print(response.text)
```

1. For Video

```jsx
// Make sure to include these imports:
// import { GoogleAIFileManager, FileState } from "@google/generative-ai/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";
const fileManager = new GoogleAIFileManager(process.env.API_KEY);

const uploadResult = await fileManager.uploadFile(
  `${mediaPath}/Big_Buck_Bunny.mp4`,
  {
    mimeType: "video/mp4",
    displayName: "Big Buck Bunny",
  },
);

let file = await fileManager.getFile(uploadResult.file.name);
while (file.state === FileState.PROCESSING) {
  process.stdout.write(".");
  // Sleep for 10 seconds
  await new Promise((resolve) => setTimeout(resolve, 10_000));
  // Fetch the file from the API again
  file = await fileManager.getFile(uploadResult.file.name);
}

if (file.state === FileState.FAILED) {
  throw new Error("Video processing failed.");
}

// View the response.
console.log(
  `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`,
);

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const result = await model.generateContent([
  "Tell me about this video.",
  {
    fileData: {
      fileUri: uploadResult.file.uri,
      mimeType: uploadResult.file.mimeType,
    },
  },
]);
console.log(result.response.text());
```

1. For Text

```jsx
// Make sure to include these imports:
// import { GoogleAIFileManager, FileState } from "@google/generative-ai/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";
const fileManager = new GoogleAIFileManager(process.env.API_KEY);

const uploadResult = await fileManager.uploadFile(
  `${mediaPath}/samplesmall.mp3`,
  {
    mimeType: "audio/mp3",
    displayName: "Audio sample",
  },
);

let file = await fileManager.getFile(uploadResult.file.name);
while (file.state === FileState.PROCESSING) {
  process.stdout.write(".");
  // Sleep for 10 seconds
  await new Promise((resolve) => setTimeout(resolve, 10_000));
  // Fetch the file from the API again
  file = await fileManager.getFile(uploadResult.file.name);
}

if (file.state === FileState.FAILED) {
  throw new Error("Audio processing failed.");
}

// View the response.
console.log(
  `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`,
);

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const result = await model.generateContent([
  "Tell me about this audio clip.",
  {
    fileData: {
      fileUri: uploadResult.file.uri,
      mimeType: uploadResult.file.mimeType,
    },
  },
]);
console.log(result.response.text());
```

1. For audio

```jsx
// Make sure to include these imports:
// import { GoogleAIFileManager, FileState } from "@google/generative-ai/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";
const fileManager = new GoogleAIFileManager(process.env.API_KEY);

const uploadResult = await fileManager.uploadFile(
  `${mediaPath}/samplesmall.mp3`,
  {
    mimeType: "audio/mp3",
    displayName: "Audio sample",
  },
);

let file = await fileManager.getFile(uploadResult.file.name);
while (file.state === FileState.PROCESSING) {
  process.stdout.write(".");
  // Sleep for 10 seconds
  await new Promise((resolve) => setTimeout(resolve, 10_000));
  // Fetch the file from the API again
  file = await fileManager.getFile(uploadResult.file.name);
}

if (file.state === FileState.FAILED) {
  throw new Error("Audio processing failed.");
}

// View the response.
console.log(
  `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`,
);

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const result = await model.generateContent([
  "Tell me about this audio clip.",
  {
    fileData: {
      fileUri: uploadResult.file.uri,
      mimeType: uploadResult.file.mimeType,
    },
  },
]);
console.log(result.response.text());
```

1. For Image

```jsx
// Make sure to include these imports:
// import { GoogleAIFileManager } from "@google/generative-ai/server";
// import { GoogleGenerativeAI } from "@google/generative-ai";
const fileManager = new GoogleAIFileManager(process.env.API_KEY);

const uploadResult = await fileManager.uploadFile(
  `${mediaPath}/jetpack.jpg`,
  {
    mimeType: "image/jpeg",
    displayName: "Jetpack drawing",
  },
);
// View the response.
console.log(
  `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`,
);

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const result = await model.generateContent([
  "Tell me about this image.",
  {
    fileData: {
      fileUri: uploadResult.file.uri,
      mimeType: uploadResult.file.mimeType,
    },
  },
]);
console.log(result.response.text());
```

## Method: media.upload

Creates a `File`.

### Endpoint

- Upload URI, for media upload requests:

post   https://generativelanguage.googleapis.com/upload/v1beta/files

- Metadata URI, for metadata-only requests:

post   https://generativelanguage.googleapis.com/v1beta/files

### Request body

The request body contains data with the following structure:

Fields

`file`   `object ([File](https://ai.google.dev/api/files#File))`

Optional. Metadata for the file to create.

### Example request

### Response body

Response for `media.upload`.

If successful, the response body contains data with the following structure:

Fields

`file`   `object ([File](https://ai.google.dev/api/files#File))`

Metadata for the created file.

JSON representation

---

```
{
  "file": {
    object (File)
  }
}
```

---

## Method: files.get

Gets the metadata for the given `File`.

### Endpoint

get   https://generativelanguage.googleapis.com/v1beta/{name=files/*}

### Path parameters

`name`   `string`

Required. The name of the `File` to get. Example: `files/abc-123` It takes the form `files/{file}`.

### Request body

The request body must be empty.

### Example request

### Response body

If successful, the response body contains an instance of [`File`](https://ai.google.dev/api/files#File).

## Method: files.list

Lists the metadata for `File`s owned by the requesting project.

### Endpoint

get   https://generativelanguage.googleapis.com/v1beta/files

### Query parameters

`pageSize`   `integer`

Optional. Maximum number of `File`s to return per page. If unspecified, defaults to 10. Maximum `pageSize` is 100.

`pageToken`   `string`

Optional. A page token from a previous `files.list` call.

### Request body

The request body must be empty.

### Example request

### Response body

Response for `files.list`.

If successful, the response body contains data with the following structure:

Fields

`files[]`   `object ([File](https://ai.google.dev/api/files#File))`

The list of `File`s.

`nextPageToken`   `string`

A token that can be sent as a `pageToken` into a subsequent `files.list` call.

JSON representation

---

```
{
  "files": [
    {
      object (File)
    }
  ],
  "nextPageToken": string
}
```

---

## Method: files.delete

Deletes the `File`.

### Endpoint

delete   https://generativelanguage.googleapis.com/v1beta/{name=files/*}

### Path parameters

`name`   `string`

Required. The name of the `File` to delete. Example: `files/abc-123` It takes the form `files/{file}`.

### Request body

The request body must be empty.

### Example request

### Response body

If successful, the response body is empty.

## REST Resource: files

## Resource: File

A file uploaded to the API.

Fields

`name`   `string`

Immutable. Identifier. The `File` resource name. The ID (name excluding the "files/" prefix) can contain up to 40 characters that are lowercase alphanumeric or dashes (-). The ID cannot start or end with a dash. If the name is empty on create, a unique name will be generated. Example: `files/123-456`

`displayName`   `string`

Optional. The human-readable display name for the `File`. The display name must be no more than 512 characters in length, including spaces. Example: "Welcome Image"

`mimeType`   `string`

Output only. MIME type of the file.

`sizeBytes`   `string ([int64](https://developers.google.com/discovery/v1/type-format) format)`

Output only. Size of the file in bytes.

`createTime`   `string ([Timestamp](https://protobuf.dev/reference/protobuf/google.protobuf/#timestamp) format)`

Output only. The timestamp of when the `File` was created.

A timestamp in RFC3339 UTC "Zulu" format, with nanosecond resolution and up to nine fractional digits. Examples: `"2014-10-02T15:01:23Z"` and `"2014-10-02T15:01:23.045123456Z"`.

`updateTime`   `string ([Timestamp](https://protobuf.dev/reference/protobuf/google.protobuf/#timestamp) format)`

Output only. The timestamp of when the `File` was last updated.

A timestamp in RFC3339 UTC "Zulu" format, with nanosecond resolution and up to nine fractional digits. Examples: `"2014-10-02T15:01:23Z"` and `"2014-10-02T15:01:23.045123456Z"`.

`expirationTime`   `string ([Timestamp](https://protobuf.dev/reference/protobuf/google.protobuf/#timestamp) format)`

Output only. The timestamp of when the `File` will be deleted. Only set if the `File` is scheduled to expire.

A timestamp in RFC3339 UTC "Zulu" format, with nanosecond resolution and up to nine fractional digits. Examples: `"2014-10-02T15:01:23Z"` and `"2014-10-02T15:01:23.045123456Z"`.

`sha256Hash`   `string ([bytes](https://developers.google.com/discovery/v1/type-format) format)`

Output only. SHA-256 hash of the uploaded bytes.

A base64-encoded string.

`uri`   `string`

Output only. The uri of the `File`.

`state`   `enum ([State](https://ai.google.dev/api/files#State))`

Output only. Processing state of the File.

`error`   `object ([Status](https://ai.google.dev/api/files#Status))`

Output only. Error status if File processing failed.

Union field `metadata`. Metadata for the File. `metadata` can be only one of the following:

`videoMetadata`   `object ([VideoMetadata](https://ai.google.dev/api/files#VideoMetadata))`

Output only. Metadata for a video.

JSON representation

---

```
{
  "name": string,
  "displayName": string,
  "mimeType": string,
  "sizeBytes": string,
  "createTime": string,
  "updateTime": string,
  "expirationTime": string,
  "sha256Hash": string,
  "uri": string,
  "state": enum (State),
  "error": {
    object (Status)
  },

  // Union fieldmetadata can be only one of the following:
  "videoMetadata": {
    object (VideoMetadata)
  }
  // End of list of possible types for union fieldmetadata.
}
```

---

## VideoMetadata

Metadata for a video `File`.

Fields

`videoDuration`   `string ([Duration](https://protobuf.dev/reference/protobuf/google.protobuf/#duration) format)`

Duration of the video.

A duration in seconds with up to nine fractional digits, ending with '`s`'. Example: `"3.5s"`.

JSON representation

---

```
{
  "videoDuration": string
}
```

---

## State

States for the lifecycle of a File.

| Enums |  |
| --- | --- |
| `STATE_UNSPECIFIED` | The default value. This value is used if the state is omitted. |
| `PROCESSING` | File is being processed and cannot be used for inference yet. |
| `ACTIVE` | File is processed and available for inference. |
| `FAILED` | File failed processing. |

## Status

The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details.

You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).

Fields

`code`   `integer`

The status code, which should be an enum value of `google.rpc.Code`.

`message`   `string`

A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the [`google.rpc.Status.details`](https://ai.google.dev/api/files#Status.FIELDS.details) field, or localized by the client.

`details[]`   `object`

A list of messages that carry the error details. There is a common set of message types for APIs to use.

An object containing fields of an arbitrary type. An additional field `"@type"` contains a URI identifying the type. Example: `{ "id": 1234, "@type": "types.example.com/standard/id" }`.

JSON representation

---

```
{
  "code": integer,
  "message": string,
  "details": [
    {
      "@type": string,
      field1: ...,
      ...
    }
  ]
}
```

---