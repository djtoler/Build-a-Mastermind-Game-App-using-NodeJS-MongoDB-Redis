# Multifaceted Mastermind Game Implementation

![mastermind](https://github.com/djtoler/v1-mern/blob/main/assets/images/mastermind.png)

Category: Software Engineering

Date: Fall 2023

My Role: Backend Logic, UI/UX

Project Overview: This application was built as a full-stack take home project during an apprenticeship interview process (with a backend focus)

---

## Project Overview:

This application was built as a full-stack portfolio project to implement new coding practices and strategies that I learned over the summer of 2022.  It's a simplified implementation of the [MasterMind](https://en.wikipedia.org/wiki/Mastermind_(board_game)) guessing game that can be played by a user against the computer or by 2 users.

- A random, 4-digit number sequence is generated from the [random number generator at random.org](https://www.random.org/integers/)
- A user submits a guess, which is 4-digit number, into an input form.
- The server evaluates the users guess & sends feedback about the correctness of their guess attempt.
- The feedback details how many numbers were correct, how many numbers were in the correct location and how many remaining guess attempts a user has.
- A user also has an option to get hints that help lead them to guessing the correct 4-digit number sequence. These hints come in 4 levels ****(SuperEasy, Easy, Default, Hard, SuperHard)
- Data about the user and each game are captured and stored in a database during their interactions with the application

---

## Problem Statement:

As a challenge to myself, I decided to build this MasterMind game application with the goal of figuring out a way to implement new programming concepts that I’ve recently come across.

I’ve learned that modern applications are designed and built prioritizing things like flexibility, availability and scalability to accomodate large user bases spanning worldwide. The decisions, when building this project, were made with those practices top of mind

---

## Code Explinations:

### **Registration Component**

- [Registration: Our Registration component is the first component, on the first page a user lands on… ](https://github.com/djtoler/v1-mern/blob/main/assets/mds/Registration.md)

### **Login Component**

- [Login: Our Login component is the 2nd component on the first page a user lands on... ](https://github.com/djtoler/v1-mern/blob/main/assets/mds/Login.md)

### **Game Landing Page Component**

- [Game Logic:  When a game is started, a random number is generated…](https://github.com/djtoler/v1-mern/blob/main/assets/mds/LandingPage-GameLogic.md)

### **Game Hints Components**

- [Super Easy: When the game is played in 'superEasy' mode…](https://github.com/djtoler/v1-mern/blob/main/assets/mds/SuperEasy.md)


- [**Easy:** When the game is played in 'Easy' mode, a user is provided a range of numbers that contains…](https://github.com/djtoler/v1-mern/blob/main/assets/mds/Easy.md)


- [Hard: When the game is played in 'Hard' mode…](https://github.com/djtoler/v1-mern/blob/main/assets/mds/Hard.md)


- [Super Hard: When the game is played in 'Super Hard' mode…](https://github.com/djtoler/v1-mern/blob/main/assets/mds/SuperHard.md)
---

## **Takeaways:**

<aside>
✅ This project helped us to learn more about the process implementing methods to make an application more scalable, flexible, reliable and faster. We’ll continue to use this project to implement and test new concepts we learn

</aside>
