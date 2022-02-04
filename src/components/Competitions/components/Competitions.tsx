import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Competitions.module.scss';
import { CompetitionsRepository } from '../model/CompetitionsRepository';
import { CompetitionType } from '../../../common/model';

function Competitions(props: { competitionsRepository: CompetitionsRepository }) {
  const [ competitions, setCompetitions ] = useState<CompetitionType[]>([]);

  async function getCompetitions() {
    setCompetitions(await props.competitionsRepository.getCompetitions());
  }

  useEffect(() => {
    getCompetitions();
  }, [])


  return (
    <>
      <h1 className={ styles.title }>Турниры</h1>
      <ul className={ styles.competitionsList }>
        {
          competitions.map((item: CompetitionType) => {
            return (
              <Link to={ `/competition/${item.id}` } className={ styles.cardLink } key={ item.id }>
                <li className={ styles.card }>
                  <figure className={ styles.cardHeader }>
                    <img src={ item.area.ensignUrl || item.emblemUrl } alt='Логотип турнира' className={ styles.cardImg } />
                  </figure>
                  <figcaption className={ styles.cardBody }>
                    <p className={ styles.cardTitle }>{ item.name }</p>
                    <p className={ styles.cardSubtitle }>{ item.area.name }</p>
                  </figcaption>
                </li>
              </Link>
            )
          })
        }
      </ul>
    </>
  );
}

export default Competitions;