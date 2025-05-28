import DashboardLayout from '@/components/layouts/dashboard-layout';
import { useForm } from '@inertiajs/react'
import React from 'react'

export default function LoginPage() {
  const {data, setData, post, errors, processing} = useForm ({
    email: '',
    password: ''
  })

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    post('/login');
  }

  return (
    <DashboardLayout>
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor=''>Email</label>
            <input onChange={e => setData('email', e.target.value)} 
            value={data.email} 
            type="text" 
            name='email' 
            placeholder='email'/>
            {errors.email && <p className='text-red-500'>{errors.email}</p>}
        </div>

        <div>
            <label htmlFor=''>Password</label>
            <input 
            onChange={e => setData('password', e.target.value)} 
            value={data.password} 
            type="password" 
            name='password' 
            placeholder='password'/>
            {errors.password && <p className='text-red-500'>{errors.password}</p>}
        </div>

        <button disabled={processing} type='submit'>Login</button>
      </form>
    </div>
    </DashboardLayout>
  )
}
