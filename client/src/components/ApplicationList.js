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
import baseUrl from "../util/baseUrl";

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
    Axios.post(baseUrl + "/addApplication", {
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
    console.log("frontend running deleteApplication " + JSON.stringify(jobID));
    console.log(jobID);
    Axios.post(baseUrl + "/deleteApplication", {
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
    Axios.post(baseUrl + "/editApplication", {
      company: company,
      title: title,
      listingURL: listingURL,
      salary: salary,
      location: location,
      jobID: jobID,
    }).then(() => {
      console.log("Edit success");
    });
  };

  const getEntries = () => {
    Axios.get(baseUrl + "/applications").then((response) => {
      console.log(response);
      setApplicationList(response.data.rows);
      console.log("\nGetting entries: ");
      console.log(applicationList);
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
        {applicationList.map((val, key) => {
          return (
            <div>
              <ApplicationCard
                editApplication={editApplication}
                deleteApplication={deleteApplication}
                getEntries={getEntries}
                jobID={val.jobid}
                company={val.company}
                title={val.title}
                listingURL={val.listingurl}
                salary={val.salary}
                location={val.location}
              />
            </div>
          );
        })}
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
