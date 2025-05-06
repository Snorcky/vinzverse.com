/*
  # Portfolio Database Schema

  1. New Tables
    - profiles: Stores user profile information
    - skills: Stores user skills with categories and proficiency levels
    - projects: Stores portfolio projects
    - experiences: Stores work experience entries

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  updated_at timestamptz DEFAULT now(),
  name text NOT NULL,
  title text NOT NULL,
  bio text NOT NULL,
  avatar_url text
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  proficiency integer NOT NULL CHECK (proficiency > 0 AND proficiency <= 100)
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  link_url text,
  created_at timestamptz DEFAULT now()
);

-- Create experiences table
CREATE TABLE IF NOT EXISTS experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  description text NOT NULL
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create RLS policies for skills
CREATE POLICY "Users can view their own skills"
  ON skills FOR SELECT
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert their own skills"
  ON skills FOR INSERT
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update their own skills"
  ON skills FOR UPDATE
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete their own skills"
  ON skills FOR DELETE
  USING (auth.uid() = profile_id);

-- Create RLS policies for projects
CREATE POLICY "Users can view their own projects"
  ON projects FOR SELECT
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert their own projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update their own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete their own projects"
  ON projects FOR DELETE
  USING (auth.uid() = profile_id);

-- Create RLS policies for experiences
CREATE POLICY "Users can view their own experiences"
  ON experiences FOR SELECT
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert their own experiences"
  ON experiences FOR INSERT
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update their own experiences"
  ON experiences FOR UPDATE
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete their own experiences"
  ON experiences FOR DELETE
  USING (auth.uid() = profile_id);