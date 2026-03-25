const Food = require('../models/Food');

exports.getAllFoods = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isAvailable: true };  
    
    if (category) {
      filter.category = category;
    }

    const foods = await Food.find(filter);
    res.json({
      success: true,
      count: foods.length,
      data: foods
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json({
      success: true,
      data: food
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createFood = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.body;

    const food = new Food({
      name,
      description,
      price,
      category,
      quantity
    });

    await food.save();
    res.status(201).json({
      success: true,
      message: 'Food item created successfully',
      data: food
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateFood = async (req, res) => {
  try {
    let food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    food = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      message: 'Food item updated successfully',
      data: food
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    res.json({
      success: true,
      message: 'Food item deleted successfully',
      data: food
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};