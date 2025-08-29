import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertScriptSchema, insertShopItemSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Scripts routes
  app.get("/api/scripts", async (req, res) => {
    try {
      const { search, category } = req.query;
      
      let scripts;
      if (search) {
        scripts = await storage.searchScripts(search as string);
      } else if (category) {
        scripts = await storage.getScriptsByCategory(category as string);
      } else {
        scripts = await storage.getScripts();
      }
      
      res.json(scripts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch scripts" });
    }
  });

  app.get("/api/scripts/:id", async (req, res) => {
    try {
      const script = await storage.getScript(req.params.id);
      if (!script) {
        return res.status(404).json({ message: "Script not found" });
      }
      res.json(script);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch script" });
    }
  });

  app.post("/api/scripts", async (req, res) => {
    try {
      const scriptData = insertScriptSchema.parse(req.body);
      const script = await storage.createScript(scriptData);
      res.status(201).json(script);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid script data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create script" });
    }
  });

  app.patch("/api/scripts/:id", async (req, res) => {
    try {
      const updates = insertScriptSchema.partial().parse(req.body);
      const script = await storage.updateScript(req.params.id, updates);
      if (!script) {
        return res.status(404).json({ message: "Script not found" });
      }
      res.json(script);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid script data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update script" });
    }
  });

  app.delete("/api/scripts/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteScript(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Script not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete script" });
    }
  });

  // Shop Items routes
  app.get("/api/shop-items", async (req, res) => {
    try {
      const { search, category } = req.query;
      
      let items;
      if (search) {
        items = await storage.searchShopItems(search as string);
      } else if (category) {
        items = await storage.getShopItemsByCategory(category as string);
      } else {
        items = await storage.getShopItems();
      }
      
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch shop items" });
    }
  });

  app.get("/api/shop-items/:id", async (req, res) => {
    try {
      const item = await storage.getShopItem(req.params.id);
      if (!item) {
        return res.status(404).json({ message: "Shop item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch shop item" });
    }
  });

  app.post("/api/shop-items", async (req, res) => {
    try {
      const itemData = insertShopItemSchema.parse(req.body);
      const item = await storage.createShopItem(itemData);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create shop item" });
    }
  });

  app.delete("/api/shop-items/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteShopItem(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Shop item not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete shop item" });
    }
  });

  // Stats endpoint
  app.get("/api/stats", async (req, res) => {
    try {
      const scripts = await storage.getScripts();
      const shopItems = await storage.getShopItems();
      
      res.json({
        scriptCount: scripts.length,
        itemCount: shopItems.length,
        userCount: "12.5k" // Mock value as per design
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
