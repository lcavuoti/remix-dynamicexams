import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { marked } from "marked";

import { getExam } from "~/models/exam.server";

export const loader = async ({ params, request }) => {
  invariant(params.slug, `params.slug is required`);
  const exam = await getExam({ slug: params.slug });
  invariant(exam, `Exam not found: ${params.slug}`);
  const html = marked(exam.markdown);
  // answer
  const trigger = "[comment]: <> (";
  let question = html.substring(0, html.indexOf(trigger));
  console.log(question);
  let answer = html.substring(html.indexOf(trigger) + trigger.length);
  answer = JSON.parse(answer.substring(0, answer.length - 2));
  console.log("-------------")

  console.log(answer)
  console.log("-----------")
  return json({ exam, html , answer});
};

export default function ExamSlug() {
  const { exam, html, answer } = useLoaderData();

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">
        Some Exam {exam.title}
      </h1>
      {/*<div dangerouslySetInnerHTML={{ __html: html }} />*/}
      {/*<div >{answer }</div>*/}
    </main>
  );
}
