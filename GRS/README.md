# GRS

## Step-1

Create a folder named => grs

## Step-2

Create a react project with bootstrap, axios, react-router-dom

## Step-3

Create server folder to handle backend in the parent folder(grs)

# Server

1. Initialize the node app using npm init -y
2. Install all required packages

## Express

Used for logic and creating REST API's
npm i express

## mongoose

Used for mongodb database handling
npm i mongoose

## dotenv

Used for storing hidden or sensitive crenditials like db connection, network port etc.
npm i dotenv

## bcrypt

Used for hashing password in the encrypted way
npm i bcryptjs

## nodemon

Used for handling the server start in the real-time
npm i nodemon

## nodemailer

Used to implement the email sending functionality to a user
npm i nodemailer

## jsonwentoken

Used for authentication
npm i jsonwebtoken

## cors



# npm i express mongoose dotenv bcryptjs nodemon nodemailer jsonwebtoken cors

# Schema

## Admin Schema
    name
    email
    password

## College Schema
    name
    description
    status

## Admin Schema
    name
    status

## Complaint-Types Schema
    name
    description
    status
    timestamps

# Client

Folder -> src/pages

    1. Home.jsx
    2. AdminLogin.jsx
    3. UserLogin.jsx
    4. USerRegister.jsx
        name, fname, email, mobile, college(select), course(select), session(select), enrollment(text), password, dob, gender, address  
    5. Folder -> admin
    6. Folder-> user
