# MERN Stack Real Estate Marketplace App
# (基于MERN的房产服务平台网站)

### [Click to visit the web app](http://137.184.126.137/)

## Dependencies
First make sure you have the latest version of NodeJs installed in your computer.
Install Dependencies:

Backend:

    npm i express nodemon morgan mongoose jsonwebtoken bcrypt nanoid cors email-validator 
    npm i slugify node-geocoder aws-sdk
Frontend:

    npx create-react-app .
    npm i antd@5.1.2
    npm i axios@1.2.2
    npm i dayjs@1.11.7
    npm i google-map-react@2.2.0
    npm i react@18.2.0
    npm i react-currency-input-field@3.6.9
    npm i react-dom@18.2.0
    npm i react-google-places-autocomplete@3.4.0
    npm i react-hot-toast@2.4.0
    npm i react-html-renderer@0.3.3
    npm i react-icons@4.7.1
    npm i react-image-file-resizer@0.4.8
    npm i react-router-dom@6.6.1
    npm i react-scripts@5.0.1
    npm i slugify@1.6.5
    npm i web-vitals@2.1.4


## Function Introduction
### **Backend**
#### 1. server.js
- create the Express NodeJs server
- connect to MongoDB database
#### 2. config.js
*configure all the backend services, APIs and the database.*
- configure MongoDB with NodeJs using Mongoose ODM
- configure AWS SES for confirmation email sending
- configure AWS S3 for cloud-side image uploading
- configure Google Place API for dropdown menu location auto-fill
- configure the frontend url
#### 3. routes/
*manage different routes at backend*
- auth.js
    - manage different routes of authentication at backend
- ad.js
    - manage different routes of advertisement at backend
#### 4. controllers/
*control the logic of various requests and responses*
- auth.js - *process different requests & responses of authentication*
    - pre-register:
        - generate JWT with email and password entered
        - use AWS SES to send **confirmation email** with JWT to user. Only user with valid email can receive the email and click on the link to complete registration.
    - register:
        - decode JWT
        - hash password and save user in database
        - generate JWT **access token** and **refresh token** (refresh token is used for security reasons: once the access token is compromised or stolen by the third party, generate a new one with refresh token)
        - send response to user
    - login:
        - compare the email and password with those in database, login if match.
    - forgot password:
        - check if the user exist
        - set resetCode and save in database
        - send email with a link for user to access their account
    - access account:
        - enable forgot-password users to access their accounts
        - once accessed, set resetCode to empty
    - refresh token:
        - check if the refresh token has expired
        - if not, refresh the token and send response to user
    - current user:
        - find user by id
        - get current user logged in
    - public profile:
    - update password:
    - update profile:
- ad.js - *process different requests & responses of advertisement*
    - upload image:
        - upload image of a house / land to AWS S3 when creating an ad
    - remove image:
        - remove image of a house / land from AWS S3 when creating an ad
    - create:
        - control the validness of the info entered when creating an ad
        - save the info entered to database
    - ads:
        - query all the ads for sell and rent from database
#### 5. models/
*create database models using mongoose in MongoDB*
- user.js
    - create a user info database model in MongoDB
- ad.js
    - create an ad info database model in MongoDB
#### 6. helpers/
*some side functions that help make the life of other modules easier
- email.js
    - build an email template for confirmation email
- auth.js
    - hash the password before saving in database
    - when login, compare the plain password (provided by user) against the hashed password in the database.
#### 7. middlewares/
- auth.js
    - check if user is logged in
    - apply on each routes that requires protection.

### **Frontend**
#### 1. App.js
*manage different routes at frontend*
#### 2. index.js
*the root of the frontend*
#### 3. index.css
*manage the format of all the modules at frontend*
#### 4. config.js
- store the google place api key
#### 5. pages/
*manage the layout of all the pages at frontend*
- auth/
    - AccessAccount.js
        - allow users who forgot password to access their account through the link from email and update their password in profile page
    - AccountActivate.js
        - activate the user after clicking the registration comfirmation link from email
    - ForgotPassword.js
        - manage the forgot-password process
        - let user enter the email address and send access link via email
- user/
    - ad/
        - AdCreate.js
            - layout the process of creating an ad with multiple options
            - the next 4 js files layout the buttons of options
        - RentHouse.js
        - RentLand.js
        - SellHouse.js
        - SellLand.js
    - Dashboard.js
- Home: manage the layout of Home page
- Login: manage the layout of Login page
- Register: manage the layout of Registration page
#### 6. context/
- auth.js
    - store user info and token after successful login
    - use React context to create a global store accessible by all pages
#### 7. components/
- routes/
    - PrivateRoute.js
- nav/
    - Main.js
        - manage the layout logic of the main page
        - e.g. Home, Login, Register, User Dashboard, etc
    - Sidebar.js
- forms/
    - AdForm.js
        - manage the layout of the ad form when creating an ad
    - ImageUpload.js
        - manage the layout of the image uploading in the ad form
- cards/
    - AdCard.js
        - manage the layout of the ad cards that has been created

