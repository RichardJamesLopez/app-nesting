import PlaygroundPage from '#/app/playground/page';
import { formHeaderStyle, sloganContainer } from '#/styles/formStyles';
import { Card} from '@tremor/react';

export default function Page() {
  return (
    
    <Card>
        <div style={sloganContainer}>
          <header className="text-left text-4xl font-bold text-white">Analytics</header>
        </div>
      <PlaygroundPage />
    </Card>
  );
}
