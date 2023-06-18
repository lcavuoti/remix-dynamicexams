import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getExams } from "~/models/exam.server";
export const loader = async () => {
  return json({ exams: await getExams() });
};

export default function DynamicExams() {
  const { exams } = useLoaderData();
  return (
    <main >
      <h1 className="text-center text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">DynamicExams</h1>
      <Link to="admin" className="text-red-600 underline">
        Admin
      </Link>
      <ul className="divide-y divide-gray-200">
        {exams.map((exam) => (
          <li key={exam.slug}>
            <Link to={exam.slug} className="text-blue-600 underline">
              {exam.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className="text-center divide-y divide-gray-200">
        {exams.map((exam) => (
          <li key={exam.slug}>
            <Link to={exam.slug} className="text-blue-600 underline">
              {exam.title}
            </Link>
          </li>
        ))}
      </div>
    </main>
  );
}
