import { IonInput,IonItem,IonLabel,IonButton,IonIcon,IonButtons, IonHeader, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonContent } from '@ionic/react';
import { useState } from 'react';
import {  logOut } from 'ionicons/icons';
// import './Tab2.css';


const Tab2 = () => {
  // var latitude=0;
  // var longitude=0;
const [longitude ,setLongitude]=useState(null);
const [latitude ,setLatitude]=useState(null);

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
    console.log("geolocalisation non active");
    alert("geolocalisation non active");
  }
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
{/* <form className="ion-padding">    */}

    <IonItem>
      <IonLabel>votre longitude: {longitude}</IonLabel>
    </IonItem>

    <IonItem>
      <IonLabel>votre latitude: {latitude}</IonLabel>
    </IonItem>

    <IonItem> 
        <IonLabel position="floating">Description</IonLabel>
        <IonInput />
      </IonItem>

    <IonItem lines="none">
      <IonLabel>type de signalisation</IonLabel>
      <IonSelect placeholder='choisir'>
        <IonSelectOption >Trou</IonSelectOption>
        <IonSelectOption >Ordure</IonSelectOption>
        <IonSelectOption >Accident</IonSelectOption>
      </IonSelect>
    </IonItem>
    <IonButton className="ion-margin-top" type="submit" expand="block">Envoyer</IonButton>
    <IonContent/>
{/* </from>   */}
    </IonPage>
  );
};

export default Tab2;
