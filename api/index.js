import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";

// this is a middleware that will validate the access token sent by the client
const requireAuth = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER,
  tokenSigningAlg: "RS256",
});

const PORT = parseInt(process.env.PORT) || 8080

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

// Retrieve all journals
app.get('/journal/alljournals', requireAuth, async (req, res) => {
  try {
    const journals = await prisma.journal.findMany({
      where: {
        auth0Id: req.auth.payload.sub
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });
    res.json(journals);
  } catch (error) {
    console.error('Error retrieving journals:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/journal/totalCount', async (req, res) => {
  try {
    const count = await prisma.journal.count()
    res.json(count);
  } catch (error) {
    console.error('Error retrieving total number of records:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/journal/personalCount', requireAuth, async (req, res) => {
  try {
    const count = await prisma.stats.findUnique({
      where: {
        auth0Id: req.auth.payload.sub
      }
    });
    res.json(count === null ? 0 : count);
  } catch (error) {
    console.error('Error retrieving total number of records:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  
// Create a new journal
app.post('/journal/newjournal', requireAuth, async (req, res) => {
  try {
    const { contents, email } = req.body;

    const newJournal = await prisma.journal.create({
      data: {
        contents: contents,
        auth0Id: req.auth.payload.sub
      },
    });

    const oldCount = await prisma.stats.findUnique({
      where: {
        auth0Id: req.auth.payload.sub
      }
    });
    if (oldCount == null) {
      const count = await prisma.stats.create({
        data: {
          auth0Id: req.auth.payload.sub,
          count: 1
        },
      });
    } else {
      await prisma.stats.update({
        where: {
          auth0Id: req.auth.payload.sub
        },
        data: {
          count: oldCount.count + 1
        }
      });
    }

    res.json(newJournal);
  } catch (error) {
    console.error('Error creating a new journal:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an existing journal 
app.put('/journal/updatejournal', requireAuth, async (req, res) => {
  const { contents, id } = req.body;

  let journalCount = await prisma.journal.count({
    where: { id: id },
  })

  if (journalCount == 0) {
    res.status(404).send(`Journal id ${id} not found`);
  } else {
    const updatedJournal = await prisma.journal.update({
      where: { id: id },
      data: {
          contents: contents
      },
    });

    res.json(updatedJournal);
  }
});

// Delete an existing journal 
app.delete("/journal/:id", requireAuth, async (req, res) => {
  const id = parseInt(req.params.id);

  let journalCount = await prisma.journal.count(
    {
      where: {
        id: id
      },
    }
  )
  if (journalCount == 0) {
    res.status(404).send(`Journal id ${id} not found`);
  } else {
    const deleteJournal = await prisma.journal.delete({
      where: {
        id: id,
      },
    });
    const oldCount = await prisma.stats.findUnique({
      where: {
        auth0Id: req.auth.payload.sub
      }
    });
    await prisma.stats.update({
      where: {
        auth0Id: req.auth.payload.sub
      },
      data: {
        count: oldCount.count - 1
      }
    });
    res.json(deleteJournal);
  }
});

app.get('/user/name/', requireAuth, async (req, res) => {
  const authId = req.auth.payload.sub;

  try {
    const entry = await prisma.name.findUnique({
      where: {
        auth0Id: authId,
      },
    });
    if (entry == null) {
      res.status(400).json({ error: 'Name not found' });
      return
    }
    res.json(entry.displayName);
  } catch (error) {
    console.error('Error retrieving display name:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/user/name/', requireAuth, async (req, res) => {
  const authId = req.auth.payload.sub;
  const { name } = req.body;

  try {
    const entry = await prisma.name.update({
      where: {
        auth0Id: authId,
      },
      data: {
        displayName: name
      },
    });
    res.json(entry);
  } catch (error) {
    console.error('Error updating display name:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/user/name', requireAuth, async (req, res) => {
  try {
    const authId = req.auth.payload.sub;
    const { name } = req.body;

    const newJournal = await prisma.name.create({
      data: {
        auth0Id: authId,
        displayName: name
      },
    });

    res.json(newJournal);
  } catch (error) {
    console.error('Error creating a new name:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// this is a public endpoint because it doesn't have the requireAuth middleware
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});
