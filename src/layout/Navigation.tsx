import { faSpider } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FunctionComponent, ReactElement } from 'react';

const NavUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: ${(props): string => props.theme.colors.background};
`;

const NavLi = styled.li`
float: left;
a {
  display: inline-block;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  color: ${(props): string => props.theme.colors.text};
}

a:hover {
  background-color: ${(props): string => props.theme.colors.secondary};
}
`;

const Navigation: FunctionComponent = (): ReactElement => (
  <header>
    <nav>
      <NavUl>
        <NavLi><Link to='/'><FontAwesomeIcon icon={ faSpider } /> HPP</Link></NavLi>
      </NavUl>
    </nav>
  </header>
);

export {
  Navigation
};
