/**
 * @swagger
 * tags:
 *   - name: Required Tools
 *     description: API to manage tools
 *
 * components:
 *   schemas:
 *     Tool:
 *       type: object
 *       required:
 *         - tool_name
 *       properties:
 *
 *         tool_name:
 *           type: string
 *           description: The name of the tool
 *       example:
 *
 *         tool_name: Hammer
 *
 *
 * /api/required-tools:
 *   get:
 *     summary: Get all required tools
 *     description: Fetch a list of all tools.
 *     tags: [Required Tools]
 *     responses:
 *       200:
 *         description: A list of required tools
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tool'
 *   post:
 *     summary: Create a new tool
 *     description: Add a new tool to the database.
 *     tags: [Required Tools]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tool'
 *     responses:
 *       201:
 *         description: Tool created successfully
 *       400:
 *         description: Bad request
 *
 * /api/required-tools/{tool_id}:
 *   get:
 *     summary: Get a tool by ID
 *     description: Fetch a tool using its ID.
 *     tags: [Required Tools]
 *     parameters:
 *       - in: path
 *         name: tool_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the tool to fetch
 *     responses:
 *       200:
 *         description: A tool object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tool'
 *       404:
 *         description: Tool not found
 *   put:
 *     summary: Update a tool
 *     description: Update the details of an existing tool.
 *     tags: [Required Tools]
 *     parameters:
 *       - in: path
 *         name: tool_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the tool to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tool_name:
 *                 type: string
 *                 description: The name of the tool
 *             example:
 *               tool_name: Updated Hammer
 *     responses:
 *       200:
 *         description: Tool updated successfully
 *       404:
 *         description: Tool not found
 *   delete:
 *     summary: Delete a tool
 *     description: Remove a tool from the database.
 *     tags: [Required Tools]
 *     parameters:
 *       - in: path
 *         name: tool_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the tool to delete
 *     responses:
 *       200:
 *         description: Tool deleted successfully
 *       404:
 *         description: Tool not found
 */
