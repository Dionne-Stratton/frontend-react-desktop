import React, { useState, useEffect } from "react";
// import axiosWithAuth from "./../Auth/axiosWithAuth";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function AddNewText(props) {
  const { vocab, user } = props;
  const history = useHistory();
  const useURL = "https://reqres.in/api/users";
  const initialFormState = {
    text: "",
  };

  const [form, setForm] = useState(initialFormState);
  const [weaveText, setWeaveText] = useState("");
  const [useVocab, setUseVocab] = useState([]);

  //   const [ableToSubmit, setAbleToSubmit] = useState(false);

  useEffect(() => {
    if (vocab.length > 0) {
      //set vocab to the vocab array with a lesson that matches the user's available lesson
      //   let useVocab = vocab.filter((word) => {
      //     return word.lesson <= user.available_lesson;
      //   });
      let useVocab = vocab;
      setUseVocab(useVocab);
    }
    //eslint-disable-next-line
  }, [form]);

  const handleChange = (e) => {
    e.persist();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    weaveTextTogether(form.text, useVocab);
    // axiosWithAuth
    axios
      .post(useURL, weaveText)
      .then((res) => {
        console.log(res.data);
        // history.push("/library");
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  console.log("form", form);
  console.log("weavetext", weaveText);
  console.log("useVocab", useVocab);
  console.log("vocab", vocab);

  //function to weave the text with vocab words. This function takes in the text and the vocab array then loops through the text and checks if each word is in the vocab array. If the word is in the vocab array, it will replace the word with the vocab word from the hebrew key. Returning a new string and setting it to the weaveText state.

  function weaveTextTogether(text, vocab) {
    //split the text into an array of each letter
    let textArray = text.split("");
    //loop through the text array. if there is a space on in front of the letter, it is the start of a new word. if there is a space after the letter, it is the end of a word.
    //combine the letters into words and add to a new array
    //if the text item is a space or a punctuation mark, add it to the new array
    let wordArray = [];
    let word = " ";
    for (let i = 0; i < textArray.length; i++) {
      //check for "how are you?"
      if (
        (textArray[i] === "H" || textArray[i] === "h") &&
        textArray[i + 1] === "o" &&
        textArray[i + 2] === "w" &&
        textArray[i + 3] === " " &&
        textArray[i + 4] === "a" &&
        textArray[i + 5] === "r" &&
        textArray[i + 6] === "e" &&
        textArray[i + 7] === " " &&
        textArray[i + 8] === "y" &&
        textArray[i + 9] === "o" &&
        textArray[i + 10] === "u" &&
        textArray[i + 11] === "?"
      ) {
        wordArray.push("how are you?");
        word = " ";
        i += 11;
      } else if (textArray[i] === " ") {
        wordArray.push(word);
        word = " ";
      } else if (
        textArray[i] === "." ||
        textArray[i] === "," ||
        textArray[i] === "!" ||
        textArray[i] === "?" ||
        textArray[i] === ";"
      ) {
        wordArray.push(word);
        wordArray.push(textArray[i]);
        word = "";
      } else {
        word += textArray[i];
      }
    }
    wordArray.push(word);

    //loop through the word array and check if each word is in the vocab array on the meaning key
    //if the word is in the vocab array, replace the word with the vocab word from the hebrew key
    //return the new string
    let newString = "";
    for (let i = 0; i < wordArray.length; i++) {
      let word = wordArray[i];
      //check for "hello"
      if (word.trim() === "hello") {
        newString += "שלומ";
      }
      let newWord = word;
      for (let j = 0; j < vocab.length; j++) {
        if (word.trim().toLowerCase() === vocab[j].meaning.toLowerCase()) {
          newWord = " " + vocab[j].hebrew;
        }
      }
      //if the word is 'hello' skip
      if (word.trim() === "hello") {
      } else {
        newString += newWord;
      }
    }
    setWeaveText(newString);
  }

  return (
    <div className="main-page">
      <form>
        <label htmlFor="text">Text</label>
        <input
          type="textbox"
          name="text"
          value={form.text}
          onChange={handleChange}
        />
        <button type="button" onClick={handleSubmit}>
          Add
        </button>
      </form>
      <div>
        <h2>Weave Text</h2>
        <p>{weaveText}</p>
      </div>
    </div>
  );
}
