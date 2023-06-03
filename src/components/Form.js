import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React,{useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { postBook, updateBook } from '../redux/actions';

export const Form = ({editFormVisibility, cancelUpdate, bookToBeEdited}) => {

  const dispatch = useDispatch();

  // normal form states
  const [isbn, setIsbn]=useState('');
  const [author, setAuthor]=useState('');
  const [title, setTitle]=useState('');

  // edit form states
  const [editIsbn, setEditIsbn]=useState('');
  const [editAuthor, setEditAuthor]=useState('');
  const [editTitle, setEditTitle]=useState('');

  // I want to fill the state with the clicked book values as soon as the component loads
  useEffect(()=>{
      setEditIsbn(bookToBeEdited.isbn);
      setEditAuthor(bookToBeEdited.author);
      setEditTitle(bookToBeEdited.title);
  },[bookToBeEdited])

  // normal add books submit event
  const handleSubmit=(e)=>{
      e.preventDefault();
      let book={
          isbn,author,title
      }
      dispatch(postBook(book));
      setIsbn('');
      setAuthor('');
      setTitle('');
  }

  // edit form submit event
  const handleEditSubmit=(e)=>{
      e.preventDefault();
      let editedBook={
          previousIsbn: bookToBeEdited.isbn,
          isbn: editIsbn,
          author: editAuthor,
          title: editTitle,
      }
      dispatch(updateBook(editedBook));
  }

  return (
    <>
      {editFormVisibility===false?(
          // normal add books form
          <form className='form-group container' onSubmit={handleSubmit}>
          <Container className='text-center fw-bold fs-4 text-warning'>
          <Row>
            <Col><label>Amount</label>
            <input type='text' className='form-control' required
            onChange={(e)=>setIsbn(e.target.value)} value={isbn}/></Col>
            <Col><label>Expense</label>
                    <input type='text' className='form-control' required
                    onChange={(e)=>setAuthor(e.target.value)} value={author}/></Col>
            <Col> <label>Category</label>
            <input type='text' className='form-control' required
            onChange={(e)=>setTitle(e.target.value)} value={title}/></Col>
            <Col className='text-center mt-3'><button type="submit" className='btn btn-success btn-md submit-btn'>
            SUBMIT
        </button></Col>
          </Row>
        </Container>
        </form>
      ):(
          <>
            {/* edit form when edit icon is clicked */}
          <form className='form-group container' onSubmit={handleEditSubmit}>
          <Container>
          <Row>
            <Col>  <label>Amount</label>
            <input type='text' className='form-control' required
            onChange={(e)=>setEditIsbn(e.target.value)} value={editIsbn||''}/></Col>
            <Col> <label>Expense</label>
            <input type='text' className='form-control' required
            onChange={(e)=>setEditAuthor(e.target.value)} value={editAuthor||''}/></Col>
            <Col><label>Category</label>
            <input type='text' className='form-control' required
            onChange={(e)=>setEditTitle(e.target.value)} value={editTitle||''}/></Col>
            <Col>  <button type="submit" className='btn btn-warning btn-md submit-btn'>
            UPDATE
        </button></Col>
          </Row>
        </Container>
            </form>
            
            {/* back button */}
            <button type="button" className='btn btn-outline-secondary btn-md back-btn'
            onClick={cancelUpdate}>
                BACK
            </button>
          </>
      )}
    </>
  )
}
