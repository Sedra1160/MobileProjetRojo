import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { personOutline } from 'ionicons/icons';
import { useStoreState } from 'pullstate';
import { TalkStore } from '../store';
import { getTalks } from '../store/Selectors';
import './Tab1.css';
import React, { useState, useEffect } from "react";

import { TalkCard } from "../components/TalkCard";
import { useRef } from 'react';

const Tab1 = () => {

  const pageRef = useRef();
  const talks = useStoreState(TalkStore, getTalks);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [compteur, setCompteur] = useState(true);
  const [idUtilisateur] = useState(1);
  useEffect(() => {
    if (compteur){
    fetch(`http://localhost:8090/ato/signalement/utilisateur/${idUtilisateur}`)
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
  // if (error) return "Error!";

  return (
    <IonPage ref={ pageRef }>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Historique</IonTitle>

          <IonButtons slot="end">
            <IonButton>
              <IonIcon icon={ personOutline } />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonGrid className="ion-padding-start ion-padding-end extra-padding ion-padding-bottom ion-margin-bottom">
         

          <IonRow>
            <IonCol size="12">
              <IonText color="dark">
                <p className="title">voici les incidents que vous avez signalés recemment</p>
              </IonText>
            </IonCol>
          </IonRow>
          
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
