import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api/axios';

export interface AcademicGrade {
  id: string;
  name: string;
  description: string;
  order: number;
}

export function useAcademicGrades() {
  return useQuery({
    queryKey: ['academic', 'grades'],
    queryFn: async () => {
      const { data } = await api.get<{ data: AcademicGrade[] }>('/academic/grades');
      return data.data;
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour since grades rarely change
  });
}
