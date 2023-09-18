# Rabbi-Rabbit

### An app designed to supplement Hebrew language learning by providing a simple yet engaging way to review Hebrew vocabulary.

The purpose of this app is to help those learning the Hebrew language. It uses direct input for review questions and impliments spaced repitition.

## View the live website here: [Rabbi-Rabbit](https://www.rabbi-rabbit.com/)

## Quicklinks

* [Related Repos](#related-repos)
* [Tech Stack](#tech-stack)
* [Useful Resources](#useful-resources)
* [Project MVP Features](#project-mvp-features)
    * [Overview](#overview)
    * [Authorization](#authorization)
    * [Dashboard](#dashboard)
    * [Reviews](#reviews)
    * [Vocabulary](#vocabulary)
    * [Account Settings](#account-settings)
    * [Danger Zone](#danger-zone)
* [Features for Future Release](#features-for-future-release)
    * [Audio Clips](#audio-clips)
    * [Monthly Subscription](#monthly-subscription)


## Related Repos

[Native Mobile App](https://github.com/Rabbi-Rabbit/react-native-mobile-app)

[Desktop Web App](https://github.com/Rabbi-Rabbit/frontend-react-desktop)

[Mongo Database and Server](https://github.com/Rabbi-Rabbit/mongo-db-node-server)

## Tech Stack

- React

- Javascript

- CSS

- Validation with Yup

- Tests with react testing library (comming soon)

## Useful resources

[Contribution Guidelines](https://github.com/Grow-Work/.github/blob/main/GENERAL-CONTRIBUTING.md)

[About Markdown](https://docs.github.com/github/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

[MongoDB Course](https://university.mongodb.com/learning_paths/developer)

[React Native Docs](https://reactnative.dev/docs/getting-started)

[React Tutorial](https://reactjs.org/tutorial/tutorial.html)

## Project MVP Features

A list of the features needed for a minimum viable product across the enitre project: desktop frontend, mobile native frontend, and the backend server.

### Overview

* On first signup, a new user is crated with a level of 1, the first set of lessons, and email and password
* Viewing lessons adds them to the reviews array with a level of 1 "New" and are immediately avaiable for review
* Upon providing the correct answer in review for both the meaning and rading of the item, the item is ranked up. If any item is answered incorrectly, it is ranked down unless it is at the bottom rank already
* When an item has been reviewed, it is assing a next review date using a spaced repitition formula depending on the new rank of the item
* Going through all reviews or clicking the dashboard button submits answered vocab items

### Authorization

* Auth functionality
    * Sign up
    * Sign in
    * Sign out
    * Password reset

### Dashboard

* Lessons button with count
* Reviews button with count
* Next available review date and time
* Mastery progress bar for current level

### Reviews

* Randomized available reviews
* Direct input for answering
* User must provide correct meaning and reading for each vocab item for it to rank up
* Hebrew "keyboard" for inputing reading
* Detects language, enforces correct language
* Provides feedback on correct or incorrect answer given and shows correct answer

### Vocabulary

* Vocab viewed by level
* Displays only vocab unklocked / viewed by user
* Displays Hebrew, with nikkud, meaining, pronunciation, level, mastery rank

### Account Settings

* Checkbox to display nikkud on reviews
* Checkbox for displaying pronunciation on reviews
* Settings are saved to local storage

### Danger Zone

* Reset Learning Progress
* Delete Account

## Features for future release

A list of the features planned for future release across the enitre project: desktop frontend, mobile native frontend, and the backend server.

### Audio Clips

* Listen to the vocab spoken by a native speaker.

### Monthly Subscription

* Charge a monthly fee for access to app beyond the first three levels.


## If you have ideas for more featues please reach out!





