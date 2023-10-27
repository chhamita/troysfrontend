import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Implement your signup logic here, e.g., send a request to a server.

    // For this example, we'll just log the user's information.
    // console.log('First Name:', firstName);
    // console.log('Last Name:', lastName);
    // console.log('Email:', email);
    // console.log('Password:', password);
  };

  return (
    <div className='wrapper'>
      <Container>
        <div className='row'>
          <div className='col-md-6 mx-auto'>
            <div className='border-0 card shadow-lg'>
              <div className="bg-secondary-subtle card-header">
                <h4 className='mb-0 text-center'>Sign Up</h4>
              </div>
              <div className='card-body'>
                <form>
                  <div className='form-group mb-3'>
                    <label className='fw-medium'>First Name:</label>
                    <input className='form-control'
                      type="email"
                      placeholder="Enter your email"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
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
                  <div className="text-center">
                    <button type="button" className='btn btn-primary px-4' onClick={handleSignup}>Sign Up </button>
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

export default Signup;
