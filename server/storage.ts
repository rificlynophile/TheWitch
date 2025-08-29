import { type User, type InsertUser, type Script, type InsertScript, type ShopItem, type InsertShopItem } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Scripts
  getScripts(): Promise<Script[]>;
  getScript(id: string): Promise<Script | undefined>;
  createScript(script: InsertScript): Promise<Script>;
  updateScript(id: string, script: Partial<InsertScript>): Promise<Script | undefined>;
  deleteScript(id: string): Promise<boolean>;
  searchScripts(query: string): Promise<Script[]>;
  getScriptsByCategory(category: string): Promise<Script[]>;
  
  // Shop Items
  getShopItems(): Promise<ShopItem[]>;
  getShopItem(id: string): Promise<ShopItem | undefined>;
  createShopItem(item: InsertShopItem): Promise<ShopItem>;
  updateShopItem(id: string, item: Partial<InsertShopItem>): Promise<ShopItem | undefined>;
  deleteShopItem(id: string): Promise<boolean>;
  searchShopItems(query: string): Promise<ShopItem[]>;
  getShopItemsByCategory(category: string): Promise<ShopItem[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private scripts: Map<string, Script>;
  private shopItems: Map<string, ShopItem>;

  constructor() {
    this.users = new Map();
    this.scripts = new Map();
    this.shopItems = new Map();
    
    // Initialize with sample data
    this.initializeData();
  }

  private async initializeData() {
    // Sample scripts
    const sampleScripts = [
      {
        name: "Auto Farming Pro",
        description: "Advanced farming automation script with crop rotation and resource optimization.",
        imageUrl: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        downloadLink: "#",
        category: "Automation",
        downloads: 2400,
        rating: "4.8"
      },
      {
        name: "Smart Mining Bot",
        description: "Intelligent mining bot with ore detection and safety protocols.",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        downloadLink: "#",
        category: "Mining",
        downloads: 1800,
        rating: "4.6"
      },
      {
        name: "Combat Assistant",
        description: "Advanced combat automation with strategy patterns and timing optimization.",
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        downloadLink: "#",
        category: "Combat",
        downloads: 3100,
        rating: "4.9"
      },
      {
        name: "Market Trader",
        description: "Automated trading system with market analysis and profit optimization.",
        imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        downloadLink: "#",
        category: "Trading",
        downloads: 1200,
        rating: "4.7"
      },
      {
        name: "Resource Manager",
        description: "Smart inventory management with auto-sorting and optimization features.",
        imageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        downloadLink: "#",
        category: "Utilities",
        downloads: 950,
        rating: "4.5"
      },
      {
        name: "Quest Automation",
        description: "Automated quest completion with pathfinding and objective tracking.",
        imageUrl: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        downloadLink: "#",
        category: "Automation",
        downloads: 1500,
        rating: "4.4"
      }
    ];

    for (const script of sampleScripts) {
      await this.createScript(script);
    }

    // Sample shop items
    const sampleItems = [
      {
        name: "Diamond Sword",
        description: "Legendary weapon with maximum damage and durability",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        price: "12.99",
        category: "Weapons",
        rating: "4.9"
      },
      {
        name: "Enchanted Pickaxe",
        description: "Auto-mining pickaxe with fortune enchantment",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        price: "8.99",
        category: "Tools",
        rating: "4.7"
      },
      {
        name: "Resource Bundle",
        description: "1000 gold coins + 50 gems starter pack",
        imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        price: "4.99",
        category: "Resources",
        rating: "4.8"
      },
      {
        name: "Dragon Shield",
        description: "Ultimate protection with fire resistance",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        price: "15.99",
        category: "Weapons",
        rating: "4.9"
      },
      {
        name: "Mega Potion Set",
        description: "Health, mana, and buff potions collection",
        imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        price: "6.99",
        category: "Resources",
        rating: "4.6"
      },
      {
        name: "Elite Armor Set",
        description: "Complete armor set with stat bonuses",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        price: "24.99",
        category: "Weapons",
        rating: "4.8"
      }
    ];

    for (const item of sampleItems) {
      await this.createShopItem(item);
    }
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Script methods
  async getScripts(): Promise<Script[]> {
    return Array.from(this.scripts.values());
  }

  async getScript(id: string): Promise<Script | undefined> {
    return this.scripts.get(id);
  }

  async createScript(script: InsertScript): Promise<Script> {
    const id = randomUUID();
    const newScript: Script = { 
      ...script, 
      id,
      downloads: 0,
      rating: "0.0"
    };
    this.scripts.set(id, newScript);
    return newScript;
  }

  async updateScript(id: string, script: Partial<InsertScript>): Promise<Script | undefined> {
    const existing = this.scripts.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...script };
    this.scripts.set(id, updated);
    return updated;
  }

  async deleteScript(id: string): Promise<boolean> {
    return this.scripts.delete(id);
  }

  async searchScripts(query: string): Promise<Script[]> {
    const scripts = Array.from(this.scripts.values());
    const lowercaseQuery = query.toLowerCase();
    return scripts.filter(script => 
      script.name.toLowerCase().includes(lowercaseQuery) ||
      script.description.toLowerCase().includes(lowercaseQuery) ||
      script.category.toLowerCase().includes(lowercaseQuery)
    );
  }

  async getScriptsByCategory(category: string): Promise<Script[]> {
    const scripts = Array.from(this.scripts.values());
    return scripts.filter(script => script.category === category);
  }

  // Shop Item methods
  async getShopItems(): Promise<ShopItem[]> {
    return Array.from(this.shopItems.values());
  }

  async getShopItem(id: string): Promise<ShopItem | undefined> {
    return this.shopItems.get(id);
  }

  async createShopItem(item: InsertShopItem): Promise<ShopItem> {
    const id = randomUUID();
    const newItem: ShopItem = { 
      ...item, 
      id,
      rating: "0.0"
    };
    this.shopItems.set(id, newItem);
    return newItem;
  }

  async updateShopItem(id: string, item: Partial<InsertShopItem>): Promise<ShopItem | undefined> {
    const existing = this.shopItems.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...item };
    this.shopItems.set(id, updated);
    return updated;
  }

  async deleteShopItem(id: string): Promise<boolean> {
    return this.shopItems.delete(id);
  }

  async searchShopItems(query: string): Promise<ShopItem[]> {
    const items = Array.from(this.shopItems.values());
    const lowercaseQuery = query.toLowerCase();
    return items.filter(item => 
      item.name.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery) ||
      item.category.toLowerCase().includes(lowercaseQuery)
    );
  }

  async getShopItemsByCategory(category: string): Promise<ShopItem[]> {
    const items = Array.from(this.shopItems.values());
    return items.filter(item => item.category === category);
  }
}

export const storage = new MemStorage();
