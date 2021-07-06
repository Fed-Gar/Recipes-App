import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Todo from '../Todo/Todo';   

import styles from "./styles/recipes.module.css"; 

function Todos({status, todos}) {
  return (
    <>
      <span className={styles.span}> {status} </span>
      <ul className={styles.list}> 
      {
        todos.length > 0 && todos.map(todo => { 
          if(status === todo.status) {
              return (
                <div className={styles.linkCont} key={todo.id}>
                  <li className={styles.listItem} id={todo.id}>
                    <Link to={`/edit/${todo.id}`}>
                      <Todo title={todo.title}/>
                    </Link>
                  </li>  
                </div>
              )
          }; 
        })
      }
      </ul>
    </>
  )
};

function mapStateToProps(state) {
  return {
    todos: state,
  };
};

export default connect(mapStateToProps)(Todos);

