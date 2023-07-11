import styles from './ContactList.module.css';

export const ContactList = props => {
  const { user, deleteFunction } = props;
  const valuesList = user.map(input => {
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Lastname</th>
            <th>email</th>
            <th>City</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.row} key={input.id}>
            <td className={styles.line}>{input.name}</td>
            <td className={styles.line}>{input.lastname}</td>
            <td className={styles.line}>{input.email}</td>
            <td className={styles.line}>{input.city}</td>
            <td className={styles.line}>
              <button type="button" onClick={() => deleteFunction(input.id)} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  });
  return (
    <div>
      <ul className={styles.list}> {valuesList}</ul>
    </div>
  );
};
