import React from 'react';
import { CompetitionsRepositoryImpl, CompetitionsRepository } from '../model/CompetitionsRepository';
import { CompetitionsPresenter, CompetitionsPresenterImpl } from '../model/CompetitionsPresenter';
import Competitions from './Competitions';


function CompetitionsPage() {
  const competitionsRepository: CompetitionsRepository = new CompetitionsRepositoryImpl();
  const competitionsPresenter: CompetitionsPresenter = new CompetitionsPresenterImpl(competitionsRepository);

  return <Competitions competitionsPresenter={ competitionsPresenter } />
}

export default CompetitionsPage;