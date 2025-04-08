import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Mic } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Voice Note</h2>

        <div className="mb-6 h-[400px] overflow-y-auto">
          <div className="space-y-4">
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 flex items-center">
            <div className="text-blue-500 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="22"></line>
              </svg>
            </div>
            <div>Press Start Recording to begin speaking</div>
          </div>

          <div className="flex justify-center">
            <Button
              variant="default"
              size="icon"
              className={`w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700`}
              disabled={true}
              aria-label="Start Recording"
            >
              <Mic className="h-12 w-12 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
