import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { addCircle,logOut , addCircleOutline, home, homeOutline, notifications, notificationsOutline, person, personOutline, searchOutline } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Tab4 from './pages/Tab4';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/floating-tab-bar.css';
import { useState } from 'react';

const App = ({goHome}) => {

  const tabs = [
    
    {
      name: "Home",
      url: "/home",
      activeIcon: home,
      icon: homeOutline,
      component: Tab1
    },
    {
      name: "Add",
      url: "/add",
      activeIcon: addCircle,
      icon: addCircleOutline,
      component: Tab2
    },
    
    {
      name: "Notifications",
      url: "/notifications",
      activeIcon: notifications,
      icon: notificationsOutline,
      component: Tab4
    },
    {
      name: "Account",
      url: "/account",
      activeIcon: person,
      icon: personOutline,
      component: Tab3
    }
  ];
  const tab2 = [
    {
      name: "Account",
      url: "/account",
      activeIcon: person,
      icon: personOutline,
      component: Tab3
    },
  ];

  const [ activeTab, setActiveTab ] = useState(tabs[1].name);//
  
  const [tableau , setTableau] = useState(tabs);
  
  

  return (
    <IonApp>
      <IonReactRouter>
         <IonTabs /* onIonTabsDidChange={ e => setActiveTab(e.detail.tab) } */> 
          <IonRouterOutlet>

            { tableau.map((tab, index) => {

              return (

                <Route key={ index } exact path={ tab.url }>
                  <tab.component />
                </Route>
              );
            })}
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            {
              
               tableau.map((tab, barIndex) => {

                const active = tab.name === activeTab;

                return (
                      <IonTabButton key={ `tab_${ barIndex }` } tab={ tab.name } href={ tab.url }>
                        <IonIcon icon={ active ? tab.activeIcon : tab.icon } />
                      </IonTabButton>
                    );
                // if(activeTab  == 'Account'){
                //   console.log("login zao");
                //   return (

                //     <IonTabButton key={ `tab_${ barIndex }` } tab={ tab.name } href={ tab.url }>
                //       <IonIcon  />
                //     </IonTabButton>
                //   );
                // }
          
                //  else if (activeTab  == 'Home' || activeTab  == 'Add' || activeTab  == 'NotificationsNotifications'){
                //   return (
          
                //     <IonTabButton key={ `tab_${ barIndex }` } tab={ tab.name } href={ tab.url }>
                //       <IonIcon icon={ active ? tab.activeIcon : tab.icon } />
                //     </IonTabButton>
                //   );
                //  }
                })
          
            }
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
