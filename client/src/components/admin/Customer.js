import React, { useCallback, useEffect, useState } from "react";
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

import UserUpdateModal from "./UserUpdateModal";
import { PACKS } from "../Form";
import CancelModal from "./CancelSubscriptionModal";
import Filters from "./Filters";
import Alert from "../Alert";
import { sendGetRequest } from "../../utils";

function Customer() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState(null);
  const [isCancel, setIsCancel] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [error, setError] = useState(null);
  const [filterByStatus, setFilterByStatus] = useState("0");
  const [sortBy, setSortBy] = useState("id");

  const doFetchCustomers = () => {
    sendGetRequest("customers", true)
      .then((res) => res.text())
      .then((data) => {
        setData(JSON.parse(data));
        setFilteredData(JSON.parse(data));
      })
      .catch((err) => setError(JSON.stringify(err)));
  };

  useEffect(() => {
    doFetchCustomers();
  }, []);

  const doSetUser = (user) => setUser(user);

  const handleCloseUpdateModal = useCallback(() => {
    setUser(null);
    setIsUpdate(false);
  }, []);

  const handleCloseCancelModal = useCallback(() => {
    setUser(null);
    setIsCancel(false);
  }, []);

  useEffect(() => {
    let newFilterData = data;

    if (filterByStatus !== "0") {
      newFilterData = newFilterData.filter(
        (x) => x.status === Number(filterByStatus)
      );
    }

    //Sort
    function compareBy(a, b) {
      const nameA = a[sortBy];
      const nameB = b[sortBy];

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    }

    if (newFilterData.length) {
      newFilterData = newFilterData.slice().sort(compareBy);
    }

    setFilteredData(newFilterData);
  }, [filterByStatus, sortBy, data]);

  const doSetFilterByStatus = (filter) => {
    setFilterByStatus(filter);
  };

  const doSetSortBy = (sort) => {
    setSortBy(sort);
  };

  return (
    <div>
      {isUpdate ? (
        <UserUpdateModal
          user={user}
          open={isUpdate}
          handleClose={handleCloseUpdateModal}
          doFetchCustomers={doFetchCustomers}
        />
      ) : null}

      {isCancel ? (
        <CancelModal
          user={user}
          open={isCancel}
          handleClose={handleCloseCancelModal}
          doFetchCustomers={doFetchCustomers}
        />
      ) : null}

      <Box sx={{ paddingTop: 2, flexGrow: 1 }} className="shadow-lg border">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert error={error} containerClassName="mt-0 mb-2" />
            <TableContainer
              component={Paper}
              className="!border-none !shadow-none"
            >
              <Typography variant="h4" className="p-4 customer-list-header">
                Customer List
              </Typography>
              <Filters
                doSetFilterByStatus={doSetFilterByStatus}
                doSetSortBy={doSetSortBy}
              />
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="!font-semibold">Name</TableCell>
                    <TableCell className="!font-semibold">Phone #</TableCell>
                    <TableCell className="!font-semibold status-col">
                      Status
                    </TableCell>
                    <TableCell className="!font-semibold">
                      Postal Code
                    </TableCell>
                    <TableCell className="!font-semibold">City</TableCell>
                    <TableCell className="!font-semibold">Number</TableCell>
                    <TableCell className="!font-semibold">Street</TableCell>
                    <TableCell className="!font-semibold">Apartment</TableCell>
                    <TableCell className="!font-semibold">
                      Subscription
                    </TableCell>
                    <TableCell className="!font-semibold action-col">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData?.length > 0 ? (
                    <>
                      {filteredData.map((row) => {
                        const pack = PACKS.find(
                          (pack) => pack.value === row.quantity
                        );
                        return (
                          <TableRow
                            key={row.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell size="small">{row.name}</TableCell>
                            <TableCell size="small">
                              {row.phone_number}
                            </TableCell>
                            <TableCell size="small status-row">
                              {row.status_desc}
                            </TableCell>
                            <TableCell size="small">
                              {row.postal_code}
                            </TableCell>
                            <TableCell size="small">{row.city}</TableCell>
                            <TableCell size="small">
                              {row.street_number}
                            </TableCell>
                            <TableCell size="small">
                              {row.street_name}
                            </TableCell>
                            <TableCell size="small">{row.apartment}</TableCell>
                            <TableCell size="small">{pack.label}</TableCell>
                            <TableCell size="small" className="action-row">
                              <div className="flex flex-wrap gap-1">
                                {row.status === 1 && (
                                  <Button
                                    type="button"
                                    variant="contained"
                                    onClick={() => {
                                      doSetUser(row);
                                      setIsUpdate(true);
                                    }}
                                    size="small"
                                  >
                                    Update
                                  </Button>
                                )}

                                {row.status !== 2 && (
                                  <span>
                                    <Button
                                      type="button"
                                      variant="contained"
                                      onClick={() => {
                                        doSetUser(row);
                                        setIsCancel(true);
                                      }}
                                      color="error"
                                      size="small"
                                    >
                                      Cancel
                                    </Button>
                                  </span>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <TableRow>
                        <TableCell colSpan={12} size="medium">
                          <div className="text-center">No record found.</div>
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

export default Customer;
