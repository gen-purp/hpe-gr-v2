// Supabase Configuration
// Replace these with your actual Supabase project credentials
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Database table structure for contact submissions:
/*
CREATE TABLE contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    service VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'new'
);

-- Create an index on created_at for better query performance
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);

-- Create an index on status for filtering
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
*/

// Function to save contact form submission to Supabase
async function saveContactSubmission(formData) {
    try {
        const { data, error } = await supabaseClient
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

        if (error) {
            console.error('Error saving contact submission:', error);
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error in saveContactSubmission:', error);
        return { success: false, error: error.message };
    }
}

// Function to get all contact submissions from Supabase
async function getContactSubmissions() {
    try {
        const { data, error } = await supabaseClient
            .from('contact_submissions')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching contact submissions:', error);
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error in getContactSubmissions:', error);
        return { success: false, error: error.message };
    }
}

// Function to update submission status
async function updateSubmissionStatus(id, status) {
    try {
        const { data, error } = await supabaseClient
            .from('contact_submissions')
            .update({ status: status })
            .eq('id', id)
            .select();

        if (error) {
            console.error('Error updating submission status:', error);
            throw error;
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error in updateSubmissionStatus:', error);
        return { success: false, error: error.message };
    }
}

// Function to get submission statistics
async function getSubmissionStats() {
    try {
        // Get total count
        const { count: totalCount, error: totalError } = await supabaseClient
            .from('contact_submissions')
            .select('*', { count: 'exact', head: true });

        if (totalError) throw totalError;

        // Get count for this week
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        const { count: weekCount, error: weekError } = await supabaseClient
            .from('contact_submissions')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', oneWeekAgo.toISOString());

        if (weekError) throw weekError;

        // Get service counts
        const { data: serviceData, error: serviceError } = await supabaseClient
            .from('contact_submissions')
            .select('service');

        if (serviceError) throw serviceError;

        // Count services
        const serviceCounts = {};
        serviceData.forEach(submission => {
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
                topService: topService
            }
        };
    } catch (error) {
        console.error('Error in getSubmissionStats:', error);
        return { success: false, error: error.message };
    }
}

// Export functions for use in other files
window.supabaseConfig = {
    saveContactSubmission,
    getContactSubmissions,
    updateSubmissionStatus,
    getSubmissionStats
};
