import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import logoFooter from '../../../assets/figma/logo-footer.svg';
import { BANNER_PLACEHOLDER_BG, colors } from '../../../constants/designTokens';
import { useSnapCarousel } from '../../../hooks/useSnapCarousel';

interface BannerCarouselProps {
  images: string[];
  alt: string;
}

/**
 * Carousel bằng CSS scroll-snap: vuốt được trên mobile mà không cần thư viện.
 * Chấm chỉ báo vị trí + bấm để chuyển ảnh. Không tự chạy (Figma không yêu cầu).
 * Dự án chưa có ảnh (4/10 dự án trên UAT): vẫn giữ khung cùng tỷ lệ + logo, để layout không giật
 * và link chia sẻ vẫn cuộn đúng tới thanh tab.
 */
export default function BannerCarousel({ images, alt }: BannerCarouselProps) {
  const { trackRef, active, onScroll: handleScroll, goTo } = useSnapCarousel();

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        // Tỷ lệ khung banner trên Figma: 1392x725 (web) và 370x192.7 (mobile) — cùng ~1.92
        aspectRatio: '1392 / 725',
        // Figma: 8px mobile / 16px web (chuỗi px — số trong sx bị nhân với shape.borderRadius 8px)
        borderRadius: { xs: '8px', md: '16px' },
        overflow: 'hidden',
        bgcolor: BANNER_PLACEHOLDER_BG,
      }}
    >
      {images.length === 0 && (
        <Box
          component="img"
          src={logoFooter}
          alt=""
          sx={{ position: 'absolute', inset: 0, m: 'auto', width: { xs: 48, md: 96 }, height: 'auto', opacity: 0.5 }}
        />
      )}
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
