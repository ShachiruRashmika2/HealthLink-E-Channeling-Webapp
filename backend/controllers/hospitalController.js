const Hospital = require('../models/hospitalModel')

const createHospital = async (req, res) => {
  try {
    const { name, address, phoneNumber, type ,CoverImg,channelFee} = req.body;

    
    if (!name || !address || !phoneNumber || !type || !channelFee || !CoverImg) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    
    const newHospital = new Hospital({
      name,
      address,
      phoneNumber,
      type,
      CoverImg,
      channelFee
    });

    
    await newHospital.save();

    res.status(201).json({ message: 'Hospital added successfully', hospital: newHospital });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add hospital', error: error.message });
  }
};

const getHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find(); 

    res.status(200).json(hospitals); 
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve hospitals', error: error.message });
  }
};

const deleteHospital = async (req, res) => {
  try {
    const { id } = req.params; 
    const deletedHospital = await Hospital.findByIdAndDelete(id);

    if (!deletedHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    res.status(200).json({ message: 'Hospital deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete hospital', error: error.message });
  }
};

const updateHospital = async (req, res) => {
  try {
    const { id } = req.params; 
    const { name, address, phoneNumber, type ,CoverImg,channelFee} = req.body;

    
    const currentHospital = await Hospital.findById(id);
    if (!currentHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    
    const updates = {};

    
    if (name && name !== currentHospital.name) {
      updates.name = name;
    }
    if (address && address !== currentHospital.address) {
      updates.address = address;
    }
    if (phoneNumber && phoneNumber !== currentHospital.phoneNumber) {
      updates.phoneNumber = phoneNumber;
    }
    if (type && type !== currentHospital.type) {
      updates.type = type;
    }
    if (CoverImg && CoverImg !== currentHospital.CoverImg) {
      updates.CoverImg = CoverImg;
    }
    if (channelFee && channelFee !== currentHospital.channelFee) {
      updates.channelFee = channelFee;
    }

    
    if (Object.keys(updates).length === 0) {
      return res.status(200).json({ message: 'No changes made to the hospital details.' });
    }

   
    const updatedHospital = await Hospital.findByIdAndUpdate(
      id,
      updates,
      { new: true } 
    );

    res.status(200).json({ message: 'Hospital updated successfully', hospital: updatedHospital });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update hospital', error: error.message });
  }
};



module.exports = {
    createHospital,
    getHospitals,
    deleteHospital,
    updateHospital
}
