"use client"
import React, {useState, useEffect} from "react";
import { addDoc, collection, getDoc, query, onSnapshot, querySnapshot, doc } from "firebase/firestore";
import {db} from './firebaseconfig'

export default function Home() {
  // Setting state variables
  const [items, setItems] = useState([
    // {name: 'Tea', price: 0.2 },
    // {name: 'Coffee', price: 0.2},
    // {name: 'Movie', price: 0.6},
    // {name: 'candy', price: 7.75},
  ]);

  // New state variable to store data dynamically
  const [newItem, setNewItem]= useState({name: '', price: ''});

  const [total, setTotal] = useState(0);

  
////////////////////////////// Add items to firestore database ///////////////////////////

  const addItem = async (e) => {
    e.preventDefault();
    // addItem function in which an empty string will not accept onChange
    if (newItem.name !== '' && newItem.price !== ''){  
      // setItems([...items, newItem]);

      // Getting started docs from coud firestore , adding await addDoc function.
      await addDoc(collection(db, 'items'),{
        name: newItem.name.trim(),
        price: newItem.price,

      });
      setNewItem({name: '', price: ''}); //After submitting the input fields get empty
    }
  };
  ////////////////////////////// Read data from firestore ///////////////////////////////
  //Read data from firestore , we will use query, onSnapshot, querySnapshot firebase functions. In this case we will use useEffect
  //query-checks a data, 
  //onSnapshot-realtime listener.An initial call using the callback you provide creates a document snapshot immediately with the current contents of the single document. Then, each time the contents change, another call updates the document snapshot. ,
  //querySnapshot-A QuerySnapshot contains zero or more DocumentSnapshot objects representing the results of a query. The documents can be accessed as an array via the docs property or enumerated using the forEach method. The number of documents can be determined via the empty and size properties.
  ///////////////////////////////////////////////////////////////////////////////////////
  useEffect(()=>{
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q,(querySnapshot) =>{
      let itemsArr = [];

      querySnapshot.forEach( (doc) => { 
        itemsArr.push({...doc.data(), id: doc.id}) //pushing each entry to the array with data and id 

       });
       setItems(itemsArr); //retrieving from firebase and displays data
      // Read total from items
      const calculateTotal = () => {
        const total= itemsArr.reduce( (sum, item) => sum + parseFloat(item.price), 0  );
        setTotal(total);
      };
      calculateTotal();
      return () => unsubscribe();
      
    } );
  },[]);

  


  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-1">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm ">
      <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>
      <div className="bg-slate-800 p-4 rounded-lg">
        <form className="grid grid-cols-6 items-center text-black">
          <input 
          value={newItem.name} 
          onChange={(e)=> setNewItem({...newItem, name: e.target.value})}
          className="col-span-3 border p-3" 
          type="text" 
          placeholder='Enter Item' />
          <input 
          value={newItem.price} 
          onChange={(e)=> setNewItem({...newItem, price: e.target.value})}
          className="col-span-2 border mx-3 p-3" 
          type="number" 
          placeholder='Enter $' />
          <button 
          onClick={addItem}
          className="text-white bg-slate-900 hover:bg-slate-900 p-3 text-xl" type="submit">
            +
          </button>
        </form>
        <ul>
        {/* Creating Map for state variables to display some un-ordered list. */}

          {items.map((item, id)=>(
            <li key={id} className="text-white my-4 w-full flex justify-between bg-slate-900">
              <div className="p-4 w-full flex justify-between ">
                <span className="capitalize">{item.name}</span>
                <span>$ {item.price}</span>
              </div>
              <button 
              
              className="ml-8 p-4 border-l-2 border-slate-950 hover:bg-slate-950 w-16">X</button>
            </li>
          ))}
        </ul>
        {/* Tarnary logic if there is a list show total or leave empty string. */}
        
        {items.length < 1 ? (''):(
          <div className="text-white flex justify-between p-3">
            <span>Total </span>
            <span> {total} in      USD     </span>
          </div>
        )}
      </div>
      </div>
    </main>
  );
}
