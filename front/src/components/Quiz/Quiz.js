import React, { useState } from "react";

import ProgressBar from "../ProgressBar/ProgressBar";
import TweetCard from "../TweetCard/TweetCard";
import ResponseButtons from "../ResponseButtons/ResponseButtons";
import Feedback from "../feedback/Feedback";
import { database } from "../../scripts/database";

import "./Quiz.css";

const tweets = database(); // tweets is an instance of database
const testLength = 8;
tweets.getTweets(testLength); // get a number of random tweets form database
const firstTweet = tweets.selectRandomTweet();

export default function Quiz() {
  const [tweet, setTweet] = useState(firstTweet);
  const [qNum, setQNum] = useState(0);
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  function nextQuestion() {
    console.log("--- next question clicked ---");
    setTweet(tweets.selectRandomTweet());
    setQNum(qNum + 1);
    setIsSubmitted(false);
    setIsCorrect(false);
  }

  function handleSubmit(e, ans) {
    e.preventDefault();
    if (ans === tweet.answer) {
      setIsCorrect(true);
      setScore(score + 1);
    }
    setIsSubmitted(true);
  }

  return (
    <div id="Quiz">
      <ProgressBar percentage={(qNum / testLength) * 100} />
      <TweetCard tweetText={tweet.content} tweetNum={qNum + 1} />
      <ResponseButtons
        handleSubmit={handleSubmit}
        isSubmitted={isSubmitted}
      />

      {/* This only shows when the test is submitted */}

      {isSubmitted && <Feedback isCorrect={isCorrect}></Feedback>}
      {isSubmitted && (
        <button onClick={nextQuestion}>Next Tweet</button>
      )}
    </div>
  );
}
