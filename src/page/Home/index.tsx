import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import BottomLeft from './BottomLeft';
import BottomRight from './BottomRight';
import TopLeft from './TopLeft';
import TopRight from './TopRight';
import axios from '../../api/index';

interface IList {
  title: string;
  img: string;
  num: number;
}

const Home = () => {
  const [list, setList] = useState<IList[]>([]);
  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await axios.get(`/user?id=${1}`);
        setList(data.dataLikeList);
      } catch (err) {
      } finally {
      }
    };
    init();
  }, []);
  return (
    <div className={styles.home_warp}>
      <TopLeft list={list}></TopLeft>
      <TopRight></TopRight>
      <BottomLeft></BottomLeft>
      <BottomRight></BottomRight>
    </div>
  );
};

export default Home;
