import { TabNavItem } from '#/ui/tab-nav-item';

export default function Page() {
  return (
    <div className="prose prose-sm prose-invert max-w-none">
      <h1 className="text-xl font-bold">Welcome to YourDAO</h1>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src="/logo.png"
          alt="YourDAO Logo"
          style={{ width: '75%', height: 'auto' }} // Set the desired width to 75% and maintain aspect ratio
        />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TabNavItem href="/layouts/activities">Start Here</TabNavItem>
      </div>
      <p style={{ fontSize: '18px', textAlign: 'center' }}>
        Ourmada features all of YourDAO activities and empowers Community
        Members to contribute, colloborate and view the latests.
      </p>
    </div>
  );
}
