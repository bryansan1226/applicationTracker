import { useState, useEffect } from "react";
import Axios from "axios";
import ApplicationCard from "./ApplicationCard";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import EditCard from "./EditCard";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function ApplicationList(props) {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [listingURL, setListingURL] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [applicationList, setApplicationList] = useState([]);
  const [newAppShow, setNewAppShow] = useState(false);

  useEffect(() => {
    getEntries();
  }, []);

  const addApplication = () => {
    Axios.post("http://localhost:3001/addApplication", {
      company: company,
      title: title,
      listingURL: listingURL,
      salary: salary,
      location: location,
    }).then(() => {
      console.log("Insertion success");
      setApplicationList([
        ...applicationList,
        {
          company: company,
          title: title,
          listingURL: listingURL,
          salary: salary,
          location: location,
        },
      ]);
    });
    setNewAppShow(false);
    getEntries();
    getEntries();
  };
  const deleteApplication = (jobID) => {
    console.log("frontend running deleteApplication" + JSON.stringify(jobID));
    Axios.post("http://localhost:3001/deleteApplication", {
      jobID: jobID,
    }).then(() => {
      console.log("Delete success");
      setApplicationList([
        ...applicationList,
        {
          company: company,
          title: title,
          listingURL: listingURL,
          salary: salary,
          location: location,
        },
      ]);
    });
    getEntries();
  };
  const editApplication = (
    jobID,
    company,
    title,
    listingURL,
    salary,
    location
  ) => {
    Axios.post("http://localhost:3001/editApplication", {
      company: company,
      title: title,
      listingURL: listingURL,
      salary: salary,
      location: location,
      jobID: jobID,
    }).then(() => {
      console.log("Edit success");
      /*setApplicationList([
        ...applicationList,
        {
          company: company,
          title: title,
          listingURL: listingURL,
          salary: salary,
          location: location,
        },
      ]);*/
    });
  };

  const getEntries = () => {
    Axios.get("http://localhost:3001/applications").then((response) => {
      console.log(response);
      setApplicationList(response.data.rows);
      console.log("\nGetting entries: " + applicationList);
    });
  };

  const logInfo = () => {
    console.log("Company: " + company);
    console.log("Title: " + title);
    console.log("ListingUrl: " + listingURL);
    console.log("Salary: " + salary);
    console.log("Location: " + location);
  };

  return (
    <div className="App">
      {/*<label>Company</label>
      <input
        type="text"
        onChange={(event) => {
          setCompany(event.target.value);
        }}
      />
      <label>Job title</label>
      <input
        type="text"
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <label>Listing URL</label>
      <input
        type="text"
        onChange={(event) => {
          setListingURL(event.target.value);
        }}
      />
      <label>Salary</label>
      <input
        type="text"
        onChange={(event) => {
          setSalary(event.target.value);
        }}
      />
      <label>Location</label>
      <input
        type="text"
        onChange={(event) => {
          setLocation(event.target.value);
        }}
      />
      <div className="buttons">
        <button onClick={addApplication}>Submit</button>
        <button onClick={logInfo}>Log to console</button>
        <button onClick={getEntries}>Show entries</button>
      </div>*/}
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>My Job Applications</Navbar.Brand>
          <Navbar.Text>
            <Button onClick={() => setNewAppShow(true)}>
              Add new application
            </Button>
          </Navbar.Text>
        </Container>
      </Navbar>

      <div className="applications">
        {applicationList && applicationList.length > 0 ? (
          applicationList.map((val, key) => (
            <div key={key}>
              <ApplicationCard
                editApplication={editApplication}
                deleteApplication={deleteApplication}
                getEntries={getEntries}
                jobID={val.jobID}
                company={val.company}
                title={val.title}
                listingURL={val.listingURL}
                salary={val.salary}
                location={val.location}
              />
            </div>
          ))
        ) : (
          <p>No applications to display</p>
        )}
      </div>
      <Modal show={newAppShow} onHide={() => setNewAppShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add new application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Company</Form.Label>
            <Form.Control
              onChange={(event) => {
                setCompany(event.target.value);
              }}
            />
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <Form.Label>Listing URL</Form.Label>
            <Form.Control
              onChange={(event) => {
                setListingURL(event.target.value);
              }}
            />
            <Form.Label>Salary</Form.Label>
            <Form.Control
              onChange={(event) => {
                setSalary(event.target.value);
              }}
            />
            <Form.Label>Location</Form.Label>
            <Form.Control
              onChange={(event) => {
                setLocation(event.target.value);
              }}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addApplication}>Add application</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default ApplicationList;
