import { observer } from 'mobx-react-lite';
import './App.css';
import AppRouter from './routes/AppRouter';
import NavBar from './components/navbar/NavBar.js';
import Footer from './components/footer/Footer.js';
import { useContext, useEffect, useState } from 'react';
import { Context } from './index';
import { check } from './http/userAPI';
import PageLoading from './components/loading/PageLoading.js';

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
        check().then(data => {
          user.setUser(data)
          user.setIsAuth(true)
        })
          .catch(error => {
            // Handle the error silently or provide a general message
            console.log("Authentication check failed:", error); // This logs the error but doesn't show it in the UI
            // Optionally: set some state here to show a user-friendly message if desired
          })
          .finally(() => setLoading(false))
    }, 1000)
  }, [])


  if (loading) {
    return (
      <PageLoading />
    )
  }

  return (
    <div className="App">
      <NavBar />
      <AppRouter />
      <Footer />
    </div>
  );
})

export default App  