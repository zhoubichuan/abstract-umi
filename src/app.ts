import Header from './components/Header'

export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
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
