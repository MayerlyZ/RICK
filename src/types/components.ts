import type { ReactNode } from 'react';
import type { Character } from './character';

export interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: number;
}

export interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  onClick?: () => void;
}

export interface FiltersPanelProps {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export interface StatsCardProps {
  title: string;
  value: number;
  variant?: 'success' | 'danger' | 'warning' | 'default';
}

export interface CharacterModalProps {
  character: Character | null;
  onClose: () => void;
}

export interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export interface SidebarItem {
  label: string;
  icon?: ReactNode;
  active?: boolean;
}

export interface SidebarProps {
  title?: string;
  items: SidebarItem[];
}
