import { Categoria, CategoriesResponse } from "../interfaces/CategoryResponseInterface";
import { useEffect, useState } from "react"

import cafeApi from "../api/cafeApi";

export const useCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Categoria[]>([]);


  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async() => {
    const { data } = await cafeApi.get<CategoriesResponse>('/categorias')
    setCategories(data.categorias);
    setIsLoading(false);
  }
  return {
    categories,
    isLoading,
  }
}
