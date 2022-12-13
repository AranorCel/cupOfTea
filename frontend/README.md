# Cup Of Tea
### Installation : 

1. Git clone [repo](https://github.com/AranorCel/cupOfTea.git).
2. npm install dans les dossiers backend puis dans le dossier frontend
3. Lien [Excalidraw](https://excalidraw.com/#room=d7046de7e136d2fe4da2,b0JAODiD5dVvTyPZHxW-2Q).

### Technologies utilisées : 
- Frontend React (Cra, Redux Toolkit, Yup...).
- Backend NodeJS (Express, Mongoose).
- Base de données MongoDB Atlas (Authentification par IP ouverte à tout le monde. pour le contexte de l'exercice, le mot de passe et le pseudo est disponbible dans l'URI de la base de données config/DataBaseAtlas.js).

### Fonctionnalités présentes :
- Création de compte et authentification.
- Pages dynamiques (navigation pour les pages demandées complète : Home, Thés, Product, Grands Crus, About).
- Gestion des sessions utilisateurs connecté(e)s/non-connecté(e)s
- Intégration Material UI dans certains composants.
- Panier dynamique et suivi de session intégré.

### Bug non résolus : 
- Le rafraichissement de la page vide le panier (_Contournement : repasser par la page d'acceuil et retourner sur le panier_)
- Rating avec étoiles non fonctionnel
- Validation du panier non terminée