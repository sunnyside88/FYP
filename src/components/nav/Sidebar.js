import React from 'react';

import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

import { Figure } from 'react-bootstrap';
import logo from "../../assets/Logo.png"
import { useHistory } from 'react-router';

const SideBar = ()=>{
  let history = useHistory()
    return (
      <>
      <Figure style={{marginLeft:"55px"}}>
        <Figure.Image
          width={171}
          height={180}
          alt="171x180"
          src={logo}
        />
      </Figure>
        <Navigation
            // you can use your own router's api to get pathname
            activeItemId="/product"
            onSelect={({itemId}) => {
              history.push(itemId)
            }}
            items={[
              {
                title: 'Dashboard',
                itemId: '/dashboard',
              },
              {
                title: 'Product',
                itemId: '#',
                subNav: [
                  {
                    title: 'All Products',
                    itemId: '/products',
                  },
                  {
                    title: 'Product Category',
                    itemId: '/products/categ',
                  },
                ],
              },
              {
                title: 'Another Item',
                itemId: '/another',
                subNav: [
                  {
                    title: 'Teams',
                    itemId: '/management/teams',
                  },
                ],
              },
            ]}
          />
      </>
    );
}

export default SideBar;
