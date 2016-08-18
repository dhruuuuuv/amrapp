## Synopsis

This project is a prototype for an online database to collect information about cows and farms. It relies on the MEAN stack.

This means that it requires Node.js, which can be downloaded from: https://nodejs.org/en/download/

## Installation

To use:
- open a terminal / command prompt, and `cd` to a directory.
- type in the command `git clone https://github.com/dhruuuuuv/amrapp.git`
- change into the new directory with `cd amrapp`
- ensure node is installed by typing `node -v`. If it is a version number should be displayed.
- enter the command `npm start`, and you should be greeted with:
  ```
  > node ./bin/www
  ```
- in your web-browser, type in the address bar `http://localhost:3000`, after a while you should be greeted with the cowllection homepage!

## Usage

Navigate through the app by clicking on the relevant **farm number**. This should then reveal a **farm overview** with multiple **animal id**s.

If you click on an animal id, the information about that ID is revealed below, so **scroll down** to reveal the new information about the specfic cow.

Each cow has associated isolates, which also by clicking on the relevant **isolate number** will reveal the specific data about that isolate.

At any point, click on another **animal id** to view information about that, or another **isolate number** for that. Click on the HOME button to return to the farm overview.


