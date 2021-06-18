import AsyncStorage from '@react-native-async-storage/async-storage';
import { autoSubscribe, AutoSubscribeStore, StoreBase } from 'resub';


@AutoSubscribeStore
class AuthResub extends StoreBase {
    public token: any = null;
    public userId: any = null;
    //public settingStore?: StringStore;

    @autoSubscribe
    setAuth(token:string,userId:string){
        this.token = token;
        this.userId = userId;
    }

    

    async login(email: string, password: string) {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDQdv5Y1QvTHCfk9sT7SdndsPuUY1Ik6-4', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
            }),

        });
        if (!response.ok) {

            const resData = await response.json();
            let message = "lỗi ở get link API đăng nhập !!";
            if (resData.error.message === "EMAIL_NOT_FOUND") {
                message = "Email hoặc password đăng nhập không đúng !!";
            }
            throw new Error(message);
        };

        const resData = await response.json();
        this.token = resData.idToken;
        this.userId = resData.localId;
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);

        // console.log("res login ", resData);

        AsyncStorage.setItem('userData',
            JSON.stringify({
                token: resData.idToken,
                userId: resData.localId,
                expiryDate: expirationDate.toISOString()
            })
        );

    };
    async signup(email: string, password: string) {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDQdv5Y1QvTHCfk9sT7SdndsPuUY1Ik6-4', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
            }),
        });

        if (!response.ok) {
            throw new Error('lỗi ở link API đăng ký !!');
        };

        const resData = await response.json();
        this.token= resData.idToken;
        this.userId = resData.localId;
        console.log("res signup ",resData);
        
    }

}

export default AuthResub;