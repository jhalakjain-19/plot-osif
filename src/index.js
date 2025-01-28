const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { swaggerUi, swaggerDocs } = require("./config/swagger");
const userRoutes = require("./routes/userRoutes.js");
const deptRoutes = require("./routes/deptRoutes.js");
const sectionRoutes = require("./routes/sectionRoutes.js");
const subSectionRoutes = require("./routes/subSectionRoutes.js");
const companyRoutes = require("./routes/companyRoutes.js");
const locationRoutes = require("./routes/locationRoutes.js");
const shiftRoutes = require("./routes/shiftRoutes.js");
const machineRoutes = require("./routes/machineRoutes.js");
const requiredToolsRoutes = require("./routes/requiredToolsRoutes.js");
const errorHandler = require("./middlewares/errorHandler.js");
//const createUserTable = require('./data/createUserTable.js');
const { roleNames } = require("./utils/commonUtils");

dotenv.config();
const app = express();
const port = process.env.PORT || 5500;

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/users", userRoutes);

// Routing for department module
app.use("/api/departments", deptRoutes);

// Routing for sections module
app.use("/api/sections", sectionRoutes);

// Routing for sub sections module
app.use("/api/sub-sections", subSectionRoutes);

// Routing for companies module
app.use("/api/companies", companyRoutes);

// Routing for locations module
app.use("/api/locations", locationRoutes);

// Routing for shifts module
app.use("/api/shifts", shiftRoutes);

// Routing for machines module
app.use("/api/machines", machineRoutes);

// Routing for required tools module
app.use("/api/required-tools", requiredToolsRoutes);
/* 
app.use('/api/test', (req, res) => {
    res.send('Testing');
});
*/

console.log(`User role is: ${roleNames[1]}`);
// Error handling middleware
app.use(errorHandler); // Corrected this line

//create table before server start
//createUserTable();

// Server running
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
