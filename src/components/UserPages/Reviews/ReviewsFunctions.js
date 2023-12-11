import { regexHebrewPattern, regexEnglishPattern } from "./ReviewsDataSets";
let answeredIdArray = [];
let answeredArray = [];

//function to add a certain number of hours to the current time based on the rank of the word
// for rank 1 +2 hours, rank 2 +4 hours, rank 3 +8 hours, rank 4 +24 hours, rank 5 +48 hours, rank 6 +1 week, rank 7 +2 weeks, rank 8 +1 month, rank 9 +2 months, rank 10 +4 months, rank 11 +6 months, rank 12 = "burned"
export function addHoursByRank(date, rank) {
  let hours;
  switch (rank) {
    case 0:
      hours = 0;
      break;
    case 1:
      hours = 0.1;
      // hours = 2;
      break;
    case 2:
      hours = 0.1;
      // hours = 4;
      break;
    case 3:
      // hours = 0.1;
      hours = 8;
      break;
    case 4:
      // hours = 0.1;
      hours = 24;
      break;
    case 5:
      // hours = 0.1;
      hours = 48;
      break;
    case 6:
      // hours = 0.1;
      hours = 168;
      break;
    case 7:
      // hours = 0.1;
      hours = 336;
      break;
    case 8:
      // hours = 0.1;
      hours = 720;
      break;
    case 9:
      // hours = 0.1;
      hours = 1440;
      break;
    case 10:
      // hours = 0.1;
      hours = 2880;
      break;
    case 11:
      // hours = 0.1;
      hours = 4320;
      break;
    default:
      hours = 0;
  }
  return new Date(date.getTime() + hours * 60 * 60 * 1000); //add the hours to the date and return the new date
}

//function to round the time to the nearest minute
export function roundTimeMinutes(time) {
  let timeToReturn = new Date(time);
  timeToReturn.setMilliseconds(
    Math.round(timeToReturn.getMilliseconds() / 1000) * 1000
  );
  timeToReturn.setSeconds(Math.round(timeToReturn.getSeconds() / 60) * 60);
  return timeToReturn;
}

export function randomizeArray(array) {
  let currentIndex = array.length; //set the current index to the length of the array
  let randomIndex;
  let tempValue;
  while (currentIndex !== 0) {
    //while the current index is not 0
    randomIndex = Math.floor(Math.random() * currentIndex); //set the random index to a random number between 0 multiplied by the current index
    currentIndex--; //decrement the current index
    tempValue = array[currentIndex]; //set the temp value to the value of the item at the current index of the array passed in
    array[currentIndex] = array[randomIndex]; //set the value of the item at the current index of the array passed in to the value of the item at the random index
    array[randomIndex] = tempValue; //set the value of the item at the random index to the temp value. this swaps the two values thus randomizing the array
  }
  return array;
}

export function checkLanguageMatch(answer, questionType) {
  let trimmedAnswer = answer.trim();
  let isEnglish = trimmedAnswer.match(regexHebrewPattern);
  let isHebrew = trimmedAnswer.match(regexEnglishPattern);

  if (isEnglish === null) {
    isEnglish = false;
  }
  if (isEnglish.length > 0) {
    while (
      isEnglish[0] === " " ||
      isEnglish[0] === "." ||
      isEnglish[0] === "?" ||
      isEnglish[0] === "'" ||
      isEnglish[0] === "!"
    ) {
      isEnglish.shift();
    }
  }
  if (isEnglish.length === 0) {
    isEnglish = false;
  }

  if (isHebrew === null) {
    isHebrew = false;
  }
  if (isHebrew.length > 0) {
    while (
      isHebrew[0] === " " ||
      isHebrew[0] === "." ||
      isHebrew[0] === "?" ||
      isHebrew[0] === "'" ||
      isHebrew[0] === "!"
    ) {
      isHebrew.shift();
    }
  }
  if (isHebrew.length === 0) {
    isHebrew = false;
  }

  //if the meaning type is true and the answer matches the regex english pattern then the answer is in english and the language match is true or the meaning type is false and the answer matches the regex hebrew pattern then the answer is in hebrew and the language match is true otherwise the language match is false
  if (isEnglish && isHebrew) {
    alert("Cannot mix Hebrew and English");
    return false;
  }
  if (!isEnglish && !isHebrew) {
    alert("Enter a valid answer");
    return false;
  }
  if (
    (questionType === "meaning" && isEnglish) ||
    (questionType === "reading" && isHebrew)
  ) {
    return true;
  } else {
    //pop up an alert message saying "Wrong Language"
    alert("Wrong Language");
    return false;
  }
}

