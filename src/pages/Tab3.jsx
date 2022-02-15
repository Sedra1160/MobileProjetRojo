import { IonInput,IonItem,IonLabel,IonButton,IonCheckbox, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

// import './Tab2.css';

const Tab3 = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ajout signalement</IonTitle>
        </IonToolbar>
      </IonHeader> 
{/* <form className="ion-padding">    */}
    <IonItem> 
        <IonLabel position="floating">Username</IonLabel>
        <IonInput />
      </IonItem>
   <IonItem>
      <IonLabel position="floating">Password</IonLabel>
      <IonInput type="password" />
    </IonItem>  
    <IonItem lines="none">
      <IonLabel>Remember me</IonLabel>
      <IonCheckbox defaultChecked={true} slot="start" />
    </IonItem>
    <IonButton className="ion-margin-top" type="submit" expand="block">Login</IonButton>
{/* </from>   */}
    </IonPage>
  );
};

export default Tab3;
