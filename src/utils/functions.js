export function calculateCost(usage) {
  const cost =
    (usage.input_tokens / 1000000) * 0.8 +
    (usage.output_tokens / 1000000) * 4.0;
  return cost * 86.3;
}

export function extractOutput(message) {
  // Find all unique tags in the message
  const tagRegex = /<([a-zA-Z_]+)>(.*?)<\/\1>/gs;
  const tagResults = {};

  let match;
  while ((match = tagRegex.exec(message)) !== null) {
    const tagName = match[1];
    const tagContent = match[2].trim();

    // Initialize array for this tag type if it doesn't exist
    if (!tagResults[tagName]) {
      tagResults[tagName] = [];
    }

    // Add the content to the array for this tag type
    tagResults[tagName].push(tagContent);
  }
  return tagResults;
}
