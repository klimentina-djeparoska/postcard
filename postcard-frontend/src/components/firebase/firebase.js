// Your web app's Firebase configuration
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDm6fkRjyfod57DTxPvmCELWQu5pOtCU-k",
    authDomain: "postcard-9edc1.firebaseapp.com",
    databaseURL: "https://postcard-9edc1.firebaseio.com",
    projectId: "postcard-9edc1",
    storageBucket: "postcard-9edc1.appspot.com",
    messagingSenderId: "387087144472",
    appId: "1:387087144472:web:b014b998753df763da556d"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();

        this.db = app.database();

        this.googleProvider = new app.auth.GoogleAuthProvider();
    }

    doSignOut = () => this.auth.signOut();


    doSignInWithGoogle = () =>
        this.auth.signInWithPopup(this.googleProvider);

    // *** Merge Auth and DB User API *** //

    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot => {
                        const dbUser = snapshot.val();

                        // default empty roles
                        if (!dbUser.roles) {
                            dbUser.roles = {};
                        }

                        // merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            emailVerified: authUser.emailVerified,
                            providerData: authUser.providerData,
                            ...dbUser,
                        };

                        next(authUser);
                    });
            } else {
                fallback();
            }
        });

    user = uid => this.auth.currentUser;

}
export default Firebase;
