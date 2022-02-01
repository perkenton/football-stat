import React from 'react';
import { CompetitionsRepositoryImpl, CompetitionsRepository } from '../model/CompetitionsRepository';
import Competitions from './Competitions';


function CompetitionsPage() {
  const competitionsRepository: CompetitionsRepository = new CompetitionsRepositoryImpl();

  return <Competitions competitionsRepository={ competitionsRepository } />
}

export default CompetitionsPage;