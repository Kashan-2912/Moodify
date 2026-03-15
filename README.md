# Moodify

**Track your daily mood every day of the year!**

Moodify is a web application designed to help users track and visualize their daily emotional well-being. By logging your mood each day, you can build a comprehensive history of how you've been feeling throughout the year, visualized on an interactive calendar.

## 🚀 Tech Stack

This project is built using modern web technologies to ensure a fast, responsive, and seamless user experience.

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **UI Library**: [React 18](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first, responsive design
- **Backend & Authentication**: [Firebase](https://firebase.google.com/)
  - **Firebase Auth**: Secure user authentication (Login/Signup)
  - **Cloud Firestore**: NoSQL cloud database to store user mood data securely
- **Typography**: Optimized custom fonts via `next/font/google` (Fugaz One & Open Sans)

## ✨ Features

- **User Authentication**: Secure sign-up and login utilizing Firebase Authentication.
- **Daily Mood Tracking**: Log your mood for the current day using a simple, intuitive custom interface (Options ranging from 😭 to 😍).
- **Interactive Calendar**: View your mood history on a beautifully color-coded and responsive interactive calendar.
- **Mood Statistics**: Instantly calculate and display your average mood and total days tracked.
- **Responsive Design**: Fully responsive UI providing a seamless experience on both desktop and mobile devices.

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. **Clone the repository** (or download the source code).
2. **Navigate to the project directory**:
   ```bash
   cd moods
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```

### Configuration

Create a `.env.local` file in the root of the project and add your Firebase configuration variables:

```env
NEXT_PUBLIC_API_KEY=your_api_key
NEXT_PUBLIC_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_PROJECT_ID=your_project_id
NEXT_PUBLIC_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_APP_ID=your_app_id
```

*(You can find these details in your Firebase Console under Project Settings > General)*

### Running the App

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your web browser to see the result.

## 📁 Project Structure

- `/app`: Next.js App Router providing page layout, routing, and global styles.
- `/components`: Modular, reusable React components (`Dashboard`, `Calendar`, `Hero`, `Login`, etc.).
- `/context`: Global state management with React Context API (`authContext.js`).
- `firebase.js`: Firebase application initialization and service exports.

---

*Created with 💚*
