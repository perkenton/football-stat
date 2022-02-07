import React, { useEffect, useState } from 'react';
import styles from './Team.module.scss';
import { TeamPresenter } from '../model/TeamPresenter';
import { TeamType, Match, ActiveCompetitions } from '../../../common/model';
import MatchesTable from '../../../common/components/MatchesTable/MatchesTable';


function Team(props: { teamPresenter: TeamPresenter}) {
  const [ team, setTeam ] = useState<TeamType>();
  const [ matches, setMatches ] = useState<Match[]>();

  async function getTeam() {
    setTeam(await props.teamPresenter.getTeam())
  }

  async function getMatches() {
    setMatches(await props.teamPresenter.getTeamsMatch());
  }

  useEffect(() => {
    getTeam();
    getMatches();
  }, [])


  return (
    <>
      <div className={ styles.pageHeader }>
        <div className={ styles.titleBlock }>
          <h1 className={ styles.title }>{ team?.name }</h1>
          { team?.crestUrl && <img src={ team?.crestUrl } alt='Лого' height='24'/> }
        </div>
        <p className={ styles.subtitle }>{ team?.area.name }</p>
      </div>
      <div className={ styles.teamData }>
        <span className={ styles.dataTitle }>Год основания</span>
        <span className={ styles.dataValue }>{ team?.founded }</span>
        <span className={ styles.dataTitle }>Сайт</span>
        <span className={ styles.dataValue }><a href={ team?.website } target='_blank' >{ team?.website }</a></span>
        <span className={ styles.dataTitle }>Стадион</span>
        <span className={ styles.dataValue }>{ team?.venue }</span>
        <span className={ styles.dataTitle }>Текущие турниры</span>
        <ul className={ styles.dataList }>
          {
            team?.activeCompetitions?.map((item: ActiveCompetitions) => {
              return <li key={ item.id } className={ styles.dataItem }>{ item?.name }</li>
            })
          }
        </ul>
        {/* TODO: добавить состав, может в модалке */}
      </div>
      <MatchesTable matches={ matches } activeTeam={ team?.id } loading={ props.teamPresenter.loading } />
    </>
  )
}

export default Team;