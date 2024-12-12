const Tasks = require("../models/tasks");

const getCategories = async (req, res) => {
    try {
        const data = await Tasks.find();

        if (data.length > 0) {
            const categories = data.map((task) => task.category);
            const uniqueCategories = [...new Set(categories)];
            return res.status(200).json(uniqueCategories);
        }

        return res.status(200).json([]);
    } catch (error) {
        return res.status(501).json({ ok: false, msg: "Ocurrió un error al generar el listado de tasks." });
    }
};

module.exports = { getCategories };
