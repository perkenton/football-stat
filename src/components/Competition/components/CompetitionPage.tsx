import React from 'react';
import { CompetitionRepositoryImpl, CompetitionRepository } from '../model/CompetitionRepository';
import Competition from './Competition';


function CompetitionPage() {
  const competitionRepository: CompetitionRepository = new CompetitionRepositoryImpl();

  return <Competition competitionRepository={ competitionRepository } />
}

export default CompetitionPage;