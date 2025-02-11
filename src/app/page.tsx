'use client'

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts } from "./domain/api/products";
import { useEffect, useRef } from "react";
import ProductCard from "./components/ProductCard";


export default function Home() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  })

  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);


  return (
    <div>
      <div className="container mt-16 mx-auto pt-10">
        <div className="grid grid-cols-1 mx-10 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.pages.flatMap((page) =>
            page.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        {isFetchingNextPage && <p className="text-center mt-4">Carregando mais produtos...</p>}

        <div ref={observerRef} className="h-10"></div>
      </div>
    </div>

  );
}