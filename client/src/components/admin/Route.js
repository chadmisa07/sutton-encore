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
import RouteUpdateModal from "./RouteUpdateModal";
import RouteDeleteModal from "./RouteDeleteModal";
import ProcessOrdersModal from "./ProcessOrdersModal";

function Route() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [activeRouteId, setActiveRouteId] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [deliveryDays, setDeliveryDays] = useState([]);
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const [error, setError] = useState(null);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowProcessModal, setIsShowProcessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const doFetchDeliveryDays = () => {
    sendGetRequest("delivery-day", true)
      .then((res) => res.json())
      .then((data) => {
        setDeliveryDays(data);
      })
      .catch((err) => setError(JSON.stringify(err)));
  };

  const doFetchDeliveryPersons = () => {
    sendGetRequest("delivery-person", true)
      .then((res) => res.json())
      .then((data) => {
        setDeliveryPersons(data);
      })
      .catch((err) => setError(JSON.stringify(err)));
  };

  const doFetchRoutes = () => {
    setLoading(true);
    sendGetRequest("routes", true)
      .then((res) => res.json())
      .then((data) => {
        setRoutes(data);
        setLoading(false);
      })
      .catch((err) => setError(JSON.stringify(err)));
  };

  useEffect(() => {
    doFetchRoutes();
    doFetchDeliveryDays();
    doFetchDeliveryPersons();
  }, []);

  const doSetRoute = (routeId, isProcessModal) => {
    setActiveRouteId(routeId);
    if (isProcessModal) {
      setIsShowProcessModal(true);
    } else {
      setIsShowModal(true);
    }
  };

  const doShowDeleteModal = (personId) => {
    setActiveRouteId(personId);
    setIsShowDeleteModal(true);
  };

  const activeRoute = routes.find((route) => route.id === activeRouteId);

  const initialState = {
    id: activeRoute?.id,
    delivery_person_id: activeRoute?.delivery_person_id || "",
    delivery_day: activeRoute?.delivery_day || "",
    km: activeRoute?.distance || "",
    name: activeRoute?.name || "",
  };

  const submitCallback = () => {
    setIsShowModal(false);
    doFetchRoutes();
  };

  const handleCloseDeletePersonModal = () => {
    setIsShowDeleteModal(false);
    setActiveRouteId(null);
  };

  return (
    <div>
      {isShowModal && (
        <RouteUpdateModal
          open={isShowModal}
          handleClose={() => setIsShowModal(false)}
          initialState={initialState}
          deliveryDays={deliveryDays}
          deliveryPersons={deliveryPersons}
          submitCallback={submitCallback}
        />
      )}

      {isShowProcessModal && (
        <ProcessOrdersModal
          open={isShowProcessModal}
          handleClose={() => setIsShowProcessModal(false)}
          route={activeRoute}
          doFetchRoutes={doFetchRoutes}
        />
      )}

      {isShowDeleteModal && (
        <RouteDeleteModal
          open={isShowDeleteModal}
          handleClose={handleCloseDeletePersonModal}
          doFetchRoutes={doFetchRoutes}
          route={activeRoute}
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
                  Route List
                </Typography>
                <div className="px-4">
                  <Button
                    type="button"
                    variant="contained"
                    size="small"
                    onClick={() => doSetRoute(null)}
                  >
                    Add New Route
                  </Button>
                </div>
              </div>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="!font-semibold">ID</TableCell>
                    <TableCell className="!font-semibold">Name</TableCell>
                    <TableCell className="!font-semibold status-col">
                      Delivery Day
                    </TableCell>
                    <TableCell className="!font-semibold status-col">
                      Delivery Person
                    </TableCell>
                    <TableCell className="!font-semibold">
                      Distance (KM)
                    </TableCell>
                    <TableCell className="!font-semibold">Status</TableCell>
                    <TableCell className="!font-semibold action-col">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {routes?.length > 0 ? (
                    <>
                      {routes.map((route) => (
                        <TableRow
                          key={route.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell size="small">{route.id}</TableCell>
                          <TableCell size="small">{route.name}</TableCell>
                          <TableCell size="small">
                            {route.delivery_day_desc}
                          </TableCell>
                          <TableCell size="small">
                            {route.delivery_person}
                          </TableCell>
                          <TableCell size="small">{route.distance}</TableCell>
                          <TableCell size="small">{route.status}</TableCell>
                          <TableCell size="small">
                            {route.status === "Waiting for response" && (
                              <Button
                                type="button"
                                variant="contained"
                                size="small"
                                color="success"
                                onClick={() => doSetRoute(route.id, true)}
                              >
                                Process Orders
                              </Button>
                            )}
                            &nbsp;
                            <Button
                              type="button"
                              variant="contained"
                              size="small"
                              onClick={() => doSetRoute(route.id)}
                            >
                              Update
                            </Button>
                            &nbsp;
                            <Button
                              type="button"
                              variant="contained"
                              size="small"
                              onClick={() => doShowDeleteModal(route?.id)}
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
                        <TableCell colSpan={6} size="medium">
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
