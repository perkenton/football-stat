import React, {useEffect, useState} from 'react';
import styles from './Competitions.module.scss';
import { CompetitionsRepository } from '../model/CompetitionsRepository';
import { Competition } from '../../../common/model';

function Competitions(props: { competitionsRepository: CompetitionsRepository }) {
  const [ competitions, setCompetitions ] = useState<Competition[]>([]);

  async function getCompetitions() {
    setCompetitions(await props.competitionsRepository.getCompetitions());
  }

  useEffect(() => {
    getCompetitions();
  }, [])


  return (
    <div>
        competitions data
    </div>
  );
}

export default Competitions;