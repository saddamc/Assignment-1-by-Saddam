import { Link } from "react-router-dom";
import Cover from "../../Home/Home/Shared/Cover/Cover";
import MenuItem from "../../Home/Home/Shared/MenuItem/MenuItem";


const MenuCategory = ({ items, title, img, details }) => {
    return (
        <div className="pt-8 my-16">
            {title && <Cover img={img} title={title} details={details}></Cover>}
            <div className="grid md:grid-cols-2 gap-10 my-8">
                {
                    items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <div className="justify-center items-center text-center mt-6">
                <Link to={`/order/${title}`}><button className="  btn btn-outline border-0 border-b-4">ORDER YOUR FAVOURITE FOOD</button>
                </Link>
            </div>

        </div>
    );
};

export default MenuCategory;