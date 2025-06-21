
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/homeScreen'
import ChatPage from './pages/Chat/chatScreen'
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route 
          path='/' 
          element={
            <RecoilRoot>
              <Home/>
            </RecoilRoot>
          }
        />
        <Route 
          path='/chatPage' 
          element={
            <RecoilRoot>
              <ChatPage/>
            </RecoilRoot>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
