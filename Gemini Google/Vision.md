![vision.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/881c9b70-d383-476f-bfa5-d8eb75634e1d/0bfaabf8-b533-4b07-833a-3615fadd267a/vision.png)

The Gemini API can run inference on images and videos passed to it. When passed an image, a series of images, or a video, Gemini can:

- Describe or answer questions about the content
- Summarize the content
- Extrapolate from the content

This tutorial demonstrates some possible ways to prompt the Gemini API with images and video input. All output is text-only.

## Before you begin: Set up your project and API key

Before calling the Gemini API, you need to set up your project and configure your API key.

## Prompting with images

In this tutorial, you will upload images using the File API or as inline data and generate content based on those images.

### Technical details (images)

Gemini 1.5 Pro and 1.5 Flash support a maximum of 3,600 image files.

Images must be in one of the following image data MIME types:

- PNG - `image/png`
- JPEG - `image/jpeg`
- WEBP - `image/webp`
- HEIC - `image/heic`
- HEIF - `image/heif`

Each image is equivalent to 258 tokens.

While there are no specific limits to the number of pixels in an image besides the model's context window, larger images are scaled down to a maximum resolution of 3072x3072 while preserving their original aspect ratio, while smaller images are scaled up to 768x768 pixels. There is no cost reduction for images at lower sizes, other than bandwidth, or performance improvement for images at higher resolution.

For best results:

- Rotate images to the correct orientation before uploading.
- Avoid blurry images.
- If using a single image, place the text prompt after the image.

### Upload an image and generate content

