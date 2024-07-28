"use client";
// Mengimpor library dan komponen yang diperlukan
import Link from "next/link";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { usePathname, useSearchParams } from "next/navigation";
import { generatePagination } from "@/lib/utils";
import clsx from "clsx";

// Komponen Pagination untuk menampilkan navigasi halaman
const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();// Mendapatkan path saat ini
  const searchParams = useSearchParams();// Mendapatkan parameter query saat ini
  const currentPage = Number(searchParams.get("page")) || 1;// Mendapatkan halaman saat ini atau default ke 1

// Fungsi untuk membuat URL halaman berdasarkan nomor halaman
  const createPageURL = (pageNumber: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Menghasilkan array nomor halaman
  const allPages = generatePagination(currentPage, totalPages);
   // Komponen PaginationNumber untuk menampilkan nomor halaman
  const PaginationNumber = ({
    page,
    href,
    position,
    isActive,
  }: {
    page: number | string;
    href: string;
    position?: "first" | "last" | "middle" | "single";
    isActive: boolean;
  }) => {
    const className = clsx(
      "flex h-10 w-10 items-center justify-center text-sm border transition-colors",
      {
        "rounded-l-sm": position === "first" || position === "single",
        "rounded-r-sm": position === "last" || position === "single",
        "z-10 bg-blue-500 border-blue-500 text-white": isActive,
        "hover:bg-gray-200": !isActive && position !== "middle",
        "text-gray-300 pointer-events-none": position === "middle",
      }
    );

    return isActive && position === "middle" ? (
      <div className={className}>{page}</div>
    ) : (
      <Link href={href} className={className} aria-label={`Go to page ${page}`}>
        {page}
      </Link>
    );
  };

  // Komponen PaginationArrow untuk menampilkan panah navigasi halaman
  const PaginationArrow = ({
    href,
    direction,
    isDisabled,
  }: {
    href: string;
    direction: "left" | "right";
    isDisabled?: boolean;
  }) => {
    const className = clsx(
      "flex h-10 w-10 items-center justify-center text-sm border transition-colors",
      {
        "pointer-events-none text-gray-300": isDisabled,
        "hover:bg-gray-200": !isDisabled,
        "mr-2": direction === "left",
        "ml-2": direction === "right",
      }
    );

    const icon =
      direction === "left" ? (
        <HiChevronLeft size={20} />
      ) : (
        <HiChevronRight size={20} />
      );

    return isDisabled ? (
      <div className={className} aria-disabled="true">
        {icon}
      </div>
    ) : (
      <Link href={href} className={className} aria-label={`Go to ${direction} page`}>
        {icon}
      </Link>
    );
  };

  return (
    <div className="inline-flex">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />
    
    {/* Menampilkan nomor halaman */}
      <div className="flex -space-x-px">
        {allPages.map((page, index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;

          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={index}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </div>
        {/* Panah navigasi ke halaman berikutnya */}
      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
};

export default Pagination;
