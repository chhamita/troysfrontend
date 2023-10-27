import React, { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleLogin = () => {
    const predefinedEmail = 'user@example.com';
    const predefinedPassword = 'password123';

    if (email === predefinedEmail && password === predefinedPassword) {
      setLoginError(false);
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');// Store the login status in localStorage
    } else {
      setIsLoggedIn(false);
      setLoginError(true);
    }
  };

  return (
    <div className='wrapper'>
      <Container>
        <div className='row'>
          <div className='col-md-6 mx-auto'>
            <div className='border-0 card shadow-lg'>
              <div className="bg-secondary-subtle card-header">
                <h4 className='mb-0 text-center text-white'>Login</h4>
              </div>
              <div className='card-body'>
                <form>
                  <div className='form-group mb-3'>
                    <label className='fw-medium'>Email:</label>
                    <input className='form-control'
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className='form-group mb-3'>
                    <label className='fw-medium'>Password:</label>
                    <input className='form-control'
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {loginError && (
                    <Alert variant="danger">Invalid email or password. Please try again.</Alert>
                  )}
                  <div className="text-center">
                    <button type="button" className='btn btn-primary px-4 login-btn' onClick={handleLogin}>Login </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Login;
