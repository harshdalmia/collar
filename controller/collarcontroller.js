import { addCollar } from '../models/collarmodels.js';

const initializeCollar = async (req, res) => {
    console.log("Request received at /api/collar/initialize");

  const { macaddress, dogId } = req.query;

  if (!macaddress || !dogId) {
    console.log("Missing parameters: macaddress or dogId");
    return res.status(400).json({ error: 'macaddress and dogId are required' });
  }

  try {
    console.log("Collar initialized:");
    const collar = await addCollar(macaddress, dogId);
    console.log("Collar initialized:", collar);
    res.status(201).json({
      message: 'Collar initialized successfully',
      collar,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to initialize collar', details: error.message });
  }
  return { macaddress, dogId, createdAt: new Date() };
};

export { initializeCollar };
