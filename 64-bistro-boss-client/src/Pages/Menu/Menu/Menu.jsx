import { Helmet } from 'react-helmet-async';
import Cover from '../../Home/Home/Shared/Cover/Cover';
import menuImg from '../../../../assets/menu/menu-bg.jpg';
import dessertImg from '../../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../../assets/menu/soup-bg.jpg';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');
    return (
        <div>
            <Helmet>
                <title>
                    Bistro Boss | Menu
                </title>
            </Helmet>
            <Cover img={menuImg} details={'Would you like to try a Dish?'} title={'Our Menu'}></Cover>
            {/* main cover */}
            <SectionTitle subHeading="Don't Miss" heading="Today's Offer"></SectionTitle>
            {/* offered menu items */}
            <MenuCategory items={offered} ></MenuCategory>
            {/* dessert menu items */}
            <MenuCategory items={dessert} title="dessert" details={'Indulge in our delightful desserts, crafted with the finest ingredients. Each bite promises a perfect blend of sweetness and flavor, making every moment a memorable treat.'} img={dessertImg}></MenuCategory>
            {/* pizza menu items */}
            <MenuCategory items={pizza} title="pizza" details={'Savor our delicious pizzas, topped with the freshest ingredients and baked to perfection. Each slice offers a harmonious blend of flavors, delivering an irresistible taste that satisfies every pizza lover’s craving.'} img={pizzaImg}></MenuCategory>
            {/* salad menu items */}
            <MenuCategory items={salad} title="salad" details={'Enjoy our fresh and vibrant salads, made with crisp greens, ripe vegetables, and flavorful dressings. Each bite is a refreshing and healthy delight, perfect for a nutritious meal or side dish.'} img={saladImg}></MenuCategory>
            {/* pizza menu items */}
            <MenuCategory items={soup} title="soup" details={'Warm up with our comforting soups, crafted from fresh, wholesome ingredients. Each bowl offers a rich and savory experience, perfect for nourishing your body and soul on any day.'} img={soupImg}></MenuCategory>

        </div >
    );
};

export default Menu;