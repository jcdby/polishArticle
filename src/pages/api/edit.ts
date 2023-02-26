import {NextApiRequest, NextApiResponse} from "next";
import { Configuration, CreateCompletionRequest, OpenAIApi, CreateEditRequest } from 'openai'

const configuration = new Configuration({
  organization: 'org-QsBKAVPwUNFNK02FdBDOrSc8',
  apiKey: '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'
})
console.log(configuration)

const openai = new OpenAIApi(configuration)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, body } = req
  const prompt = body.q

  const request: CreateEditRequest = {
    model: 'text-davinci-edit-001',
    input: prompt,
    instruction: 'please polish the article',
  }

  const r = await openai.createEdit(request)
  res.status(200).json(r.data)
}
