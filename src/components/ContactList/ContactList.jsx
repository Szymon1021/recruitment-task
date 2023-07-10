import styles from './ContactList.module.css';
import { nanoid } from 'nanoid';

export const ContactList = props => {
  const { user, deleteFunction } = props;
  const valuesList = user.map(input => {
    return (
      <li className={styles.contactlist} key={nanoid()}>
        {input.name}-{input.lastname}: {input.email},{input.woj},{input.pow},
        {input.gmina}
        {input.city}
        <button type="button" onClick={() => deleteFunction(input.id)}>
          delete
        </button>
      </li>
    );
  });
  return (
    <div>
      <ul className={styles.list}> {valuesList}</ul>
    </div>
  );
};
