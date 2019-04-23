const Box = require("../models/Box");

class BoxController {
  async store(req, res) {
    const { title } = req.body;

    const box = await Box.create({ title });

    return res.json(box);
  }

  async show(req, res) {
    const box = await Box.findOne({ _id: req.params.id }).populate({
      path: "files",
      select: "title path createdAt updatedAt",
      options: { sort: { createdAt: -1 } }
    });

    return res.json(box);
  }
}

module.exports = new BoxController();
