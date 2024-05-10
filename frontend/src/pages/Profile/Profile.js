import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import MainPage from './MainPage/MainPage';

function Profile() {

    const [user] = useAuthState(auth);
    return (
        <div className='profilePage'>
            <MainPage user={user} />
        </div>
    )
}

export default Profile
