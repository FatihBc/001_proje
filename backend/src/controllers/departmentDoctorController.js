const DepartmentDoctor = require("../models/DepartmentDoctor");

exports.getAll = async (req, res) => {
  try {
    const records = await DepartmentDoctor.query();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const record = await DepartmentDoctor.query().insert(req.body);
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const deletedCount = await DepartmentDoctor.query().deleteById(
      req.params.id
    );

    if (deletedCount) {
      res.json({
        success: true,
        message: `DepartmentDoctor kaydı silindi (id: ${req.params.id})`,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `DepartmentDoctor kaydı bulunamadı (id: ${req.params.id})`,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
