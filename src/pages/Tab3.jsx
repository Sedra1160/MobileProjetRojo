import { IonInput,IonItem,IonLabel,IonButton,IonCheckbox, IonHeader, IonPage, IonTitle, IonToolbar, IonContent, IonModal, IonIcon } from '@ionic/react';
import { useState } from 'react';

// import './Tab1.css';

const Tab3 = () => {
  const [modalInscription , setModalInscription]=useState({isOpen:false});  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader> 
      
{/* <form className="ion-padding">    */}
    <IonItem> 
        <IonLabel position="floating">Email</IonLabel>
        <IonInput />
      </IonItem>
   <IonItem>
      <IonLabel position="floating">Mots de passe</IonLabel>
      <IonInput type="password" />
    </IonItem>  
    <IonItem lines="none">
      <IonLabel>Remember me</IonLabel>
      <IonCheckbox defaultChecked={true} slot="start" />
    </IonItem>
  
    <IonContent lines="none">
    <IonButton className="ion-margin-top" type="submit" expand="block">Connexion</IonButton>
    <IonButton className="ion-margin-top" type="submit" expand="block" onClick={()=> setModalInscription({isOpen:true})}>Inscription</IonButton>
    </IonContent>

    <IonContent className='ion-padding'>
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
    </IonContent>
    
{/* </from>   */}
    </IonPage>
  );
};

export default Tab3;
