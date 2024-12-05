import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios'
import { MdDelete } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";

function List() {

  const [list, setList] = useState([]);
  const[like,setlike]=useState([])

  const load=()=>{
    axios.get("http://localhost:6002/findall")
      .then((response) => {setList(response.data.data)
        })

      .catch((err) => console.error(err))

    }
  useEffect(() => {
    load()
  }, []);
  console.log(list)
  const handleClick = (id) => {

    axios.post("http://localhost:6002/update/" + id)
      .then((response) => {console.log(response)
        load()
      }
    )
      .catch((err) => console.error(err))
    
  }
const admin="romini"
  const handlepopulate=(id)=>{
    axios.post("http://localhost:6002/likes",{id:id,admin:admin})
    .then((response)=>{   
      console.log(response.data,"po")
      
    })
  }

  return (
    <div className='container'>
      <h1 style={{ textAlign: 'center', color: 'gray' }}>Employee List</h1>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>sl no</th>
            <th>Name</th>
            <th>Position</th>
            <th>Date of Joining</th>
            <th>Contact</th>
            <th> Action</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 ? (
            list.map((item, index) => (
              <tr key={index} >
                <td>{index + 1}<AiFillLike onClick={()=>handlepopulate(item._id)} /> </td>
                <td>{item.firstname} {item.lastname}</td>
                <td>{item.position}</td>
                <td>{item.dateofjoining}</td>
                <td>{item.contact}</td>
                <td>{
                  item.isactive==true?<MdDelete onClick={() => handleClick(item._id )} />:<p>diactivated</p>
                  }  </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No employees to display
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default List;
