import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import GoogleButton from 'react-google-button';
import logo from '../../public/logo.png';

export default function SignIn({ providers }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 mx-auto h-screen">
      <Image src={logo} width={544} height={544} />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <GoogleButton
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Sign in with {provider.name}
          </GoogleButton>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
