import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getExams } from "~/models/exam.server";
export const loader = async () => {
  return json({ exams: await getExams() });
};

export default function DynamicExams() {
  const { exams } = useLoaderData();
  return (
    <main>
      <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">DynamicExams</h1>
      <Link to="admin" className="text-red-600 underline">
        Admin
      </Link>
      <ul>
        {exams.map((exam) => (
          <li key={exam.slug}>
            <Link to={exam.slug} className="text-blue-600 underline">
              {exam.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
