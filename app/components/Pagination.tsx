"use client";

import Link from "next/link";

import { PaginationProps } from "../types";
import { usePathname, useSearchParams } from "next/navigation";

const Pagination = ({ totalPages }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  return (
    <div className="flex justify-center space-x-2 mt-8">
      {currentPage > 1 && (
        <Link
          href={`${pathname}?page=${currentPage - 1}`}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
          Previous
        </Link>
      )}

      {currentPage < totalPages && (
        <Link
          href={`${pathname}?page=${currentPage + 1}`}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
