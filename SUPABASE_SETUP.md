# Supabase Setup Guide for Horsepower Electrical

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - **Name**: `horsepower-electrical`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
6. Click "Create new project"
7. Wait for the project to be set up (this may take a few minutes)

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

## 3. Update the Configuration

1. Open `supabase-config.js`
2. Replace the placeholder values:

```javascript
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

## 4. Create the Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste this SQL:

```sql
-- Create the contact_submissions table
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

-- Create indexes for better performance
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);

-- Insert the admin user
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, role)
VALUES (
    gen_random_uuid(),
    'flakechop@gmail.com',
    crypt('Unic0rnH34rt$', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{}',
    true,
    'authenticated'
);
```

4. Click "Run" to execute the SQL

## 5. Set Up Row Level Security (RLS)

1. Go to **Authentication** → **Policies**
2. Create a new policy for the `contact_submissions` table:

```sql
-- Allow public to insert contact submissions
CREATE POLICY "Allow public to insert contact submissions" ON contact_submissions
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read all submissions
CREATE POLICY "Allow authenticated users to read submissions" ON contact_submissions
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to update submission status
CREATE POLICY "Allow authenticated users to update submissions" ON contact_submissions
    FOR UPDATE USING (auth.role() = 'authenticated');
```

## 6. Test the Integration

1. Open your website (`index.html`)
2. Fill out the contact form and submit it
3. Check your Supabase dashboard → **Table Editor** → `contact_submissions` to see the data
4. Test the admin login:
   - Click the "Admin Login" button
   - Use credentials: `flakechop@gmail.com` / `Unic0rnH34rt$`
   - Verify you can see the contact submissions in the dashboard

## 7. Environment Variables (Optional)

For production, consider using environment variables:

```javascript
const SUPABASE_URL = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';
```

## 8. Security Considerations

- The admin credentials are hardcoded for simplicity
- In production, consider implementing proper authentication
- The contact form is publicly accessible (as intended)
- RLS policies ensure only authenticated users can read submissions

## 9. Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your Supabase project allows your domain
2. **Authentication Errors**: Check that RLS policies are correctly set
3. **Data Not Appearing**: Verify the table structure matches the code
4. **Connection Issues**: Double-check your URL and API key

### Debug Steps:

1. Open browser developer tools (F12)
2. Check the Console tab for error messages
3. Check the Network tab for failed requests
4. Verify your Supabase credentials are correct

## 10. Database Schema Reference

```sql
contact_submissions:
├── id (SERIAL PRIMARY KEY)
├── name (VARCHAR(255) NOT NULL)
├── email (VARCHAR(255) NOT NULL)
├── phone (VARCHAR(50))
├── service (VARCHAR(100) NOT NULL)
├── message (TEXT NOT NULL)
├── created_at (TIMESTAMP WITH TIME ZONE)
└── status (VARCHAR(20) DEFAULT 'new')
```

## 11. Features Included

✅ **Contact Form Integration**: Submissions saved to Supabase  
✅ **Admin Dashboard**: View all contact submissions  
✅ **Real-time Stats**: Total submissions, weekly counts, top services  
✅ **Responsive Design**: Works on all devices  
✅ **Authentication**: Secure admin login  
✅ **Data Validation**: Form validation and error handling  

## 12. Next Steps

- Customize the admin dashboard styling
- Add email notifications for new submissions
- Implement submission status management
- Add data export functionality
- Set up automated backups
