import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, CreateCompletionRequest, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-QsBKAVPwUNFNK02FdBDOrSc8",
  apiKey: "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",
});
console.log(configuration);

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, body } = req;
  const prompt = "请美化文章: " + body.q;

  const request: CreateCompletionRequest = {
    model: "text-davinci-003",
    prompt,
    temperature: 0.7,
    max_tokens: 3000,
    top_p: 1,
  };

  openai.createCompletion(request).then(
    (r) => {
      const status = r.status
      res.status(status).json(r.data);
    },
    (reason) => {
      throw new Error(reason)
    }
  );
}
