
import './App.css'
import TicTacToe from './components/TicTacToe'
import { store } from './app/store'
import AddTodo from './components/AddTodo'
import AuthForm from './components/AuthForm'
import FromTestServer from './components/FromTestServer'
import ToDo from './components/Todos'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

// Wrap App with GoogleOAuthProvider
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <>
      <Provider store={store}>
        {/* <AddTodo/>
        <ToDo/> */}
        {/* <TicTacToe/> */}

        <FromTestServer/>
        <GoogleOAuthProvider clientId={clientId}>
        <AuthForm/>
        </GoogleOAuthProvider>
      </Provider>
     
    </>
  )
}

export default App
