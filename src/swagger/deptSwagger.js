/**
 * @swagger
 * tags:
 *   - name: Departments
 *     description: API to manage departments
 *
 * components:
 *   schemas:
 *     Department:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the department
 *       example:
 *         name: Human Resources
 *
 * /api/departments:
 *   get:
 *     summary: Get all departments
 *     description: Fetch a list of all departments.
 *     tags: [Departments]
 *     responses:
 *       200:
 *         description: A list of departments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Department'
 *   post:
 *     summary: Create a new department
 *     description: Add a new department to the database.
 *     tags: [Departments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Department'
 *     responses:
 *       201:
 *         description: Department created successfully
 *       400:
 *         description: Bad request, missing or invalid fields
 *
 * /api/departments/{dept_id}:
 *   get:
 *     summary: Get a department by ID
 *     description: Fetch a department using its ID.
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: dept_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the department to fetch
 *     responses:
 *       200:
 *         description: A department object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Department'
 *       404:
 *         description: Department not found
 *   put:
 *     summary: Update a department
 *     description: Update the details of an existing department.
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: dept_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the department to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Department'
 *     responses:
 *       200:
 *         description: Department updated successfully
 *       400:
 *         description: Bad request, missing or invalid fields
 *       404:
 *         description: Department not found
 *   delete:
 *     summary: Delete a department
 *     description: Remove a department from the database.
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: dept_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the department to delete
 *     responses:
 *       200:
 *         description: Department deleted successfully
 *       404:
 *         description: Department not found
 */
