// import Header from './components/Guide'
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '小明' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    // rightContentRender: () => <Header />,
    // footerRender: () => <Footer />,
    // menuHeaderRender: undefined,
  };
};
