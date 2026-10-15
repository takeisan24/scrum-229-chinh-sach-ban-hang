import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { BANNER_PLACEHOLDER_BG, colors } from '../../../constants/designTokens';

interface BannerCarouselProps {
  images: string[];
  alt: string;
}

/**
 * Carousel bang CSS scroll-snap: vuot duoc tren mobile ma khong can thu vien.
 * Cham chi bao vi tri + bam de chuyen anh. Khong tu chay (Figma khong yeu cau).
 */
export default function BannerCarousel({ images, alt }: BannerCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    setActive(Math.round(track.scrollLeft / track.clientWidth));
  };

  const goTo = (index: number) => {
    const track = trackRef.current;
    track?.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        // Ty le khung banner tren Figma: 1392x725 (web) va 370x192.7 (mobile) — cung ~1.92
        aspectRatio: '1392 / 725',
        borderRadius: { xs: 2, md: 4 },
        overflow: 'hidden',
        bgcolor: BANNER_PLACEHOLDER_BG,
      }}
    >
      <Box
        ref={trackRef}
        onScroll={handleScroll}
        sx={{
          display: 'flex',
          height: '100%',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {images.map((src, index) => (
          <Box
            key={index}
            component="img"
            src={src}
            alt={index === 0 ? alt : ''}
            loading={index === 0 ? 'eager' : 'lazy'}
            sx={{ flex: '0 0 100%', width: '100%', height: '100%', objectFit: 'cover', scrollSnapAlign: 'start' }}
          />
        ))}
      </Box>

      {images.length > 1 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            p: 2,
          }}
        >
          {images.map((_, index) => (
            <ButtonBase
              key={index}
              aria-label={`Ảnh ${index + 1}`}
              aria-current={index === active}
              onClick={() => goTo(index)}
              sx={{
                width: index === active ? 32 : 8,
                height: 8,
                borderRadius: '100px',
                bgcolor: index === active ? colors.secondary400 : colors.grey200,
                transition: 'width 0.2s',
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
