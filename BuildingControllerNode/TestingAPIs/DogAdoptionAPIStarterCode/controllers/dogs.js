const mongoose = require('mongoose');
const { Dog } = require('../models');

exports.registerDog = async (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ message: 'name is required' });
  try {
    const dog = new Dog({ name, description, owner: req.user.id });
    await dog.save();
    return res.status(201).json({ dog });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.adoptDog = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid dog id' });
  try {
    const dog = await Dog.findById(id);
    if (!dog) return res.status(404).json({ message: 'Dog not found' });
    if (dog.owner.equals(req.user.id)) return res.status(403).json({ message: 'Cannot adopt your own dog' });
    if (dog.status === 'adopted') return res.status(409).json({ message: 'Dog already adopted' });

    dog.status = 'adopted';
    dog.adoptedBy = req.user.id;
    dog.thankYouMessage = message || '';
    dog.adoptedAt = new Date();
    await dog.save();

    return res.json({ dog });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.removeDog = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid dog id' });
  try {
    const dog = await Dog.findById(id);
    if (!dog) return res.status(404).json({ message: 'Dog not found' });
    if (!dog.owner.equals(req.user.id)) return res.status(403).json({ message: 'Not the owner' });
    if (dog.status === 'adopted') return res.status(409).json({ message: 'Cannot remove an adopted dog' });

    await dog.remove();
    return res.json({ message: 'Dog removed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.listRegisteredDogs = async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;
  const p = Math.max(1, parseInt(page, 10) || 1);
  const l = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));

  const filter = { owner: req.user.id };
  if (status) {
    if (!['available', 'adopted'].includes(status)) return res.status(400).json({ message: 'Invalid status filter' });
    filter.status = status;
  }

  try {
    const total = await Dog.countDocuments(filter);
    const dogs = await Dog.find(filter)
      .sort({ createdAt: -1 })
      .skip((p - 1) * l)
      .limit(l)
      .exec();

    return res.json({ dogs, meta: { page: p, limit: l, total } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.listAdoptedDogs = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const p = Math.max(1, parseInt(page, 10) || 1);
  const l = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));

  try {
    const filter = { adoptedBy: req.user.id };
    const total = await Dog.countDocuments(filter);
    const dogs = await Dog.find(filter)
      .sort({ adoptedAt: -1 })
      .skip((p - 1) * l)
      .limit(l)
      .exec();

    return res.json({ dogs, meta: { page: p, limit: l, total } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
