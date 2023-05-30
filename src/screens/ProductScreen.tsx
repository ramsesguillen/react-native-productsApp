import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import { Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { ProductsContext } from '../context/ProductsContext';
import { ProductsStackParams } from '../Navigation/ProductsNavigation';
import { StackScreenProps } from '@react-navigation/stack';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'>{};
export const ProductScreen = ({ route, navigation }: Props) => {
  const { name = '', id = '' } = route.params
  const { loadProductById, addProduct, updateProduct, uploadImage } = useContext(ProductsContext)
  const { categories } = useCategories();
  const [tempUri, setTempUri] = useState<string>()
  const { _id, nombre, categoriaId, img, onChange, setFormValue } = useForm({
    _id: id,
    categoriaId: '',
    nombre: name,
    img: '',
  });

  useEffect(() => {
    navigation.setOptions({
      title: (nombre) ? nombre : 'Nombre del Producto'
      // header: () => (
      //   <Text>{name}</Text>
      // )
    });
  }, [nombre]);

  useEffect(() => {
    loadProduct();
  }, []);


  const loadProduct = async () => {
    if (id.length === 0) return;
    const product = await loadProductById(id);
    setFormValue({
      _id: id,
      categoriaId: product.categoria._id,
      nombre: name,
      img: product.img || ''
    });
  }


  const saveOrUpdate = async () => {
    if( _id.length > 0 ) {
      updateProduct( categoriaId, nombre, id );
    } else {
        const tempCategoriaId = categoriaId || categories[0]._id;
        const newProduct = await addProduct(tempCategoriaId, nombre );
        onChange( newProduct._id, '_id' );
    }
  }

  const takePhoto = async() => {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.5,
    });
    if (result.didCancel) return;
    if (!result.assets ) return;

    setTempUri(result.assets[0].uri);
    uploadImage(result, _id);
  }

  const getImageFromGallery = async() => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
    });
    if (result.didCancel) return;
    if (!result.assets ) return;

    setTempUri(result.assets[0].uri);
    uploadImage(result, _id);
  }


  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Producto'
          value={nombre}
          onChangeText={(value) => onChange(value, 'nombre') }
        />


        <Text style={styles.label}>Category</Text>

        <Picker
          selectedValue={categoriaId}
          onValueChange={(value) => onChange(value, 'categoriaId')}>
            {
              categories.map(c => (
                <Picker.Item
                  label={ c.nombre }
                  value={ c._id }
                  key={ c._id }
                />
              ))
            }
        </Picker>


        <Button
            title='Guardar'
            color='#5856D6'
            onPress={saveOrUpdate}
          />

        {
          (_id.length > 0) && (
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}>
              <Button
                title='Camera'
                color='#5856D6'
                onPress={takePhoto}
              />
              <View style={{ width: 10 }} />
              <Button
                title='Gallery'
                color='#5856D6'
                onPress={getImageFromGallery}
              />
            </View>
          )
        }

        {
          (img.length > 0 && !tempUri) && (
            <Image
              source={{ uri: img }}
              style={{
                marginTop: 20,
                width: '100%',
                height: 300
              }}
            />
          )
        }
        {
          (tempUri) && (
            <Image
              source={{ uri: tempUri }}
              style={{
                marginTop: 20,
                width: '100%',
                height: 300
              }}
            />
          )
        }

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex:1,
      marginTop: 10,
      marginHorizontal: 20
  },
  label: {
      fontSize: 18
  },
  textInput: {
      borderWidth: 1,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
      borderColor: 'rgba(0,0,0,0.2)',
      height: 45,
      marginTop: 5,
      marginBottom: 15
  }
});
