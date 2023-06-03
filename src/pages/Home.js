import { useSelector, useDispatch } from "react-redux";
import { Books } from "../components/Books";
import { Form } from "../components/Form";
import {useState,useEffect} from 'react';
import { getBooks, deleteAll } from "../redux/actions";

function Home() {

  const dispatch = useDispatch();

  const books = useSelector((state)=>state.operationsReducer);

  useEffect(()=>{
    dispatch(getBooks())
  },[dispatch])

  const [editFormVisibility, setEditFormVisibility]=useState(false);
  const [bookToBeEdited, setBookToBeEdited]=useState('');

  // click on edit icon
  const handleEdit=(bookObj)=>{
    setEditFormVisibility(true);
    setBookToBeEdited(bookObj);
  }

  // click on back button
  const cancelUpdate=()=>{
    setEditFormVisibility(false);
    setBookToBeEdited('');
  }

  return (
    <div className="custom-container">
      <h1 className="heading text-center text-primary fw-bold">
        Welcome to Expense Tracker!
      </h1>
      <br></br>
      <Form editFormVisibility={editFormVisibility}
      cancelUpdate={cancelUpdate}
      bookToBeEdited={bookToBeEdited}/>
      {books.length > 0?(
        <>
        <Books books={books} editFormVisibility={editFormVisibility}
        handleEdit={handleEdit}/>
          {books.length > 1&&(
            <button className="btn btn-outline-danger btn-md delete-all mx-5 mt-3"
            onClick={()=>dispatch(deleteAll())}>
              DELETE ALL
            </button>
          )}
        </>
      )
      :(<div className="message-box">
        No books found, add a book to display it here
      </div>)}
    </div>
  );
}

export default Home;