import { nanoid } from 'nanoid';
import styles from './ContactList.module.css';

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
    </div>
  );
};
