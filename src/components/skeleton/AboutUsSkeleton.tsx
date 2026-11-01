import { Skeleton } from "../ui/skeleton";

export const AboutUsSkeleton = () => {
  return (
    <div className="lg:space-y-10 space-y-5 animate-pulse">
      {/* About Us Heading */}
      <Skeleton className="w-1/2 h-10 xl:h-16 md:h-12 rounded-md" />

      {/* About Us Description */}
      <Skeleton className="w-full h-6 max-w-7xl rounded-md" />
      <Skeleton className="w-4/5 h-6 max-w-7xl rounded-md" />
      <Skeleton className="w-3/5 h-6 max-w-7xl rounded-md" />

      {/* Scope of Service Heading */}
      <Skeleton className="w-1/3 h-10 xl:h-16 md:h-12 rounded-md" />

      {/* Scope of Service Content */}
      <Skeleton className="w-full h-6 max-w-7xl rounded-md" />
      <Skeleton className="w-4/5 h-6 max-w-7xl rounded-md" />

      {/* Copyright and Ownership Heading */}
      <Skeleton className="w-1/3 h-10 xl:h-16 md:h-12 rounded-md" />

      {/* Copyright and Ownership Content */}
      <Skeleton className="w-full h-6 max-w-7xl rounded-md" />
      <Skeleton className="w-4/5 h-6 max-w-7xl rounded-md" />
      <Skeleton className="w-3/5 h-6 max-w-7xl rounded-md" />
    </div>
  );
};

// Export for use in your component
export default AboutUsSkeleton;
