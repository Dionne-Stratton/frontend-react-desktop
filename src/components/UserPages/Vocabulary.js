import React, { useEffect, useState } from "react";

export default function Vocabulary(props) {
  const { vocab, selectedLesson, setSelectedLesson, user, combineArrays } =
    props;
  const [vocabLessons, setVocabLessons] = useState([]);
  const [availableLessons, setAvailableLessons] = useState([]);

  useEffect(() => {
    //if vocab is loaded and a lesson is selected and the user has an available lesson
    if (vocab.length > 0 && selectedLesson !== "" && user.available_lesson) {
      //filter the vocab to only include words from the selected lesson
      let vocabLessons = vocab.filter((vocabItem) => {
        return vocabItem.lesson === Number(selectedLesson);
      });
      //create an array of the available lesson numbers
      let lessons = Array.from(
        { length: user.available_lesson },
        (_, index) => index + 1
      );
      //combine the user vocab and the vocab lessons into one array
      let combinedArray = combineArrays(user.user_vocab, vocabLessons);
      setAvailableLessons(lessons); //set the available lessons to the array of available lesson numbers
      setVocabLessons(combinedArray); //set the vocab lessons to the combined array
    } //eslint-disable-next-line
  }, [selectedLesson]); //run this function when the selected lesson changes

  const handleClick = (e) => {
    setSelectedLesson(e.target.value);
  };

  console.log(vocabLessons);

  return (
    <div className="main-page">
      <select
        className="main-nav select"
        name="lesson-select"
        onClick={handleClick}
        value={selectedLesson}
        onChange={(e) => setSelectedLesson(e.target.value)}
      >
        <option value="Select" onClick={handleClick}>
          Select a Set
        </option>
        {availableLessons.map((item) => {
          return (
            <option value={item} onClick={handleClick}>
              Level {item}
            </option>
          );
        })}
      </select>
      {/* if a lesson is selected, display the vocab words from that lesson number */}
      <h2>Vocabulary Set {selectedLesson ? selectedLesson : null}</h2>
      {vocabLessons.length === 0 && ( //if vocab lessons is empty display loading
        <p>Loading... Please select a set level.</p>
      )}
      <div className="vocab-page">
        {vocabLessons.map((vocabItem) => {
          return (
            <div className="vocab-words" key={vocabItem._id}>
              <div className="vocab-left">
                <p>
                  {vocabItem.hebrew_with_nikkud //if the word has nikkud, display it otherwise display the word without nikkud
                    ? vocabItem.hebrew_with_nikkud
                    : vocabItem.hebrew}
                </p>
                {vocabItem.rank === 0 && <p>New!</p>}
                {/* if the rank is 0 display new */}
                {vocabItem.rank > 11 && <p>Mastered!</p>}
                {/* if the rank is greater than 11 display mastered */}
                {vocabItem.rank > 0 && vocabItem.rank < 12 && (
                  <p>Mastery: {vocabItem.rank}</p>
                )}
              </div>
              <div className="vocab-right">
                <p>
                  {vocabItem.meaning}
                  {vocabItem.gender ? ` (${vocabItem.gender[0]})` : ""}
                  {/* if there is a gender on the vocab word show only the first letter in () otherwise don't display anything */}
                </p>
                <p>"{vocabItem.reading}"</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
