
# Stock Dashboard

## Overview

This project is a **Stock Dashboard** built with React on the frontend and a backend server that serves stock data in a **`data.json`** file. It provides users with a UI to view stock exchanges, stock data, and their live prices. The project is designed to be embedded in external applications like Bloomberg or other third-party vendors.

## Project Structure

- **Backend**: 
  - Environment variables are managed in `.env` files. 
  - Stock data is served from the file `var/data.json`.
  
- **Frontend**: 
  - The React frontend is located in the `frontend` folder.
  
## Setup & Installation

### 1. Backend Setup

- Navigate to the backend folder.
- Create a `.env` file that holds environment-specific variables for your project.
- In the `.env` file, you can store API credentials, data paths, etc.

Example `.env` file for the backend:

```env
PORT=8081
```

- Install dependencies:

```bash
npm install
```

- Start the backend server:

```bash
npm start
```

### 2. Frontend Setup

- Navigate to the frontend folder.
- Install dependencies:

```bash
npm install
```

- Start the frontend development server:

```bash
npm start
```

Your frontend should now be available at [http://localhost:3000](http://localhost:3000).

## Project TODO

### Backend

1. **Create a Data Layer**:
   - Integrate a database to replace the static `data.json` file.
   - Ensure the data is fetched dynamically from the database to get live stock data.
   
2. **Create Proper API**:
   - Develop a fully functional API that will allow the frontend to query live stock data.
   - Example endpoints could include:
     - `/api/exchanges` - Get all available exchanges.
     - `/api/stocks?exchange=NYSE` - Get stocks for a particular exchange.
     - `/api/stock-price?symbol=AAPL` - Get live stock price data.

3. **Set up Hotkeys and Bindings**:
   - Implement hotkeys for quick navigation or features like refreshing data, switching exchanges, etc.
   - Make the UI feel more interactive by adding key bindings (e.g., `Ctrl + R` to refresh data).

4. **Adapt UI**:
   - Update the UI to follow the look and feel of Bloomberg or other corporate stock dashboard UIs.
   - Ensure the UI is clean, with a professional aesthetic and user-friendly interaction.
   - Improve layout, font styles, colors, and general design elements to feel familiar to traders and professionals.

5. **Ship as a Package**:
   - Package the app so that it can be easily embedded in external platforms like Bloomberg or other third-party vendors.
   - Use an appropriate bundler and packaging method for easy integration into external systems.

### Frontend

1. **Write More Tests**:
   - Ensure comprehensive coverage of the React components.
   - Write unit tests, integration tests, and mock external API calls.

2. **Write E2E Tests**:
   - Implement end-to-end tests to ensure the system works as expected from the user’s perspective.
   - Tools like Cypress or Selenium can be used to simulate real user interactions.

3. **Create Data Layer for Stock Data**:
   - Integrate the frontend with the backend API to fetch real-time stock data.
   - Store stock data in a global state (e.g., Redux or Context API) for efficient state management.

4. **Handle Errors Gracefully**:
   - Show meaningful error messages when the API fails to load data.
   - Handle edge cases, such as when no stocks are available or when the user is offline.

### Future Improvements

1. **Real-Time Data Updates**:
   - Integrate WebSocket or polling to get live stock price updates in real-time.
   - Implement auto-refresh mechanisms to keep stock prices up-to-date without the user having to manually refresh.

2. **Mobile and Responsive Design**:
   - Ensure the UI is fully responsive and works seamlessly on mobile devices.
   - Implement touch-friendly UI components for better usability on tablets and phones.

3. **User Authentication**:
   - Implement user authentication and authorization if you plan to offer personalized stock tracking or a custom dashboard for users.

4. **Customizable Dashboards**:
   - Allow users to create and customize their own stock dashboard, choose preferred stocks, set alerts, etc.

