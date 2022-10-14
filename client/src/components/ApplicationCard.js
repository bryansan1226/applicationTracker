import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ApplicationCard(props) {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [listingURL, setListingURL] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [show, setShow] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleDelete = () => {
    setIsDeleting(true);
  };
  const handleDeleteConfirm = () => {
    setIsDeleting(false);
    props.deleteApplication(props.jobID);
    props.getEntries();
  };
  const handleDeleteCancel = () => {
    setIsDeleting(false);
  };
  const handleEdit = () => {
    setCompany(props.company);
    setTitle(props.title);
    setListingURL(props.listingURL);
    setSalary(props.salary);
    setLocation(props.location);
    setIsEditing(true);
  };
  const handleEditConfirm = () => {
    props.editApplication(
      props.jobID,
      company,
      title,
      listingURL,
      salary,
      location
    );
    setIsEditing(false);
    props.getEntries();
    props.getEntries();
  };
  const handleEditCancel = () => {
    setIsEditing(false);
  };
  const editing = () => {
    if (isEditing)
      return (
        <>
          <Modal.Body>
            <div className="editApplication">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
              <br />
              <label>Listing URL</label>
              <input
                type="text"
                value={listingURL}
                onChange={(event) => {
                  setListingURL(event.target.value);
                }}
              />
              <br />
              <label>Salary</label>
              <input
                type="text"
                value={salary}
                onChange={(event) => {
                  setSalary(event.target.value);
                }}
              />
              <br />
              <label>Location</label>
              <input
                type="text"
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleEditConfirm}>Confirm Changes</Button>
            <Button onClick={handleEditCancel}>Cancel Changes</Button>
          </Modal.Footer>
        </>
      );
    else
      return (
        <>
          <Modal.Body>
            Title: {props.title}
            <br /> Listing Url: {props.listingURL}
            <br /> Salary: {props.salary}
            <br />
            Location: {props.location}
            <br />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </Modal.Footer>
        </>
      );
  };

  return (
    <>
      <div>
        <Card bg="primary" text="white">
          <Card.Body>
            <Card.Title>{props.company}</Card.Title>
            <Card.Subtitle>{props.title}</Card.Subtitle>
            <Button variant="outline-light" onClick={handleShow}>
              View
            </Button>
            <Button variant="outline-light" onClick={handleDelete}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.company}</Modal.Title>
        </Modal.Header>
        {editing()}
      </Modal>
      <Modal show={isDeleting} onHide={handleDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this application? You CAN NOT view
          this application again if you delete.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ApplicationCard;
