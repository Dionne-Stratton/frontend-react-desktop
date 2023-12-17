// import React, { useState } from "react";
import React from "react";

const Help = () => {
  // const initialFormState = {
  //   user_name: "",
  //   email: "",
  //   subject: "",
  //   message: "",
  // };
  // const [form, setForm] = useState(initialFormState);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setForm((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Add your form submission logic here (e.g., send data to a server)
  //   console.log("Form submitted:", form);
  //   // Reset the form after submission
  //   setForm(initialFormState);
  // };

  return (
    <div className="main-page">
      <h3>FAQs</h3>
      <h4>What is the purpose of this site?</h4>
      <p>
        This site is a supplement when learning the Hebrew language. You can
        learn vocab words and review them on a spaced repition schedule for best
        retention.
      </p>
      <h4>What is the "Mastery" bar at the bottom of my dashboard?</h4>
      <p>
        The "Mastery" bar is a visual representation of your progress in
        mastering the set of lessons that you most recently unlocked. It is
        based on the number of words from that lesson that you have ranked up to
        mastery level 3 or higher.
      </p>
      <h4>When do I unlock my next set of lessons?</h4>
      <p>
        You unlock your next set of lessons when you have mastered 80% of the
        words in your current set of lessons. A word is considered mastered when
        you have ranked it up to mastery level 3 or higher.
      </p>
      <h4>
        Where can I see the current mastery rank for words that I've learned?
      </h4>
      <p>
        You can see the current mastery rank for words that you've learned on
        the "Vocabulary" page. Just select the lesson set you want to review
        from the dropdown menu. The lesson options will expand as you unlock
        more lessons and the page will populate with more vocab words as you go
        through the lessons and words are added to your review que.
      </p>
      <h2>Contact Us</h2>
      <p>We'd love to hear from you!</p>
      {/* <p>
        If you have any questions, feedback, or inquiries, please fill out the
        form below.
      </p> */}
      <p>
        If you have any questions, feedback, or inquiries, please drop us a line
        at dionnestratton@gmail.com.
      </p>
      <p> We'll get back to you as soon as possible.</p>
      <p>But first, please review the frequently asked questions below.</p>
      {/* <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">User Name: </label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            value={form.user_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="subject">Subject: </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message: </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
};

export default Help;
