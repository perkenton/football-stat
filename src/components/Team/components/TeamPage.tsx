import React from 'react';
import { TeamRepositoryImpl, TeamRepository } from '../model/TeamRepository';
import { TeamPresenterImpl, TeamPresenter } from '../model/TeamPresenter';
import Team from './Team';

function TeamPage() {
  const teamRepositoryImpl: TeamRepository = new TeamRepositoryImpl();
  const teamPresenter: TeamPresenter = new TeamPresenterImpl(teamRepositoryImpl);

  return <Team teamPresenter={ teamPresenter } />
}

export default TeamPage;