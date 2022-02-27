import { IonCardContent, IonCardSubtitle, IonIcon, IonModal, IonNote, IonRow, useIonModal,IonSlides,IonSlide,IonCard,IonContent, IonItem} from "@ionic/react";
import { construct,bulb, micOutline, personOutline, checkmarkOutline, bookmarkOutline } from "ionicons/icons";
import { useStoreState } from "pullstate";
import { useEffect, useState } from "react";
import * as React from "react";

import { CategoryStore } from '../store';
import { getPeople } from "../store/PeopleStore";
import { getCategory } from '../store/Selectors';

import styles from "./TalkCard.module.css";
import { TalkModal } from "./TalkModal";


export const TalkCard = ({ upcoming = false, talk, pageRef }) => {

	const talkCategory = useStoreState(CategoryStore, getCategory(talk.category_id));
  const [ speakers, setSpeakers ] = useState([]);
  const [ showModal, setShowModal ] = useState(false);
  const [photo, setPhoto]=useState(null);
  const [loading,setLoading]=useState(true);
  const [error , setError]= useState(null);

  const [compteur, setCompteur] = useState(true);
  const [anne, setAnne] = useState(null);
  const [mois, setMois] = useState(null);
  const [jour, setJour] = useState(null);
  const [heure, setHeure] = useState(null);

  const [anneF, setAnneF] = useState(null);
  const [moisF, setMoisF] = useState(null);
  const [jourF, setJourF] = useState(null);
  const [heureF, setHeureF] = useState(null);


  function affichagePhoto(id){
    fetch(`https://projetcloudrayansedraravo.herokuapp.com/ato/photos/${id}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    })
    .then((photo) => {
      setPhoto(photo);
      console.log(photo);
      // setCompteur(false);
    })
  }
  useEffect(() => {
    var d = talk.dateSignalement;
    setAnne(d.split("-")[0]);
    setMois(d.split("-")[1]);
    var list = d.split("-");
    var izy = list[2].split("T");
    var h = izy[1].split("+");
    setJour(izy[0]);
    setHeure(h[0]);

    if(talk.dateFinSignalement){
    var d2 = talk.dateFinSignalement;
    setAnneF(d2.split("-")[0]);
    setMoisF(d2.split("-")[1]);
    var list2 = d2.split("-");
    var izy2 = list2[2].split("T");
    var h2 = izy2[1].split("+");
    setJourF(izy2[0]);
    setHeureF(h2[0]);
    }
      affichagePhoto(talk.id);
  }, [ talk ]);
  {
    
    console.log(anne);
  }
	return (
    <>
      <div className={ `${ styles.talkCard } ${ upcoming && styles.upcomingCard }` } onClick={ () => setShowModal(true) }>
        
        {/* icone ampoule couleur */}
        <div className={ styles.cardTitle }>
          <IonIcon color={ upcoming ? "primary" : "white" } 
          icon={(talk.etat.id===2)? construct :
          (talk.etat.id===3)? checkmarkOutline 
          : bookmarkOutline } />
          <IonCardSubtitle color={ upcoming ? "light" : "primary" }>{ talk.etat.nom } </IonCardSubtitle>
        </div>

        {/* titre en couleur noire */}
        <div className={ styles.talkTitle }>
          <h3>{ (talk.description)? talk.description : "..." }</h3>
        </div>

        {/* titre region en couleur noire */}
        <div className={ styles.talkTitle }>
          <h3>{ (talk.region)? talk.region.nom : "..." }</h3>
        </div>

        {/* type en couleur noire */}
        <div className={ styles.talkTitle }>
          <h3>{ (talk.type)? talk.type.nom : "..." }</h3>
        </div>

        {/*upcoming mpiditra sarina avatar*/}
        { !upcoming &&
        
          <IonRow className={ styles.talkSpeakers }>
            <IonCard>  
              <IonCardContent>
                <IonSlides>
                  {(photo)? photo.map((speaker, index) => {
                    return (
                      <IonSlide className="sl">
                        <div key={ `speaker_${ index }` } className={ styles.talkSpeaker }>
                          <img src={"data:image/jpeg;base64,"+speaker.image.data } alt="avatar" />
                        </div>
                      </IonSlide>  
                    );
                  }) : "..."}
                </IonSlides>
              </IonCardContent>
            </IonCard> 
          </IonRow>
        }
        
        {/*style bas du tableau*/}
        { !upcoming && 
          
          <div className={ styles.talkDetails }>
            <div className={ styles.detailCount }>
              {/* <IonIcon icon={ micOutline } color="primary" /> */}
              <span>debut:{jour+"/"+ mois +"/"+ anne +" à "+ heure +" heure"}</span>
            </div>

            <div className={ styles.detailCount }>
              {/* <IonIcon icon={ personOutline } color="primary" /> */}
              <span>fin: { (talk.dateFinSignalement)? jourF +"/"+ moisF +"/"+ anneF +" à "+ heureF +" heure" : "..." } </span>
            </div>
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