export function checkAnswer(
  answer,
  questionType,
  correctHebrewReading,
  correctMeaning
) {
  let message;
  let answerToUse; //set the answer to use to the answer
  if (questionType === "meaning") {
    answerToUse = answer.toLowerCase().trim(); //convert the answer to lowercase and remove any whitespace
    answerToUse = answerToUse.replace(regexEnglishPattern, ""); //remove any non-alphabetical characters
    //if the meaning type is true
    if (correctMeaning.includes(answerToUse)) {
      //if the correct meaning array includes the answer to use then the answer is correct otherwise it is incorrect
      message = "correct";
    } else {
      message = "incorrect";
    }
    return message; //set the message to correct or incorrect
  } else {
    answerToUse = answer.trim(); // remove any whitespace
    answerToUse = answerToUse.replace(regexHebrewPattern, ""); //remove any non-hebrew characters
    //if the meaning type is false then the answer is the reading
    if (correctHebrewReading.includes(answerToUse)) {
      //if the answer to use is the same as the reading then the answer is correct otherwise it is incorrect
      message = "correct";
    } else {
      message = "incorrect";
    }
    return message; //set the message to correct or incorrect
  }
}

//function to take the available reviews and return a new array with both the meaning and reading reviews as separate objects
export function splitReviews(availableReviews) {
  let meaningReviews = [];
  let readingReviews = [];
  availableReviews.forEach((review) => {
    //for each review in the available reviews
    meaningReviews.push({
      //push an object with the following properties to the meaning reviews array
      _id: review._id,
      hebrew: review.hebrew,
      hebrew_with_nikkud: review.hebrew_with_nikkud,
      reading: review.reading,
      meaning: review.meaning,
      rank: review.rank,
      gender: review.gender,
      next_review: review.next_review,
      questionType: "meaning",
      lesson: review.lesson,
    });
    readingReviews.push({
      //push an object with the following properties to the reading reviews array
      _id: review._id,
      hebrew: review.hebrew,
      hebrew_with_nikkud: review.hebrew_with_nikkud,
      reading: review.reading,
      meaning: review.meaning,
      rank: review.rank,
      gender: review.gender,
      next_review: review.next_review,
      questionType: "reading",
    });
  });
  //combine the meaning and reading reviews arrays into one array and return it
  return meaningReviews.concat(readingReviews);
}

function adjustRank(message) {
  let newRank = 0;
  if (message === "correct") {
    newRank++;
  } else if (message === "incorrect") {
    newRank--;
  }
  return newRank;
}

export function checkPair(currentWord, message) {
  let isMatch = false;
  let rankAdjustment = 0;
  if (message === "reset") {
    answeredArray = [];
    answeredIdArray = [];
    return;
  }

  console.log("rankAdjustment start:", rankAdjustment);
  if (answeredIdArray.includes(currentWord._id)) {
    let rank = adjustRank(message);
    let index = answeredIdArray.findIndex((id) => id === currentWord._id);
    isMatch = true;
    rankAdjustment = rank + answeredArray[index].rank;
    console.log("rankAdjustment in if:", rankAdjustment);
    answeredArray = answeredArray.filter((word) => word.id !== currentWord._id);
    answeredIdArray = answeredIdArray.filter((id) => id !== currentWord._id);
  } else {
    let newAdjustment = adjustRank(message);
    answeredArray.push({ id: currentWord._id, rank: newAdjustment });
    answeredIdArray.push(currentWord._id);
  }
  console.log("answeredArray:", answeredArray);
  console.log("rankAdjustment before return:", rankAdjustment);
  console.log("isMatch:", isMatch);
  console.log("answeredIdArray:", answeredIdArray);
  return { rankAdjustment, isMatch };
}

export function nextWord(allVocab, rankVocab, currentWord) {
  let replacementIndex = allVocab.findIndex(
    //find the index of the word to be replaced
    (word) => word._id === currentWord._id //by comparing the id of the current word to the id of the word in the all vocab array
  );
  let wordRank = allVocab[replacementIndex].rank; //set the word rank to the rank of the word to be replaced
  let newRank = wordRank < 1 && rankVocab < 0 ? 0 : wordRank + rankVocab; //if the word rank is less than 1 and the rank vocab is less than 0 then set the new rank to 0 otherwise set it to the word rank plus the rank vocab
  let newDate = null; //set the new date to null
  if (newRank < 12) {
    //if the new rank is less than 12
    newDate = addHoursByRank(new Date(), newRank); //set the new date to the current date plus the hours based on the new rank of the word using the add hours by rank function
    newDate = roundTimeMinutes(newDate); //round the new date to the nearest minute
  }
  allVocab[replacementIndex].next_review = newDate; //set the next review date of the word to be replaced to the new date
  allVocab[replacementIndex].rank = newRank; //set the rank of the word to be replaced to the new rank
  return allVocab;
}
