export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Full Stack' | 'Web App' | 'E-Commerce' | 'Interactive';
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  size: 'large' | 'medium' | 'small'; // Bento layout specification
  metrics?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools';
  proficiency: number; // 0-100
  color: string;
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  comment: string;
  rating: number;
}
