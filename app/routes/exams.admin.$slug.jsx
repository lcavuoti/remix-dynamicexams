import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { marked } from "marked";

import { getExam } from "~/models/exam.server";

export const loader = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);
  const exam = await getExam(params.slug);
  invariant(exam, `Exam not found: ${params.slug}`);
  const html = marked(exam.markdown);
  console.log(exam)
  // console.log(html)
  // answer
  const trigger = "[comment]: <> (";
  let examString = exam.markdown
  console.log(examString)
  // let question = examString.substring(0, examString.indexOf(trigger));
  // console.log("---------"+question);
  let answer = examString.substring(examString.indexOf(trigger) + trigger.length);
  // answer = JSON.parse(answer.substring(0, answer.length - 2));

  console.log(answer)
  return json({ exam, html , answer});


};

export default function ExamSlug() {
  const { exam, html, answer } = useLoaderData();

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">
        Some Questions : {exam.title}
      </h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <div >{answer }</div>

    </main>
  );
}
