import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

export class Bookswap extends Component
{
    render(){
        return(
            <div>
              <p id="note">Note: Hover over each feature/action to get
                quick description of what it does or shows.</p>
              <div className="bookswap-choices">
                <Link to="/"> {/* TODO add page to link to*/}
                </Link>
                <Link to="/Bookpost"> {/* TODO add page to link to*/}
                  <Button size="lg" block>Post Your Book</Button>
                </Link>
                <Link to="/Booklist"> {/* TODO add page to link to*/}
                  <Button size="lg" block>Search Books</Button>
                </Link>
                <Link to="/ManageRequests">
                  <Button size="lg" block>Manage Requests</Button>
                </Link>
              </div>
            </div>
        )
    }
}
