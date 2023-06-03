import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Icon } from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'
import {edit2} from 'react-icons-kit/feather/edit2'
import { useDispatch } from 'react-redux'
import { deleteBook } from '../redux/actions'

export const Books = ({books, editFormVisibility, handleEdit}) => {

  const dispatch = useDispatch();

  return books.map((book)=>(
    
    <div className='book text-center' key={book.isbn}>

        <div className='content'>
        <Form className='border border-2 border-info bg-secondary text-white mt-3 mx-5 fs-bold'>
      <Row>
        <Col>
        ${book.isbn}
        </Col>
        <Col>
        <h4>{book.title}</h4>
        </Col>
        <Col>
        <h4>{book.author}</h4>
        </Col>
        <Col>
        <div className='actions'>

            {editFormVisibility===false&&(
                <>
                    <span className='edit bg-warning border border-secondary m-2 px-1' onClick={()=>handleEdit(book)}>
                        <Icon icon={edit2} size={24}/>
                    </span>
            
                    <span className='trash bg-danger border border-secondary m-2 px-1' onClick={()=>dispatch(deleteBook(book.isbn))}>
                        <Icon icon={trash} size={24}/>
                    </span>
                </>
            )}

        </div>
        </Col>
      </Row>
    </Form>
        </div>
    </div>
  ))
}
