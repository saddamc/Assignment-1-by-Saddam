import { useContext, useEffect, useState } from 'react';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import loginImg from '../../../assets/others/authentication2.png';
import SocialLogin from './SocialLogin/SocialLogin';


const Login = () => {
    const [disabled, setDisabled] = useState(true);

    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    // console.log('state in the location', location.state)

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        console.log(user_captcha_value);
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        } else {
            setDisabled(true)
        }
    }

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                Swal.fire({
                    icon: "success",
                    title: "User Login Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            })
    }


    return (
        <>
            <Helmet>
                <title>
                    Bistro Boss | Login
                </title>
            </Helmet>
            <div
                className="login-bg hero min-h-screen bg-[url('../../../assets/others/authentication.png')]">
                <div className="hero-content flex-col md:flex lg:flex-row">
                    <div className="text-center md:w-1/2 lg:text-left  ">
                        <img className='' src={loginImg} alt="" />
                    </div>

                    <div className="card  md:w-1/2 max-w-sm  ">
                        <p className='text-4xl font-bold text-center'>Login</p>
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    < LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type the captcha" className="input input-bordered" required />
                                <button className='btn btn-outline btn-xs mt-2'>Validate</button>

                            </div>
                            <div className="form-control mt-6">
                                <input disabled={false} className="btn bg-orange-400 text-white font-bold" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className='px-6 text-center text-orange-400'> <small>New Here? <Link to="/signup">Create a new account</Link></small> </p>

                        <SocialLogin></SocialLogin>


                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;