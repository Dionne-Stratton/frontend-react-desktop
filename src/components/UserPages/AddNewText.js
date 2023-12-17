import React, { useState, useEffect } from "react";
// import axiosWithAuth from "./../Auth/axiosWithAuth";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function AddNewText(props) {
  const history = useHistory();
  const useURL = "https://reqres.in/api/users";
  const initialFormState = {
    text: "",
  };

  const [form, setForm] = useState(initialFormState);

  //   const [ableToSubmit, setAbleToSubmit] = useState(false);

  //   useEffect(() => {
  //     //eslint-disable-next-line
  //   }, [form]);

  const handleChange = (e) => {
    e.persist();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // axiosWithAuth
    axios
      .post(useURL, form)
      .then((res) => {
        console.log(res.data);
        history.push("/library");
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

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
    </div>
  );
}
