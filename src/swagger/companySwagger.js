/**
 * @swagger
 * tags:
 *   - name: Companies
 *     description: API to manage companies
 *
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       required:
 *         - company_name
 *       properties:
 *
 *         company_name:
 *           type: string
 *           description: Name of the company
 *
 *       example:
 *         company_name: TechCorp
 *
 *
 * /api/companies:
 *   get:
 *     summary: Get all companies
 *     description: Fetch a list of all companies.
 *     tags: [Companies]
 *
 *     responses:
 *       200:
 *         description: A list of companies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 *   post:
 *     summary: Create a new company
 *     description: Add a new company to the database.
 *     tags: [Companies]
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       201:
 *         description: Company created successfully
 *       400:
 *         description: Bad request
 *
 * /api/companies/{company_id}:
 *   get:
 *     summary: Get a company by ID
 *     description: Fetch a company using its ID.
 *     tags: [Companies]
 *
 *     parameters:
 *       - in: path
 *         name: company_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the company to fetch
 *     responses:
 *       200:
 *         description: A company object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       404:
 *         description: Company not found
 *   put:
 *     summary: Update a company
 *     description: Update the details of an existing company.
 *     tags: [Companies]
 *
 *     parameters:
 *       - in: path
 *         name: company_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the company to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       404:
 *         description: Company not found
 *   delete:
 *     summary: Delete a company
 *     description: Remove a company from the database.
 *     tags: [Companies]
 *
 *     parameters:
 *       - in: path
 *         name: company_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the company to delete
 *     responses:
 *       200:
 *         description: Company deleted successfully
 *       404:
 *         description: Company not found
 */
