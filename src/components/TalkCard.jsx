import { IonCardSubtitle, IonIcon, IonModal, IonNote, IonRow, useIonModal } from "@ionic/react";
import { construct,bulb, micOutline, personOutline } from "ionicons/icons";
import { useStoreState } from "pullstate";
import { useEffect, useState } from "react";

import { CategoryStore } from '../store';
import { getPeople } from "../store/PeopleStore";
import { getCategory } from '../store/Selectors';

import styles from "./TalkCard.module.css";
import { TalkModal } from "./TalkModal";

export const TalkCard = ({ upcoming = false, talk, pageRef }) => {

	const talkCategory = useStoreState(CategoryStore, getCategory(talk.category_id));
  const [ speakers, setSpeakers ] = useState([]);
  const [ showModal, setShowModal ] = useState(false);
  const [data, setData]=useState(null);
  const [loading,setLoading]=useState(true);
  const [error , setError]= useState(null);

  useEffect(() => {

    setSpeakers(getPeople(talk.speakers));
  }, [ talk ]);

  // useEffect(()=>{
  //   fetch("http://localhost:8090/ato/regions")
  //   .then((response)=> {
  //     if(response.ok){
  //       return response.json();
  //     }
  //     throw response;
  //   })
  //   .then((data)=>{
  //     setData(data);
  //   })
  //   .catch((error)=> {
  //     console.error("Error fetching data :", error);
  //     setError(error);
  //   })
  //   .finally(()=> {
  //     setLoading(false);
  //   });
  // },[]);
  // if (loading) return "Loading ...";
  // if (error) return "Error!";

	return (
    <>
      <div className={ `${ styles.talkCard } ${ upcoming && styles.upcomingCard }` } onClick={ () => setShowModal(true) }>
        
        {/* icone ampoule couleur */}
        <div className={ styles.cardTitle }>
          <IonIcon color={ upcoming ? "primary" : "white" } icon={ construct } />
          <IonCardSubtitle color={ upcoming ? "light" : "primary" }>{ talkCategory.name } talks</IonCardSubtitle>
        </div>

        {/* titre en couleur noire */}
        <div className={ styles.talkTitle }>
          <h3>{ talk.title }</h3>
        </div>

        {/*upcoming mpiditra sarina avatar*/}
        { !upcoming &&
        
          <IonRow className={ styles.talkSpeakers }>
            { speakers.map((speaker, index) => {
                
                return (

                  <div key={ `speaker_${ index }` } className={ styles.talkSpeaker }>
                    <img src={ speaker.image } alt="avatar" />
                  </div>
                );
            })}
          </IonRow>
        }
        
        
        {/*style bas du tableau*/}
        { !upcoming && 
          
          <div className={ styles.talkDetails }>
            {/* <div className={ styles.detailCount }>
              <IonIcon icon={ micOutline } color="primary" />
              <span>{ talk.speakers } Speakers</span>
            </div>

            <div className={ styles.detailCount }>
              <IonIcon icon={ personOutline } color="primary" />
              <span>{ talk.audience } Audience</span>
            </div> */}
          </div>
        }
      </div>

        {/*modal*/}
      {/* <IonModal isOpen={ showModal } onDidDismiss={ () => setShowModal(false) } presentingElement={ pageRef.current }>
        <TalkModal dismiss={ () => setShowModal(false) } speakers={ speakers } talk={ talk } category={ talkCategory } />
      </IonModal> */}
    </>
	);
}