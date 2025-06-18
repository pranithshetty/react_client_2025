import './App.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthForm from './components/Auth/AuthForm';

// Wrap App with GoogleOAuthProvider
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={clientId}>
          <AuthForm />
        </GoogleOAuthProvider>
      </Provider>
    </>
  );
}

export default App;
