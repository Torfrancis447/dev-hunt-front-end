# Dev.hunt
Introduction
Dev.hunt is a job board app that allows users to post and apply to jobs. It is built with Ruby on Rails for the backend, PostgreSQL for the database, and AWS S3 for storing resumes. On the front-end, it uses Material UI and React, with EmailJS for application confirmation.

## The WHY
The goal of Dev.hunt is to provide a platform for job seekers and employers in the IT to connect in a streamlined and efficient way. With the rise of remote work and the increasing demand for skilled developers, job seekers need a centralized platform to find opportunities that match their skills and interests. On the other hand, employers need an easy and effective way to reach a large pool of qualified candidates. Dev.hunt addresses these needs by offering a user-friendly job board that is accessible to both parties.

# Technologies Used
The following frameworks and notable libraries were used to build Dev.hunt:

Ruby on Rails (backend framework)
PostgreSQL (database)
AWS S3 (file storage)
React (frontend library)
Material UI (UI library)
EmailJS (email service)
API’s Utilized
Dev.hunt currently does not utilize any external APIs.

# Environment Set Up
To use Dev.hunt, you'll need to have the following:

Ruby 2.7.4 or higher
Rails 6.1.4 or higher
PostgreSQL 13.3 or higher
Node.js 14.17.0 or higher
npm 7.10.0 or higher

To get started, follow these steps:

Clone the repository: git clone https://github.com/your-username/dev.hunt.git
Install dependencies: bundle install and npm install
Set up the database: rails db:create, rails db:migrate, and rails db:seed (if necessary)
Configure AWS S3 credentials in config/storage.yml
Start the Rails server: rails s from the backend repository [Dev.Hunt-Backend](https://github.com/Torfrancis447/dev-hunt)
Start the React development server: npm start
That's it! You should now be able to access the app at http://localhost:3000




