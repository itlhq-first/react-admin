import React, { FC, useState } from 'react';
import styles from './index.module.scss';

interface IList {
  title: string;
  img: string;
  num: number;
}

interface IProps {
  list: IList[];
}

const TopLeft: FC<IProps> = ({ list }) => {
  return (
    <div className={styles.top_left_warp}>
      {list.map((item) => (
        <div key={item.title} className={styles.top_left_content}>
          <img src={item.img} alt="" />
          <div className={styles.top_left_value}>
            <span className={styles.top_left_title}>{item.title}</span>
            <span className={styles.top_left_num}>{item.num}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopLeft;
