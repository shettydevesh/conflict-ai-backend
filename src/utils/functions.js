export function calculateCost(usage) {
  const cost =
    (usage.input_tokens / 1000000) * 0.8 +
    (usage.output_tokens / 1000000) * 4.0;
  return cost * 86.3;
}

export function extractOutput(message) {
  // Regex to extract thinking and answer texts
  const thinkingRegex = /<thinking>(.*?)<\/thinking>/gs;
  const answerRegex = /<output>(.*?)<\/output>/gs;
  const analysisRegex = /<analysis>(.*?)<\/analysis>/gs;
  // Initialize arrays to store thinking and answer texts
  const thinkingTexts = [];
  const answerTexts = [];
  const analysisTexts = [];

  // Initialize match variable
  let match;

  // Extract thinking texts
  while ((match = thinkingRegex.exec(message)) !== null) {
    thinkingTexts.push(match[1].trim());
  }

  // Extract answer texts
  while ((match = answerRegex.exec(message)) !== null) {
    answerTexts.push(match[1].trim());
  }

  // Extract answer texts
  while ((match = analysisRegex.exec(message)) !== null) {
    analysisTexts.push(match[1].trim());
  }
  return [thinkingTexts[0], answerTexts[0], analysisTexts[0]];
}
