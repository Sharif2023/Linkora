export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type IdeaCategory = 
  | 'Creator Economy'
  | 'SaaS & Startups'
  | 'Freelancing & Business'
  | 'Content & Media'
  | 'Digital Products';

export type PricingModel = 'Free' | 'Freemium' | 'Paid';

export interface IdeaResource {
  name: string;
  websiteUrl: string;
  purpose: string;
  pricingModel: PricingModel;
  hasFreeTier: boolean;
  isEssential?: boolean;
  position: number;
}

export interface IdeaTask {
  id?: string;
  title: string;
  description: string;
  position: number;
  isOptional?: boolean;
}

export interface IdeaPhase {
  id?: string;
  title: string;
  description: string;
  outcome: string;
  position: number;
  estimatedDuration?: string;
  tasks: IdeaTask[];
  resources: IdeaResource[];
}

export interface ActionPlanStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface ImplementationIdeaData {
  id?: string;
  slug: string;
  title: string;
  outcome: string;
  description: string;
  targetAudience: string;
  difficulty: DifficultyLevel;
  estimatedTime: string;
  estimatedCost: string;
  category: IdeaCategory;
  coverImage?: string;
  featured?: boolean;
  keywords: string[];
  actionPlan: ActionPlanStep[];
  phases: IdeaPhase[];
}

export interface CuratedCollectionItemData {
  ideaSlug?: string;
  resourceName?: string;
  resourceCategory?: string;
  position: number;
}

export interface CuratedCollectionData {
  id?: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  featured?: boolean;
  coverImage?: string;
  items: CuratedCollectionItemData[];
}
