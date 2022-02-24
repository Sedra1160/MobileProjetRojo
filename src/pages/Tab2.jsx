import { IonInput,IonItem,IonLabel,IonButton,IonCheckbox, IonHeader, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption } from '@ionic/react';
// import './Tab2.css';
import React, {useState, useEffect} from "react";
import {useForm, Controller } from "react-hook-form";
import Select from 'react-select';

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
        </IonToolbar>
      </IonHeader> 
{/* <form className="ion-padding">    */}
{/* 
    <IonItem>
      <IonLabel>votre longitude: {longitude}</IonLabel>
    </IonItem>

    <IonItem>
      <IonLabel>votre latitude: {latitude}</IonLabel>
    </IonItem> */}

    <IonItem> 
      <IonLabel position="floating" >Description</IonLabel>
      <IonInput onKeyUp={event => console.log(event.target.value)}/>
    </IonItem>

    <IonItem lines="none">
      <IonLabel>type de signalisation</IonLabel>
      <IonSelect placeholder='choisir' onChange={event => console.log(event.detail.value)}>
      { (data)?data.map((type, typeIndex) => {
        return typeIndex >= 0 && <IonSelectOption key={typeIndex}>
        {type.nom}</IonSelectOption>;
      }):"..."}
      </IonSelect>
    </IonItem>

    <IonButton className="ion-margin-top" type="submit" expand="block">Envoyer</IonButton>
{/* </from>   */}
    </IonPage>
  );
};

export default Tab2;
