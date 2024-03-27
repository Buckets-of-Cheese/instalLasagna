import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { EditRecipe, ViewRecipe, YourRecipes, LandingPage, Auth, Search, NotFound } from './pages';
import { Protect, Header, Footer } from './components';
import { useStore } from './store'
import './App.css'

function App() {

  const { state, setState } = useStore()

  return (
    <>
      {
        state.loading ? (
          <p>Loading...</p>
        ) : (
          <>

            <Header />
            
            <main>

              <Routes>

                <Route path="/" element={<LandingPage />} />

                <Route path="/search" element={<Search />} />

                <Route path="/view-recipe" element={<ViewRecipe />} />

                <Route path="/your-recipes" element={
                  <Protect>
                    <YourRecipes />
                  </Protect>
                } />

                <Route path="/edit-recipe" element={
                  <Protect>
                    <EditRecipe />
                  </Protect>
                } />

                <Route path="/auth" element={
                  <Protect>
                    <Auth />
                  </Protect>
                } />

<Route path="*" element={<NotFound />} />


              </Routes>

            </main>

            <Footer />
          </>
        )
      }
    </>
  )
}

export default App
