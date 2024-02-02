"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/database/models/categoryModel";
import { getAllCategories } from "@/lib/actions/category.actions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const CategoryFilter = () => {
  const searchParams=useSearchParams()
   const pathname = usePathname();
  const { replace } = useRouter();
  const [categories,setCategories]=useState<ICategory[]>([])
  useEffect(()=>{
    const getCategories=async()=>{
      const categoryList=await getAllCategories()
      categoryList && setCategories(categoryList)
    }
    getCategories()
  },[])

  const handleCategory = useDebouncedCallback((category) => {
    const params = new URLSearchParams(searchParams);
    if (category && category !=="All") {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    replace(`${pathname}?${params.toString()}`,{ scroll:false });
  }, 300);

  return (
    <Select onValueChange={(value:string)=>handleCategory(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category.name}
              className="select-item p-regular-14"
            >
              {category.name}
            </SelectItem>
          ))}
       </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
