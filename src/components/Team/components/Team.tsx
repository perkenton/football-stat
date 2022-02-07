import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Tooltip } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import styles from './Team.module.scss';
import { TeamPresenter } from '../model/TeamPresenter';
import { TeamType, Match, ActiveCompetitions, DatesFilter } from '../../../common/model';
import MatchesTable from '../../../common/components/MatchesTable/MatchesTable';


function Team(props: { teamPresenter: TeamPresenter}) {
  const DATE_FORMAT = 'DD.MM.YYYY';
  const [ form ] = Form.useForm();
  const [ team, setTeam ] = useState<TeamType>();
  const [ matches, setMatches ] = useState<Match[]>();

  async function getTeam() {
    setTeam(await props.teamPresenter.getTeam())
  }

  async function getMatches(values?: DatesFilter) {
    setMatches(await props.teamPresenter.getTeamsMatch(values));
  }

  useEffect(() => {
    getTeam();
    getMatches();
  }, [props.teamPresenter.teamId])

  async function searchMatches(values: DatesFilter) {
    await props.teamPresenter.historyPush(values);
    getMatches(values);
    form.resetFields();
  }

  async function resetFilter() {
    await props.teamPresenter.resetFilter();
    getMatches();
  }


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

      <div className={ styles.formBlock }>
        <span className={ styles.text }>Фильтр по дате:</span>
        <Form
          onFinish={ searchMatches }
          className={ styles.form }
          form={ form }
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
            disabled={ props.teamPresenter.loading }
          >
            Найти
          </Button>
        </Form>

        <Button
          size='small'
          className={ styles.button }
          onClick={ resetFilter }
        >
          Сбросить
        </Button>

        <Tooltip key={ 2 } title='Обновить список' className={ styles.updateButton }>
          <Button
            shape='circle'
            type='ghost'
            size='small'
            icon={ <RedoOutlined /> }
            onClick={ () => getMatches() }
            loading={ props.teamPresenter.loading }
          />
        </Tooltip>
      </div>

      <MatchesTable matches={ matches } activeTeam={ team?.id } loading={ props.teamPresenter.loading } />
    </>
  )
}

export default Team;