import { IonButton, IonCol, IonContent, IonHeader, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { Redirect } from 'react-router';

interface LoginProps {
  onLogin: () => void;
}


const Login: React.FC<LoginProps> = ({ onLogin }) => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonRow>
            <IonCol className="ion-text-center ion-padding">
              <IonText>
                Welcome, please log in
              </IonText>
            </IonCol>
          </IonRow>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={onLogin} >Login with Google</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
