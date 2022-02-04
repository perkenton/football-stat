import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import CompetitionsPage from './components/Competitions/components/CompetitionsPage';
import CompetitionPage from './components/Competition/components/CompetitionPage';


function App() {

  return (
    <HashRouter>
      <Header />
      <main className={ styles.main }>
        <Routes>
          <Route path='/' element={ <CompetitionsPage /> } />
          <Route path='competition/:competitionId' element={ <CompetitionPage /> } />
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;
