import { FC, useState } from 'react'
import { Form } from 'react-router-dom'
import { formatter } from '../utilities/formatter'

import { FaCcMastercard, FaCcVisa, FaCreditCard } from 'react-icons/fa'

const cards = [
  { pattern: /^4/, icon: <FaCcVisa /> },
  { pattern: /^5/, icon: <FaCcMastercard /> },
]

const handleCCIcon = (value: string) => {
  return cards.find((card) => card.pattern.test(value))?.icon ?? <FaCreditCard />
}

const BuyForm: FC = () => {
  const [cc, setCc] = useState('')

  return (
    <Form
      autoComplete='off'
      action='order'
      className='min-w-[440px] py-2 px-6 bg-white rounded-2xl border border-black border-opacity-10 shadow flex flex-col items-center'
    >
      <h2 className='text-xl font-medium my-4'>Contact Form</h2>
      <div className='space-y-2 w-full mb-2'>
        <div>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Your email*
          </label>
          <input
            type='email'
            id='email'
            className='form-control'
            placeholder='name@email.com'
            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
            required
          />
        </div>

        <div>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Your name*
          </label>
          <input
            type='text'
            autoComplete='none'
            id='name'
            className='form-control peer'
            placeholder='Full Name'
            pattern='^\b[A-Za-z]{3,}\b(?: \b[A-Za-z]{3,}\b){1,}$'
            required
          />
          <span className='ml-1 invisible peer-focus-visible:peer-invalid:visible text-red-600 text-xs'>
            must contain at least 2 words 3 chars each.
          </span>
        </div>

        <div>
          <label
            htmlFor='phone'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Phone Number*
          </label>
          <input
            type='tel'
            id='phone'
            inputMode='numeric'
            className='form-control peer'
            placeholder='(012) 345-6789'
            pattern='\+ \([0-9]{3}\) [0-9]{3}-[0-9]{3,12}'
            onChange={(e) => (e.target.value = formatter.tel(e.target.value))}
            required
          />
          <span className='ml-1 invisible peer-focus-visible:peer-invalid:visible text-red-600 text-xs'>
            only numbers are allowed. 9-12 chars length
          </span>
        </div>

        <div>
          <label
            htmlFor='address'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Delivery Address*
          </label>
          <input
            type='text'
            id='address'
            autoComplete='none'
            className='form-control peer'
            placeholder='Address'
            pattern='^\b[\w ]{5,}\b(?: \b[\w ]{5,}\b){2,}$'
            required
          />
          <span className='ml-1 invisible peer-focus-visible:peer-invalid:visible text-red-600 text-xs'>
            must contain at least 3 words 5 chars each.
          </span>
        </div>
      </div>

      <h3 className='text-lg font-medium my-3'>Credit card details</h3>
      <div className='w-[90%] bg-gradient-to-r from-gray-500 to-gray-300 rounded-xl px-4 py-6 space-y-6'>
        <div className='flex items-center gap-x-4'>
          <div className='rounded flex items-center justify-center p-1 text-4xl text-white'>
            {handleCCIcon(cc)}
          </div>

          <input
            type='tel'
            inputMode='numeric'
            name='cc'
            className='form-control py-1.5'
            placeholder='0000 0000 0000 0000'
            pattern='([0-9]{4}) ([0-9]{4}) ([0-9]{4}) ([0-9]{4})'
            onChange={(e) => setCc(e.target.value)}
            value={formatter.cc(cc)}
            required
          />
        </div>
        <div className='flex items-center justify-center gap-x-2'>
          <label htmlFor='cc-valid'>VALID:</label>
          <input
            id='cc-valid'
            type='text'
            inputMode='numeric'
            placeholder='MM/YY'
            pattern='(0[1-9]|1[012])/[0-9]{2}'
            onChange={(e) => (e.target.value = formatter.ccthro(e.target.value))}
            required
            className='form-control py-1.5'
          />
          <label htmlFor='cvv'>CVV:</label>
          <input
            id='cvv'
            type='text'
            inputMode='numeric'
            placeholder='000'
            pattern='[0-9]{3}'
            required
            onChange={(e) => (e.target.value = formatter.cccvv(e.target.value))}
            className='form-control py-1.5'
          />
        </div>
      </div>
      <button className='button w-3/4 my-6'>Confirm</button>
    </Form>
  )
}

export default BuyForm
