import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { supabaseService } from './services/supabaseService';
import type { ContactFormData, AdminCredentials } from '../src/types';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const formData: ContactFormData = req.body;
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    const result = await supabaseService.saveContactSubmission(formData);
    
    if (result.success) {
      res.json({ success: true, message: 'Contact form submitted successfully' });
    } else {
      res.status(500).json({
        success: false,
        error: result.error || 'Failed to save contact submission'
      });
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Admin authentication
app.post('/api/admin/login', async (req, res) => {
  try {
    const credentials: AdminCredentials = req.body;
    
    if (!credentials.email || !credentials.password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'flakechop@gmail.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Unic0rnH34rt$';

    if (credentials.email === adminEmail && credentials.password === adminPassword) {
      // In a real app, you'd generate a JWT token here
      res.json({
        success: true,
        message: 'Login successful',
        user: { email: credentials.email }
      });
    } else {
      res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get contact submissions (admin only)
app.get('/api/admin/submissions', async (req, res) => {
  try {
    const result = await supabaseService.getContactSubmissions();
    
    if (result.success) {
      res.json({ success: true, data: result.data });
    } else {
      res.status(500).json({
        success: false,
        error: result.error || 'Failed to fetch submissions'
      });
    }
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Get dashboard statistics (admin only)
app.get('/api/admin/stats', async (req, res) => {
  try {
    const result = await supabaseService.getDashboardStats();
    
    if (result.success) {
      res.json({ success: true, data: result.data });
    } else {
      res.status(500).json({
        success: false,
        error: result.error || 'Failed to fetch statistics'
      });
    }
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Update submission status (admin only)
app.patch('/api/admin/submissions/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status || !['new', 'read', 'processed'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be new, read, or processed'
      });
    }

    const result = await supabaseService.updateSubmissionStatus(parseInt(id), status);
    
    if (result.success) {
      res.json({ success: true, message: 'Status updated successfully' });
    } else {
      res.status(500).json({
        success: false,
        error: result.error || 'Failed to update status'
      });
    }
  } catch (error) {
    console.error('Error updating submission status:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

export default app;
