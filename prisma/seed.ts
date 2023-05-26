import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  const exams = [
  {
    slug: "my-first-exam",
    title: "Konstruktoren",
    markdown: `
# Konstruktoren
Gegeben ist die folgende Klasse:
java
class Bike {
  private int power;
}
Welcher der folgenden Vorschläge entspricht einem gültigen Konstruktor.

---
Vorschlag 1:
java
public class Bike {
}
---
Vorschlag 2:
java
public Car() {
    this.power = 0;
}
---
Vorschlag 3:
java
public power() {
}
[comment]: <> ({
    "type": "singlechoice",
    "level": 1,
    "answers": [
        "Vorschlag 1", 
        "Vorschlag 2", 
        "Vorschlag 3"
    ],
    "solution": 1
})


    `.trim(),
    },
    {
    slug: "90s-mixtape",
    title: "A Mixtape I Made Just For You",
    markdown: `
# 90s Mixtape

- I wish (Skee-Lo)
- This Is How We Do It (Montell Jordan)
- Everlong (Foo Fighters)
- Ms. Jackson (Outkast)
- Interstate Love Song (Stone Temple Pilots)
- Killing Me Softly With His Song (Fugees, Ms. Lauryn Hill)
- Just a Friend (Biz Markie)
- The Man Who Sold The World (Nirvana)
- Semi-Charmed Life (Third Eye Blind)
- ...Baby One More Time (Britney Spears)
- Better Man (Pearl Jam)
- It's All Coming Back to Me Now (Céline Dion)
- This Kiss (Faith Hill)
- Fly Away (Lenny Kravits)
- Scar Tissue (Red Hot Chili Peppers)
- Santa Monica (Everclear)
- C'mon N' Ride it (Quad City DJ's)
    `.trim(),
  }
];

for (const exam of exams) {
  await prisma.exam.upsert({
    where: { slug: exam.slug },
    update: exam,
    create: exam
  });
}





  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
