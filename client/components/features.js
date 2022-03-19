import {
  LightningBoltIcon,
  ShieldCheckIcon,
  UserIcon,
  ViewGridIcon,
} from '@heroicons/react/outline';
const features = [
  {
    name: 'Secure & Fair',
    description:
      "The complete history of Product Tokens is available on the blockchain, so you can trace a product's entire journey until its manufacturer. You can prove the ownership of your assets by purchasing the unique token associated with them. You can also check the price of the asset at various stages in the supply chain",
    icon: ShieldCheckIcon,
  },
  {
    name: 'Decentralized',
    description:
      'No one has to know or trust anyone else in a decentralised blockchain network. Each member in the network has a copy of the exact same data in the form of a distributed ledger. Suppose a member’s ledger is altered or corrupted in any way. In that case, it will be rejected by the majority of the network members.',
    icon: ViewGridIcon,
  },
  {
    name: 'Your Report Matters',
    description:
      'Anyone who purchased a product of a brand is allowed to report (if the product is found fake). Your report can help us identify counterfeit brands. Suppose the number of reports exceeds a specific limit. In that case, the brand will lose its verified tag, and its brand name will again become available for allocation. You can report a brand only once & your report remains valid till you own any product token issued by that brand.',
    icon: UserIcon,
  },
  {
    name: 'Fast & Simple',
    description:
      "The verification process is straightforward, you just need to scan a unique QR code associated with that product, and you will get the product's entire history. If the product is genuine, then a green tick will appear. You can also see its current owner and buy its ownership by paying the necessary price.",
    icon: LightningBoltIcon,
  },
];

const Features = () => {
  return (
    <div className='py-12 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='lg:text-center'>
          <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
            Salient Features
          </p>
        </div>

        <div className='mt-10'>
          <dl className='space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10'>
            {features.map(feature => (
              <div key={feature.name} className='relative'>
                <dt>
                  <div className='absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white'>
                    <feature.icon className='h-6 w-6' aria-hidden='true' />
                  </div>
                  <p className='ml-16 text-lg leading-6 font-medium text-gray-900'>
                    {feature.name}
                  </p>
                </dt>
                <dd className='mt-2 ml-16 text-base text-gray-500'>
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
