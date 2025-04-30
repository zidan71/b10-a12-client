import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper core styles
import 'swiper/css/navigation'; // If you're using the Navigation module
import 'swiper/css/pagination'; // If you're using the Pagination module
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import img1 from '../../assets/annie-spratt-fDghTk7Typw-unsplash.jpg'
import img2 from '../../assets/jen-theodore-bfFvK1b6-hA-unsplash.jpg'
import img3 from '../../assets/d-ng-h-u-CCjgYjUudxE-unsplash.jpg'

const Banner = () => {
    return (
        <div className="relative w-full h-[500px]">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation
          pagination={{ clickable: true }}
          className="w-full h-full"
        >
          {/* First Slide */}
          <SwiperSlide>
            <div className="relative w-full h-full bg-gradient-to-r from-blue-500 to-purple-600">
              <img
                src={img1}
                alt=""
                className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center">
                <div className="text-white p-6">
                  <h2 className="text-4xl font-bold mb-4">Find Your Perfect Match</h2>
                  <p className="text-lg mb-6">Join us today and begin your journey toward love!</p>
                  <button className="bg-purple-700 text-white py-2 px-6 rounded-full text-xl hover:bg-purple-800 transition">
                    Join Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
  
          {/* Second Slide */}
          <SwiperSlide>
            <div className="relative w-full h-full bg-gradient-to-r from-orange-500 to-yellow-600">
              <img
                src={img2}
               
                className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center">
                <div className="text-white p-6">
                  <h2 className="text-4xl font-bold mb-4">Your Future Starts Here</h2>
                  <p className="text-lg mb-6">Explore profiles, connect with people who share your values.</p>
                  <button className="bg-orange-700 text-white py-2 px-6 rounded-full text-xl hover:bg-orange-800 transition">
                    Start Searching
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
  
          {/* Third Slide */}
          <SwiperSlide>
            <div className="relative w-full h-full bg-gradient-to-r from-teal-500 to-green-600">
              <img
                src={img3}
                
                className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center">
                <div className="text-white p-6">
                  <h2 className="text-4xl font-bold mb-4">Join Our Matrimonial Family</h2>
                  <p className="text-lg mb-6">Meet singles with similar interests and build a lasting relationship.</p>
                  <button className="bg-teal-700 text-white py-2 px-6 rounded-full text-xl hover:bg-teal-800 transition">
                    Explore Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    );
};

export default Banner;