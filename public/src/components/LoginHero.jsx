import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import hero1 from '../assets/loginHero.jpg';
import hero2 from '../assets/fighting.jpg';
import hero3 from '../assets/soccer.jpg';
import hero4 from '../assets/tenis.jpg';
import hero5 from '../assets/vollyball.jpg';

function LoginHero() {
  const images = [hero1, hero2, hero3, hero4, hero5];

  return (
    <div className="w-2/6 mt-6 h-[800px] overflow-hidden shadow-neon">
      <Slide
        duration={3000}
        transitionDuration={500}
        infinite
        autoplay
        indicators
        arrows={false}
      >
        {images.map((image, index) => (
          <div key={index} className="h-full">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slide>
    </div>
  );
}

export default LoginHero;