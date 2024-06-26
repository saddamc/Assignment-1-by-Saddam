import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import signupImg from "../../../../assets/others/authentication2.png";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SocialLogin from "../SocialLogin/SocialLogin";
// import { useForm, SubmitHandler } from "react-hook-form"




const SignUp = () => {
    const axiosPublic = useAxiosPublic()
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const { createUser, updateUserProfile, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = (data) => {

        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // console.log('user profile')
                        // create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user to data base')
                                    reset();
                                    Swal.fire({
                                        icon: "success",
                                        title: "User created Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    logOut()
                                        .then(() => { })
                                        .catch(error => console.log(error))
                                    navigate('/login')
                                }
                            })

                    })
                    .catch(error => console.log(error))
            })
    }

    return (
        <>
            <Helmet>
                <title>
                    Bistro Boss | Sign Up
                </title>
            </Helmet>
            <div className="hero min-h-screen bg-[url('../../../assets/others/authentication.png')]">
                <div className="hero-content flex-col md:flex lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <img src={signupImg} alt="" />
                    </div>
                    <div className="card  md:w-1/2 max-w-sm ">
                        <p className='text-4xl font-bold text-center'>Sign Up</p>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered" required />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} name="photoURL" placeholder="Photo URL" className="input input-bordered" required />
                                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" required />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true, minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/

                                })} name="password" placeholder="password" className="input input-bordered" required />
                                {errors.password?.type === 'required' && <span className="text-red-600">Password is required</span>}
                                {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be 6 characters</span>}
                                {errors.password?.type === 'maxLength' && <span className="text-red-600">Password must be less then 20 characters</span>}
                                {errors.password?.type === 'pattern' && <span className="text-red-600">Password must have one uppercase, one lower case, on nunber and one special character</span>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control mt-6">
                                <input className="btn bg-orange-400 text-white font-bold" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className=" px-6 text-center text-orange-400"> <small>Already registered? <Link to="/login">Go to Log in</Link></small> </p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;