import styles from './ContactList.module.css';

export const ContactList = props => {
  const { user } = props;
  const valuesList = user.map(input => {
    return (
      <div className={styles.contactlist}>
        <div className={styles.profile} id={input.id}>
          <p className={styles.name}>{input.name}</p>
          <p className={styles.name}>{input.lastname}</p>
          <p className={styles.location}>{input.woj}</p>
          <p className={styles.name}>{input.city}</p>
        </div>
      </div>
    );
  });
  return (
    <div>
      <ul className={styles.list}> {valuesList}</ul>
    </div>
  );
};
