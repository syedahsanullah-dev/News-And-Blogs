# News & Blogs App

A modern, responsive React application built with Vite that serves as a personalized news reader and a mini blogging platform. Users can stay updated with the latest headlines, search for specific news, and manage their own customized blog posts, all in one place.

## 🌟 Features

### 📰 News Reader
- **Live News Integration**: Fetches top headlines and breaking news from the [GNews API](https://gnews.io/).
- **Categories**: Browse news across various topics including General, World, Business, Technology, Entertainment, Sports, Science, Health, and Nation.
- **Search Functionality**: Search for specific news articles via the search bar.
- **Bookmarks System**: Save your favorite news articles to read later. Bookmarks are persisted using the browser's `localStorage`.

### ✍️ Mini Blogging Platform
- **Create Custom Blogs**: Write your own blog posts with a title, content, and an image upload (supports images up to 1MB).
- **Manage Your Posts**: Easily edit and update existing posts, or delete them when no longer needed.
- **Local Persistence**: All created blogs and images are saved locally using `localStorage`, ensuring your data is preserved across browser sessions.

## 🛠️ Technologies Used

- **Framework**: [React 19](https://react.dev/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS with interactive micro-animations and modern aesthetics.
- **API Client**: [Axios](https://axios-http.com/)
- **Data Persistence**: LocalStorage API

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd News-And-Blogs
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the Application

To start the development server, run:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### Building for Production

To build the application for production, run:
```bash
npm run build
```
This will generate an optimized production build in the `dist` folder.

## ⚙️ Configuration

The application uses the GNews API to fetch articles. The API key is currently hardcoded in `src/Components/News.jsx`. If you plan to use this extensively or deploy it, it is recommended to get your own API key from [GNews](https://gnews.io/) and manage it via environment variables (e.g., `.env`).

## 📁 Project Structure

```
├── public/               # Public assets
├── src/
│   ├── assets/           # Images and static assets
│   ├── Components/       # React components (News, Blogs, Modals, etc.)
│   ├── App.jsx           # Main application entry point handling state
│   ├── index.css         # Global styles
│   └── main.jsx          # React DOM rendering
├── package.json          # Project metadata and dependencies
└── vite.config.js        # Vite configuration
```
