"use client";
import { Inter } from "@next/font/google";
import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEvent,
  MouseEventHandler,
  useState,
} from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const submitForm: MouseEventHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setPolishedRes(["正在美化中，请稍等.......", ...polishedRes])
    setIsSubmitting(true)
    const data = {
      promot: question,
      lan: language
    };

    // lambda endpoint
    fetch(
      "https://e2f88lv7f1.execute-api.us-west-2.amazonaws.com/polishArticle_t1",
      {
        body: JSON.stringify(data),
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((d) => {
        let content = ""
        const choices: {text: string}[] = d.body.result.choices
        if (d.status === 200) {
          choices.forEach(ele => {
            content += ele.text
          })
          setPolishedRes([content, ...polishedRes])
        }
      }).catch(e => {
        alert("遇到了一点点错误，请重新提交需要美化的文章")
        // setPolishedRes([...polishedRes.splice(0, 1)])
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  };

  const textareaOnChange: ChangeEventHandler<HTMLTextAreaElement> = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setQuestion(e.target.value);
  };

  const [res, setRes] = useState("");
  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState("cn")
  const [polishedRes, setPolishedRes] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <div className={"bg-slate-50"}>
      <main className={"container mx-auto flex flex-col justify-items-center"}>
        <div>
          <p className={"text-xl mt-10"}>
            润色区域:
          </p>
          <select className={"my-5 p-4 rounded-lg border border-sky "} name="language" id="language" value={language} onChange={event => setLanguage(event.target.value)}>
            <option value="cn">中文</option>
            <option value="en">英文</option>
            <option value="ko">韩语</option>
          </select>
        </div>
        <textarea
          className={"border rounded-lg border-sky-500 border-solid border-2 p-3"}
          onChange={textareaOnChange}
          name="content"
          id="t-con"
          cols={100}
          rows={10}
        />
        <div>
          <button
            disabled={isSubmitting}
            className={`w-24 bg-sky-500 rounded-lg h-8 mt-6 text-white ${isSubmitting ? "cursor-not-allowed bg-gray-500" : "cursor-default" }` } onClick={submitForm}>提交</button>
        </div>
        <div>{res}</div>
      </main>
      <div
        style={{maxHeight: "calc(100vh - 486px)"}}
        className={" w-screen mt-5 overflow-y-auto overflow-x-hidden relative t-486px"}>{polishedRes.map((r, index) => {
        return (
          <div key={index}

               className={`  ${index % 2 === 0 ? "bg-sky-500 text-white" : "bg-slate-300 text-black"}`}>
            <div className={`container mx-auto p-10`}>
              {r}
            </div>
          </div>
        )
      })}</div>

    </div>
  );
}
