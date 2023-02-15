const { default: openai } = require('./chatgpt');

const query = async (prompt, id, model) => {
  const res = await openai
    .createCompletion({
      model,
      prompt,
      temperature: 0.9,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.data.choices[0].text)
    .catch(
      (err) =>
        `ChatGPT was unable to find the answer for that query Error: ${err.message}`
    );

  return res;
};

export default query;
