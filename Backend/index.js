const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./db.js');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB and start server
connectDb()
  .then(() => {
    console.log('✅ MongoDB Connected');

    // Import Routes
    const signinRoutes = require('./routes/signin');
    const approvalRoutes = require('./routes/user_approvals');

    // Mount routes with a proper prefix
    app.use( signinRoutes);   // Authentication routes with `/api/auth` prefix
    app.use( approvalRoutes); // User approval routes with `/api/approvals` prefix
    

    // Test Route
    app.get('/', (req, res) => res.send('Server is running ✅'));

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('❌ Error connecting to MongoDB:', err));
