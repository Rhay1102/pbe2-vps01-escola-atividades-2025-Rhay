const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  async create(req, res) {
    const { nome, telefones } = req.body;
    try {
      const aluno = await prisma.aluno.create({
        data: {
          nome,
          telefones: {
            create: telefones, 
          },
        },
        include: { telefones: true },
      });
      res.status(201).json(aluno);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async read(req, res) {
    try {
      const alunos = await prisma.aluno.findMany({
        include: { telefones: true },
      });
      res.json(alunos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async readOne(req, res) {
    const { id } = req.params;
    try {
      const aluno = await prisma.aluno.findUnique({
        where: { id: parseInt(id) },
        include: { telefones: true, atividades: true },
      });
      if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });
      res.json(aluno);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { nome, telefones } = req.body;
    try {
      const aluno = await prisma.alunos.update({
        where: { id: parseInt(id) },
        data: {
          nome,
          telefones: {
            deleteMany: {}, 
            create: telefones, 
          },
        },
        include: { telefones: true },
      });
      res.json(alunos);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      await prisma.alunos.delete({ where: { id: parseInt(id) } });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};