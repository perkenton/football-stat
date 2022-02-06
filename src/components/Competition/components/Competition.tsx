import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Tabs, Tooltip } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import styles from './Competition.module.scss';
import { CompetitionPresenter } from '../model/CompetitionPresenter';
import { CompetitionType, DatesFilter, Match, Team } from '../../../common/model';
import MatchesTable from './MatchesTable';
import TeamsTable from './TeamsTable';

enum TabsType {
  MATCHES = 'MATCHES',
  TEAMS = 'TEAMS',
}


function Competition(props: { competitionPresenter: CompetitionPresenter }) {
  const DATE_FORMAT = 'DD.MM.YYYY';
  const { TabPane } = Tabs;
  const [ form ] = Form.useForm();

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
            <span className={ styles.text }>Фильтр по дате:</span>

            <Form
              onFinish={ searchMatches }
              className={ styles.form }
              form={ form }
              // initialValues={  } // TODO: сделать initialValues после обновления страницы с запросом
            >
              <Form.Item name='dateFrom' rules={[{ required: true, message: 'Выберите дату' }]}>
                <DatePicker format={ DATE_FORMAT } placeholder='с такого-то' size='small' />
              </Form.Item>
              <Form.Item name='dateTo' rules={[{ required: true, message: 'Выберите дату' }]}>
                <DatePicker format={ DATE_FORMAT } placeholder='по такое-то' size='small' />
              </Form.Item>
              <Button
                htmlType='submit'
                size='small'
                className={ styles.button }
                disabled={ props.competitionPresenter.loading }
              >
                Найти
              </Button>
            </Form>
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