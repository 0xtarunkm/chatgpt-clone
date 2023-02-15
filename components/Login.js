import { signIn } from 'next-auth/react';
import Image from 'next/image';
import GoogleButton from 'react-google-button';
import logo from '../public/logo.png';

function Login() {
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center">
      <Image src={logo} height={300} width={300} alt="logo" />
      <GoogleButton onClick={() => signIn('google')}></GoogleButton>
    </div>
  );
}

export default Login;
