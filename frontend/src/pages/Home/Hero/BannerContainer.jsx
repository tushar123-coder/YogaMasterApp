import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { Autoplay, EffectCreative } from 'swiper';
import Banner from './Banner';
import Banner2 from './Banner2';

function BannerContainer() {
  return (
    <section>
      <Swiper
        grabCursor={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ['-120%', 0, -500],
          },
          next: {
            shadow: true,
            translate: ['120%', 0, -500],
          },
        }}
        modules={[EffectCreative, Autoplay]} // Ensure all modules are correctly included
        className='mySwiper5'
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide><Banner /></SwiperSlide>
        <SwiperSlide><Banner2 /></SwiperSlide>
      </Swiper>
    </section>
  );
}

export default BannerContainer;
