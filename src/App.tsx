import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import { User } from './interfaces';
import { insertGapiScript } from './googleApi';


const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const initializeGoogleLogin = ():void => {
    gapi.load('auth2', () => {

        gapi.auth2.init({
          client_id: '197841512077-1k0vf32shtk67b956tqta28dtv4t2bh1.apps.googleusercontent.com'
        })
        .then((auth2) => {
          const GoogleAuth: gapi.auth2.GoogleAuth = gapi.auth2.getAuthInstance();
          GoogleAuth.signIn()
          .then((googleUser) => {
            setUser({
              givenName: googleUser.getBasicProfile().getGivenName(),
              fullName: googleUser.getBasicProfile().getName(),
              profilePic: googleUser.getBasicProfile().getImageUrl(),
              email: googleUser.getBasicProfile().getEmail(),
            })
            setIsLoggedIn(GoogleAuth.isSignedIn.get())
          });
        })
        .catch((error: any) => {
          console.log('error --> ', error);
          throw new Error('failed to authorize user')
        });

    });
  }


  const userSignOut = async () => {
    const GoogleAuth: gapi.auth2.GoogleAuth = gapi.auth2.getAuthInstance();
    await GoogleAuth.signOut()
    setIsLoggedIn(GoogleAuth.isSignedIn.get());
    setUser(null);
  }


  useEffect(() => {
    insertGapiScript();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>

          <Route exact path="/login">
            {isLoggedIn ?
            <Redirect to="/home" /> :
            <Login
              onLogin={initializeGoogleLogin}
            />}
          </Route>

          <Route exact path="/home">
            {isLoggedIn ?
            <Home
              user={user}
              onSignOut={userSignOut}
            /> :
            <Redirect to="/login" />
            }
          </Route>

          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}


export default App;
