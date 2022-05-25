# Web-service-ProjetCloud
## REST_API

Système de signalement de problèmes
<ul>
  <li>Pour mieux être à l’écoute de la population, on a décidé de mettre en place une
    application pour permettre à toutes personnes de
    signaler les problèmes (route abimée, ordures,
    accident, etc…)
  </li>
  <li>Les problèmes seront ensuite affecté par région et
    ils auront un statut (nouveau, en cours de
    traitement, terminé)
  </li>

### backoffice: 
 webservice restAPI à partir de spring boot.
  <ul>
    <li>login</li>
    <li>Gestion des éléments nécessaires</li>
    <li>Tableau statistiques </li>
    <li>Affecter un signalement à une région. </li>
  </ul>
  
### front office, divisés en 3 parties:
  <ul>
    <li>Login (par région)</li>
    <li>Voir sur carte les signalements qui lui sont affectés.</li>
    <li>Faire une recherche avancé</li>
    <ul>
      <li>Par type de signalement</li>
      <li>Par date</li>
      <li>Par status</li>
    </ul>
    <li>A part la liste, on peut afficher les résultats sous forme de
      carte, avec des couleurs différents pour chaque type de
      signalement
    </li>
    <li>Lorsqu’on survole un point, afficher un popup sur les infos
      minimales du signalement et mettre un lien pour voir la
      fiche complète de signalement (avec status, photos, …)
    </li>
  </ul>

### Mobile
  
<ul>
  <li>S’inscrire et se connecter</li>
  <li>
    Envoyer un signalement: Date et heure (automatique), description, type de
    signalement, photos à l’appui</li>
  <li>Voir les signalements qu’on a fait et leur status</li>
  <li>
      Recevoir une notification quand le signalement est
      passé en status « terminé »
  </li>
</ul>
  
### base de données: 
postgresql pour les données relationnelles et mongodb pour les non relationnelles.

voir les liens annexes :
<ul>
<li>https://github.com/rayannayar73/Web-service-ProjetCloud</li>
<li>https://github.com/rayannayar73/backofficeCloud</li>
<li>https://github.com/Sedra1160/FrontOffice-PCloud</li>
</ul>
