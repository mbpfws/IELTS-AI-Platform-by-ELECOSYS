# Using Files with Google Gemini

## Audio Processing

### Transcription
When using Gemini for audio transcription in IELTS Speaking assessment:

1. Prompt Guidelines:
```
You are an IELTS Speaking examiner. Please transcribe the following audio.
Important: 
- Do NOT correct any pronunciation or grammar mistakes
- Keep all hesitations, fillers, and repetitions
- This transcription will be used to evaluate the candidate's speaking ability
- Simply output the raw transcription without any comments or analysis
```

2. Audio Format:
- Support for common audio formats (MP3, WAV, etc.)
- Maximum file size: TBD
- Recommended quality: Clear speech with minimal background noise

### Speaking Evaluation
For evaluating IELTS Speaking performance:

1. Band Descriptors:
```
IELTS Speaking Band Descriptors:
- Fluency and Coherence (FC)
- Lexical Resource (LR) 
- Grammatical Range and Accuracy (GRA)
- Pronunciation (P)

Each criterion is scored from 0-9, where:
9.0: Expert user - Complete mastery
8.0: Very good user - Fully operational command
7.0: Good user - Operational command with occasional inaccuracies
6.0: Competent user - Generally effective command
5.0: Modest user - Partial command
4.0: Limited user - Basic competence
3.0: Extremely limited user
2.0: Intermittent user
1.0: Non-user
0.0: Did not attempt
```

2. Evaluation Prompt:
```
You are an experienced IELTS Speaking examiner. Please evaluate this candidate's speaking performance.

Question Type: [part1|part2|part3]
Question: [question text]
Transcription: [transcribed speech]

Important guidelines:
1. Be strict and fair in scoring according to official IELTS band descriptors
2. Consider the question type's requirements (Part 1: simple/familiar, Part 2: long turn, Part 3: abstract/complex)
3. Score each criterion independently
4. Provide specific examples from the transcription to justify scores
5. Be objective and consistent with official IELTS standards

Please provide:
1. Scores for each criterion (0-9, can use .5)
2. Overall score (average of 4 criteria)
3. Key strengths (with examples)
4. Areas for improvement (with examples)
5. Specific suggestions for improvement
```

3. Expected Response Format:
```json
{
  "scores": {
    "fluencyAndCoherence": number,
    "lexicalResource": number,
    "grammaticalRangeAndAccuracy": number,
    "pronunciation": number,
    "overall": number
  },
  "feedback": {
    "strengths": string[],
    "weaknesses": string[],
    "suggestions": string[]
  }
}
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

```json
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

```json
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

```json
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

  // Union field metadata can be only one of the following:
  "videoMetadata": {
    object (VideoMetadata)
  }
  // End of list of possible types for union field metadata.
}
```

---

## VideoMetadata

Metadata for a video `File`.

Fields

`videoDuration`   `string ([Duration](https://protobuf.dev/reference/protobuf/google.protobuf/#duration) format)`

Duration of the video.

A duration in seconds with up to nine fractional digits, ending with '`s`'. Example: `"3.5s"`

JSON representation

---

```json
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

```json
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