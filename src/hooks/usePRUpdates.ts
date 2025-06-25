import { useQueryClient } from '@tanstack/react-query';
import { chromeExtensionService } from '../services/chromeExtensionService';
import type { PullRequest } from '../../extension/common/types';
import { queryKeys } from '../constants/queryKeys';

/**
 * Hook to listen for background script messages and update cache accordingly.
 */
export function usePRUpdates() {
  const queryClient = useQueryClient();

  return {
    setupListener: () => {
      return chromeExtensionService.onMessage((message) => {
        if (message.action === 'prDataUpdated') {
          const updatedPRs = message.data as PullRequest[];
          console.log('Received PR data update from background, updating cache');

          // Update the cache with fresh data
          queryClient.setQueryData(queryKeys.prs, updatedPRs);
        }
      });
    },
  };
}
