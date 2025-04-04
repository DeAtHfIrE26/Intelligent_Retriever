import { 
  users, type User, type InsertUser,
  documents, type Document, type InsertDocument,
  categories, type Category, type InsertCategory,
  activityLogs, type ActivityLog, type InsertActivityLog,
  analytics, type Analytics, type InsertAnalytics,
  type DocumentWithRelevance, type SearchResult,
  type FormattedActivityLog
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Document operations
  getDocument(id: number): Promise<Document | undefined>;
  getDocuments(): Promise<Document[]>;
  getDocumentsByCategory(categoryId: string): Promise<Document[]>;
  createDocument(document: InsertDocument): Promise<Document>;
  updateDocument(id: number, document: Partial<InsertDocument>): Promise<Document | undefined>;
  deleteDocument(id: number): Promise<boolean>;
  searchDocuments(query: string): Promise<SearchResult>;
  
  // Category operations
  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategoryCount(id: string, increment: boolean): Promise<Category | undefined>;
  
  // Activity Log operations
  getActivityLogs(limit?: number): Promise<FormattedActivityLog[]>;
  createActivityLog(log: InsertActivityLog): Promise<ActivityLog>;
  
  // Analytics operations
  getAnalytics(): Promise<Analytics | undefined>;
  updateAnalytics(data: Partial<InsertAnalytics>): Promise<Analytics | undefined>;
  incrementSearchCount(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private documents: Map<number, Document>;
  private categories: Map<string, Category>;
  private activityLogs: Map<number, ActivityLog>;
  private analyticsData: Analytics | undefined;
  
  private userIdCounter: number;
  private documentIdCounter: number;
  private activityLogIdCounter: number;
  
  constructor() {
    this.users = new Map();
    this.documents = new Map();
    this.categories = new Map();
    this.activityLogs = new Map();
    
    this.userIdCounter = 1;
    this.documentIdCounter = 1;
    this.activityLogIdCounter = 1;
    
    // Initialize with default categories
    this.categories.set('all', { id: 'all', name: 'All Documents', count: 0 });
    this.categories.set('technical', { id: 'technical', name: 'Technical', count: 0 });
    this.categories.set('finance', { id: 'finance', name: 'Finance', count: 0 });
    this.categories.set('product', { id: 'product', name: 'Product', count: 0 });
    this.categories.set('research', { id: 'research', name: 'Research', count: 0 });
    
    // Initialize analytics
    this.analyticsData = {
      id: 1,
      documentsIndexed: 0,
      searchesPerformed: 0,
      averageQueryTime: '0.32s',
      topSearchTerms: [
        { term: 'AI implementation', count: 87 },
        { term: 'vector database', count: 64 },
        { term: 'quarterly report', count: 51 },
        { term: 'product roadmap', count: 42 },
        { term: 'user research', count: 38 }
      ],
      usageOverTime: [12, 18, 22, 27, 33, 45, 48, 52, 60, 67, 72, 85],
      updatedAt: new Date()
    };
    
    // Add default admin user
    this.createUser({
      username: "admin",
      password: "admin123", // In a real app, this would be hashed
      displayName: "John Doe",
      role: "admin",
      avatarUrl: ""
    });
    
    // Add some sample documents for development
    const sampleDocs = [
      {
        title: 'Advanced AI Implementation Guide',
        content: 'This comprehensive guide outlines implementation strategies for cutting-edge AI systems in enterprise environments.',
        preview: 'This comprehensive guide outlines implementation strategies for cutting-edge AI systems in enterprise environments.',
        categoryId: 'technical',
        tags: ['AI', 'Technical', 'Implementation'],
        userId: 1
      },
      {
        title: 'Vector Database Architecture',
        content: 'An in-depth analysis of modern vector database architectures for semantic search applications.',
        preview: 'An in-depth analysis of modern vector database architectures for semantic search applications.',
        categoryId: 'technical',
        tags: ['Database', 'Architecture', 'Vector Search'],
        userId: 1
      },
      {
        title: 'Quarterly Financial Report Q3',
        content: 'Financial performance analysis for Q3 including revenue projections and expense reports.',
        preview: 'Financial performance analysis for Q3 including revenue projections and expense reports.',
        categoryId: 'finance',
        tags: ['Finance', 'Report', 'Quarterly'],
        userId: 1
      },
      {
        title: 'Product Roadmap 2024',
        content: 'Strategic product development timeline and feature planning for the upcoming fiscal year.',
        preview: 'Strategic product development timeline and feature planning for the upcoming fiscal year.',
        categoryId: 'product',
        tags: ['Product', 'Strategy', 'Roadmap'],
        userId: 1
      },
      {
        title: 'User Research Findings',
        content: 'Compilation of user interviews and usability testing results from the latest research sprint.',
        preview: 'Compilation of user interviews and usability testing results from the latest research sprint.',
        categoryId: 'research',
        tags: ['Research', 'User Experience', 'Data'],
        userId: 1
      }
    ];
    
    sampleDocs.forEach(doc => this.createDocument(doc));
    
    // Add some activity logs
    const activities = [
      {
        type: 'document_added',
        userId: 1,
        documentId: 1,
        details: { user: 'Alex Chen', document: 'Advanced AI Implementation Guide' }
      },
      {
        type: 'search',
        userId: 1,
        details: { user: 'Sophie Williams', query: 'vector database performance' }
      },
      {
        type: 'document_updated',
        userId: 1,
        documentId: 4,
        details: { user: 'David Kim', document: 'Product Roadmap 2024' }
      },
      {
        type: 'document_accessed',
        userId: 1,
        documentId: 3,
        details: { user: 'Lisa Patel', document: 'Quarterly Financial Report Q3' }
      },
      {
        type: 'system',
        details: { message: 'Automatic index optimization completed' }
      }
    ];
    
    activities.forEach(activity => this.createActivityLog(activity as InsertActivityLog));
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Document operations
  async getDocument(id: number): Promise<Document | undefined> {
    return this.documents.get(id);
  }
  
  async getDocuments(): Promise<Document[]> {
    return Array.from(this.documents.values());
  }
  
  async getDocumentsByCategory(categoryId: string): Promise<Document[]> {
    if (categoryId === 'all') {
      return this.getDocuments();
    }
    
    return Array.from(this.documents.values()).filter(
      (doc) => doc.categoryId === categoryId
    );
  }
  
  async createDocument(document: InsertDocument): Promise<Document> {
    const id = this.documentIdCounter++;
    const now = new Date();
    const newDocument: Document = {
      ...document,
      id,
      createdAt: now,
      updatedAt: now,
      embedding: null
    };
    
    this.documents.set(id, newDocument);
    
    // Update category count
    await this.updateCategoryCount(document.categoryId, true);
    
    // Update analytics
    if (this.analyticsData) {
      this.analyticsData.documentsIndexed += 1;
    }
    
    return newDocument;
  }
  
  async updateDocument(id: number, documentUpdate: Partial<InsertDocument>): Promise<Document | undefined> {
    const existingDocument = this.documents.get(id);
    
    if (!existingDocument) {
      return undefined;
    }
    
    // If category is changing, update category counts
    if (documentUpdate.categoryId && documentUpdate.categoryId !== existingDocument.categoryId) {
      await this.updateCategoryCount(existingDocument.categoryId, false);
      await this.updateCategoryCount(documentUpdate.categoryId, true);
    }
    
    const updatedDocument: Document = {
      ...existingDocument,
      ...documentUpdate,
      updatedAt: new Date()
    };
    
    this.documents.set(id, updatedDocument);
    return updatedDocument;
  }
  
  async deleteDocument(id: number): Promise<boolean> {
    const document = this.documents.get(id);
    
    if (!document) {
      return false;
    }
    
    // Update category count
    await this.updateCategoryCount(document.categoryId, false);
    
    // Delete document
    return this.documents.delete(id);
  }
  
  async searchDocuments(query: string): Promise<SearchResult> {
    const startTime = Date.now();
    
    // Simple search implementation
    let results = Array.from(this.documents.values()).filter(doc => 
      doc.title.toLowerCase().includes(query.toLowerCase()) || 
      doc.content.toLowerCase().includes(query.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    
    // Calculate relevance scores - in a real app this would use vector embeddings
    const resultsWithRelevance = results.map(doc => {
      const titleMatches = doc.title.toLowerCase().includes(query.toLowerCase()) ? 1 : 0;
      const contentMatches = doc.content.toLowerCase().includes(query.toLowerCase()) ? 0.7 : 0;
      const tagMatches = doc.tags.filter(tag => tag.toLowerCase().includes(query.toLowerCase())).length * 0.5;
      
      const relevance = Math.min(0.99, Math.max(0.8, (titleMatches + contentMatches + tagMatches) / 2));
      
      return {
        ...doc,
        relevance
      };
    }).sort((a, b) => b.relevance - a.relevance);
    
    // Calculate search time
    const endTime = Date.now();
    const took = endTime - startTime;
    
    // Update analytics
    this.incrementSearchCount();
    
    if (this.analyticsData && this.analyticsData.topSearchTerms) {
      const topSearchTerms = [...this.analyticsData.topSearchTerms] as Array<{term: string, count: number}>;
      const existingTerm = topSearchTerms.find(t => t.term.toLowerCase() === query.toLowerCase());
      
      if (existingTerm) {
        existingTerm.count += 1;
      } else {
        topSearchTerms.push({ term: query, count: 1 });
      }
      
      // Sort and limit to top 5
      topSearchTerms.sort((a, b) => b.count - a.count);
      this.analyticsData.topSearchTerms = topSearchTerms.slice(0, 5);
    }
    
    return {
      results: resultsWithRelevance,
      took
    };
  }
  
  // Category operations
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async createCategory(category: InsertCategory): Promise<Category> {
    this.categories.set(category.id, category);
    return category;
  }
  
  async updateCategoryCount(id: string, increment: boolean): Promise<Category | undefined> {
    const category = this.categories.get(id);
    
    if (!category) {
      return undefined;
    }
    
    const updatedCategory = {
      ...category,
      count: increment ? category.count + 1 : Math.max(0, category.count - 1)
    };
    
    this.categories.set(id, updatedCategory);
    
    // Also update the 'all' category
    if (id !== 'all') {
      const allCategory = this.categories.get('all');
      if (allCategory) {
        this.categories.set('all', {
          ...allCategory,
          count: increment ? allCategory.count + 1 : Math.max(0, allCategory.count - 1)
        });
      }
    }
    
    return updatedCategory;
  }
  
  // Activity Log operations
  async getActivityLogs(limit = 5): Promise<FormattedActivityLog[]> {
    const logs = Array.from(this.activityLogs.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
    
    return logs.map(log => {
      const timeAgo = this.getTimeAgo(log.createdAt);
      const details = log.details as any;
      
      const formattedLog: FormattedActivityLog = {
        id: log.id,
        type: log.type,
        time: timeAgo
      };
      
      if (details) {
        if (details.user) formattedLog.user = details.user;
        if (details.document) formattedLog.document = details.document;
        if (details.query) formattedLog.query = details.query;
        if (details.message) formattedLog.message = details.message;
      }
      
      return formattedLog;
    });
  }
  
  async createActivityLog(log: InsertActivityLog): Promise<ActivityLog> {
    const id = this.activityLogIdCounter++;
    const now = new Date();
    const newLog: ActivityLog = { ...log, id, createdAt: now };
    
    this.activityLogs.set(id, newLog);
    return newLog;
  }
  
  // Analytics operations
  async getAnalytics(): Promise<Analytics | undefined> {
    return this.analyticsData;
  }
  
  async updateAnalytics(data: Partial<InsertAnalytics>): Promise<Analytics | undefined> {
    if (!this.analyticsData) return undefined;
    
    this.analyticsData = {
      ...this.analyticsData,
      ...data,
      updatedAt: new Date()
    };
    
    return this.analyticsData;
  }
  
  async incrementSearchCount(): Promise<void> {
    if (this.analyticsData) {
      this.analyticsData.searchesPerformed += 1;
      
      // Update usage over time (last month value)
      if (this.analyticsData.usageOverTime && this.analyticsData.usageOverTime.length > 0) {
        const usage = [...this.analyticsData.usageOverTime];
        usage[usage.length - 1] += 1;
        this.analyticsData.usageOverTime = usage;
      }
    }
  }
  
  // Helper methods
  private getTimeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval + ' years ago';
    }
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + ' months ago';
    }
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + ' days ago';
    }
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + ' hours ago';
    }
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + ' minutes ago';
    }
    
    return Math.floor(seconds) + ' seconds ago';
  }
}

export const storage = new MemStorage();
