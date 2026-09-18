import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api/axios';

interface DashboardData {
  user: {
    firstName: string;
    lastName: string;
  };
  learner: {
    gradeLevelId: string;
    schoolName: string | null;
  };
  learningStreak: number;
  activeEnrollmentsCount: number;
  totalPoints: number;
}

interface UpcomingClass {
  id: string;
  title: string;
  className: string;
  startTime: string;
  endTime: string;
  joinUrl: string | null;
}

interface RecentResource {
  id: string;
  contentId: string;
  title: string;
  contentType: string;
  completionPercentage: number;
  lastEngagedAt: string;
}

export function useLearnerDashboard() {
  const dashboardQuery = useQuery({
    queryKey: ['learner', 'dashboard'],
    queryFn: async () => {
      const { data } = await api.get<{ data: DashboardData }>('/me/dashboard');
      return data.data;
    },
  });

  const upcomingClassesQuery = useQuery({
    queryKey: ['learner', 'classes', 'upcoming'],
    queryFn: async () => {
      const { data } = await api.get<{ data: UpcomingClass[] }>('/me/classes/upcoming');
      return data.data;
    },
  });

  const recentResourcesQuery = useQuery({
    queryKey: ['learner', 'resources', 'recent'],
    queryFn: async () => {
      const { data } = await api.get<{ data: RecentResource[] }>('/me/recent-resources');
      return data.data;
    },
  });

  const continueLearningQuery = useQuery({
    queryKey: ['learner', 'learning', 'continue'],
    queryFn: async () => {
      const { data } = await api.get<{ data: RecentResource | null }>('/me/learning/continue');
      return data.data;
    },
  });

  return {
    dashboard: dashboardQuery,
    upcomingClasses: upcomingClassesQuery,
    recentResources: recentResourcesQuery,
    continueLearning: continueLearningQuery,
  };
}
