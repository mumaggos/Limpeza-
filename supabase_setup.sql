-- Create the leads table to store quotes
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    service TEXT,
    services TEXT[],
    property_type TEXT,
    location TEXT,
    postal_code TEXT,
    address TEXT,
    frequency TEXT,
    area TEXT,
    rooms TEXT,
    bathrooms TEXT,
    pets BOOLEAN,
    preferred_date TEXT,
    preferred_time TEXT,
    details TEXT,
    extras TEXT[],
    contact_preference TEXT,
    status TEXT DEFAULT 'Novo',
    source TEXT DEFAULT 'Website',
    raw_data JSONB
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous users (website visitors) to insert data
CREATE POLICY "Allow anonymous inserts to leads" ON public.leads
    FOR INSERT 
    TO anon
    WITH CHECK (true);

-- Create policy to allow authenticated users (you, the admin) to view and manage all leads
CREATE POLICY "Allow authenticated full access to leads" ON public.leads
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
