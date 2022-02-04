import React, { useEffect, useState } from 'react';
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
              <a href={ `#${item.id}` } className={ styles.cardLink } key={ item.id }>
                <li className={ styles.card }>
                  <figure className={ styles.cardHeader }>
                    <img src={ item.area.ensignUrl || item.emblemUrl } alt='Логотип турнира' className={ styles.cardImg } />
                  </figure>
                  <figcaption className={ styles.cardBody }>
                    <p className={ styles.cardTitle }>{ item.name }</p>
                    <p className={ styles.cardSubtitle }>{ item.area.name }</p>
                  </figcaption>
                </li>
              </a>
            )
          })
        }
      </ul>
    </>
  );
}

export default Competitions;