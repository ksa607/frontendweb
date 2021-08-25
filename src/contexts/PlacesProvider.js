import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import config from '../config.json';

export const PlacesContext = createContext();

export const PlacesProvider = (props) => {
  const [currentPlace, setCurrentPlace] = useState({});
  const [places, setPlaces] = useState([]);

  const refreshPlaces = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${config.base_url}places`
      );
      setPlaces(data.data);
      return data.data;
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    if (places?.length === 0) {
      refreshPlaces();
    }
  }, [refreshPlaces, places]);

  const ratePlace = async ({ id, rating }) => {
    console.log('rate place in provider');
    let data = { id, rating };
    let method = 'post';
    try {
      const { changedPlace } = await axios({
        method,
        url: `${config.base_url}places`,
        data,
      });
      await refreshPlaces();
      return changedPlace;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const createOrUpdatePlace = async ({ id, name, rating }) => {
    let data = { name, rating };
    let method = 'post';
    try {
      if (id) {
        data = { ...data, id };
        method = 'put';
      }
      const { changedPlace } = await axios({
        method,
        url: `${config.base_url}places`,
        data,
      });
      await refreshPlaces();
      return changedPlace;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deletePlace = async ({ id }) => {
    try {
      const { data } = await axios({
        method: 'delete',
        url: `${config.base_url}places/${id}`,
      });
      refreshPlaces();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <PlacesContext.Provider
      value={{
        // currentTransaction is the one being shown in the form
        currentPlace,
        setCurrentPlace,
        // state pertaining all places
        places, // access to places
        ratePlace,
        deletePlace, // delete one
        createOrUpdatePlace, // create or update one (if id is set: update)
      }}
    >
      {props.children}
    </PlacesContext.Provider>
  );
};
