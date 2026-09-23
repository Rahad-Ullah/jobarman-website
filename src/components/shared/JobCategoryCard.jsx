"use client";
import { useRouter } from "next/navigation";
import { useFilters } from "@/hooks/useFilters";
import Image from "next/image";
import { formatUrl } from "../../../utils/formatUrl";

export default function JobCategoryCard({ icon, label, count, id }) {
  const { setFilters } = useFilters();
  const router = useRouter();

  const toggleMultiFilter = (key, value) => {
    setFilters((prev) => {
      const set = new Set(prev[key]);
      set.has(value) ? set.delete(value) : set.add(value);
      return { ...prev, [key]: set };
    });
    router.push(`/jobs`);
  };

  return (
    <div onClick={() => toggleMultiFilter("category", id)} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col gap-2 items-center text-center cursor-pointer">
      <Image src={formatUrl(icon)} alt={label} width={1000} height={1000} className="w-28 h-28 object-cover rounded-md" />
      <h3 className="text-lg font-semibold text-gray-900">{label}</h3>
      {count && <p className="text-sm text-gray-500">{count} jobs</p>}
    </div>
  );
}
