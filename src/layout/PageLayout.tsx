import { Headline } from '../components/Headline';
import { Navigation } from './Navigation';
import styled from 'styled-components';
import React, { FunctionComponent, ReactElement, useEffect } from 'react';

const StyledPageLayout = styled.main.attrs((): any => ({
  role: 'main'
}))`
  max-width: 1024px;
  margin: auto;
  text-align: center;
  font-family: ${(props): any => props.theme.fonts.text};
`;

interface PageLayoutProps {
  title: string;
}

const PageLayout: FunctionComponent<PageLayoutProps> = ({ title, children }): ReactElement => {
  useEffect((): void => {
    document.title = title;
  }, [ title ]);

  return (
    <React.Fragment>
      <Navigation />
      <StyledPageLayout>
        <Headline>{title}</Headline>
        {children}
      </StyledPageLayout>
    </React.Fragment>
  );
};

export {
  PageLayout
};
