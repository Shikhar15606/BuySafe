import { useState, useCallback } from 'react';
import Message from '../../components/message';
import Loading from '../../components/loading';

function NewBrandPage(props) {
  const [brandName, setBrandName] = useState('');
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);

  const createNewBrand = useCallback(async () => {
    try {
      setLoading(true);
      const { accounts, contract } = props;
      await contract.methods.createBrand(brandName).send({ from: accounts[0] });
      setMsg('Brand Successfully Created');
      setLoading(false);
    } catch (err) {
      console.log(err);
      setMsg(err.message);
      setLoading(false);
    }
  }, []);
  if (loading) return <Loading />;
  if (msg) return <Message msg={msg} />;
  return (
    <div>
      <h1>Create New Brand Page</h1>
      <input
        placeholder='Enter Brand Name'
        type='text'
        onChange={e => {
          setBrandName(e.target.value);
        }}
        value={brandName}
      />
      <button onClick={createNewBrand}>Submit</button>
    </div>
  );
}

export default NewBrandPage;
