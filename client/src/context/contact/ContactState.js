import React , { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
import ContactContext from './ContactContext';
import contactReducer from './ContactReducer'
import { ADD_CONTACT, 
  DELETE_CONTACT, 
  SET_CURRENT, 
  CLEAR_CURRENT, 
  UPDATE_CONTACT, 
  FILTER_CONTACTS, 
  CLEAR_FILTER 
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Jill Johnson',
        phone: '111-111-1111',
        type: 'personal',
        email: 'test@test.com'
      },
      {
        id: 2,
        name: 'Sara Watson',
        phone: '222-222-2222',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Harry White',
        phone: '333-333-3333',
        type: 'professional'
      },
    ],
    current: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //Add contact
  const addContact = contact =>{
    contact.id = uuid();
    dispatch({
      type: ADD_CONTACT, payload: contact
    });
  }

  //Delete contact
  const deleteContact = id =>{
    dispatch({
      type: DELETE_CONTACT, payload: id
    });
  }

  //Set current contact
  const setCurrent = contact =>{
    dispatch({
      type: SET_CURRENT, payload: contact
    });
  }

  //Clear Current contact
  const clearCurrent = () =>{
    dispatch({
      type: CLEAR_CURRENT
    });
  }

  //Update contact

  //Filer contacts

  //Clear filter

  return (
    <ContactContext.Provider 
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact: addContact,
        deleteContact: deleteContact,
        setCurrent: setCurrent,
        clearCurrent: clearCurrent
      }}
    >
      { props.children }
    </ContactContext.Provider>
  )
};

export default ContactState

