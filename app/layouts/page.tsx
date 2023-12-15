import { GlobalNav } from '#/ui/global-nav';
import { TabNavItem } from '#/ui/tab-nav-item';
import Image from 'next/image';

export default function Page() {
  return (
    
    <div className="prose prose-sm prose-invert ">
    
      <h1 className="text-xl font-bold text-center text-black">Welcome to YourCompany</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Image
          src="/logo.png"
          alt="YourDAO Logo"
          width={150}
          height={100}
          style={{ width: '75%', height: '75%' }} // Set the desired width to 75% and maintain aspect ratio
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TabNavItem href="/layouts/activities">Click Here</TabNavItem>
      </div>
      <p style={{ fontSize: '18px', textAlign: 'center', color: 'black'}}>
        Ourmada features all of YourCompany activities and empowers Community
        Members to contribute, colloborate and view the latests.
      </p>
      </div>
    
  );
}
