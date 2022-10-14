/*import { useState } from "react";

function NewApplicationInput(props) {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [listingURL, setListingURL] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const addApplication = () => {
    props.addApplication(company, title, listingURL, salary, location);
  };
  return (
    <div>
      <label>Company</label>
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
      </div>
    </div>
  );
}
export default NewApplicationInput;*/
