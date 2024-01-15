import PlaygroundPage from '#/app/playground/page';
import { TabGroup } from '#/ui/tab-group';
import {
  formHeaderStyle,
  inputStyleSubmitted,
  thumbsStyle,
  contentInputStyleSubmitted,
} from 'styles/formStyles';
import { getCategories } from '../api/categories/getCategories';

export default async function Page() {
  const categories = await getCategories();
  return (
    <div>
      <TabGroup
        path="/activities"
        items={[
          {
            text: 'Home',
          },
          ...categories.map((x) => ({
            text: x.name,
            slug: x.slug,
          })),
        ]}
      />
      <PlaygroundPage />
    </div>
  );
}
