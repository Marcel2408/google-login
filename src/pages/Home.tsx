import { IonButton, IonCol, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonPage, IonRow, IonText, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { Redirect } from 'react-router';
import { User } from '../interfaces';

interface HomeProps {
  user: User | null;
  onSignOut: () => void;
}

const Home: React.FC<HomeProps> = ({ user, onSignOut }) => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>You are logged in</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonRow className="ion-padding">
          <IonCol className="ion-text-center">
            {
            user &&
            user.givenName &&
            <IonText>Hello {user.givenName}</IonText>}
          </IonCol>
        </IonRow>

        {user &&
          <IonItem >
            <IonThumbnail slot="start">
              <IonImg src={user.profilePic} />
            </IonThumbnail>
            <IonLabel>
              <h3>{user.fullName}</h3>
              <p>{user.email}</p>
            </IonLabel>
          </IonItem>
        }

        <IonButton expand="block" onClick={onSignOut} fill="clear" >Sign out</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