Use the [`media.upload`](https://ai.google.dev/api/rest/v1beta/media/upload) method of the File API to upload an image of any size. (Always use the File API when the combination of files and system instructions that you intend to send is larger than 20 MB.)

**Note:** The File API lets you store up to 20 GB of files per project, with a per-file maximum size of 2 GB. Files are stored for 48 hours. They can be accessed in that period with your API key, but cannot be downloaded from the API. It is available at no cost in all regions where the Gemini API is available.

After uploading the file, you can make `GenerateContent` requests that reference the File API URI. Select the generative model and provide it with a text prompt and the uploaded image.

```
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
console.log(result.response.text());files.js
```

### Verify image file upload and get metadata

You can verify the API successfully stored the uploaded file and get its metadata by calling [`files.get`](https://ai.google.dev/api/rest/v1beta/files/get). Only the `name` (and by extension, the `uri`) are unique.

```
// Make sure to include these imports:
// import { GoogleAIFileManager } from "@google/generative-ai/server";
const fileManager = new GoogleAIFileManager(process.env.API_KEY);

const uploadResponse = await fileManager.uploadFile(
  `${mediaPath}/jetpack.jpg`,
  {
    mimeType: "image/jpeg",
    displayName: "Jetpack drawing",
  },
);

// Get the previously uploaded file's metadata.
const getResponse = await fileManager.getFile(uploadResponse.file.name);

// View the response.
console.log(
  `Retrieved file ${getResponse.displayName} as ${getResponse.uri}`,
);files.js
```

### Call one or more locally stored image files

Alternatively, you can upload your own files.

When the combination of files and system instructions that you intend to send is larger than 20MB in size, use the File API to upload those files, as previously shown. Smaller files can instead be called locally from the Gemini API:

```
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

// Turn images to Part objects
const filePart1 = fileToGenerativePart("jetpack.jpg", "image/jpeg")
const filePart2 = fileToGenerativePart("piranha.jpg", "image/jpeg")
const filePart3 = fileToGenerativePart("firefighter.jpg", "image/jpeg")

```

Note that these inline data calls don't include many of the features available through the File API, such as getting file metadata, [listing](https://ai.google.dev/gemini-api/docs/vision?lang=node#list-files), or [deleting files](https://ai.google.dev/gemini-api/docs/vision?lang=node#delete-files).

### Prompt with multiple images

You can provide the Gemini API with any combination of images and text that fit within the model's context window. This example provides one short text prompt and the three images previously uploaded.

```
async function run() {
  // Choose a Gemini model.
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = "Write an advertising jingle showing how the product in the first image could solve the problems shown in the second two images.";

  const imageParts = [
    filePart1,
    filePart2,
    filePart3,
  ];

  const generatedContent = await model.generateContent([prompt, ...imageParts]);

  console.log(generatedContent.response.text());
}

run();

```

### Get a bounding box for an object

You can ask the model for the coordinates of bounding boxes for objects in images. For object detection, the Gemini model has been trained to provide these coordinates as relative widths or heights in range `[0,1]`, scaled by 1000 and converted to an integer. Effectively, the coordinates given are for a 1000x1000 version of the original image, and need to be converted back to the dimensions of the original image.

```
// filePart = ...
// filePart2 has the piranha.

async function findBox(filePart) {
  // Choose a Gemini model.
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = "Return a bounding box for the piranha. \n [ymin, xmin, ymax, xmax]";

  const generatedContent = await model.generateContent([prompt, filePart]);

  console.log(generatedContent.response.text());
}

run(filePart);

```

To convert these coordinates to the dimensions of the original image:

1. Divide each output coordinate by 1000.
2. Multiply the x-coordinates by the original image width.
3. Multiply the y-coordinates by the original image height.

## Prompting with video

In this tutorial, you will upload a video using the File API and generate content based on those images.

**Note:** The File API is required to upload video files, due to their size. However, the File API is only available for Python, Node.js, Go, and REST.

### Technical details (video)

Gemini 1.5 Pro and Flash support up to approximately an hour of video data.

Video must be in one of the following video format MIME types:

- `video/mp4`
- `video/mpeg`
- `video/mov`
- `video/avi`
- `video/x-flv`
- `video/mpg`
- `video/webm`
- `video/wmv`
- `video/3gpp`

The File API service extracts image frames from videos at 1 frame per second (FPS) and audio at 1Kbps, single channel, adding timestamps every second. These rates are subject to change in the future for improvements in inference.

**Note:** The details of fast action sequences may be lost at the 1 FPS frame sampling rate. Consider slowing down high-speed clips for improved inference quality.

Individual frames are 258 tokens, and audio is 32 tokens per second. With metadata, each second of video becomes ~300 tokens, which means a 1M context window can fit slightly less than an hour of video.

To ask questions about time-stamped locations, use the format `MM:SS`, where the first two digits represent minutes and the last two digits represent seconds.

For best results:

- Use one video per prompt.
- If using a single video, place the text prompt after the video.

### Upload a video file using the File API

**Note:** The File API lets you store up to 20 GB of files per project, with a per-file maximum size of 2 GB. Files are stored for 48 hours. They can be accessed in that period with your API key, but they cannot be downloaded using any API. It is available at no cost in all regions where the Gemini API is available.

The File API accepts video file formats directly. This example uses the short NASA film ["Jupiter's Great Red Spot Shrinks and Grows"](https://www.youtube.com/watch?v=JDi4IdtvDVE0). Credit: Goddard Space Flight Center (GSFC)/David Ladd (2018).

"Jupiter's Great Red Spot Shrinks and Grows" is in the public domain and does not show identifiable people. ([NASA image and media usage guidelines.](https://www.nasa.gov/nasa-brand-center/images-and-media/))

Start by retrieving the short video:

```
wget https://storage.googleapis.com/generativeai-downloads/images/GreatRedSpot.mp4
```

Upload the video using the File API and print the URI.

```
// To use the File API, use this import path for GoogleAIFileManager.
// Note that this is a different import path than what you use for generating content.
// For versions lower than @google/generative-ai@0.13.0
// use "@google/generative-ai/files"
import { GoogleAIFileManager } from "@google/generative-ai/server";

// Initialize GoogleAIFileManager with your API_KEY.
const fileManager = new GoogleAIFileManager(process.env.API_KEY);

// Upload the file and specify a display name.
const uploadResponse = await fileManager.uploadFile("GreatRedSpot.mp4", {
  mimeType: "video/mp4",
  displayName: "Jupiter's Great Red Spot",
});

// View the response.
console.log(`Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`);

```

### Verify file upload and check state

Verify the API has successfully received the files by calling the [`files.get`](https://ai.google.dev/api/rest/v1beta/files/get) method.

**Note:** Video files have a `State` field in the File API. When a video is uploaded, it will be in the `PROCESSING` state until it is ready for inference. **Only `ACTIVE` files can be used for model inference.**

```
// To use the File API, use this import path for GoogleAIFileManager.
// Note that this is a different import path than what you use for generating content.
// For versions lower than @google/generative-ai@0.13.0
// use "@google/generative-ai/files"
import { GoogleAIFileManager, FileState } from "@google/generative-ai/server";

// Initialize GoogleAIFileManager with your API_KEY.
const fileManager = new GoogleAIFileManager(process.env.API_KEY);

// Upload the video file using the File API
// uploadResponse = ...
const name = uploadResponse.file.name;

// Poll getFile() on a set interval (10 seconds here) to check file state.
let file = await fileManager.getFile(name);
while (file.state === FileState.PROCESSING) {
  process.stdout.write(".")
  // Sleep for 10 seconds
  await new Promise((resolve) => setTimeout(resolve, 10_000));
  // Fetch the file from the API again
  file = await fileManager.getFile(name)
}

if (file.state === FileState.FAILED) {
  throw new Error("Video processing failed.");
}

// When file.state is ACTIVE, the file is ready to be used for inference.
console.log(`File ${file.displayName} is ready for inference as ${file.uri}`);

```

### Prompt with a video and text

Once the uploaded video is in the `ACTIVE` state, you can make `GenerateContent` requests that specify the File API URI for that video. Select the generative model and provide it with the uploaded video and a text prompt.

```
// To generate content, use this import path for GoogleGenerativeAI.
// Note that this is a different import path than what you use for the File API.
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize GoogleGenerativeAI with your API_KEY.
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Choose a Gemini model.
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

// Upload the video file using the File API
// uploadResponse = ...

// Generate content using text and the URI reference for the uploaded file.
const result = await model.generateContent([
    {
      fileData: {
        mimeType: uploadResponse.file.mimeType,
        fileUri: uploadResponse.file.uri
      }
    },
    { text: "Summarize this video. Then create a quiz with answer key based on the information in the video." },
  ]);

// Handle the response of generated text
console.log(result.response.text())

```

### Refer to timestamps in the content

You can use timestamps of the form `MM:SS` to refer to specific moments in the video.

```
// To generate content, use this import path for GoogleGenerativeAI.
// Note that this is a different import path than what you use for the File API.
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize GoogleGenerativeAI with your API_KEY.
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Choose a Gemini model.
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

// Upload the video file using the File API
// uploadResponse = ...

// Generate content using text and the URI reference for the uploaded file.
const result = await model.generateContent([
    {
      fileData: {
        mimeType: uploadResponse.file.mimeType,
        fileUri: uploadResponse.file.uri
      }
    },
    { text: "What are the examples given at 01:05 and 01:19 supposed to show us?" },
  ]);

// Handle the response of generated text
console.log(result.response.text())

```

### Transcribe video and provide visual descriptions

If the video is not fast-paced (only 1 frame per second of video is sampled), it's possible to transcribe the video with visual descriptions for each shot.

```
// To generate content, use this import path for GoogleGenerativeAI.
// Note that this is a different import path than what you use for the File API.
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize GoogleGenerativeAI with your API_KEY.
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Choose a Gemini model.
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

// Upload the video file using the File API
// uploadResponse = ...

// Generate content using text and the URI reference for the uploaded file.
const result = await model.generateContent([
    {
      fileData: {
        mimeType: uploadResponse.file.mimeType,
        fileUri: uploadResponse.file.uri
      }
    },
    { text: "Transcribe the audio, giving timestamps. Also provide visual descriptions." },
  ]);

// Handle the response of generated text
console.log(result.response.text())

```

## List files

You can list all files uploaded using the File API and their URIs using [`files.list`](https://ai.google.dev/api/files#method:-files.list).

```
// Make sure to include these imports:
// import { GoogleAIFileManager } from "@google/generative-ai/server";
const fileManager = new GoogleAIFileManager(process.env.API_KEY);

const listFilesResponse = await fileManager.listFiles();

// View the response.
for (const file of listFilesResponse.files) {
  console.log(`name: ${file.name} | display name: ${file.displayName}`);
}files.js
```

## Delete files

Files uploaded using the File API are automatically deleted after 2 days. You can also manually delete them using [`files.delete`](https://ai.google.dev/api/files#method:-files.delete).

```
// Make sure to include these imports:
// import { GoogleAIFileManager } from "@google/generative-ai/server";
const fileManager = new GoogleAIFileManager(process.env.API_KEY);

const uploadResult = await fileManager.uploadFile(
  `${mediaPath}/jetpack.jpg`,
  {
    mimeType: "image/jpeg",
    displayName: "Jetpack drawing",
  },
);

// Delete the file.
await fileManager.deleteFile(uploadResult.file.name);

console.log(`Deleted ${uploadResult.file.displayName}`);files.js
```

## What's next

This guide shows how to upload image and video files using the File API and then generate text outputs from image and video inputs. To learn more, see the following resources:

- [File prompting strategies](https://ai.google.dev/gemini-api/docs/file-prompting-strategies): The Gemini API supports prompting with text, image, audio, and video data, also known as multimodal prompting.
- [System instructions](https://ai.google.dev/gemini-api/docs/system-instructions): System instructions let you steer the behavior of the model based on your specific needs and use cases.
- [Safety guidance](https://ai.google.dev/gemini-api/docs/safety-guidance): Sometimes generative AI models produce unexpected outputs, such as outputs that are inaccurate, biased, or offensive. Post-processing and human evaluation are essential to limit the risk of harm from such outputs.