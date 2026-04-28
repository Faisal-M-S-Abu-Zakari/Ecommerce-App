const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);

export const ProductSkeleton = () => (
  <div className="group block">
    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-2xl">
      <Skeleton className="w-full h-full" />
    </div>
    <div className="mt-6 flex justify-between items-start">
      <div>
        <Skeleton className="h-3 w-16 mb-2" />
        <Skeleton className="h-5 w-32 mb-1" />
        <Skeleton className="h-3 w-12" />
      </div>
      <Skeleton className="h-6 w-16" />
    </div>
  </div>
);

export const CollectionSkeleton = ({ count = 9 }) => (
  <div className="gap-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: count }).map((_, i) => (
      <ProductSkeleton key={i} />
    ))}
  </div>
);

export const HeroSkeleton = () => (
  <div className="h-[92vh] bg-gray-200 animate-pulse flex items-center">
    <div className="max-w-2xl mx-auto px-4">
      <Skeleton className="h-6 w-32 rounded-full mb-4" />
      <Skeleton className="h-16 w-full mb-6" />
      <Skeleton className="h-6 w-3/4 mb-8" />
      <Skeleton className="h-14 w-40 rounded-full" />
    </div>
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="py-20">
    <div className="flex flex-col md:flex-row gap-12">
      <div className="flex-1">
        <div className="flex gap-3">
          <div className="w-[18.7%] space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="w-full h-20 rounded" />
            ))}
          </div>
          <Skeleton className="flex-1 rounded-2xl" />
        </div>
      </div>
      <div className="flex-1 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-14 w-40 rounded-full" />
      </div>
    </div>
  </div>
);

export default Skeleton;