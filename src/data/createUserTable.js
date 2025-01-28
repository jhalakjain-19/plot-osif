const pool = require('../config/db');

const createUserTable = async () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users(
        userID SERIAL PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        role SMALLINT NOT NULL, -- Replaced TINYINT with SMALLINT
        departmentID INT NOT NULL,
        sectionID INT NOT NULL,
        companyID INT NOT NULL,
        locationID INT NOT NULL,
        phone VARCHAR(20) NOT NULL,
        address VARCHAR(450) NOT NULL,
        shiftID INT NOT NULL,
        password VARCHAR(150) NOT NULL,
        status SMALLINT DEFAULT '1',
        isDeleted SMALLINT DEFAULT 0, -- Replaced TINYINT with SMALLINT
        createdAt TIMESTAMP DEFAULT NOW(),
        updatedAt TIMESTAMP DEFAULT NOW()
    );
    `;

    const addCommentsQuery = `
    COMMENT ON COLUMN users.role IS '1=>Admin, 2=>Manager, 3=>Supervisor, 4=>Operator';
    COMMENT ON COLUMN users.status IS '1=>Active, 2=>Inactive';
    COMMENT ON COLUMN users.isDeleted IS '1=>Deleted, 0=>Not Deleted';
    `;

    try {
        // Create the table
        await pool.query(createTableQuery);
        console.log('User table created if not exists');

        // Add comments to columns
        await pool.query(addCommentsQuery);
        console.log('Comments added to user table columns');
    } catch (error) {
        console.error('Error creating user table or adding comments:', error);
    }
};

module.exports = createUserTable;
