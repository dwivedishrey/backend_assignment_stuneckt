import React, { useState } from 'react'
import twitterimg from '../../assets/images/twitter.jpeg'
import TwitterIcon from '@mui/icons-material/Twitter';
import auth from '../../firebase.init';
import {useCreateUserWithEmailAndPassword, useSignInWithGoogle} from 'react-firebase-hooks/auth'
import GoogleButton from 'react-google-button'
import {Link, useNavigate} from 'react-router-dom'
import './Login.css'
import axios from 'axios';
const Signup = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    //const [error,setError]=useState('');
    const [username,setUsername]=useState('');
    const [name,setName]=useState('');
    const [errors, setError] = useState("");
    const navigate=useNavigate();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
      const [signInWithGoogle, googleuser, googleloading, googleerror] = useSignInWithGoogle(auth);
      if(user||googleuser){
        navigate('/')
        console.log(user)
        console.log(googleuser)
      }
      if(error){
        console.log(error.message)
      }
      if(loading){
        console.log("loading...")
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await createUserWithEmailAndPassword(email, password);
            const user = {
                username: username,
                name: name,
                email: email,
            }

            fetch(`http://localhost:5000/register`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        console.log(data)
                        navigate('/')
                    }
                })

        } catch (err) {
            setError(err.message);
            window.alert(err.message);
        }
      
    }
  console.log(user)
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
        await signInWithGoogle;
        navigate("/");
    } catch (error) {
        console.log(error.message);
        console.log(error);
    }


  }
  return (
    <div className="login-container">

                <div className="image-container">
                    <img className="image" src={twitterimg} alt="twitterImage" />
                </div>


                <div className="form-container">
                    <div className="">
                        <TwitterIcon className="Twittericon" style={{ color: "skyblue" }} />

                        <h2 className="heading">Happening now</h2>

                        <div class="d-flex align-items-sm-center">
                            <h3 className="heading1"> Join twitter today </h3>
                        </div>


             
                        <form onSubmit={handleSubmit}>

                            <input className="display-name" style={{ backgroudColor: "red" }}
                                type="username"
                                placeholder="@username "
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <input className="display-name" style={{ backgroudColor: "red" }}
                                type="name"
                                placeholder="Enter Full Name"
                                onChange={(e) => setName(e.target.value)}
                            />

                            <input className="email"
                                type="email"
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}
                            />



                            <input className="password"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />


                            <div className="btn-login">
                                <button type="submit" className="btn">Sign Up</button>
                            </div>
                        </form>
                        <hr />
                        <div className="google-button">
                            <GoogleButton

                                className="g-btn"
                                type="light"
                                onClick={handleGoogleSignIn}

                            />
                        </div>
                        <div>
                            Already have an account?
                            <Link
                                to="/login"
                                style={{
                                    textDecoration: 'none',
                                    color: 'var(--twitter-color)',
                                    fontWeight: '600',
                                    marginLeft: '5px'
                                }}
                            >
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default Signup
