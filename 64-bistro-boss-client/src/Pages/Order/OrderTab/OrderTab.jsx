import FoodCard from "../FoodCard/FoodCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


const OrderTab = ({ items }) => {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    return (
        <div className="my-12" >

            <Swiper
                pagination={pagination}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div style={{
                        display: "Grid",
                        gap: "10px",
                        gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))"
                    }}>
                        {
                            items.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                        }
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default OrderTab;