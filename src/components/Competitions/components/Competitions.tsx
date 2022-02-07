import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './Competitions.module.scss';
import { CompetitionsPresenter } from '../model/CompetitionsPresenter';
import { CompetitionType } from '../../../common/model';


function Competitions(props: { competitionsPresenter: CompetitionsPresenter }) {
  const { Search } = Input;
  let navigate = useNavigate();
  const [ competitions, setCompetitions ] = useState<CompetitionType[]>([]);

  async function getCompetitions() {
    setCompetitions(await props.competitionsPresenter.getCompetitions());
  }

  useEffect(() => {
    getCompetitions();
  }, [])

  async function handleSearch(value: string) {
    if(!value) {
      props.competitionsPresenter.clearSearchRequest();
      navigate('/competitions');
      getCompetitions();
      return;
    }
    const searchValue = value.trim().toLowerCase();
    if(value) navigate(`/competitions?search=${searchValue}`);
    setCompetitions(await props.competitionsPresenter.searchCompetitions(searchValue));
  }


  return (
    <>
      <div className={ styles.pageHeader }>
        <h1 className={ styles.title }>Турниры</h1>
        <Search
          id='search'
          autoComplete='off'
          spellCheck={ false }
          size='large'
          placeholder='Название турнира'
          className={ styles.searchInput }
          allowClear
          onSearch={ (value) => handleSearch(value) }
        />
      </div>

      {
        props.competitionsPresenter.loading ?
        <LoadingOutlined className={ styles.loader } />
          :
        <ul className={ styles.competitionsList }>
          {
            competitions.map((item: CompetitionType) => {
              return (
                <Link to={`/competition?competitionId=${item.id}`} className={ styles.cardLink } key={ item.id }>
                  <li className={ styles.card }>
                    <figure className={ styles.cardHeader }>
                      <img src={ item.area.ensignUrl || item.emblemUrl } alt='Логотип турнира' className={ styles.cardImg } />
                    </figure>
                    <figcaption className={ styles.cardBody }>
                      <p className={ styles.cardTitle }>{ item.name }</p>
                      <p className={ styles.cardSubtitle }>{ item.area.name }</p>
                    </figcaption>
                  </li>
                </Link>
              )
            })
          }
        </ul>
      }
    </>
  );
}

export default Competitions;