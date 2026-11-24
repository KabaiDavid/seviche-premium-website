import images from '../data/images.json';

type ImgName = keyof typeof images;
type Props = {
  name: ImgName;
  alt: string;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  position?: string;
  priority?: boolean;
  fill?: boolean;
  reveal?: 'mask' | 'fade' | boolean;
  delay?: number;
  parallax?: number;
  style?: React.CSSProperties;
};

/** Responsive <picture> with AVIF + WebP sources, LQIP background and intrinsic size (no CLS). */
export function Img({
  name,
  alt,
  sizes = '100vw',
  className = '',
  imgClassName,
  position,
  priority,
  fill,
  reveal,
  delay,
  parallax,
  style,
}: Props) {
  const m = images[name];
  const set = (ext: string) => m.widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(', ');
  const fallbackW = m.widths.find((w) => w >= 960) ?? m.widths[m.widths.length - 1];
  const revealAttr = reveal === true ? '' : reveal || undefined;
  return (
    <div
      className={`img ${fill ? 'img--fill' : ''} ${className}`}
      style={{
        backgroundImage: `url(${m.lqip})`,
        aspectRatio: fill ? undefined : `${m.w} / ${m.h}`,
        ...(delay ? ({ '--d': `${delay}ms` } as React.CSSProperties) : {}),
        ...style,
      }}
      data-reveal={revealAttr}
    >
      <picture>
        <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
        <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
        <img
          src={`/img/${name}-${fallbackW}.webp`}
          alt={alt}
          width={m.w}
          height={m.h}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : undefined}
          className={imgClassName}
          style={position ? { objectPosition: position } : undefined}
          data-parallax={parallax}
        />
      </picture>
    </div>
  );
}
