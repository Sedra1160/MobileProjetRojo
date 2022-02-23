import { IonInput,IonItem,IonLabel,IonButton, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import React, {useState} from "react";
// import './Tab2.css';
import App from './App';


const Login = () => {
    const redirection = () => {
      console.log("tafiditra");  
      window.location.replace("/App");
      console.log("tafavoka");

    }
    const [ text, setText ] = React.useState("Primary Button") 
    console.log(text);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader> 

    <IonItem> 
        <IonLabel position="floating">Email</IonLabel>
        <IonInput />
      </IonItem>

      <IonItem> 
        <IonLabel position="floating">Mots de passe</IonLabel>
        <IonInput />
      </IonItem>
      {/* onClick={redirection()} */}
    {/* <button>ok</button> */}
    <IonButton className="ion-margin-top" type="submit" expand="block" onClick={()=> redirection()}  >valider</IonButton>
    </IonPage>
  );
};

export default Login;
