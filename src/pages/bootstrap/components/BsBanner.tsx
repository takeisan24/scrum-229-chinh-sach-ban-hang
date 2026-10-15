import { useSnapCarousel } from '../../../hooks/useSnapCarousel';

interface BsBannerProps {
  images: string[];
  alt: string;
}

/** Banner carousel (scroll-snap, dung chung logic voi ban MUI). Cham bam de chuyen anh. */
export default function BsBanner({ images, alt }: BsBannerProps) {
  const { trackRef, active, onScroll, goTo } = useSnapCarousel();

  return (
    <div className="bs-banner">
      <div ref={trackRef} className="bs-banner-track" onScroll={onScroll}>
        {images.map((src, index) => (
          <img key={index} src={src} alt={index === 0 ? alt : ''} loading={index === 0 ? 'eager' : 'lazy'} />
        ))}
      </div>
      {images.length > 1 && (
        <div className="bs-dots">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              className="bs-dot"
              aria-label={`Ảnh ${index + 1}`}
              aria-current={index === active}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
