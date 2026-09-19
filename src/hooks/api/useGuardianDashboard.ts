import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api/axios';

interface LinkedLearner {
  learnerProfileId: string;
  firstName: string;
  lastName: string;
  relationshipType: number;
  isPrimaryPayer: boolean;
}

interface LearnerProgress {
  completedTopics: number;
  inProgressTopics: number;
}

interface LearnerActivity {
  id: string;
  contentTitle: string;
  isCompleted: boolean;
  lastAccessedAt: string;
}

export function useGuardianDashboard() {
  const learnersQuery = useQuery({
    queryKey: ['guardian', 'learners'],
    queryFn: async () => {
      const { data } = await api.get('/guardians/me/learners');
      return data.data as LinkedLearner[];
    },
  });

  // Automatically fetch progress and activity for the first learner if available
  const primaryLearnerId = learnersQuery.data?.[0]?.learnerProfileId;

  const progressQuery = useQuery({
    queryKey: ['learner', primaryLearnerId, 'progress'],
    queryFn: async () => {
      if (!primaryLearnerId) return null;
      const { data } = await api.get(`/learners/${primaryLearnerId}/progress`);
      return data.data as LearnerProgress;
    },
    enabled: !!primaryLearnerId,
  });

  const activityQuery = useQuery({
    queryKey: ['learner', primaryLearnerId, 'activity'],
    queryFn: async () => {
      if (!primaryLearnerId) return [];
      const { data } = await api.get(`/learners/${primaryLearnerId}/activity`);
      return data.data as LearnerActivity[];
    },
    enabled: !!primaryLearnerId,
  });

  return {
    learners: learnersQuery,
    primaryLearnerProgress: progressQuery,
    primaryLearnerActivity: activityQuery,
  };
}
