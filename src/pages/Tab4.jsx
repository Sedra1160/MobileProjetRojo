import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { personOutline, logOut } from 'ionicons/icons';
import { useStoreState } from 'pullstate';
import { TalkStore } from '../store';
import { getTalks } from '../store/Selectors';
import './Tab1.css';

import { TalkCard } from "../components/TalkCard";
import { useRef } from 'react';

const Tab4 = () => {

  const pageRef = useRef();
  const talks = useStoreState(TalkStore, getTalks);

  

  return (
    <IonPage ref={ pageRef }>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Notifiactions</IonTitle>

          <IonButtons slot="end">
            <IonButton>
              <IonIcon className='icon' icon={ logOut } />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonGrid className="ion-padding-start ion-padding-end extra-padding ion-padding-bottom ion-margin-bottom">
         
          
          {/* FANASINA TABLEAU  <talkIndex> numero de tableau  */}
          <IonRow>
            <IonCol size="12">
            
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
