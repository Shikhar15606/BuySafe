import { useState, useCallback } from 'react';
import Message from '../../components/message';
import Loading from '../../components/loading';
import QRCode from 'qrcode.react';

function NewProductPage(props) {
  const [model, setModel] = useState('');
  const [mfg, setMfg] = useState('');
  const [price, setPrice] = useState('');
  const [mrp, setMrp] = useState('');
  const [productId, setProductId] = useState();

  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);

  const createNewProduct = useCallback(async () => {
    try {
      setLoading(true);
      const { accounts, contract } = props;
      console.log(mfg, model, price, mrp);
      const res = await contract.methods
        .createProduct(new Date(mfg).getTime(), model, price, mrp)
        .send({ from: accounts[0] });
      console.log(res);
      console.log(res.events.ProductCreated.returnValues._productId);
      setProductId(res.events.ProductCreated.returnValues._productId);
      setMsg('Product Successfully Created');
      setLoading(false);
    } catch (err) {
      console.log(err);
      setMsg(err.message);
      setLoading(false);
    }
  }, [mfg, model, price, mrp]);

  const downloadQR = useCallback(() => {
    const canvas = document.getElementById(
      `http://localhost:3000/product/${productId}`
    );
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `BuySafe_Product_${productId}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }, [productId]);

  if (loading) return <Loading />;
  if (productId)
    return (
      <>
        <Message msg={msg} />
        <div>
          <QRCode
            id={`http://localhost:3000/product/${productId}`}
            value={`http://localhost:3000/product/${productId}`}
            size={290}
            level={'H'}
            includeMargin={true}
          />
          <a onClick={downloadQR}> Download QR </a>
        </div>
      </>
    );
  if (msg) return <Message msg={msg} />;
  return (
    <div>
      <h1>Create New Product Page</h1>
      <p>a form to create a new product here</p>
      <input
        type='text'
        placeholder='Enter Model Name'
        value={model}
        onChange={e => {
          setModel(e.target.value);
        }}
      ></input>
      <input
        type='date'
        placeholder='Enter Manufacturing date'
        value={mfg}
        onChange={e => {
          setMfg(e.target.value);
        }}
      ></input>
      <input
        type='number'
        placeholder='Enter Price in Wei'
        value={price}
        onChange={e => {
          setPrice(e.target.value);
        }}
      ></input>
      <input
        type='number'
        placeholder='Enter MRP in Wei'
        value={mrp}
        onChange={e => {
          setMrp(e.target.value);
        }}
      ></input>
      <button onClick={createNewProduct}>Submit</button>
    </div>
  );
}

export default NewProductPage;
