export function generateQuestions(): Array<{
  question: string;
  answer: number;
}> {
  const questions = [];

  for (let i = 1; i <= 10; i++) {
    let a: number;
    let b: number;

    if (i === 1) {
      // Question 1: single-digit but exclude 0, 1, 2
      a = Math.floor(Math.random() * 7) + 3; // 3–9
      b = Math.floor(Math.random() * 7) + 3; // 3–9
    } else if (i <= 3) {
      // Early questions: two-digit + one-digit
      a = Math.floor(Math.random() * 89) + 11; // 10–99
      b = Math.floor(Math.random() * 17) + 3; // 3–19
    } else if (i <= 5) {
      // Early-mid questions: one-digit + two-digit
      a = Math.floor(Math.random() * 17) + 3; // 3–19
      b = Math.floor(Math.random() * 150) + 20; // 20–169
    } else if (i <= 7) {
      // Mid questions: two-digit numbers
      a = Math.floor(Math.random() * 150) + 10; // 10–159
      b = Math.floor(Math.random() * 150) + 10; // 10–159
    } else if (i <= 9) {
      // Final questions: three-digit numbers
      a = Math.floor(Math.random() * 280) + 20; // 20–299
      b = Math.floor(Math.random() * 600) + 100; // 100–699
    } else {
      // Last question: three-digit numbers, higher difficulty
      a = Math.floor(Math.random() * 900) + 100; // 100–999
      b = Math.floor(Math.random() * 900) + 100; // 100–999
    }

    questions.push({
      question: `${a} + ${b}`,
      answer: a + b,
    });
  }

  return questions;
}
