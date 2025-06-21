import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';

const supabaseUrl = 'https://your-project.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Validation schemas
export const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactForm = z.infer<typeof ContactFormSchema>;

// Database functions
export async function submitContactForm(formData: ContactForm) {
  try {
    const { error } = await supabase
      .from('contact_submissions')
      .insert([formData]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error submitting form:', error);
    return { success: false, error };
  }
}

export async function getProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching projects:', error);
    return { success: false, error };
  }
}