# 🚀 Angular 18 Fullstack Project: InproCode


## 🌟 Project Overview

Our project is divided into two main components:

- **🖥️ Frontend**: A state-of-the-art Angular 18 application featuring Mapbox for interactive mapping, FullCalendar for event scheduling, and Chart.js for data visualization.
- **⚙️ Backend**: A powerful Node.js server built with Express, connected to a MySQL database for efficient data management.



## 🛠️ Prerequisites

Before diving in, ensure you have the following tools installed:

- Node.js (version 16.x or newer)
- npm (version 7.x or newer)
- Angular CLI (version 18.x or newer)

## 📁 Repository Structure

Our project is housed in two separate repositories:

- **Frontend**: [Explore S8_frontend](https://github.com/SaraAOrtega/S8_frontend)
- **Backend**: [Discover S8_backend](https://github.com/SaraAOrtega/S8_backend)

Please clone each repository and follow the setup instructions below.

## 🚀 Getting Started

### 🔧 Setting Up the Backend

1. Clone the backend repository:
   ```bash
   git clone https://github.com/SaraAOrtega/S8_backend.git
   cd S8_backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Import the demo database:
   Locate the `sprint_8_db.sql` file in the Backend folder and import it into your MySQL server.

4. Compile TypeScript:
   ```bash
   tsc --w
   ```

5. Launch the server:
   ```bash
   nodemon dist/index.js
   ```

### 🎨 Preparing the Frontend

1. Clone the frontend repository:
   ```bash
   git clone https://github.com/SaraAOrtega/S8_frontend.git
   cd S8_frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Secure a Mapbox API token from [Mapbox](https://account.mapbox.com/access-tokens/).

4. Set up your environment:
   Edit `src/environments/environment.ts` in the frontend directory with:
   ```typescript
   export const environment = {
     production: false,
     endpoint: 'http://localhost:3000',
     mapboxKey: 'your_mapbox_token_here'
   };
   ```

5. Launch the application:
   ```bash
   ng serve --o
   ```

6. Visit `http://localhost:4200` in your browser!

## 🌈 Features Showcase

### 🖥️ Frontend Highlights

- **🗺️ Mapbox Integration**: Explore interactive maps with custom markers.
- **📅 FullCalendar Integration**: Manage events with an intuitive modal interface for creation and deletion.
- **📊 Chart.js Integration**: Visualize user team categories with stunning charts.

### ⚙️ Backend Capabilities

- **👥 User Management**: Full CRUD operations for user data.
- **🎉 Event Management**: Comprehensive CRUD functionality for event handling.
- **📍 Marker Management**: Complete CRUD operations for map markers.

