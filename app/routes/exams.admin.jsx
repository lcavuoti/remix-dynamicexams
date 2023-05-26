import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import { getExams } from "~/models/exam.server";

export const loader = async ({ request }) => {
  return json({ exams: await getExams() });
};

export default function ExamAdmin() {
  const { exams } = useLoaderData();
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="my-6 mb-2 border-b-2 text-center text-3xl">Exam Admin</h1>
      <div className="grid grid-cols-4 gap-6">
        <nav className="col-span-4 md:col-span-1">
          <ul>
            {exams.map((exam) => (
              <li key={exam.slug}>
                <Link to={exam.slug} className="text-blue-600 underline">
                  {exam.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main className="col-span-4 md:col-span-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
