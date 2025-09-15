import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Bug Bounty Resources',
    Svg: require('@site/static/img/undraw_programmer.svg').default,
    description: (
      <>
        Learn the best bug bounty techniques, methodology, and checklists.
      </>
    ),
  },
  {
    title: 'CTF Strategies & Checklists',
    Svg: require('@site/static/img/undraw_checklist.svg').default,
    description: (
      <>
        Learn the best CTF techniques, methodology, and checklists.
      </>
    ),
  },
  {
    title: 'Pentesting Methodologies',
    Svg: require('@site/static/img/undraw_hacker.svg').default,
    description: (
      <>
        Follow real-world pentesting methodologies used by professionals.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
