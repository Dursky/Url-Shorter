# Url Shorter

URL shorter based on Node.js & React & React Native

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Url-Shorter is a simple and efficient URL shortener application built using Node.js for the backend and React for the frontend. This project aims to provide a user-friendly interface for shortening long URLs, making them easier to share and manage.

## Features

- **URL Shortening**: Quickly shorten long URLs.
- **Custom Aliases**: Create custom aliases for your short URLs.
- **Analytics**: Track the number of clicks on each shortened URL.
- **Responsive Design**: Access the application on various devices thanks to React Native.

## Technologies Used

- **Node.js**: Backend server and API.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: Database for storing URLs.
- **React**: Frontend user interface.
- **React Native**: Mobile application interface.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB

### Backend

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/url-shorter.git
   ```
2. Navigate to the backend directory:
   ```sh
   cd url-shorter/backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the backend directory and add your MongoDB URI:
   ```env
   MONGODB_URI=your_mongodb_uri
   ```
5. Start the backend server:
   ```sh
   npm start
   ```

### Frontend

1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Register new account or login it
3. Enter the URL you want to shorten.
4. Click the "Shorten" button to generate a shortened URL.
5. Use the provided short URL to share or track clicks.

## Contributing

We welcome contributions from the community! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
