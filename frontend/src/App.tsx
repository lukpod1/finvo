import './App.css'

import { Authenticator } from '@aws-amplify/ui-react';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h2>Lify App</h2>

        <Authenticator initialState="signUp">
          {({ signOut, user }) => (
            <main>
              <h1>Hello {user.attributes?.email}</h1>
              <button onClick={signOut}>Sign out</button>
            </main>
          )}
        </Authenticator>
      </header>
    </div>
  )
}

export default App
