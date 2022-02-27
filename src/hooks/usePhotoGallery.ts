import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Capacitor } from '@capacitor/core';
const axios = require('axios');

export function usePhotoGallery() {
    const [photos, setPhotos] = useState<UserPhoto[]>([]);
    const convertBlobToBase64 = (blob: Blob) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    });

    const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
      let base64Data: string;
    
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();
      base64Data = (await convertBlobToBase64(blob)) as string;
    
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data,
      });
    
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: photo.webPath,
        data: base64Data,
        blob: blob
      };
    };

    const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    const fileName = new Date().getTime() + '.jpeg';
    const savedFileImage = await savePicture(photo, fileName);
    
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    const newPhotos = [
    {
        filepath: fileName,
        webviewPath: photo.webPath,
        data : savedFileImage.data,
        blob : blob
    },
    ...photos,
    ];
    
    setPhotos(newPhotos);
  };
    return {
    photos,
    takePhoto,
  };
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
  data: string;
  blob: Blob;
}