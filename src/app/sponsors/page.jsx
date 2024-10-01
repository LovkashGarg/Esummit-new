// components/Sponsors.js
import React from 'react';
import Image from 'next/image';
import styles from './Sponsors.module.css';

const sponsors = [
  { name: 'Sponsor 1', logo: '/Events/BC_logo.png' },
  { name: 'Sponsor 2', logo: '/Events/BigBull_logo.png' },
  { name: 'Sponsor 3', logo: '/Events/E-JR_logo.png' },
  // Add more sponsors here
];

const Sponsors = () => {
  return (
    <div className={styles.sponsorsSection} style={{backgroundColor:"black"}}>
      <div className={styles.header}>
        <h2 className='text-white'>Our Sponsors</h2>
        <p className='text-white text-xl'>We are grateful for the support of our wonderful sponsors.</p>
      </div>
      <div className={styles.sponsorsGrid}>
        {sponsors.map((sponsor, index) => (
          <div key={index} className={styles.sponsorCard}>
            <Image
              src={sponsor.logo}
              alt={`${sponsor.name} logo`}
              width={200}
              height={100}
              className={styles.sponsorLogo}
            />
            <div className={styles.overlay}>
              <p>{sponsor.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
