import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Tabs } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import styles from './Competition.module.scss';
import { CompetitionRepository } from '../model/CompetitionRepository';
import MatchesTable from './MatchesTable';
import TeamsTable from './TeamsTable';
import { CompetitionType, Match, Team } from '../../../common/model';

enum TabsType {
  MATCHES = 'MATCHES',
  TEAMS = 'TEAMS',
}


function Competition(props: { competitionRepository: CompetitionRepository }) {
  let params = useParams();
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
          <MatchesTable matches={ match } />
        </TabPane>

        <TabPane
          key='TEAMS'
          tab={ <div >Команды</div> }
        >
          <TeamsTable teams={ teams } />
        </TabPane>
      </Tabs>
    </>
  );
}

export default Competition;