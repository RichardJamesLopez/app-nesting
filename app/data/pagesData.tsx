interface PageData {
  id: number;
  title: string;
  content: string;
}

const pagesData: PageData[] = [
  {
    id: 1,
    title: 'Page 1',
    content: 'This is the content of Page 1',
  },
  {
    id: 2,
    title: 'Page 2',
    content: 'This is the content of Page 2',
  },
];

export default pagesData;
