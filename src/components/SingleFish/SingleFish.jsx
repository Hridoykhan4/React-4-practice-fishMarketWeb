import PropTypes from 'prop-types'

const SingleFish = ({fish}) => {
    const {name, price,image,description} = fish
  return (
    <div className="card card-compact shadow-xl">
    <figure className='h-56'>
      <img className='w-full h-full object-cover'
        src={image}
        alt="Shoes" />
    </figure>
    <div className="card-body">
      <h2 className="card-title text-black">{name}</h2>
      <p>{description}</p>
       <div className='text-center'>
          <p className='text-red-700 font-semibold text-2xl'>৳ {price}.00</p>
          <button className='btn my-2 btn-error text-white'>Add To Cart</button>
       </div>
    </div>
  </div>
  )
}

SingleFish.propTypes = {
    fish: PropTypes.object
}

export default SingleFish