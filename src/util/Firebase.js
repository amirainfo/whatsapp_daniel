const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {

    constructor(){

        this._config = {
            apiKey: "AIzaSyCzWsNAbzVCSo4SJ6jotL25HlcawzSCk30",
            authDomain: "chat-awsmedical.firebaseapp.com",
            databaseURL: "https://chat-awsmedical.firebaseio.com",
            projectId: "chat-awsmedical",
            storageBucket: "gs://chat-awsmedical.appspot.com",
            messagingSenderId: "43855342062"
        
        };

        this.init();

    }

    init(){

        if(!window._initializedFirebase){
            firebase.initializeApp(this._config);

            firebase.firestore().settings({
                timestampsInSnapshots: true
            });

            window._initializedFirebase = true;

        }


    }

    static db(){

        return firebase.firestore();

    }

    static hd(){

        return firebase.storage();

    }

    initAuth(){

        return new Promise((s, f)=>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
            .then(result => {

                let token = result.credential.accessToken;
                let user = result.user;

                s({
                    user, 
                    token
                });

            })
            .catch(err=>{
                f(err);
            });

        });


    }


}