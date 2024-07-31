# Flight Status Website

## Overview

This single-page responsive web application provides a comprehensive view of flight statuses and management. It features a React.js frontend, a Python Flask backend, and utilizes MongoDB for data storage. Real-time communication is handled with Socket.io. The application is designed as a potential future website for Indigo Airlines, featuring dynamic flight updates and administrative functionalities.

![Screenshot (8)](https://github.com/user-attachments/assets/7559c58a-1b12-4f47-bd8e-a39b30dca666)

![Screenshot (6)](https://github.com/user-attachments/assets/087b21df-e379-4d78-a299-3630558b41cd)

![Screenshot (7)](https://github.com/user-attachments/assets/66fb6dfa-ec2b-414c-b1ae-982dfa3081a9)



https://github.com/user-attachments/assets/20fc2ce3-55d0-465c-84e3-9c15646f96bb



## Features

- **Home Page**: 
  - Displays a list of flights in cards sorted by departure time.
  - Flight cards are color-coded based on status: green for on-time, yellow for delayed, and red for canceled.
  - Hovering over a card lifts it slightly, and clicking it opens a detailed view with information about arrival, departure, status, and more.
  - Includes a search bar for filtering flights by name, flight number, or gate, and a filter to view flights by status.

- **Admin Panel**:
  - Restricted to admins. Requires login with predefined credentials (`admin`/`password` for demo).
  - Admins can select a flight and update its status (on-time, delayed, canceled).
  - Updates trigger email notifications to attendants, including personalized messages based on flight status.

## Installation and Setup

### 1. Clone the Repository

Clone the repository to your local machine and navigate into the project directory:

```bash
git clone https://github.com/satwikjain/flight_status.git
cd flight_status
```

### 2. Frontend Setup

Install the necessary npm packages:

```bash
npm install
```

### 3. Backend Setup

Navigate to the `backend` directory and install the required Python packages using `requirements.txt`:

```bash
cd ./backend
pip install -r requirements.txt
```

### 4. Configuration

Create a `.env` file in the `backend` directory with the following environment variables:

```env
MONGO_URI=<your-mongodb-connection-link>
EMAIL_ADDRESS=<your-email-address>
EMAIL_PASSWORD=<your-email-password>
```

Replace `<your-mongodb-connection-link>`, `<your-email-address>`, and `<your-email-password>` with your MongoDB connection string and email credentials used for sending notifications.

### 5. Running the Application

#### Frontend

Navigate to the frontend directory and start the development server:

```bash
npm start
```

#### Backend

Navigate to the `backend` directory and start the Flask server:

```bash
cd ./backend
python app.py
```

## Accessing the Application

Once both the frontend and backend servers are running, open your web browser and go to `http://localhost:3000` to view the application.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- React.js for the frontend framework.
- Flask for the backend server.
- MongoDB for database management.
- Socket.io for real-time communication.
- Bootstrap for UI components and styling.

## Future Work

1. Adding user authentication to enable login and signup features.
2. Using bcrypt.js for password encryption to enhance security.
3. Enabling users to book flights and integrating a payment gateway for transactions.
4. Implementing role-based access control to differentiate between regular users and administrators.
5. Developing a mobile application version for better accessibility.
6. Adding multi-language support to cater to a diverse user base.
7. Incorporating AI-driven features for predictive flight delays and personalized user experience.
8. Integrating social media sharing options for users to share their flight details.
9. Enhancing the admin panel with analytics and reporting tools for better decision-making.
10. Providing a chatbot for customer support to handle common queries and provide flight information.

## Contact

For any questions or issues, please contact [satwikjain25@gmail.com](mailto:satwikjain25@gmail.com).