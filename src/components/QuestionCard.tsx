import React, { useEffect, useState } from "react";
import { useGameContext } from "../context/GameContext";
type QuestionCardProps = {
  subject: string;
  difficulty: string;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
};
type Option = {
  value: string | number;
  isCorrect: boolean;
};
type QuestionType = {
  question: string;
  displayContent: React.ReactNode;
  options: Option[];
};
export function QuestionCard({
  subject,
  difficulty,
  onCorrectAnswer,
  onWrongAnswer
}: QuestionCardProps) {
  const {
    questionCount
  } = useGameContext();
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [shuffledOptions, setShuffledOptions] = useState<Option[]>([]);
  const shuffleOptions = (options: Option[]) => {
    return [...options].sort(() => Math.random() - 0.5);
  };
  useEffect(() => {
    let newQuestion: QuestionType;
    if (subject === "math") {
      if (difficulty === "easy") {
        const num = Math.floor(Math.random() * 5) + 1;
        const apples = Array(num).fill("🍎").join(" ");
        newQuestion = {
          question: "How many apples do you see?",
          displayContent: <div className="text-6xl my-6 tracking-wide leading-relaxed">
              {apples}
            </div>,
          options: [{
            value: num,
            isCorrect: true
          }, {
            value: num + 1,
            isCorrect: false
          }, {
            value: num > 1 ? num - 1 : num + 2,
            isCorrect: false
          }]
        };
      } else {
        const num1 = Math.floor(Math.random() * (difficulty === "medium" ? 5 : 10)) + 1;
        const num2 = Math.floor(Math.random() * (difficulty === "medium" ? 3 : 5)) + 1;
        const operation = Math.random() > 0.5 ? "+" : num1 > num2 ? "-" : "+";
        const answer = operation === "+" ? num1 + num2 : num1 - num2;
        newQuestion = {
          question: `${num1} ${operation} ${num2} = ?`,
          displayContent: null,
          options: [{
            value: answer,
            isCorrect: true
          }, {
            value: answer + 1,
            isCorrect: false
          }, {
            value: answer > 1 ? answer - 1 : answer + 2,
            isCorrect: false
          }]
        };
      }
    } else {
      if (difficulty === "easy") {
        const letters = [{
          letter: "A",
          emoji: "🍎",
          word: "Apple"
        }, {
          letter: "B",
          emoji: "🍌",
          word: "Banana"
        }, {
          letter: "C",
          emoji: "🐱",
          word: "Cat"
        }, {
          letter: "D",
          emoji: "🐶",
          word: "Dog"
        }, {
          letter: "E",
          emoji: "🥚",
          word: "Egg"
        }];
        const selected = letters[Math.floor(Math.random() * letters.length)];
        newQuestion = {
          question: `What letter does "${selected.word}" start with?`,
          displayContent: <div className="text-7xl my-6">{selected.emoji}</div>,
          options: [{
            value: selected.letter,
            isCorrect: true
          }, {
            value: letters[(letters.findIndex(l => l.letter === selected.letter) + 1) % letters.length].letter,
            isCorrect: false
          }, {
            value: letters[(letters.findIndex(l => l.letter === selected.letter) + 2) % letters.length].letter,
            isCorrect: false
          }]
        };
      } else if (difficulty === "medium") {
        const animals = [{
          word: "Cat",
          emoji: "🐱"
        }, {
          word: "Dog",
          emoji: "🐶"
        }, {
          word: "Bird",
          emoji: "🐦"
        }, {
          word: "Fish",
          emoji: "🐠"
        }, {
          word: "Duck",
          emoji: "🦆"
        }, {
          word: "Snake",
          emoji: "🐍"
        }, {
          word: "Cow",
          emoji: "🐄"
        }, {
          word: "Sheep",
          emoji: "🐑"
        }, {
          word: "Chicken",
          emoji: "🐔"
        }, {
          word: "Chick",
          emoji: "🐥"
        }, {
          word: "Mouse",
          emoji: "🐭"
        }, {
          word: "Pig",
          emoji: "🐷"
        }, {
          word: "Koala",
          emoji: "🐨"
        }, {
          word: "Bear",
          emoji: "🐻"
        }, {
          word: "Wolf",
          emoji: "🐺"
        }, {
          word: "Fox",
          emoji: "🦊"
        }, {
          word: "Penguin",
          emoji: "🐧"
        }, {
          word: "Frog",
          emoji: "🐸"
        }, {
          word: "Lion",
          emoji: "🦁"
        }, {
          word: "Tiger",
          emoji: "🐯"
        }];
        const selectedIndex = Math.floor(Math.random() * animals.length);
        const selected = animals[selectedIndex];
        const wrongOptions: string[] = [];
        while (wrongOptions.length < 2) {
          const randomIndex = Math.floor(Math.random() * animals.length);
          const randomAnimal = animals[randomIndex].word;
          if (randomAnimal !== selected.word && !wrongOptions.includes(randomAnimal)) {
            wrongOptions.push(randomAnimal);
          }
        }
        newQuestion = {
          question: "What animal is this?",
          displayContent: <div className="text-7xl my-6">{selected.emoji}</div>,
          options: [{
            value: selected.word,
            isCorrect: true
          }, {
            value: wrongOptions[0],
            isCorrect: false
          }, {
            value: wrongOptions[1],
            isCorrect: false
          }]
        };
      } else {
        const questionType = Math.random() > 0.5 ? "animal" : "vocabulary";
        if (questionType === "animal") {
          const animals = [{
            word: "Cat",
            emoji: "🐱"
          }, {
            word: "Dog",
            emoji: "🐶"
          }, {
            word: "Bird",
            emoji: "🐦"
          }, {
            word: "Fish",
            emoji: "🐠"
          }, {
            word: "Duck",
            emoji: "🦆"
          }, {
            word: "Snake",
            emoji: "🐍"
          }, {
            word: "Cow",
            emoji: "🐄"
          }, {
            word: "Sheep",
            emoji: "🐑"
          }, {
            word: "Chicken",
            emoji: "🐔"
          }, {
            word: "Chick",
            emoji: "🐥"
          }, {
            word: "Mouse",
            emoji: "🐭"
          }, {
            word: "Pig",
            emoji: "🐷"
          }, {
            word: "Koala",
            emoji: "🐨"
          }, {
            word: "Bear",
            emoji: "🐻"
          }, {
            word: "Wolf",
            emoji: "🐺"
          }, {
            word: "Fox",
            emoji: "🦊"
          }, {
            word: "Penguin",
            emoji: "🐧"
          }, {
            word: "Frog",
            emoji: "🐸"
          }, {
            word: "Lion",
            emoji: "🦁"
          }, {
            word: "Tiger",
            emoji: "🐯"
          }];
          const selectedIndex = Math.floor(Math.random() * animals.length);
          const selected = animals[selectedIndex];
          const wrongOptions: string[] = [];
          while (wrongOptions.length < 2) {
            const randomIndex = Math.floor(Math.random() * animals.length);
            const randomAnimal = animals[randomIndex].word;
            if (randomAnimal !== selected.word && !wrongOptions.includes(randomAnimal)) {
              wrongOptions.push(randomAnimal);
            }
          }
          newQuestion = {
            question: "What animal is this?",
            displayContent: <div className="text-7xl my-6">{selected.emoji}</div>,
            options: [{
              value: selected.word,
              isCorrect: true
            }, {
              value: wrongOptions[0],
              isCorrect: false
            }, {
              value: wrongOptions[1],
              isCorrect: false
            }]
          };
        } else {
          const nouns = ["book", "table", "house", "car", "dog", "cat", "tree", "ball", "school", "family", "friend", "teacher", "student", "computer", "phone", "garden", "park", "flower", "bird", "city"];
          const verbs = ["run", "jump", "eat", "sleep", "play", "write", "read", "sing", "dance", "swim", "talk", "walk", "work", "study", "draw", "paint", "cook", "drive", "build", "grow"];
          const adjectives = ["happy", "sad", "big", "small", "fast", "slow", "hot", "cold", "tall", "short", "good", "bad", "new", "old", "young", "pretty", "ugly", "strong", "weak", "smart"];
          const partOfSpeechType = Math.floor(Math.random() * 3);
          let correctWord: string;
          let correctType: string;
          let incorrectTypes: string[];
          if (partOfSpeechType === 0) {
            correctWord = nouns[Math.floor(Math.random() * nouns.length)];
            correctType = "Noun";
            incorrectTypes = ["Verb", "Adjective"];
          } else if (partOfSpeechType === 1) {
            correctWord = verbs[Math.floor(Math.random() * verbs.length)];
            correctType = "Verb";
            incorrectTypes = ["Noun", "Adjective"];
          } else {
            correctWord = adjectives[Math.floor(Math.random() * adjectives.length)];
            correctType = "Adjective";
            incorrectTypes = ["Noun", "Verb"];
          }
          newQuestion = {
            question: `What part of speech is the word "${correctWord}"?`,
            displayContent: <div className="bg-blue-50 p-3 rounded-lg text-center my-4">
                <span className="text-3xl font-bold text-blue-700">
                  {correctWord}
                </span>
              </div>,
            options: [{
              value: correctType,
              isCorrect: true
            }, {
              value: incorrectTypes[0],
              isCorrect: false
            }, {
              value: incorrectTypes[1],
              isCorrect: false
            }]
          };
        }
      }
    }
    setQuestion(newQuestion);
    setShuffledOptions(shuffleOptions(newQuestion.options));
  }, [subject, difficulty, questionCount]);
  if (!question || shuffledOptions.length === 0) {
    return <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-md flex justify-center items-center">
        <div className="text-indigo-600 text-xl">Loading question...</div>
      </div>;
  }
  return <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">
        Question {questionCount + 1}
      </h2>
      <div className="mb-6">
        <p className="text-xl text-gray-800 mb-4">{question.question}</p>
        {question.displayContent}
      </div>
      <div className="grid grid-cols-1 gap-4">
        {shuffledOptions.map((option, index) => <button key={index} className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold py-3 px-4 rounded-xl text-lg transition-colors" onClick={() => {
        if (option.isCorrect) {
          onCorrectAnswer();
        } else {
          onWrongAnswer();
        }
      }}>
            {option.value}
          </button>)}
      </div>
    </div>;
}