import React from 'react';
import { Table } from 'antd';
import { Match } from '../../../common/model';
import scoreMaker from '../utils/scoreMaker';
import formatDate from '../utils/formatDate';
import { MATCH_STATUS_MAP } from '../constants';


function MatchesTable(props: {
  matches?: Match[],
}) {
  const { Column } = Table;

  return (
    <Table
      dataSource={ props.matches }
      rowKey='id'
      // loading={ loading }
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
        render={ (match) => match.homeTeam.name }
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
        render={ (match) => match.awayTeam.name }
      />
    </Table>
  )
}

export default MatchesTable;