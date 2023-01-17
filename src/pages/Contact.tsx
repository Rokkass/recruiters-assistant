import styles from './Contact.module.scss';
import React from 'react';
function Contact() {
     return (
        <div className={styles.contact__container}>
            <h1>Chcesz zostać rekruterem?</h1>
            <h2>
                Napisz do nas!<p>Wyślij wiadomość pod jeden z poniższych maili.</p>
            </h2>
            <ol>
                <li><a href="mailto:michal.sroka@student.up.krakow.pl">michal.sroka@student.up.krakow.pl</a></li>
                <li><a href="mailto:tomasz.maciol@student.up.krakow.pl">tomasz.maciol@student.up.krakow.pl</a></li>
                <li><a href="mailto:magdalena.zawodny@student.up.krakow.pl">magdalena.zawodny@student.up.krakow.pl</a></li>
            </ol>
        </div>
      );
}

export default Contact;
