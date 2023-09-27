# Task Tracker

## Senior Software Engineer Code Take-Home Assignment

### Overview

The project is split into two folders inside `code`, they are `backend` and `frontend`. After setup, the backend is started and then the front end is available to view.
The backend is in NodeJS and the front end is in React. The project is organized by MVC principles.

### Instructions

#### Setup frontend:

- cd into `code\frontend` folder
- `npm install`
- `npm run build`

----------------------------
#### Setup backend:

- cd into `code\backend` folder
- `npm install`
- copy `env.ex.js` to `env.js` and edit as needed (precaution against accidentally committing env.js)

----------------------------
#### To start server:

- cd into `code\backend`
- run `node code\backend\server.js`

----------------------------

#### Testing API calls

- cd into `code/backend/test`
- run `node test_api.js`

---------------------------

#### Run Frontend Tests

- cd into `code/frontend`
- run 'npm test'

---------------------------

#### Wipe DB

optional, to reset DB

- cd into `code/backend/`
- run `node wipe_db.js`

---------------------------

### Considerations

#### Backend
- Uses an ORM (sequelize), making it easy to adapt to different DBs
- Organized by MVC principles
- JSDocs commenting

### Frontend

- Passwords are hashed and never sent in plaintext

---------------------------------------------------------

### Upgrades

Given more time, these would be great upgrades to do on a v2:

### Backend:
- limit login attempts in the api
- password requirements for creating users - capital/number/symbol/length
- email integration to do 2fa and send notification emails

### Frontend:
- mobile styling
- animations during requests - if the db wasn't local there would be latency in the user interactions and need to add loading messages
- user roles and locking API endpoints by role - limit creating or deleting tasks
- HTTPS - end to end encryption

- more test coverage