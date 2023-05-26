import { prisma } from "~/db.server";

export async function getExams() {
  return prisma.exam.findMany();
}

export async function getExam(slug) {
  return prisma.exam.findUnique({
    where: { slug }
  });
}

export async function createExam(exam) {
  return prisma.exam.create({ data: exam });
}
