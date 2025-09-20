export function generateQuestions(): Array<{
  question: string;
  answer: number;
}> {
  const questions = [];
  for (let i = 1; i <= 10; i++) {
    const max = i * 10;
    const a = Math.floor(Math.random() * max);
    const b = Math.floor(Math.random() * max);
    questions.push({
      question: `${a} + ${b}`,
      answer: a + b,
    });
  }
  return questions;
}
