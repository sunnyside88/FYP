import React from 'react';

import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

import { Figure } from 'react-bootstrap';
import logo from "../../assets/Logo.png"

const sideBar = ()=>{
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
            activeItemId="/management/members"
            onSelect={({itemId}) => {
              // maybe push to the route
            }}
            items={[
              {
                title: 'Dashboard',
                itemId: '/dashboard',
              },
              {
                title: 'Management',
                itemId: '/management',
                subNav: [
                  {
                    title: 'Projects',
                    itemId: '/management/projects',
                  },
                  {
                    title: 'Members',
                    itemId: '/management/members',
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

export default sideBar;
