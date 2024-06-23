import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Dashboard = (props) => {
  const { user, availableReviews, getAvailableReviews } = props;
  const [nextAvailableReview, setNextAvailableReview] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (user.user_vocab) {
      // if the user vocab array is in state
      getAvailableReviews(); // get the available reviews
      if (user.user_vocab.length > 0) {
        // if the user vocab array is not empty
        getNextReview(); // get the next review
        reviewsProgress(); // get the reviews progress
      }
    } //eslint-disable-next-line
  }, [user, nextAvailableReview, progress]);

  function reviewsProgress() {
    //filter out words that are not in the current lesson
    let currentLessonVocab = user.user_vocab.filter(
      (word) => word.lesson_number === user.available_lesson
    );
    //get the total number of words in the current lesson
    let totalWords = currentLessonVocab.length;
    //get the current lesson number
    let lessonNumber = user.available_lesson;
    //get an array of words rank 3 or higher
    let wordsToReview = currentLessonVocab.filter((word) => word.rank > 2);
    //filter out words that are not in the current lesson number and get the length of the array
    wordsToReview = wordsToReview.filter(
      (word) => word.lesson_number === lessonNumber
    ).length;
    //divide the number of words to review by the total number of words to get the progress
    let progress = wordsToReview / totalWords;
    setProgress(progress);
  }

  function getNextReview() {
    let vocab = user.user_vocab; // get the user vocab array
    let nextReview = vocab[0].next_review; // set the next review to the first word in the array
    for (let i = 1; i < vocab.length; i++) {
      // loop through the vocab array
      //find the next review date that is the soonest
      if (vocab[i].next_review < nextReview) {
        nextReview = vocab[i].next_review;
      }
    }
    nextReview = new Date(nextReview).toString(); // convert the date to a string
    nextReview = nextReview.slice(0, 21); // slice the string to get the date and time
    //convert from military time to standard time
    let currentTime = new Date().toString(); // get the current time
    currentTime = currentTime.slice(0, 21); // slice the string to get the date and time
    //convert date to integer
    let nextReviewCompare = new Date(nextReview).getTime() / 1000; // convert the next review date to an integer
    let currentTimeCompare = new Date(currentTime).getTime() / 1000; // convert the current time to an integer
    //compare the two dates
    if (nextReviewCompare <= currentTimeCompare) {
      // if the next review date is less than or equal to the current time set the next review to now and return
      nextReview = "now";
      setNextAvailableReview(nextReview);
      return;
    }
    //otherwise convert the date to standard time
    let hour = nextReview.slice(16, 18); // get the hour from the date
    let hourInt = parseInt(hour); // convert the hour to an integer
    let amPm;
    if (hourInt < 12) {
      // if the hour is less than 12 set the amPm to am
      amPm = "am";
    }
    if (hourInt >= 12) {
      // if the hour is greater than or equal to 12 set the amPm to pm
      amPm = "pm";
    }
    if (hourInt > 12) {
      // if the hour is greater than 12 subtract 12 from the hour
      hourInt -= 12;
    }
    if (hourInt === 0) {
      // if the hour is 0 set the hour to 12
      hourInt = 12;
    }
    hour = hourInt.toString(); // convert the hour back to a string
    //set the next review date to the new standard time
    nextReview =
      nextReview.slice(3, 10) + ", " + hour + nextReview.slice(18) + amPm;
    setNextAvailableReview(nextReview);
  }

  return (
    <div className="main-page">
      {user.user_vocab ? ( // if the user vocab array is in state
        <div className="dashboard-box">
          <div className="lessons-reviews-box">
            <div className="lessons-box">
              <NavLink to="/lessons">
                <h3>Lessons: {user.user_lessons.length}</h3>
              </NavLink>
            </div>

            <div className="reviews-box">
              <NavLink to="/reviews">
                <h3>Reviews: {availableReviews.length}</h3>
              </NavLink>
            </div>
          </div>
          {nextAvailableReview ? ( // if the next available review is in state and not null
            <p className="next-review">
              Next available Review: {nextAvailableReview}
            </p>
          ) : (
            // otherwise display a message to do some lessons
            <p className="next-review">Go do some lessons!</p>
          )}
          <div className="progress-bar">
            <p>Mastery: </p>
            <div className="progress">
              <div
                className="progress-done"
                // set the width of the progress bar to the progress state times 100 to get a percentage
                style={{ width: `${progress * 100}%` }}
              >
                {/* {Math.floor(progress * 100)}% */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // otherwise display a loading message
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
