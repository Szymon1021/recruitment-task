import { nanoid } from 'nanoid';
import styles from './ContactList.module.css';
import StaticMap from 'components/map/StaticMap';

export const ContactList = props => {
  const { user } = props;
  const valuesList = user.map(input => {
    return (
      <li className={styles.contactlist} key={nanoid()}>
        {input.name}: {input.lastname}
      </li>
    );
  });
  return (
    <div>
      <ul className={styles.list}> {valuesList}</ul>

      <StaticMap></StaticMap>
    </div>
  );
};
