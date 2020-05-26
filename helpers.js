// ----------------------------------------------------------------
// Convert Title to slug
const sentenceToSlug = (sentence) => {
  return sentence
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

module.exports = {
  sentenceToSlug: sentenceToSlug,
};
