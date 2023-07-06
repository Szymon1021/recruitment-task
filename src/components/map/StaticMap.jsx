import { useState, useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import { Fill, Stroke, Circle, Style, Text } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { User } from '../user-list/user';
import { defaults as Defaults } from 'ol/control';

export const StaticMap = props => {
  const [map, setMap] = useState(null);
  const [layer, setLayer] = useState(null);
  const [userList, setUserList] = useState([]);
  const [userList, setUserList] = useState([]);

  const renderUserMap = () => {
    userList = props.user;
    userList.forEach(user => {});
  };
};
