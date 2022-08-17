import Loader from './components/Loader';
import Product from './components/Product';
import ErrorMessage from './components/Error';
import { useProducts } from './hooks/products';
import Modal from './components/Modal';
import CreateProduct from './components/CreateProduct';
import { useState } from 'react';
import { IProduct } from './models';

function App() {
  const {loading, products, error, addProduct} = useProducts()
  const [modal, setModal] = useState(true)

  const createHandler = (product: IProduct) => {
    setModal(false)
    addProduct(product)
  }
  
  return (
    <div className="container mx-auto max-w-2xl pt-5">
      { loading && <Loader /> }
      { error && <ErrorMessage error={error} /> }
      { products.map(product => <Product product={product} key={product.id} />) }

      <button className='fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2' onClick={() => setModal(true)}>+</button>
      
      {modal && <Modal title='Create new product' onClose={() => setModal(false)}>
        <CreateProduct onCreate={createHandler}/>
      </Modal>}

    </div>
  );
}

export default App;
