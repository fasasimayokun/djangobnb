'use client'

import { useState } from 'react';
import useSignupModal from '@/app/hooks/useSignupModal';
import Modal from './Modal';
import CustomButton from '../forms/CustomButton';
import { useRouter } from 'next/navigation';
import apiService from '@/app/services/apiService';
import { handleLogin } from '@/app/lib/actions';

const SignupModal = () => {
  const router = useRouter();
  const signupModal = useSignupModal();
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  // submit functionality

  const submitSignup = async () => {
    const formData = {
      email: email,
      password1: password1,
      password2: password2
    }

    const response = await apiService.postWithoutToken('/api/auth/register', formData);

    if (response.access) {
      // handleLogin
      handleLogin(response.user.pk, response.access, response.refresh);

      signupModal.close();

      router.push('/')
    } else {
      const tmpErrors: string[] = Object.values(response).map((error: any) => {
        return error;
      })

      setErrors(tmpErrors)
    }
  };
  
  const content = (
    <>
      <form
        action={submitSignup}
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
          value={password1}
          placeholder='Your password'
          className='w-full h-[54px] px-4 border border-gray-100 rounded-xl'
          onChange={(e) => setPassword1(e.target.value)}
          />

        <input
          type='password'
          value={password2}
          placeholder='Repeat password'
          className='w-full h-[54px] px-4 border border-gray-100 rounded-xl'
          onChange={(e) => setPassword2(e.target.value)}
        />

        {errors.map((error, index) => (
          <div key={index} className="p-5 bg-airbnb text-white rounded-xl opacity-80">
            {error}
          </div>
        ))}

        <CustomButton
          label='Submit'
          onClick={submitSignup}
        />
      </form>
    </>
  )

  return (
    <div>
      <Modal
        isOpen={signupModal.isOpen}
        close={signupModal.close}
        label='Sign up'
        content={content}
      />
    </div>
  )
}

export default SignupModal