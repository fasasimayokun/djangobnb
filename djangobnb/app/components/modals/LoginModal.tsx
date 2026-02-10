'use client'

import { useState } from 'react';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import CustomButton from '../forms/CustomButton';
import { useRouter } from 'next/navigation';
import apiService from '@/app/services/apiService';
import { handleLogin } from '@/app/lib/actions';

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const submitLogin = async () => {
    const formData = {
      email: email,
      password: password
    }
    const response = await apiService.postWithoutToken('/api/auth/login/', formData);
    
    if (response.access) {
      // handleLogin
      handleLogin(response.user.pk, response.access, response.refresh);

      loginModal.close();

      router.push('/')
    } else {
      setErrors(response.non_field_errors);
    }

  };

  const content = (
    <>
      <form
        action={submitLogin}
        className='space-y-4'
      >
        <input
          type='email'
          value={email}
          placeholder='Your email address'
          className='w-full h-[54px] px-4 border border-gray-100 rounded-xl'
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type='password'
          value={password}
          placeholder='Your password'
          className='w-full h-[54px] px-4 border border-gray-100 rounded-xl'
          onChange={(e) => setPassword(e.target.value)}
        />

        {errors.map((error, index) => (
          <div key={index} className="p-5 bg-airbnb text-white rounded-xl opacity-80">
            {error}
          </div>
        ))}

        <CustomButton
          label='Submit'
          onClick={submitLogin}
        />
      </form>
    </>
  )

  return (
    <div>
      <Modal
        isOpen={loginModal.isOpen}
        close={loginModal.close}
        label='Log in'
        content={content}
      />
    </div>
  )
}

export default LoginModal