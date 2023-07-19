import React from 'react';

import ContactForm from 'components/ContactForm/ContactForm';

export const App = () => {
  return (
    <div>
      <section
        style={{
          display: 'flex',
          margin: 10,
        }}
      >
        <div className="box">
          <ContactForm />
        </div>
      </section>
    </div>
  );
};
