# Multifaceted Mastermind Game Implementation

Category: Software Engineering
Date: December 14, 2021
My Role: Backend Logic, UI/UX
Project Overview: This application was built as a full-stack take home project during an apprenticeship interview process

![mastermind](https://github.com/djtoler/v1-mern/blob/main/assets/images/mastermind.png)

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

- [Registration: Our Registration component is the first component, on the first page a user lands on… ](Registration%20Our%20Registration%20component%20is%20the%20fir%205d686ec2dfee4238a2463fd41e672e51.md)

### **Login Component**

- [Login: Our **Login component is the 2nd component on the first page a user lands on... **](Login%20Our%20Login%20component%20is%20the%202nd%20component%20on%20%2086357e93c2eb4ea68f8b85fe7bf703e2.md)

### **Game Landing Page Component**

- [Game Logic:  When a game is started, a random number is generated…](Game%20Logic%20When%20a%20game%20is%20started,%20a%20random%20number%203178fcf98b0c4b4ba287896906a8b663.md)

### **Game Hints Components**

- [Super Easy: When the game is played in ‘superEasy’ mode…](Super%20Easy%20When%20the%20game%20is%20played%20in%20%E2%80%98superEasy%E2%80%99%20%20da6694236b0f4f988416c1c80cc385c1.md)


- [**Easy:** When the game is played in “Easy” mode, a user is provided a range of numbers that contains…](Easy%20When%20the%20game%20is%20played%20in%20%E2%80%9CEasy%E2%80%9D%20mode,%20a%20use%206f9ae464bc7c4decacd45d0e30f3566d.md)


- [Hard: When the game is played in ‘Hard” mode…](Hard%20When%20the%20game%20is%20played%20in%20%E2%80%98Hard%E2%80%9D%20mode%E2%80%A6%20f726856e28f74e82a84e9a8739817bbc.md)


- [Super Hard: When the game is played in “Super Hard” mode…](Super%20Hard%20When%20the%20game%20is%20played%20in%20%E2%80%9CSuper%20Hard%E2%80%9D%20a0ac019bc0cd457c97bb7d3512d6049b.md)
---

## **Takeaways:**

<aside>
✅ This project helped us to learn more about the process implementing methods to make an application more scalable, flexible, reliable and faster. We’ll continue to use this project to implement and test new concepts we learn

</aside>
