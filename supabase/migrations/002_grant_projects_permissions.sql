-- Grant permissions for authenticated users to access and modify projects
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
