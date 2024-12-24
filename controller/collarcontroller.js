import { addCollar } from '../models/collarmodels.js';
import { db } from '../config/pgsql.js'; 
const initializeCollar = async (req, res) => {
    console.log("Request received at /api/collar/initialize");

    // Extract parameters from the query string
    const { name, email, phone_number, dog_type, collar_id } = req.query;

    // Validate the incoming parameters
    if (!name || !email || !dog_type || !collar_id) {
        console.log("Missing required parameters: name, email, dog_type, or collar_id");
        return res.status(400).json({ error: 'name, email, dog_type, and collar_id are required' });
    }

    try {
        // Fetch the dog type ID from the dog table
        const dogTypeId = await getDogTypeId(dog_type);

        if (!dogTypeId) {
            console.log("Dog type not found:", dog_type);
            return res.status(404).json({ error: `Dog type '${dog_type}' not found` });
        }

        console.log("Initializing collar with customer details:", { name, email, phone_number, dog_type, collar_id });

        // Call the addCollar function to insert customer data with the retrieved dog_type ID
        const collar = await addCollar(name, email, phone_number, dogTypeId, collar_id);

        console.log("Collar initialized successfully:", collar);

        // Return a success response with the collar information
        return res.status(200).json({
            message: 'Collar initialized successfully',
            collar,
        });
    } catch (error) {
        console.error("Error initializing collar:", error.message);

        // Handle any errors and return an appropriate response
        return res.status(500).json({
            error: 'Failed to initialize collar',
            details: error.message,
        });
    }
};

// Helper function to fetch the dog type ID
const getDogTypeId = async (dog_type) => {
    try {
        const query = 'SELECT id FROM dogs WHERE breed = $1';
        const result = await db.query(query, [dog_type]);
        if (result.rowCount > 0) {
            return result.rows[0].id; // Return the dog type ID
        } else {
            return null; // Dog type not found
        }
    } catch (error) {
        console.error("Error fetching dog type ID:", error.message);
        throw error;
    }
};

export { initializeCollar };
