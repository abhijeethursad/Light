// src/components/ui/Skeleton.tsx

interface SkeletonProps {
  className?: string;
}

export function FeedSkeleton({ className = "" }: SkeletonProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      {/* Stories Skeleton */}
      <div className="flex gap-4 p-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-gray-300 w-16 h-16" />
            <div className="w-12 h-3 bg-gray-300 rounded" />
          </div>
        ))}
      </div>

      
      {/* Posts Skeleton */}
      <div className="p-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="rounded-full bg-gray-300 w-10 h-10" />
              <div className="w-24 h-3 bg-gray-300 rounded" />
            </div>
            <div className="w-full h-64 bg-gray-300 rounded" />
            <div className="flex gap-4 mt-2">
              <div className="w-16 h-3 bg-gray-300 rounded" />
              <div className="w-16 h-3 bg-gray-300 rounded" />
              <div className="w-16 h-3 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}