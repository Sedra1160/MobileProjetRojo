import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonText, IonTitle, IonToolbar, IonModal,IonItem,IonLabel,IonInput } from '@ionic/react';
import { personOutline, logOut } from 'ionicons/icons';
import { useStoreState } from 'pullstate';
import { TalkStore } from '../store';
import { getTalks } from '../store/Selectors';
import './Tab1.css';
import React, { useState, useEffect , useRef } from "react";

import { TalkCard } from "../components/TalkCard";

const Tab1 = () => {

  const pageRef = useRef();
  const talks = useStoreState(TalkStore, getTalks);

  const [modalLogin , setModalLogin ]= useState({isOpen:true});
  const [modalInscription , setModalInscription]=useState({isOpen:false});  


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [compteur, setCompteur] = useState(true);
  const [idUtilisateur] = useState(1);
  useEffect(() => {
    if (compteur){
    fetch(`https://projetcloudrayansedraravo.herokuapp.com/ato/signalement/utilisateur/${idUtilisateur}`)
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

  if (loading) return "Loading...";
  if (error) return "Error!";


  return (
    <IonPage ref={ pageRef }>

        <IonModal isOpen={modalLogin.isOpen}>
        <h1 className='h1'>Login</h1>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput type="nom" />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Mots de passe</IonLabel>
            <IonInput type="prenom" />
          </IonItem>
          
          <IonContent lines="none">
          <IonButton className="ion-margin-top" type="submit" expand="block" onClick={()=> setModalLogin({onClose:true})} >Valider</IonButton>
          <IonButton className="ion-margin-top" type="submit" expand="block" onClick={()=> setModalInscription({isOpen:true})}>Inscription</IonButton>
          </IonContent>     
        </IonModal>

        <IonModal isOpen={modalInscription.isOpen}>
        <IonIcon name='close' className='close' onClick={()=> setModalInscription({onClose: true})} ></IonIcon>
        <h1 className='h1'>Inscription</h1>
          <IonItem>
            <IonLabel position="floating">Nom</IonLabel>
            <IonInput type="nom" />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Prenom</IonLabel>
            <IonInput type="prenom" />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput type="email" />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Mots de passe</IonLabel>
            <IonInput type="mdp" />
          </IonItem>

          <IonContent lines="none">
          <IonButton className="ion-margin-top" type="submit" expand="block" onClick={()=> setModalInscription({onClose:true})} >Ajouter</IonButton>
          </IonContent>
        
      </IonModal>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Historique</IonTitle>

          <IonButtons slot="end" >
            <IonButton  >
              <IonIcon  className='icon' icon={ logOut } onClick={()=> setModalLogin({isOpen:true})}/>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonGrid className="ion-padding-start ion-padding-end extra-padding ion-padding-bottom ion-margin-bottom">
          {/* FANASINA TABLEAU  <talkIndex> numero de tableau  */}
            <IonCol size="12">
              { data.map((talk, talkIndex) => {
                return talkIndex >= 0 && <TalkCard key={ talkIndex } talk={ talk } pageRef={ pageRef } />;
              })}
            </IonCol>
          
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
