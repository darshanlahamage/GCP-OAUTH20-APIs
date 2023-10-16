import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import googleLogo from '../Google__G__Logo.svg.webp';
import jwt_decode from 'jwt-decode';
import { useUser } from '../UserContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';


function Signup() {
  const { updateUser } = useUser();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignin = (CredentialResponse) => {
    const cred = jwt_decode(CredentialResponse.credential);

    if (cred) {
      updateUser(cred);
      navigate('/mainscreen', { replace: true });
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-content">
        <div className="logo">
          <img src={googleLogo} alt="Google Logo" className="google-logo" />
        </div>
        <div className="info">
          <div className="info-text">
            <h1>Welcome !!!!</h1>
            <h2>Experiment No. 5</h2>
          </div>
          <div className="google-login">
            <GoogleOAuthProvider clientId='178873698881-2oatlpis7dsjjrmo312eutc8t1vspo47.apps.googleusercontent.com'>
              <GoogleLogin
                onSuccess={handleSignin}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
