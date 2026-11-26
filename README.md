# Blog Application — Frontend

A full-stack blogging application that allows users to create,
share and engage with blog posts through a responsive interface.

This repository contains the frontend implementation of the
application, built with React and connected to a REST API.

## Live Demo

[View Blog Application](https://blog-frontend-tau-three.vercel.app/)

## Features

### User Features

- User registration and login
- User profile
- Browse blog posts
- Create and manage blog posts
- Upload post images
- Comment on posts
- Like and dislike posts
- View individual blog posts

### Admin Features

- Admin dashboard
- User management
- Post management
- Comment management

## Technologies Used

- React.js
- JavaScript
- Tailwind CSS
- Vite
- REST API
- Git and GitHub
- Vercel

## Project Structure

```text
blog-frontend/
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   │   └── admin/
│   ├── pages/
│   │   └── admin/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vercel.json
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/winnieonoja/blog-frontend.git
```

Navigate to the project directory:

```bash
cd blog-frontend
```

Install dependencies:

```bash
npm ci
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## Production Build

To create a production build, run:

```bash
npm run build
```

## Backend Integration

The frontend communicates with a REST API built using
Node.js, Express.js and MongoDB.

## Deployment

The frontend application is deployed on Vercel.

## Author

Winnie Onoja — Full-Stack Developer

[GitHub Profile](https://github.com/winnieonoja)