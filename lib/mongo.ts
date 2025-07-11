import { MongoClient } from 'mongodb';
import { z } from 'zod';

// Environment variables
const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB || 'portfolio'; // Fallback to 'portfolio'

// Use global to persist MongoClient across hot reloads in dev
let globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!globalWithMongo._mongoClientPromise) {
    const client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise!;
} else {
  const client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Zod validation schema
export const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactForm = z.infer<typeof ContactFormSchema>;

// Save contact form submission
export async function submitContactForm(formData: ContactForm) {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    const result = await db
      .collection('contact_submissions')
      .insertOne({ ...formData, created_at: new Date() });

    return { success: true, insertedId: result.insertedId };
  } catch (error) {
    console.error('❌ Error submitting contact form:', error);
    return { success: false, error };
  }
}

// Fetch projects
export async function getProjects() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);

    const projects = await db
      .collection('projects')
      .find({})
      .sort({ created_at: -1 })
      .toArray();

    return { success: true, data: projects };
  } catch (error) {
    console.error('❌ Error fetching projects:', error);
    return { success: false, error };
  }
}
