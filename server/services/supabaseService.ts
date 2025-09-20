import { createClient } from '@supabase/supabase-js';
import type { ContactSubmission, ContactFormData, DashboardStats } from '../../src/types';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseService = {
  // Save contact form submission
  async saveContactSubmission(formData: ContactFormData) {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            service: formData.service,
            message: formData.message,
            status: 'new'
          }
        ])
        .select();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error saving contact submission:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Get all contact submissions
  async getContactSubmissions(): Promise<{ success: boolean; data?: ContactSubmission[]; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Update submission status
  async updateSubmissionStatus(id: number, status: 'new' | 'read' | 'processed') {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id)
        .select();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating submission status:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  },

  // Get dashboard statistics
  async getDashboardStats(): Promise<{ success: boolean; data?: DashboardStats; error?: string }> {
    try {
      // Get total count
      const { count: totalCount, error: totalError } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true });

      if (totalError) throw totalError;

      // Get count for this week
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const { count: weekCount, error: weekError } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', oneWeekAgo.toISOString());

      if (weekError) throw weekError;

      // Get service counts
      const { data: serviceData, error: serviceError } = await supabase
        .from('contact_submissions')
        .select('service');

      if (serviceError) throw serviceError;

      // Count services
      const serviceCounts: Record<string, number> = {};
      serviceData?.forEach(submission => {
        serviceCounts[submission.service] = (serviceCounts[submission.service] || 0) + 1;
      });

      const topService = Object.keys(serviceCounts).reduce((a, b) => 
        serviceCounts[a] > serviceCounts[b] ? a : b, 'None'
      );

      return {
        success: true,
        data: {
          total: totalCount || 0,
          thisWeek: weekCount || 0,
          topService
        }
      };
    } catch (error) {
      console.error('Error getting dashboard stats:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
};
