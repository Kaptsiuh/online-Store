import { FC } from 'react'

const BuyForm: FC = () => {
  return (
    <form
      action=""
      className="min-w-[440px] min-h-[560px] bg-white rounded-2xl border border-black border-opacity-10 shadow flex flex-col items-center"
    >
      <label htmlFor="" className="mt-2 mb-2">
        Personal details
      </label>
      <input
        type="text"
        placeholder="Name"
        className="bg-white w-4/5 rounded-md mb-4 text-center"
      />
      <input
        type="tel"
        placeholder="Phone number"
        className="bg-white w-4/5 rounded-md mb-4 text-center"
      />
      <input
        type="text"
        placeholder="Delivery address"
        className="bg-white w-4/5 rounded-md mb-4 text-center"
      />
      <input
        type="email"
        placeholder="E-mail"
        className="bg-white w-4/5 rounded-md mb-4 text-center"
      />
      <label htmlFor="" className="mb-2">
        Credit card details
      </label>
      <div className="w-3/4 h-40 bg-gradient-to-r from-gray-500 to-gray-300  rounded-xl mb-6">
        <div className="flex">
          <div className="min-w-[40px] h-8 bg-white rounded-md mt-6 mx-2 flex items-center justify-center">
            <span>logo</span>
          </div>
          <input
            type="number"
            placeholder="Card number"
            className="bg-white w-4/5 h-8 rounded-md mt-6 mb-4 text-center"
          />
        </div>
        <div className="flex items-center justify-center">
          <label htmlFor="" className="mt-2 mr-1">
            VALID:
          </label>
          <input
            type="namber"
            placeholder="Valid Thru"
            className="bg-white w-[100px] h-6 rounded-md mt-6 mb-4 text-center"
          />
          <label htmlFor="" className="mt-2 mr-1 ml-4">
            CVV:
          </label>
          <input
            type="number"
            placeholder="Code"
            className="bg-white w-[80px] h-6 rounded-md mt-6 mb-4 text-center"
          />
        </div>
      </div>
      <button className="bg-gray-400 w-2/4  rounded-md h-10 hover:bg-orange-500 transition">
        Confirm
      </button>
    </form>
  )
}

export default BuyForm
