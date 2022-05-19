import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageBrowser } from 'expo-image-picker-multiple';

const InputImageMutiple = ({navigation,route}) => {

  var  _processImageAsync = async(uri) => {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [{resize: { width: 1000 }}],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
    return file;
  };

  var updateHandler = (count, onSubmit) => {
    navigation.setOptions({
      title: `Selected ${count} files`,
      headerRight: () => renderDoneButton(count, onSubmit)
    });
  };

  var renderDoneButton = (count, onSubmit) => {
    if (!count) return null;
    return <TouchableOpacity title={'Done'} onPress={onSubmit}>
      <Text onPress={onSubmit}>Done</Text>
    </TouchableOpacity>
  }

  var imagesCallback = (callback) => {
    navigation.setOptions({
      headerRight: (e) => console.log(e)
    });

    callback.then(async (photos) => {
      const cPhotos = [];
      for(let photo of photos) {
        const pPhoto = await _processImageAsync(photo.uri);
        cPhotos.push({
          uri: pPhoto.uri,
          filename:photo.filename,
          name: photo.filename,
          type: 'image/jpg'
        })
      }
      route.params.handleItem(cPhotos)
      navigation.goBack()
    })
    .catch((e) => console.log(e)); 
  };

  return (
    <View style={tw`h-full w-full`}>
      <ImageBrowser 
            max={10}
            onChange={updateHandler}
            callback={imagesCallback}
            renderSelectedComponent={(e)=>console.log(e)}
            emptyStayComponent={(e)=>console.log(e)}
        />
    </View>
  )
}

export default InputImageMutiple