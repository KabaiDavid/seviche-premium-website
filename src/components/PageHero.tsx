import type { ReactNode } from 'react';
import images from '../data/images.json';
import { Img } from './Img';

type Props = {
  eyebrow: string;
  title: ReactNode[];
  intro?: ReactNode;
  image?: keyof typeof images;
  imageAlt?: string;
  position?: string;
  children?: ReactNode;
};

/** Editorial page opener: split composition with a tall image, or type-only on wine. */
export function PageHero({ eyebrow, title, intro, image, imageAlt = '', position, children }: Props) {
  return (
    <section className={`page-hero grain ${image ? 'page-hero--image' : 'page-hero--type'}`} aria-labelledby="page-title">
      <div className="wrap page-hero__grid">
        <div className="page-hero__text">
          <p className="eyebrow page-hero__eyebrow">{eyebrow}</p>
          <h1 id="page-title" className="page-hero__title">
            {title.map((l, i) => (
              <span className="hero__line" key={i}>
                <span style={{ animationDelay: `${i * 0.1}s` }}>{l}</span>
              </span>
            ))}
          </h1>
          {intro && <div className="page-hero__intro lead">{intro}</div>}
          {children}
        </div>
        {image && (
          <div className="page-hero__media">
            <Img name={image} alt={imageAlt} priority sizes="(max-width: 900px) 100vw, 46vw" position={position} />
          </div>
        )}
      </div>
    </section>
  );
}
