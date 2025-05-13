const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  async create(req, res) {
    const { descricao, peso, alunoId } = req.body;
    try {
      const atividade = await prisma.atividade.create({
        data: {
          descricao,
          peso,
          alunoId,
        },
      });
      res.status(201).json(atividade);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { dataEntrega, nota } = req.body;
    try {
      const atividade = await prisma.atividade.update({
        where: { id: parseInt(id) },
        data: {
          dataEntrega: dataEntrega || undefined,
          nota: nota || undefined,
          parcial: nota ? (nota * (atividade.peso || 1)) / 10 : undefined,
        },
      });
      res.json(atividade);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      await prisma.atividade.delete({ where: { id: parseInt(id) } });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};