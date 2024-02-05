// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in oldPointStructure) {

         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         }

      }
   }
   return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!");
   let userWord = input.question("Enter a word to score: ");
   let userResult = oldScrabbleScorer(userWord);
   console.log(userResult);
}

let simpleScorer = function (word) {
   return word.length;
};

let vowelBonusScorer = function (word) {
   let score = 0;
   let vowels = ['A', 'E', 'I', 'O', 'U'];
   for (let i = 0; i < word.length; i++) {
      score += vowels.includes(word[i].toUpperCase()) ? 3 : 1;
   }
   return score;
};

let scrabbleScorer = function (word) {
   let score = 0;
   word = word.toLowerCase();
   for (let i = 0; i < word.length; i++) {
      score += newPointStructure[word[i]];
   }
   return score;
};

const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      // scoringFunction: simpleScorer
      scorerFunction: simpleScorer
   },
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      // scoringFunction: vowelBonusScorer
      scorerFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      // scoringFunction: scrabbleScorer
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   console.log("Let's play some Scrabble!\n");
   let userWord = input.question("Enter a word to score: ");
   console.log("Which scoring algorithm would you like to use?\n");
   console.log("0 - Simple: One point per character");
   console.log("1 - Vowel Bonus: Vowels are worth 3 points");
   console.log("2 - Scrabble: Uses scrabble point system");
   let userAlgo = Number(input.question("Enter 0, 1, or 2: "));
   return {
      selectedWord: userWord,
      selectedAlgo: userAlgo
   };
}

function transform(inputObject) {
   let outputObject = {};
   let unsortedObject = {}
   let lettersArr = [];

   for (let oldKey in inputObject) {
      for (let i = 0; i < inputObject[oldKey].length; i++) {
         lettersArr.push(inputObject[oldKey][i]);
         unsortedObject[inputObject[oldKey][i].toLowerCase()] = Number(oldKey);
      }
   }

   lettersArr.sort();

   for (let j = 0; j < lettersArr.length; j++) {
      outputObject[lettersArr[j].toLowerCase()] = unsortedObject[lettersArr[j].toLowerCase()];
   }

   return outputObject;
}

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   let { selectedWord: word, selectedAlgo: algo } = scorerPrompt();
   // console.log(`Score for '${word}': ${scoringAlgorithms[algo].scoringFunction(word)}`);
   console.log(`Score for '${word}': ${scoringAlgorithms[algo].scorerFunction(word)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
