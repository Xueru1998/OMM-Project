/**
 * References:
 * https://react-bootstrap.github.io/components/navbar/
 * https://www.youtube.com/watch?v=SLfhMt5OUPI
 * https://www.youtube.com/watch?v=bBUOMy6Tugw (Potential)
 * */

import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../pic/logo.jpg';
import "../styles/overview.css";
import Dropdown from 'react-bootstrap/Dropdown';
import "./Post";
import Post from "./Post";
import InfiniteScroll from 'react-infinite-scroll-component';
import galleryImages from "./Gallery";

function Overview() {

    const [items, setItems] = useState([]);
    const fetchData = () => {

    };

    return (
       <div>
           <Navbar className="top">
               <Container>
                   <Nav className="me-auto">
                       <Nav.Link href="/#sort=latest">New</Nav.Link>
                       <Nav.Link href="/#sort=title">Title</Nav.Link>
                       <NavDropdown
                           title="Sort by"
                           menuVariant="light">
                           <NavDropdown.Item href="/#sort=votes">Votes</NavDropdown.Item>
                           <NavDropdown.Item href="/#sort=views">Views</NavDropdown.Item>
                       </NavDropdown>
                   </Nav>
               </Container>
           </Navbar>
           <Post/>

           <InfiniteScroll
               dataLength={items.length} //This is important field to render the next data
               next={fetchData}
               hasMore={true}
               loader={<h4>Loading...</h4>}
               endMessage={
                   <p style={{ textAlign: 'center' }}>
                       <b>Yay! You have seen it all</b>
                   </p>
               }

           >
               {items}
           </InfiniteScroll>


       </div>



    );
}

export default Overview;
