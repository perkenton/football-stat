import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TeamsTable.module.scss';
import { Table } from 'antd';
import { TeamType } from '../../../common/model';


function TeamsTable(props: {
  teams?: TeamType[],
  loading: boolean,
}) {
  const { Column } = Table;


  return (
    <Table
      dataSource={ props.teams }
      rowKey='id'
      pagination={ false }
      loading={ props.loading }
    >
      <Column
        title='Команда'
        key='name'
        align='left'
        render={(team: TeamType) => {
          return (
            <Link to={`/team?teamId=${team.id}`} className={ styles.teamBlock }>
              <span className={ styles.teamLogo }>{ team.crestUrl && <img src={ team.crestUrl } alt='Лого' width='22' /> }</span>
              <span>{ team.name }</span>
            </Link>
          )
        }}
      />
      <Column
        title='Сайт'
        key='website'
        align='left'
        render={ (team) => <a href={ team.website } target='_blank'>{ team.website }</a> }
      />
      <Column
        title='Стадион'
        key='venue'
        align='left'
        render={(team) => <span>{ `${team.venue}, ${team.area.name}` }</span> }
      />
      <Column
        title='Год основания'
        dataIndex='founded'
        align='left'
      />
    </Table>
  )
}

export default TeamsTable;