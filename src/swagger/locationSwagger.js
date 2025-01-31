/**
 * @swagger
 * tags:
 *   - name: Locations
 *     description: API to manage locations
 *
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       required:
 *         - location_name
 *       properties:
 *         location_name:
 *           type: string
 *           description: Name of the location
 *       example:
 *         location_name: New York
 *
 * /api/locations:
 *   get:
 *     summary: Get all locations
 *     description: Fetch a list of all locations.
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: A list of locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 *   post:
 *     summary: Create a new location
 *     description: Add a new location to the database.
 *     tags: [Locations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       201:
 *         description: Location created successfully
 *       400:
 *         description: Bad request, missing or invalid fields
 *
 * /api/locations/{location_id}:
 *   get:
 *     summary: Get a location by ID
 *     description: Fetch a location using its ID.
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: location_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the location to fetch
 *     responses:
 *       200:
 *         description: A location object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Location not found
 *   put:
 *     summary: Update a location
 *     description: Update the details of an existing location.
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: location_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the location to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: Location updated successfully
 *       400:
 *         description: Bad request, missing or invalid fields
 *       404:
 *         description: Location not found
 *   delete:
 *     summary: Delete a location
 *     description: Remove a location from the database.
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: location_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the location to delete
 *     responses:
 *       200:
 *         description: Location deleted successfully
 *       404:
 *         description: Location not found
 */
