
import { AladnaneSupply, ArrissalaSupply } from "../models/Supply.js";


export const getSupplies = async (req, res) => {
    const { library, type } = req.params;
  
    try {
      const SupplyModel = library === 'arrissala' ? ArrissalaSupply : (library === 'aladnane' ? AladnaneSupply : null);
  
      if (!SupplyModel) {
        return res.status(404).json({ error: 'Library not found' });
      }
  
      const filteredSupplies = await SupplyModel.find({ type });
  
      if (filteredSupplies.length === 0) {
        return res.status(404).json({ error: 'Supplies not found' });
      }
  
      res.json(filteredSupplies[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }