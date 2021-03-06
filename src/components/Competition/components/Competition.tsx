import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, DatePicker, Form, Tabs, Tooltip, Input } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import styles from './Competition.module.scss';
import { CompetitionPresenter } from '../model/CompetitionPresenter';
import { CompetitionType, DatesFilter, Match, TeamType } from '../../../common/model';
import MatchesTable from '../../../common/components/MatchesTable/MatchesTable';
import TeamsTable from './TeamsTable';

enum TabsType {
  MATCHES = 'MATCHES',
  TEAMS = 'TEAMS',
}


function Competition(props: { competitionPresenter: CompetitionPresenter }) {
  const DATE_FORMAT = 'DD.MM.YYYY';
  const { TabPane } = Tabs;
  const [ form ] = Form.useForm();
  const { Search } = Input;
  let navigate = useNavigate();

  const [ competition, setCompetition ] = useState<CompetitionType>();
  const [ match, setMatch ] = useState<Match[]>();
  const [ teams, setTeams ] = useState<TeamType[]>();
  const [ tabActiveKey, setTabActiveKey ] = useState<string>(TabsType.MATCHES);


  async function getCompetition() {
    setCompetition(await props.competitionPresenter.getCompetition())
  }

  async function getMatches(values?: DatesFilter) {
    setMatch(await props.competitionPresenter.getMatches(values));
  }

  async function getTeams() {
    setTeams(await props.competitionPresenter.getTeams());
  }

  async function searchMatches(values: DatesFilter) {
    await props.competitionPresenter.historyPush(values);
    getMatches(values);
    form.resetFields();
  }

  async function handleSearch(value: string) {
    if(!value) {
      props.competitionPresenter.clearSearchRequest();
      navigate(`/competition?competitionId=${props.competitionPresenter.competitionId}`);
      getTeams();
      return;
    }
    const searchValue = value.trim().toLowerCase();
    if(value) navigate(`/competition?competitionId=${props.competitionPresenter.competitionId}&search=${searchValue}`);
    setTeams(await props.competitionPresenter.searchTeams(searchValue));
  }

  async function resetFilter() {
    await props.competitionPresenter.resetFilter();
    getMatches();
  }

  async function resetSearchRequest() {
    await props.competitionPresenter.resetSearch();
    getTeams();
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
          tab={ <div >?????????????????? ??????</div> }
        >
          <div className={ styles.paneHeader }>
            <span className={ styles.text }>?????????? ???? ????????:</span>

            <Form
              onFinish={ searchMatches }
              className={ styles.form }
              form={ form }
              // initialValues={  } // TODO: ?????????????? initialValues ?????????? ???????????????????? ???????????????? ?? ????????????????
            >
              <Form.Item name='dateFrom' rules={[{ required: true, message: '???????????????? ????????' }]}>
                <DatePicker format={ DATE_FORMAT } placeholder='?? ????????????-????' size='small' />
              </Form.Item>
              <Form.Item name='dateTo' rules={[{ required: true, message: '???????????????? ????????' }]}>
                <DatePicker format={ DATE_FORMAT } placeholder='???? ??????????-????' size='small' />
              </Form.Item>
              <Button
                htmlType='submit'
                size='small'
                className={ styles.button }
                disabled={ props.competitionPresenter.loading }
              >
                ??????????
              </Button>
            </Form>
            <Button
              size='small'
              className={ styles.button }
              onClick={ resetFilter }
            >
              ????????????????
            </Button>

            <Tooltip key={ 2 } title='???????????????? ??????????????????' className={ styles.updateButton }>
              <Button
                shape='circle'
                type='ghost'
                size='small'
                icon={ <RedoOutlined /> }
                onClick={ () => getMatches() }
                loading={ props.competitionPresenter.loading }
              />
            </Tooltip>
          </div>

          <MatchesTable matches={ match } loading={ props.competitionPresenter.loading } />
        </TabPane>

        <TabPane
          key='TEAMS'
          tab={ <div >??????????????</div> }
        >
          <div className={ styles.paneHeader }>
            <Search
              id='search'
              autoComplete='off'
              spellCheck={ false }
              size='small'
              placeholder='?????????? ???? ????????????????'
              className={ styles.searchInput }
              allowClear
              onSearch={ (value) => handleSearch(value) }
            />
            <Button
              size='small'
              onClick={ resetSearchRequest }
            >
              ????????????????
            </Button>
          </div>

          <TeamsTable teams={ teams } loading={ props.competitionPresenter.loading } />
        </TabPane>
      </Tabs>
    </>
  );
}

export default Competition;