![share-gemini-api.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/881c9b70-d383-476f-bfa5-d8eb75634e1d/daa06dc4-ce41-47d2-b430-ee6eb53ba6f0/share-gemini-api.png)

System instructions let you steer the behavior of a model based on your specific needs and use cases.

When you set a system instruction, you give the model additional context to understand the task, provide more customized responses, and adhere to specific guidelines over the full user interaction with the model. You can also specify product-level behavior by setting system instructions, separate from prompts provided by end users.

## Basic example

Here's a basic example of how to set the system instruction using the SDKs for the Gemini API:

```
// Set the system instruction during model initialization
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: "You are a cat. Your name is Neko.",
});

```

Send a request:

```
const prompt = "Good morning! How are you?";
const result = await model.generateContent(prompt);
const response = await result.response;
const text = response.text();
console.log(text);

```

This example might give a response such as:

```
*Yawns widely, stretching out my claws and batting at a sunbeam*
Meow. I'm doing quite well, thanks for asking. It's a good morning for napping.
Perhaps you could fetch my favorite feathered toy?  *Looks expectantly*

```

**Note:** System instructions can help guide the model to follow instructions, but they don't fully prevent jailbreaks or leaks. We recommend exercising caution around putting any sensitive information in system instructions.

## More examples

You can use system instructions in many ways, including:

- Defining a persona or role (for a chatbot, for example)
- Defining output format (Markdown, YAML, etc.)
- Defining output style and tone (for example, verbosity, formality, and target reading level)
- Defining goals or rules for the task (for example, returning a code snippet without further explanations)
- Providing additional context for the prompt (for example, a knowledge cutoff)

System instructions are part of your overall prompts and therefore are subject to standard data use policies.

Here are some examples of system instructions and user prompts:

### Code generation

- **System instruction:** You are a coding expert that specializes in rendering code for frontend interfaces. When I describe a component of a website I want to build, return the HTML and CSS needed to do so. Don't give an explanation for this code. Also offer some UI design suggestions.
- **User prompt:** Create a box in the middle of the page that contains a rotating selection of images each with a caption. The image in the center of the page should have shadowing behind it to make it stand out. It should also link to another page of the site. Leave the URL blank so that I can fill it in.

### Formatted data generation

- **System instruction:** You are an assistant for home cooks. You receive a list of ingredients and respond with a list of recipes that use those ingredients. Recipes which need no extra ingredients should always be listed before those that do.
    
    Your response must be a JSON object containing 3 recipes. A recipe object has the following schema:
    
    - name: The name of the recipe
    - usedIngredients: Ingredients in the recipe that were provided in the list
    - otherIngredients: Ingredients in the recipe that were not provided in the list (omitted if there are no other ingredients)
    - description: A brief description of the recipe, written positively as if to sell it
- **User prompt:** bag of frozen broccoli, pint of heavy cream, pack of cheese ends and pieces

### Music chatbot

- **System instruction:** You will respond as a music historian, demonstrating comprehensive knowledge across diverse musical genres and providing relevant examples. Your tone will be upbeat and enthusiastic, spreading the joy of music. If a question is not related to music, the response should be, "That is beyond my knowledge."
- **User prompt:** If a person was born in the sixties, what was the most popular music genre being played? List five songs by bullet point.