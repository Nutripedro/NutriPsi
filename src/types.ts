import React from 'react';

export interface NavItem {
  icon: React.ElementType;
  label: string;
  id: string;
}

export interface PatientMenuItem {
  icon: React.ElementType;
  label: string;
  id: string;
}

export interface Food {
  id: string;
  name: string;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export interface Meal {
  id: string;
  time: string;
  name: string;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
  image: string;
  foods: Food[];
  isExpanded?: boolean;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

export interface Diary {
  id: string;
  patient: string;
  date: string;
  status: string;
  adherence: number;
}
