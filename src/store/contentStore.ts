import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];
type Skill = Database['public']['Tables']['skills']['Row'];
type Project = Database['public']['Tables']['projects']['Row'];
type Experience = Database['public']['Tables']['experiences']['Row'];

interface ContentState {
  profile: Profile | null;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  isLoading: boolean;
  error: string | null;
  
  fetchProfile: () => Promise<void>;
  fetchSkills: () => Promise<void>;
  fetchProjects: () => Promise<void>;
  fetchExperiences: () => Promise<void>;
  fetchAllContent: () => Promise<void>;
  
  updateProfile: (profile: Partial<Profile>) => Promise<void>;
  addSkill: (skill: Omit<Skill, 'id'>) => Promise<void>;
  updateSkill: (id: string, skill: Partial<Skill>) => Promise<void>;
  deleteSkill: (id: string) => Promise<void>;
  addProject: (project: Omit<Project, 'id' | 'created_at'>) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  addExperience: (experience: Omit<Experience, 'id'>) => Promise<void>;
  updateExperience: (id: string, experience: Partial<Experience>) => Promise<void>;
  deleteExperience: (id: string) => Promise<void>;
}

export const useContentStore = create<ContentState>((set, get) => ({
  profile: null,
  skills: [],
  projects: [],
  experiences: [],
  isLoading: false,
  error: null,
  
  fetchProfile: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .single();
      
      if (error) throw error;
      set({ profile: data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  fetchSkills: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true });
      
      if (error) throw error;
      set({ skills: data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  fetchProjects: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      set({ projects: data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  fetchExperiences: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('start_date', { ascending: false });
      
      if (error) throw error;
      set({ experiences: data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  fetchAllContent: async () => {
    set({ isLoading: true, error: null });
    await Promise.all([
      get().fetchProfile(),
      get().fetchSkills(),
      get().fetchProjects(),
      get().fetchExperiences(),
    ]);
    set({ isLoading: false });
  },
  
  updateProfile: async (profile) => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', get().profile?.id || '')
        .select()
        .single();
      
      if (error) throw error;
      set({ profile: data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  addSkill: async (skill) => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase
        .from('skills')
        .insert(skill)
        .select()
        .single();
      
      if (error) throw error;
      set(state => ({ 
        skills: [...state.skills, data],
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  updateSkill: async (id, skill) => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase
        .from('skills')
        .update(skill)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      set(state => ({
        skills: state.skills.map(s => s.id === id ? data : s),
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  deleteSkill: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      set(state => ({
        skills: state.skills.filter(s => s.id !== id),
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  addProject: async (project) => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase
        .from('projects')
        .insert(project)
        .select()
        .single();
      
      if (error) throw error;
      set(state => ({
        projects: [data, ...state.projects],
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  updateProject: async (id, project) => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase
        .from('projects')
        .update(project)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      set(state => ({
        projects: state.projects.map(p => p.id === id ? data : p),
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  deleteProject: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      set(state => ({
        projects: state.projects.filter(p => p.id !== id),
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  addExperience: async (experience) => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase
        .from('experiences')
        .insert(experience)
        .select()
        .single();
      
      if (error) throw error;
      set(state => ({
        experiences: [data, ...state.experiences],
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  updateExperience: async (id, experience) => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase
        .from('experiences')
        .update(experience)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      set(state => ({
        experiences: state.experiences.map(e => e.id === id ? data : e),
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
  
  deleteExperience: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      set(state => ({
        experiences: state.experiences.filter(e => e.id !== id),
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));