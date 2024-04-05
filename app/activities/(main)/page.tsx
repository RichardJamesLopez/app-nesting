import PlaygroundPage from '#/app/playground/page';
import { formHeaderStyle } from '#/styles/formStyles';
import { Card} from '@tremor/react';

export default function Page() {
  return (
    
    <Card>
      <header style={formHeaderStyle}>Analytics</header>
      <PlaygroundPage />
    </Card>
  );
}
