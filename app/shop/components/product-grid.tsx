export const ProductGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 sm:m-2 md:mr-2">
      {children}
    </div>
  );
};
