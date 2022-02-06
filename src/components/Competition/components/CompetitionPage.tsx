import React from 'react';
import { CompetitionRepositoryImpl, CompetitionRepository } from '../model/CompetitionRepository';
import { CompetitionPresenterImpl, CompetitionPresenter } from '../model/CompetitionPresenter';
import Competition from './Competition';


function CompetitionPage() {
  const competitionRepository: CompetitionRepository = new CompetitionRepositoryImpl();
  const competitionPresenter: CompetitionPresenter = new CompetitionPresenterImpl(competitionRepository);

  return <Competition competitionPresenter={ competitionPresenter } />
}

export default CompetitionPage;