import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import cn from 'classnames';
import styles from './MatchesTable.module.scss';
import { Match } from '../../model';
import scoreMaker from '../../utils/scoreMaker';
import formatDate from '../../utils/formatDate';
import { MATCH_STATUS_MAP } from '../../../components/Competition/constants';


function MatchesTable(props: {
  matches?: Match[],
  activeTeam?: number,
  loading: boolean,
}) {
  const { Column } = Table;

  return (
    <Table
      dataSource={ props.matches }
      rowKey='id'
      loading={ props.loading }
    >
      <Column
        title='Статус'
        key='status'
        align='left'
        render={ (match) => MATCH_STATUS_MAP[match.status] }
      />
      <Column
        title='Дата матча'
        key='utcDate'
        align='left'
        render={ (match) => formatDate(match.utcDate) }
      />
      <Column
        title='Хозяева'
        key='homeTeam'
        align='right'
        render={ (match) => {
          return (
            <Link
              to={ `/team?teamId=${match.homeTeam.id}` }
              className={ cn(match.homeTeam.id === props.activeTeam && styles.activeTeam) }
            >
              { match.homeTeam.name }
            </Link>
          )
        }}
      />
      <Column
        title='Счет'
        key='score'
        align='center'
        width={ 74 }
        render={(match) => {
          return scoreMaker(match.score)
        }}
      />
      <Column
        title='Гости'
        key='awayTeam'
        align='left'
        render={ (match) => {
          return (
            <Link
              to={ `/team?teamId=${match.awayTeam.id}` }
              className={ cn(match.awayTeam.id === props.activeTeam && styles.activeTeam) }
            >
              { match.awayTeam.name }
            </Link>
          )
        }}
      />
    </Table>
  )
}

export default MatchesTable;