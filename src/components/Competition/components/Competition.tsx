import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Tabs } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import styles from './Competition.module.scss';
import { CompetitionPresenter } from '../model/CompetitionPresenter';
import { CompetitionType, DatesFilter, Match, Team } from '../../../common/model';
import MatchesTable from './MatchesTable';
import TeamsTable from './TeamsTable';
import { CompetitionType, Match, Team } from '../../../common/model';

enum TabsType {
  MATCHES = 'MATCHES',
  TEAMS = 'TEAMS',
}


function Competition(props: { competitionPresenter: CompetitionPresenter }) {
  const { TabPane } = Tabs;

  const [ competition, setCompetition ] = useState<CompetitionType>();
  const [ match, setMatch ] = useState<Match[]>();
  const [ teams, setTeams ] = useState<Team[]>();
  const [ tabActiveKey, setTabActiveKey ] = useState<string>(TabsType.MATCHES);


  async function getCompetition() {
    params.competitionId && setCompetition(await props.competitionRepository.getCompetition(+params.competitionId))
  }

  async function getMatches() {
    params.competitionId && setMatch(await props.competitionRepository.getMatches(+params.competitionId));
  }

  async function getTeams() {
    params.competitionId && setTeams(await props.competitionRepository.getTeams(+params.competitionId));
  }

  useEffect(() => {
    getCompetition();
  }, [])

  useEffect(() => {
    if(tabActiveKey === TabsType.MATCHES) {
      !match && getMatches();
    } else if(tabActiveKey === TabsType.TEAMS) {
      !teams && getTeams();
    }
  }, [tabActiveKey])


  return (
    <>
      <div className={ styles.pageHeader }>
        <h1 className={ styles.title }>{ competition?.name }</h1>
        <p className={ styles.subtitle }>{ competition?.area.name }</p>
      </div>

      <Tabs
        activeKey={ tabActiveKey }
        onTabClick={ (key) => setTabActiveKey(key) }
        style={{ width: '100%', padding: '24px 0 16px 0' }}
      >
        <TabPane
          key='MATCHES'
          tab={ <div >Календарь игр</div> }
        >
          <div className={ styles.paneHeader }>
            <Button
              type='ghost'
              size='small'
              icon={ <RedoOutlined /> }
              onClick={ () => getMatches() }
            >
              Обновить календарь
            </Button>
          </div>

          <MatchesTable matches={ match } loading={ props.competitionPresenter.loading } />
        </TabPane>

        <TabPane
          key='TEAMS'
          tab={ <div >Команды</div> }
        >
          {/* TODO: поиск по названию команды */}
          <TeamsTable teams={ teams } loading={ props.competitionPresenter.loading } />
        </TabPane>
      </Tabs>
    </>
  );
}

export default Competition;