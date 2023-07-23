import './styles.css';
import ContactForm from 'pages/ContactForm/ContactForm';

export const App = () => {
  return (
    <div>
      <div className="header">
        <h1>Form</h1>
      </div>
      <hr className="hr" />
      <ContactForm />
    </div>
  );
};
