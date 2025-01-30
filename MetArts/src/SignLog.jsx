import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignLog.css';
import img1 from './assets/bk1.jpg';
import { auth, db } from './firebase'; // Import db from firebase.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
function Signup() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate=useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setName('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Logged in successfully!');
        navigate('/Funchoose')
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          fullName: name,
          email: email
        });

        alert('Signed up successfully!');
       
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="" style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', padding: '0px', margin: '0px' }}>
      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            
            <div className="col-12 text-center align-self-center py-5">

              <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <h1 className="custom-font">MetArts</h1>
                <h6 className="mb-0 pb-3">
                  <span onClick={() => setIsLogin(true)}>Log In</span>
                  <span onClick={() => setIsLogin(false)}>Sign Up</span>
                </h6>
                <input
                  className="checkbox d-none"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                  checked={!isLogin}
                  onChange={toggleForm}
                />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className={`card-${isLogin ? 'front' : 'back'} card-body`}>
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">{isLogin ? 'Log In' : 'Sign Up'}</h4>
                          {error && <div className="alert alert-danger">{error}</div>}
                          <form onSubmit={handleSubmit}>
                            {!isLogin && (
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-style form-control"
                                  placeholder="Your Full Name"
                                  value={name}
                                  id="logname"
                                  onChange={(e) => setName(e.target.value)}
                                  required
                                />
                                <i className="input-icon uil uil-user"></i>
                              </div>
                            )}
                            <div className="form-group mt-2">
                              <input
                                type="email"
                                name="logemail"
                                className="form-style form-control"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                id="logemail"
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                name="logpass"
                                className="form-style form-control"
                                placeholder="Your Password"
                                id="logpass"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>
                            <button type="submit" className="btn btn-primary mt-4" disabled={loading}>
                              {loading ? 'Submitting...' : 'Submit'}
                            </button>
                            {isLogin && (
                              <p className="mb-0 mt-4 text-center">
                                <a href="#0" className="link">Forgot your password?</a>
                              </p>
                            )}
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
