import "./App.css";
import React, {useState, useEffect} from "react";
import ReactPaginate from "react-paginate";
import axios from 'axios';
import styled from 'styled-components';


const Card = styled.div`
  border: 2px solid black;
  border-radius: 3px;
  padding: 0.5rem;
  background-color: #b3e3ff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 25rem;
  margin: 0.8rem;
  font-size: 0.8rem;

  :hover {
    cursor: pointer;
  }
`;

function App() {

    const [users, setUsers] = useState([]);
    const [full, setFull] = useState(false);

    useEffect(() => {
        axios.get("https://baconipsum.com/api/?type=meat-and-filler&paras=50").then(res => setUsers(res.data));
    }, []);

    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;

    console.log(users)
    const displayUsers = users.slice(pagesVisited, pagesVisited + usersPerPage).map((user, index) => {
        return (
            <li
                onClick={() => setFull(!full)}
                key={index}>
                <Card>
                    {full ? user : user.split('.')[0]}
                </Card>
            </li>
        )
    });

    const pageCount = Math.ceil(users.length / usersPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    };

    return (
        <div className="App">
            <ul>
                {displayUsers}
            </ul>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationButtons"}
                previousLinkClassName={"previousButton"}
                nextLinkClassName={"nextButton"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
        </div>
    );
}

export default App;
