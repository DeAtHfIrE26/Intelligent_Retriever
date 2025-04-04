import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDocumentSchema, insertActivityLogSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";
import OpenAI from "openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Error handling middleware for zod validation errors
  const handleZodError = (err: ZodError, res: Response) => {
    return res.status(400).json({
      message: "Validation error",
      errors: err.errors.map(e => ({
        path: e.path.join("."),
        message: e.message
      }))
    });
  };

  // Document routes
  app.get("/api/documents", async (req: Request, res: Response) => {
    try {
      const categoryId = req.query.category as string;
      let documents;
      
      if (categoryId) {
        documents = await storage.getDocumentsByCategory(categoryId);
      } else {
        documents = await storage.getDocuments();
      }
      
      res.json(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
      res.status(500).json({ message: "Failed to fetch documents" });
    }
  });

  app.get("/api/documents/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const document = await storage.getDocument(id);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      
      // Log document access
      await storage.createActivityLog({
        type: "document_accessed",
        userId: 1, // Default user for now
        documentId: id,
        details: { 
          user: "Current User", 
          document: document.title 
        }
      });
      
      res.json(document);
    } catch (error) {
      console.error("Error fetching document:", error);
      res.status(500).json({ message: "Failed to fetch document" });
    }
  });

  app.post("/api/documents", async (req: Request, res: Response) => {
    try {
      const parsedData = insertDocumentSchema.parse(req.body);
      const document = await storage.createDocument(parsedData);
      
      // Log document creation
      await storage.createActivityLog({
        type: "document_added",
        userId: document.userId,
        documentId: document.id,
        details: { 
          user: "Current User", 
          document: document.title 
        }
      });
      
      res.status(201).json(document);
    } catch (error) {
      if (error instanceof ZodError) {
        return handleZodError(error, res);
      }
      console.error("Error creating document:", error);
      res.status(500).json({ message: "Failed to create document" });
    }
  });

  app.put("/api/documents/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const parsedData = insertDocumentSchema.partial().parse(req.body);
      
      const updatedDocument = await storage.updateDocument(id, parsedData);
      
      if (!updatedDocument) {
        return res.status(404).json({ message: "Document not found" });
      }
      
      // Log document update
      await storage.createActivityLog({
        type: "document_updated",
        userId: updatedDocument.userId,
        documentId: updatedDocument.id,
        details: { 
          user: "Current User", 
          document: updatedDocument.title 
        }
      });
      
      res.json(updatedDocument);
    } catch (error) {
      if (error instanceof ZodError) {
        return handleZodError(error, res);
      }
      console.error("Error updating document:", error);
      res.status(500).json({ message: "Failed to update document" });
    }
  });

  app.delete("/api/documents/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const document = await storage.getDocument(id);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      
      const success = await storage.deleteDocument(id);
      
      if (success) {
        // Log document deletion
        await storage.createActivityLog({
          type: "document_deleted",
          userId: 1, // Default user for now
          details: { 
            user: "Current User", 
            document: document.title 
          }
        });
        
        res.json({ success: true });
      } else {
        res.status(500).json({ message: "Failed to delete document" });
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      res.status(500).json({ message: "Failed to delete document" });
    }
  });

  // Search route
  app.get("/api/search", async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;
      
      if (!query || query.trim() === "") {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const searchResults = await storage.searchDocuments(query);
      
      // Log search activity
      await storage.createActivityLog({
        type: "search",
        userId: 1, // Default user for now
        details: { 
          user: "Current User", 
          query: query 
        }
      });
      
      res.json(searchResults);
    } catch (error) {
      console.error("Error searching documents:", error);
      res.status(500).json({ message: "Failed to search documents" });
    }
  });

  // Category routes
  app.get("/api/categories", async (req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Activity log routes
  app.get("/api/activity", async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const logs = await storage.getActivityLogs(limit);
      res.json(logs);
    } catch (error) {
      console.error("Error fetching activity logs:", error);
      res.status(500).json({ message: "Failed to fetch activity logs" });
    }
  });

  // Analytics routes
  app.get("/api/analytics", async (req: Request, res: Response) => {
    try {
      const analytics = await storage.getAnalytics();
      
      if (!analytics) {
        return res.status(404).json({ message: "Analytics not found" });
      }
      
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // OpenAI API routes
  // Initialize OpenAI client on server-side
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || ''
  });

  // Middleware to validate API key 
  const validateOpenAIKey = (req: Request, res: Response, next: NextFunction) => {
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === '') {
      return res.status(500).json({ 
        message: "OpenAI API key is not configured. Please add your API key to continue."
      });
    }

    // Try to refresh the OpenAI client with the latest key
    try {
      openai.apiKey = process.env.OPENAI_API_KEY;
      console.log("Using OpenAI API key:", process.env.OPENAI_API_KEY.substring(0, 6) + "..." + process.env.OPENAI_API_KEY.substring(process.env.OPENAI_API_KEY.length - 4));
    } catch (error) {
      console.error("Error refreshing OpenAI API key:", error);
    }
    
    next();
  };

  // Document analysis endpoint
  app.post("/api/ai/analyze-document", validateOpenAIKey, async (req: Request, res: Response) => {
    try {
      const { text } = req.body;
      
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ message: "Document text is required" });
      }

      // Truncate long documents to fit token limits
      const truncatedText = text.length > 8000 
        ? text.substring(0, 8000) + "..." 
        : text;
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
        messages: [
          {
            role: "system",
            content: "You are a document analysis expert. Analyze the document and extract key information."
          },
          {
            role: "user",
            content: `Analyze this document and return a JSON object with the following properties:
            - topics: an array of main topics (5 max)
            - entities: an array of key entities mentioned (5 max)
            - summary: a concise summary (max 100 words)
            - sentiment: overall sentiment (positive, negative, or neutral)
            - readabilityScore: estimated readability score from 0-100

            Document text:
            ${truncatedText}`
          }
        ],
        response_format: { type: "json_object" }
      });

      const content = response.choices[0].message.content || "{}";
      res.json(JSON.parse(content));
    } catch (error) {
      console.error("Error analyzing document:", error);
      res.status(500).json({ message: "Failed to analyze document" });
    }
  });

  // Generate tags endpoint
  app.post("/api/ai/generate-tags", validateOpenAIKey, async (req: Request, res: Response) => {
    try {
      const { text } = req.body;
      
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ message: "Document text is required" });
      }

      // Truncate long documents to fit token limits
      const truncatedText = text.length > 8000 
        ? text.substring(0, 8000) + "..." 
        : text;
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
        messages: [
          {
            role: "system",
            content: "You are a document tagging expert. Generate relevant tags for the document."
          },
          {
            role: "user",
            content: `Generate 3-5 relevant tags for the following document. Return ONLY a JSON object with a 'tags' property containing an array of tag strings.
            
            Document text:
            ${truncatedText}`
          }
        ],
        response_format: { type: "json_object" }
      });

      const content = response.choices[0].message.content || "{}";
      const result = JSON.parse(content);
      res.json({ tags: Array.isArray(result.tags) ? result.tags : [] });
    } catch (error) {
      console.error("Error generating tags:", error);
      res.status(500).json({ message: "Failed to generate tags" });
    }
  });

  // Categorize document endpoint
  app.post("/api/ai/categorize", validateOpenAIKey, async (req: Request, res: Response) => {
    try {
      const { text, title } = req.body;
      
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ message: "Document text is required" });
      }

      // Truncate long documents to fit token limits
      const truncatedText = text.length > 4000 
        ? text.substring(0, 4000) + "..." 
        : text;
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
        messages: [
          {
            role: "system",
            content: "You are a document categorization expert. Categorize the document into one of these categories: technical, finance, product, research, legal, marketing."
          },
          {
            role: "user",
            content: `Categorize the following document into one of these categories: technical, finance, product, research, legal, marketing.
            Return ONLY a JSON object with a 'category' property containing the category string.
            
            Document title: ${title || "Untitled Document"}
            
            Document text:
            ${truncatedText}`
          }
        ],
        response_format: { type: "json_object" }
      });

      const content = response.choices[0].message.content || "{}";
      const result = JSON.parse(content);
      res.json({ category: result.category || "technical" });
    } catch (error) {
      console.error("Error categorizing document:", error);
      res.status(500).json({ message: "Failed to categorize document" });
    }
  });

  // Enhanced semantic search endpoint
  app.post("/api/ai/semantic-search", validateOpenAIKey, async (req: Request, res: Response) => {
    try {
      const { query, documents } = req.body;
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ message: "Search query is required" });
      }

      if (!documents || !Array.isArray(documents) || documents.length === 0) {
        return res.json({ results: [], took: 0 });
      }

      const startTime = Date.now();
      
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
        messages: [
          {
            role: "system",
            content: "You are a semantic search expert. Find the most relevant documents based on the query."
          },
          {
            role: "user",
            content: `Given the following query and documents, return the IDs of the 5 most relevant documents.
            
            Query: "${query}"
            
            Documents:
            ${documents.map(doc => `ID ${doc.id}: ${doc.title} - ${doc.preview}`).join('\n')}
            
            Return ONLY a JSON object with these properties:
            - relevantIds: array of relevant document IDs sorted by relevance
            - reasoning: brief explanation of your ranking logic`
          }
        ],
        response_format: { type: "json_object" }
      });

      const content = response.choices[0].message.content || "{}";
      const result = JSON.parse(content);
      
      // Calculate relevance scores and sort the documents
      const relevantDocuments = documents
        .filter(doc => result.relevantIds && result.relevantIds.includes(doc.id))
        .map(doc => ({
          ...doc,
          relevance: 0.85 + (0.14 * (1 - result.relevantIds.indexOf(doc.id) / result.relevantIds.length))
        }))
        .sort((a, b) => b.relevance - a.relevance);

      const endTime = Date.now();
      
      res.json({
        results: relevantDocuments,
        took: endTime - startTime,
        reasoning: result.reasoning
      });
    } catch (error) {
      console.error("Error in enhanced semantic search:", error);
      res.status(500).json({ message: "Failed to perform semantic search" });
    }
  });

  // Get VITE_OPENAI_API_STATUS for client
  app.get("/api/ai/status", (req: Request, res: Response) => {
    const status = process.env.OPENAI_API_KEY ? "available" : "unavailable";
    res.json({ status });
  });

  const httpServer = createServer(app);
  return httpServer;
}
