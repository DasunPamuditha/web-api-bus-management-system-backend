require('dotenv').config();
const express = require('express');
const connectDB = require('./database');
const cors = require('cors');
const rateLimiter = require('./middlewares/rateLimiter');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('./swaggerFeatures'); // Import your swaggerOptions.js


// Import Routes
const adminRoutes = require('./routes/adminRoutes');
const busOperatorRoutes = require('./routes/busOperatorRoutes');
const commuterRoutes = require('./routes/commuterRoutes'); // Updated path
const routeRoutes = require('./routes/routeRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const busRoutes = require('./routes/busRoutes');
const permitRoutes = require('./routes/permitRoutes');
const busOperatorAuthRoutes = require('./routes/busOperatorAuthRoutes');
const busOperatorActionsRoutes = require('./routes/busOperatorActionRoutes.js'); // For operator-specific actions

// Import Error Handling Middleware
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(rateLimiter); // Apply rate limiting

// Connect to Database
connectDB();

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc));

// API Routes
app.use('/tp/admin', adminRoutes); // Admin-related routes
app.use('/tp/bus-operators', busOperatorRoutes); // Bus operator-related routes
app.use('/tp/commuters', commuterRoutes); // Commuter-related routes
app.use('/tp/routes', routeRoutes); // For routes management
app.use('/tp/schedules', scheduleRoutes); // For schedules management
app.use('/tp/admin/buses', busRoutes); // For bus management
app.use('/tp/admin/permits', permitRoutes); // Permit routes
app.use('/tp/bus-operators/auth', busOperatorAuthRoutes);
app.use('/tp/bus-operators/actions', busOperatorActionsRoutes); // Operator-specific actions
// Error Handling Middleware
app.use(errorHandler);





// Start the Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
