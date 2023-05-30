import { Producto, ProductsResponse } from '../interfaces/ProductInterface';
import React, { createContext, useEffect, useState } from 'react';

import { ImagePickerResponse } from 'react-native-image-picker';
import { Platform } from 'react-native';
import cafeApi from '../api/cafeApi';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: ( categoryId: string, productName: string ) => Promise<Producto>;
  updateProduct: ( categoryId: string, productName: string, productId: string ) => Promise<void>;
  deleteProduct: ( id: string ) => Promise<void>;
  loadProductById: ( id: string ) => Promise<Producto>;
  uploadImage: ( data: any, id: string ) => Promise<void>;
}



export const ProductsContext = createContext({} as ProductsContextProps);



export const ProductsProvider = ({ children }: any ) => {

  const [products, setProducts] = useState<Producto[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async() => {
    const resp = await cafeApi.get<ProductsResponse>('/productos?limite=50');
    setProducts([...resp.data.productos])
  }

  const addProduct = async( categoryId: string, productName: string ): Promise<Producto> => {
    const resp = await cafeApi.post<Producto>('/productos', {
        nombre: productName,
        categoria: categoryId
    });
    setProducts([ ...products, resp.data ]);
    return resp.data;
}

const updateProduct = async( categoryId: string, productName: string, productId: string ) =>{
    const resp = await cafeApi.put<Producto>(`/productos/${ productId }`, {
        nombre: productName,
        categoria: categoryId
    });
    setProducts( products.map( prod => {
        return (prod._id === productId )
                ? resp.data
                : prod;
    }) );
}

  const deleteProduct = async( id: string ) => {
  }

  const loadProductById = async( id: string ) => {
      const { data } = await cafeApi.get<Producto>(`/productos/${id}`);

      return data;
  };

  const uploadImage = async( data: ImagePickerResponse, id: string ) => {
    if (!data.assets) return;

    const decodedFileUri = decodeURIComponent(data.assets[0].uri!);
    const decodedFileName = decodeURIComponent(data.assets[0].fileName!);

    const iosFileUri = decodedFileUri.replace('file:///', '/');

    const fileToUpload = {
      type: data.assets[0].type,
      uri: Platform.OS === 'ios' ? iosFileUri : decodedFileUri,
      name: decodedFileName,
    };


    console.log(fileToUpload)
    const formData = new FormData();
    formData.append('archivo', fileToUpload);

    try {
      const resp = await cafeApi.put(`/uploads/productos/${id}`, formData, {
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data',
        }
      });
    } catch (error) {
      console.log(error)
    }
  }

  return(
      <ProductsContext.Provider value={{
          products,
          loadProducts,
          addProduct,
          updateProduct,
          deleteProduct,
          loadProductById,
          uploadImage,
      }}>
          { children }
      </ProductsContext.Provider>
  )
}
