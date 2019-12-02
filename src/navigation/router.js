import React from 'react';
import Characters from '../pages/characters';
import Items from '../pages/items'
import HomePage from '../pages/home'
import Bosses from '../pages/bosses'
import Environments from '../pages/environments'


const routes = {
  "/": () => <HomePage />,
  "/items": () => <Items />,
  "/characters": () => <Characters />,
  "/bosses": () => <Bosses />,
  "/home" : () => <HomePage />,
  "/environments": () => <Environments />
};

export default routes;