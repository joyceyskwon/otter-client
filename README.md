# Otter: The Front End

![otter-logo](https://github.com/joyceyskwon/otter-client/blob/master/src/assets/otter-black.svg)

Thank you for using Otter. Otter is a budgeting visualizer that helps users manage their personal finance through visual demonstration of their monthly spendings.

Otter front-end is built with React to be responsive for the data visualization.

View [demo](https://youtu.be/73MHGAAkCm8)

## Contents

- [Libraries & Middleware](#libraries--middleware)
- [Installation](#installation)
- [Structure](#structure)
- [Components](#components)
- [JWT / Auth](#jwt--auth)
- [Future Development](#future-development)

## Libraries & Middleware

Otter is built using the followings:
- [create-react-app](https://github.com/facebook/create-react-app)
- [Redux](https://github.com/reduxjs/redux) manages state management
- [Redux Thunk](https://github.com/reduxjs/redux-thunk) middleware handles fetch requests inside actions
- [React Router](https://github.com/ReactTraining/react-router) handles component navigation based on the URL/history
- [Recharts](https://github.com/recharts/recharts) is used to animate and display transactional data on the page
- [Semantic UI React](https://github.com/Semantic-Org/Semantic-UI-React) is used for styling

## Installation

To get started with Otter, fork this repo and clone it to your hard drive. `cd` into the folder and run ```npm install```, then run ```npm start``` to start the app. Your locally-hosted version of the app will receive data from a Ruby on Rails back-end from otter-server.herokuapp.com. For more information about the structure of Otter's back-end, visit [here](https://github.com/joyceyskwon/otter-server). Once you have finished installing the front-end, please login as one of the users from the back-end API that is deployed on Heroku(https://otter-server.herokuapp.com/api/v1/users).

## Structure

A `public` folder is the top-level folder that holds `index.html` file where the React app renders. A `src` folder is a sibling folder that holds all the React components and Redux logic.

Inside the `src` folder:
- `components` folder holds all the React components for the app
- `reducers` folder contains different reducers that handle Redux logic for respective components and `index.js` file that combines all reducers to be imported into `store.js` as a `rootReducer`
- `actions` folder contains `index.js` file that handles all the fetches and dispatches from the back-end API. `type.js` file that exports all the string types as constants
- `assets` folder holds the Otter logo svg file, homepage animation, and default user image.

## Components

Otter is composed of 20 components total, with 9 main components:

### App.js

The `App` component conditionally renders the app depending on the user's log-in status.  It holds the navigation bar (and side navigation if the user is logged in) and all the routes that lead to different components

### Nav.js

The `Nav` component contains the Otter logo svg on the left side and handles authentication on the right. User is able to log in (or sign up) and the navigation bar conditionally renders user's name.

### SideNav.js

The `SideNav` component handles different routes for rendering different transactional data for a signed-in user. Each link takes the user to that corresponding data component.

### AccountContainer.js

The `AccountContainer` component renders the overview of the user's transactional data, handling major portion of data visualization. It contains `TotalBalance`, `CategoryContainer`, and `CategoryTimelineContainer` components.

### TotalBalance.js

The `TotalBalance` component is responsible for visualizing user's total spending for the current month. It consists of an animated pie chart and area chart.

### CategoryContainer.js

The `CategoryContainer` component visualizes the categorical spending for the past 2 months. It renders a pie chart that animates the percentages and the names of the category. Using this pie chart, user is able to speculate in which category he/she spent most on for that month.

### CategoryTimelineContainer.js

The `CategoryTimelineContainer` component renders the user's activities based on the category. It houses an area chart for each category showing the total amount spent for that month for each filtered category.

### TransactionsContainer.js

The `TransactionsContainer` component is responsible for 1) listing all the existing transactions for the logged in user, 2) filtering existing transactions by the date it was created and the amount, and lastly, 3) handling RESTful `POST`, `PATCH`, `DELETE` requests for creating, editing, deleting transactions.

### ProfileContainer.js

The `ProfileContainer` component renders the user account information, including the bank information.

## JWT & Auth

This app uses JWT token and BCrypt for secure authentication.

## Future Development

Some ideas for new features are:
- Updating user's account information through a `PATCH` request
