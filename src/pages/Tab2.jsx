import { camera, trash, close } from 'ionicons/icons';
import {
  
  IonFab,
  IonFabButton,
  IonTextarea,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonActionSheet
} from '@ionic/react';
import { IonInput,IonItem,IonLabel,IonButton,IonIcon,IonButtons, IonHeader, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonContent } from '@ionic/react';
import {  logOut } from 'ionicons/icons';
// import './Tab2.css';
import React, {useState, useEffect} from "react";
import {useForm, Controller } from "react-hook-form";
import Select from 'react-select';
import { usePhotoGallery, UserPhoto } from '../hooks/usePhotoGallery';
const axios = require('axios');

const Tab2 = () => {
  // var latitude=0;
  // var longitude=0;
const [longitude ,setLongitude]=useState(null);
const [latitude ,setLatitude]=useState(null);
const [data, setData]=useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [compteur, setCompteur] = useState(true);
const [description , setDescription] = useState(null);
const [type, setType] = useState(null);
const [idSignalement, setIdSignalement] = useState(null);
const [titrePhoto, setTitrePhoto] = useState(null);
const { photos, takePhoto } = usePhotoGallery();

  function Geo (position){
    setLongitude(position.coords.longitude);
    setLatitude(position.coords.latitude);
  }
  console.log(latitude);
  console.log(longitude);
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(Geo);
  }
  else{
    console.log("geolocalisation non activé");
    alert("geolocalisation non activé");
  }

  const postData = async (e) =>{
    e.preventDefault();
    const donnees = { 
          longitude,
          latitude,
          description,
          type: type,
          etat: 1,
          utilisateur: 1,
        };
        console.log(donnees);
      // let res = await axios.post('http://localhost:8090/ato/signalement', donnees);
      // let data = res.data;
      // setIdSignalement(data.id);
      let donneesPhoto;
      let resPhoto;
      let config;
      let formData = new FormData();

      photos.map((photo) => (
        formData.append('image',photo.blob),
        config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        },
        axios.post(`http://localhost:8090/ato/photos?idSignalement=${3}`, {
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data; ',
          },
        })
      ));
      setCompteur(true);
  }

  useEffect(()=>{
    if (compteur){
      fetch("https://projetcloudrayansedraravo.herokuapp.com/ato/type")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          setData(data);
          console.log(data);
          setCompteur(false);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
      }
    },[compteur]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ajout signalement</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon className='icon' icon={ logOut } />
            </IonButton>
            </IonButtons>
        </IonToolbar>
      </IonHeader> 

    <IonItem lines="none">
      <IonLabel className="ion-text-wrap" color="primary"> " veillez inserer les informations necessaires de l'incident " </IonLabel>
    </IonItem>
{/*     
    <IonItem>
      <IonLabel>votre longitude: {longitude}</IonLabel>
    </IonItem>

    <IonItem>
      <IonLabel>votre latitude: {latitude}</IonLabel>
    </IonItem> */}

    <IonItem> 
      <IonLabel position="floating" >Description</IonLabel>
      <IonTextarea value={description} onIonChange={e => setDescription(e.detail.value)}></IonTextarea>
    </IonItem>

    <IonItem lines="none">
      <IonLabel>type de signalisation</IonLabel>
      <IonSelect placeholder='choisir'  value={type}  onIonChange={e => setType(e.detail.value)}>
      { (data)?data.map((type, typeIndex) => {
        return typeIndex >= 0 && <IonSelectOption key={typeIndex} value={type.id}>
        {type.nom}</IonSelectOption>;
      }):"..."}
      </IonSelect>
    </IonItem>
    <IonContent>
      <IonGrid>
        <IonRow>
          {photos.map((photo, index) => (
            <IonCol size="6" key={index}>
              <IonImg src={photo.webviewPath} />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    {/* </IonContent>
    <IonContent> */}
      <IonFab vertical="bottom" horizontal="center" slot="fixed">
        <IonFabButton onClick={() => takePhoto()}>
          <IonIcon icon={camera}>xc</IonIcon>
        </IonFabButton>
      </IonFab>
    </IonContent>
    <IonButton onClick={postData} className="ion-margin-top" type="submit" expand="block">Envoyer</IonButton>
    </IonPage>
  );
};

export default Tab2;
