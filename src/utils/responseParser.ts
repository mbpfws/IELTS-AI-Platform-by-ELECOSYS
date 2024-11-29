interface AIResponse {
  text?: string;
  metrics?: {
    scores: {
      pronunciation: number;
      grammar: number;
      vocabulary: number;
      fluency: number;
      coherence: number;
    };
    overallBand: number;
  };
}

export function parseAIResponse(response: string): AIResponse {
  try {
    // Try to find JSON metrics if they exist
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    let metrics;
    let text = response;

    if (jsonMatch) {
      try {
        // Extract and parse the JSON part
        metrics = JSON.parse(jsonMatch[0]);
        // Remove the JSON part from the text
        text = response.replace(jsonMatch[0], '').trim();
      } catch (e) {
        console.warn('Failed to parse metrics JSON:', e);
      }
    }

    // Clean up the text response
    text = text
      .replace(/```json[\s\S]*?```/g, '') // Remove any JSON code blocks
      .replace(/```[\s\S]*?```/g, '')      // Remove any other code blocks
      .trim();

    return {
      text,
      metrics
    };
  } catch (error) {
    console.error('Error parsing AI response:', error);
    return {
      text: response
    };
  }
}
