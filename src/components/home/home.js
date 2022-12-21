import React, { useState, useCallback, useEffect } from "react";
import Header from "../header/header";
import "./home.css";

const Home = () => {
  const [isUpdateState, setUpdateState] = useState(false);
  const [contacts, setContacts] = useState([]);
  const headers = {
    "Content-Type": "application/json",
  };
  const baseURL = "http://localhost:3000/";

  const fetchContacts = useCallback(async () => {
    try {
      const response = await fetch(baseURL + "getContacts", { headers });
      setContacts(await response.json());
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const deleteContactHandler = (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: headers,
    };

    fetch(baseURL + "deleteContact" + id, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        fetchContacts();
      });
  };

  const toggleFavorite = (contact) => {
    contact.isFavorite = !contact.isFavorite;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(contact),
    };
    fetch(
      // 'https://api.sumantgupta.com.np/udpateContact',
      "http://localhost:3000/updateContact",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        fetchContacts();
      })
      .catch((err) => {
        alert("something went wrong... ", err);
      });
  };
  /****************************** form js ***********************/

  const [nameInput, setName] = useState("");
  const [addressInput, setAddress] = useState("");
  const [contactInput, setContact] = useState("");
  const [officeContactInput, setOfficeContact] = useState("");
  const [homeContactInput, setHomeContact] = useState("");
  const [isFavoriteInput, setIsFav] = useState(false);
  const [emailInput, setEmail] = useState("");
  const [id, setId] = useState("");

  const nameHandler = (event) => {
    setName(event.target.value);
  };

  const contactHandler = (event) => {
    setContact(event.target.value);
  };

  const addressHandler = (event) => {
    setAddress(event.target.value);
  };

  const officeContactHandler = (event) => {
    setOfficeContact(event.target.value);
  };

  const homeContactHandler = (event) => {
    setHomeContact(event.target.value);
  };

  const isFavoriteHandler = (event) => {
    setIsFav(event.target.checked);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const idHandler = (event) => {
    setId(event.target.value);
  };

  const clearForm = () => {
    setEmail("");
    setName("");
    setContact("");
    setIsFav(false);
    setHomeContact("");
    setOfficeContact("");
    setAddress("");
    setId("");
    setUpdateState(false);
  };

  const setUpdatableContact = (updatableContact) => {
    setEmail(updatableContact.email);
    setName(updatableContact.name);
    setContact(updatableContact.contactNumber);
    setIsFav(updatableContact.isFavorite);
    setHomeContact(updatableContact.homeNumber || "");
    setOfficeContact(updatableContact.officeNumber || "");
    setAddress(updatableContact.address);
    setId(updatableContact.id);
    setUpdateState(true);
  };

  const addUpdateContact = (event) => {
    event.preventDefault();
    const contactData = {
      name: nameInput,
      contactNumber: contactInput !== "" ? parseInt(contactInput) : undefined,
      email: emailInput,
      homeNumber:
        homeContactInput !== "" ? parseInt(homeContactInput) : undefined,
      officeNumber:
        officeContactInput !== "" ? parseInt(officeContactInput) : undefined,
      address: addressInput,
      isFavorite: isFavoriteInput === true ? 1 : 0,
      id: id,
    };
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(contactData),
    };

    if (isUpdateState) {
      fetch("http://localhost:3000/updateContact", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          alert("contact updated successfully");
          fetchContacts();
          clearForm();
          setUpdateState(false);
        })
        .catch((err) => {
          alert("something went wrong... ", err);
        });
    } else {
      fetch(baseURL + "addNewContact", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          alert("contact added successfully");
          fetchContacts();
          clearForm();
          setUpdateState(false);
        })
        .catch((err) => {
          alert("something went wrong... ", err);
        });
    }
  };

  return (
    <div>
      <Header></Header>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <h4>All Contacts</h4>
            <div className="fixed-box">
              {contacts.length === 0 ? (
                <p>No contact found, try to add some first.</p>
              ) : (
                contacts.map((contact) => (
                  <div className="card my-3" key={contact.id}>
                    <div className="card-header">
                      <div className="d-flex justify-content-between">
                        <div>
                          <b>{contact.name}</b>, {contact.address}
                        </div>
                        <div>
                          {contact.isFavorite == 0 ? (
                            <button
                              className="starButton"
                              onClick={() => toggleFavorite(contact)}
                            >
                              <i className="far fa-star"></i>
                            </button>
                          ) : (
                            <button
                              className="starButton"
                              onClick={() => toggleFavorite(contact)}
                            >
                              <i className="fas fa-star"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-10">
                          <div className="d-flex justify-content-between">
                            {contact.contactNumber != undefined ? (
                              <h6>
                                <a href={"tel:" + contact.contactNumber}>
                                  <i className="fas fa-mobile-alt"></i>{" "}
                                  {contact.contactNumber}
                                </a>
                              </h6>
                            ) : (
                              <h6></h6>
                            )}
                            {contact.homeNumber != undefined ? (
                              <h6>
                                <a href={"tel:" + contact.homeNumber}>
                                  <i className="fas fa-home"></i>{" "}
                                  {contact.homeNumber}
                                </a>
                              </h6>
                            ) : (
                              <h6></h6>
                            )}
                            {contact.officeNumber != undefined ? (
                              <h6>
                                <a href={"tel:" + contact.officeNumber}>
                                  <i className="fas fa-building"></i>{" "}
                                  {contact.officeNumber}
                                </a>
                              </h6>
                            ) : (
                              <h6></h6>
                            )}
                          </div>
                          <div>
                            {contact.email != "" ? (
                              <h6>
                                <a href={"mailto:" + contact.email}>
                                  <i className="fas fa-envelope"></i>{" "}
                                  {contact.email}
                                </a>
                              </h6>
                            ) : (
                              <h6></h6>
                            )}
                          </div>
                        </div>
                        <div className="col-2">
                          <button
                            type="button"
                            className="btn btn-danger btn-sm m-1"
                            onClick={() => deleteContactHandler(contact.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm m-1"
                            onClick={() => setUpdatableContact(contact)}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="col-4">
            <div className="card">
              <div className="card-header">Add New Contact</div>
              <div className="card-body">
                <form>
                  <input type="hidden" id="id" value={id} />
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={nameInput}
                      onChange={nameHandler}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={emailInput}
                      onChange={emailHandler}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contact Number</label>
                    <input
                      type="number"
                      className="form-control"
                      value={contactInput}
                      onChange={contactHandler}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Home Contact Number</label>
                    <input
                      type="number"
                      className="form-control"
                      value={homeContactInput}
                      onChange={homeContactHandler}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Office Contact Number</label>
                    <input
                      type="number"
                      className="form-control"
                      value={officeContactInput}
                      onChange={officeContactHandler}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="address"
                      className="form-control"
                      value={addressInput}
                      onChange={addressHandler}
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value={isFavoriteInput}
                      onChange={isFavoriteHandler}
                    />
                    <label className="form-check-label">Make Favourite</label>
                  </div>
                  <div className="mb-3">
                    <button
                      className="btn btn-secondary mx-2"
                      onClick={addUpdateContact}
                    >
                      {isUpdateState == false ? "Add" : "Update"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary mx-2"
                      onClick={clearForm}
                    >
                      Clear Form
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
