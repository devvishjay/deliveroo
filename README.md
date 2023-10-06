<!-- Project Title -->
<h1 align="center">Deliveroo Backend</h1>

<!-- Project Description -->
<p align="center">A boilerplate project for building web applications with Express.js and Sequelize</p>

<!-- Shields -->
<p align="center">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/your-username/express-sequelize-project">
  <img alt="GitHub issues" src="https://img.shields.io/github/issues/your-username/express-sequelize-project">
  <img alt="GitHub license" src="https://img.shields.io/github/license/your-username/express-sequelize-project">
</p>

<!-- Table of Contents -->
## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)


<!-- Getting Started -->
## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Make sure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

- **MySQL**: You need a MySQL database for this project. 

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/express-sequelize-project.git
Navigate to the project directory:

bash
Copy code
cd express-sequelize-project
Install the project dependencies:

bash
Copy code
npm install



Create a nodemon.json file in the project root with the following content:

{
  "env": {
   PORT=5000
JWT_KEY=deliveroo
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
NODE_ENV=development
CLIENTID=738619888334-vqh3p0u5gkm96ea77bv2k5ufgto1g1ee.apps.googleusercontent.com
  }
}
Run the application:

bash
Copy code
npm start
The server will start on port 5000 (or the port you specified in the .env file). You can access the API at http://localhost:5000.

<!-- Usage -->
Usage
Use this project as a starting point for your Express.js and Sequelize applications.
Define your database models in the models directory.
Implement your API routes in the routes directory.

