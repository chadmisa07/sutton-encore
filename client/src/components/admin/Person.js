import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Alert from "../Alert";
import { sendGetRequest } from "../../utils";
import PersonUpdateModal from "./PersonUpdateModal";
import PersonDeleteModal from "./PersonDeleteModal";

function Route() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [activePersonId, setActivePersonId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const [error, setError] = useState(null);

  const doFetchDeliveryPersons = () => {
    setLoading(true);
    sendGetRequest("delivery-person", true)
      .then((res) => res.json())
      .then((data) => {
        setDeliveryPersons(data);
        setLoading(false);
      })
      .catch((err) => setError(JSON.stringify(err)));
  };

  useEffect(() => {
    doFetchDeliveryPersons();
  }, []);

  const doSetPerson = (personId) => {
    setActivePersonId(personId);
    setIsShowModal(true);
  };

  const doShowDeleteModal = (personId) => {
    setActivePersonId(personId);
    setIsShowDeleteModal(true);
  };

  const activePerson = deliveryPersons.find(
    (person) => person.id === activePersonId
  );

  const initialState = {
    id: activePerson?.id,
    first_name: activePerson?.first_name || "",
    last_name: activePerson?.last_name || "",
  };

  const submitCallback = () => {
    setIsShowModal(false);
    doFetchDeliveryPersons();
  };

  const handleClosePersonModal = () => {
    setIsShowModal(false);
    setActivePersonId(null);
  };

  const handleCloseDeletePersonModal = () => {
    setIsShowDeleteModal(false);
    setActivePersonId(null);
  };

  return (
    <div>
      {isShowModal && (
        <PersonUpdateModal
          open={isShowModal}
          handleClose={handleClosePersonModal}
          initialState={initialState}
          submitCallback={submitCallback}
        />
      )}

      {isShowDeleteModal && (
        <PersonDeleteModal
          open={isShowDeleteModal}
          handleClose={handleCloseDeletePersonModal}
          doFetchDeliveryPersons={doFetchDeliveryPersons}
          person={activePerson}
        />
      )}

      <Box sx={{ paddingTop: 2, flexGrow: 1 }} className="shadow-lg border">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert error={error} containerClassName="mt-0 mb-2" />
            <TableContainer
              component={Paper}
              className="!border-none !shadow-none"
            >
              <div className="flex justify-between items-center">
                <Typography variant="h4" className="p-4 customer-list-header">
                  Delivery Person List
                </Typography>
                <div className="px-4">
                  <Button
                    type="button"
                    variant="contained"
                    size="small"
                    onClick={() => doSetPerson(null)}
                  >
                    Add New Person
                  </Button>
                </div>
              </div>

              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="!font-semibold">ID</TableCell>
                    <TableCell className="!font-semibold">First Name</TableCell>
                    <TableCell className="!font-semibold status-col">
                      Last Name
                    </TableCell>
                    <TableCell className="!font-semibold action-col">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deliveryPersons?.length > 0 ? (
                    <>
                      {deliveryPersons.map((person) => (
                        <TableRow
                          key={person.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell size="small">{person.id}</TableCell>
                          <TableCell size="small">
                            {person.first_name}
                          </TableCell>
                          <TableCell size="small">{person.last_name}</TableCell>
                          <TableCell size="small">
                            <Button
                              type="button"
                              variant="contained"
                              size="small"
                              onClick={() => doSetPerson(person?.id)}
                            >
                              Update
                            </Button>
                            &nbsp;
                            <Button
                              type="button"
                              variant="contained"
                              size="small"
                              onClick={() => doShowDeleteModal(person?.id)}
                              color="error"
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <>
                      <TableRow>
                        <TableCell colSpan={4} size="medium">
                          <div className="text-center">
                            {loading ? "Loading..." : "No record found."}
                          </div>
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Route;
