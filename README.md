# Vikasana DSA

GPT generated

## STUFF TO DO
- Make problems structure
- write route to add problem
- write route to add users to the problem structure if they solved it
- everytime a user submits code, check if user exists in problem.solved, if not increment score
- write getproblems (solved, unsolved) route to get all available problems to solve for user
- make a /problems page to display solved and unsolved problems

## Prerequisites

Before cloning and running the app, ensure you have the following installed:

- **Node.js** (v16 or higher) and npm
- **MongoDB** (local installation or MongoDB Atlas)
- **Git** (to clone the repository)
- **Optional**: MongoDB Compass for database management

## Getting Started

Follow these steps to clone, set up, and run the app locally.

### 1. Contributing

1. **Fork the Repository**: Create your own fork on GitHub.
2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/your-username/VikasanaDSA.git
   ```
3. **Create a Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make Changes**: Edit the code as needed.
5. **Commit and Push**:
   ```bash
   git add .
   git commit -m "Add your feature description"
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request**: Submit a PR to the original repository with a description of your changes.

### 2. Install Dependencies

The project has two main directories: the frontend (React) and the backend (Express). Install dependencies for both.

#### Backend Dependencies
Navigate to the root directory (where `server.js` is located):

```bash
npm install
```

This will install the following backend dependencies:
- `express`
- `mongoose`
- `cors`
- `bcrypt`
- `jsonwebtoken`
- `dotenv`

#### Frontend Dependencies
Navigate to the `frontend` directory (where `package.json` for Vite is located):

```bash
cd frontend
npm install
```

This will install the following frontend dependencies:
- `react`
- `react-dom`
- `react-router-dom`
- `axios`
- `react-markdown`
- `tailwindcss`
- `@tailwindcss/typography`

### 3. Set Up Environment Variables

Create a `.env` file in the root directory (same level as `server.js`) and add the following environment variables:

```env
JWT_SECRET=your-secret-key-change-this
```

- `JWT_SECRET`: A secret key for signing JWTs. Replace `your-secret-key-change-this` with a secure, unique string.

### 4. Set Up MongoDB

Ensure MongoDB is running locally or set up a MongoDB Atlas instance.

#### Local MongoDB
Start MongoDB on your machine:

```bash
sudo systemctl start mongod
```

The app connects to MongoDB at `mongodb://127.0.0.1:27017/app` by default. If your MongoDB setup differs, update the connection string in `server.js`:

```javascript
mongoose.connect("mongodb://127.0.0.1:27017/app");
```

OR JUST INSTALL MONGODB COMPASS

### 5. Run the Application

You’ll need to run both the backend and frontend servers.

#### Start the Backend Server
From the root directory:

```bash
node server.js
```

- The backend will run on `http://localhost:3001`.
- You should see `"Server running on port 3001"` in the console.

#### Start the Frontend Server
In a new terminal, navigate to the `frontend` directory:

```bash
cd frontend
npm run dev
```

- The frontend will run on `http://localhost:5173` (default Vite port).
- Open `http://localhost:5173` in your browser to view the app.

#### Example: Add a New Feature
To add a new feature, such as a delete user button for admins:
1. Add a `DELETE /users/:id` route in `server.js`.
2. Update `DashBoard.jsx` to include a "Delete" button in the "All Users" table for admins.

This `README.md` provides clear instructions for cloning, setting up, running, and editing your project. It’s tailored to your app’s features and structure, ensuring other developers can get started quickly. Place this file in the root directory of your repository. Let me know if you’d like to add more sections (e.g., deployment instructions) or adjust anything!
