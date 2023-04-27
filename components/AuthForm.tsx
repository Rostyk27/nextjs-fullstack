'use client';

import { register, signin } from '@/lib/api';
import { useCallback, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import Card from './Card';
import Button from './Button';
import Input from './Input';

const registerContent = {
  linkUrl: '/signin',
  linkText: 'Already have an account?',
  header: 'Create a new Account',
  subheader: 'Just a few things to get started',
  buttonText: 'Register',
};

const signinContent = {
  linkUrl: '/register',
  linkText: "Don't have an account?",
  header: 'Welcome Back',
  subheader: 'Enter your credentials to access your account',
  buttonText: 'Sign In',
};

const initial = { email: '', password: '', firstName: '', lastName: '' };

export default function AuthForm({ mode }: { mode: 'register' | 'signin' }) {
  const [formState, setFormState] = useState({ ...initial });
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        if (mode === 'register') {
          await register(formState);
        } else {
          await signin(formState);
        }

        router.replace('/home');
      } catch (e) {
        setError(`Could not ${mode}`);
      } finally {
        setFormState({ ...initial });
      }
    },

    [
      formState.email,
      formState.password,
      formState.firstName,
      formState.lastName,
    ]
  );

  const content = mode === 'register' ? registerContent : signinContent;

  return (
    <Card>
      <div className="w-[560px] max-w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-3">{content.header}</h2>

          <p className="text-black/25">{content.subheader}</p>
        </div>

        <form onSubmit={handleSubmit} className="pt-10 pb-5 w-full">
          {mode === 'register' && (
            <div className="flex mb-8 justify-between">
              <div className="pr-2">
                <label
                  htmlFor="first_name"
                  className="block text-lg mb-4 ml-2 text-black/50"
                >
                  First Name
                </label>

                <Input
                  required
                  id="first_name"
                  placeholder="First Name"
                  value={formState.firstName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={e =>
                    setFormState(prev => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="pl-2">
                <label
                  htmlFor="last_name"
                  className="block text-lg mb-4 ml-2 text-black/50"
                >
                  Last Name
                </label>

                <Input
                  required
                  id="last_name"
                  placeholder="Last Name"
                  value={formState.lastName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={e =>
                    setFormState(prev => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          )}

          <div className="mb-8">
            <label
              htmlFor="email"
              className="block text-lg mb-4 ml-2 text-black/50"
            >
              Email
            </label>

            <Input
              required
              id="email"
              type="email"
              placeholder="Email"
              value={formState.email}
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={e =>
                setFormState(prev => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="password"
              className="block text-lg mb-4 ml-2 text-black/50"
            >
              Password
            </label>

            <Input
              required
              id="password"
              value={formState.password}
              type="password"
              placeholder="Password"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={e =>
                setFormState(prev => ({ ...prev, password: e.target.value }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span>
                <Link
                  href={content.linkUrl}
                  className="text-blue-600 font-bold"
                >
                  {content.linkText}
                </Link>
              </span>
            </div>

            <div>
              <Button type="submit" intent="secondary">
                {content.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}
