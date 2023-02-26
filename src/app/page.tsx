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
    setRes("正在美化中，请稍等.......");
    const data = {
      promot: question,
    };

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
          setRes(content)
        }
      }).catch(e => {
        setRes("遇到了一点点错误，请重新提交需要美化的文章")
    });
  };

  const textareaOnChange: ChangeEventHandler<HTMLTextAreaElement> = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setQuestion(e.target.value);
  };

  const [res, setRes] = useState("");
  const [question, setQuestion] = useState("");

  return (
    <main>
      <label>
        润色区域:
        <textarea
          onChange={textareaOnChange}
          name="content"
          id="t-con"
          cols="100"
          rows="20"
        />
      </label>
      <button onClick={submitForm}>提交</button>
      <div>{res}</div>
    </main>
  );
}
