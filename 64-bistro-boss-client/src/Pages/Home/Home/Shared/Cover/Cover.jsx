import { Parallax } from 'react-parallax';

const Cover = ({ img, title, details }) => {
    return (
        <Parallax
            blur={{ min: -15, max: 15 }}
            bgImage={img}
            bgImageAlt="the menu"
            strength={-200}
        >
            <div className="hero h-[700px]  ">
                <div className="hero-overlay bg-opacity-20"></div>
                <div className=" text-center text-[#fff] ">
                    <div className="w-[750px] h-[250px] p-12  bg-black opacity-40 ">
                        <h1 className="mb-5 text-5xl font-bold uppercase"> {title} </h1>
                        <p className="mb-5 uppercase">{details} </p>

                    </div>
                </div>
            </div>
        </Parallax>

    );
};

export default Cover;