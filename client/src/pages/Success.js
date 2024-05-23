import React, { useEffect, useState } from "react";
import SuccessPage from "../components/SuccessPage";
import { useParams, useNavigate } from "react-router-dom";
import { sendPostRequest } from "../utils";

const Success = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const { session_id } = params;
  useEffect(() => {
    if (session_id) {
      const setSubscription = async () => {
        const res = await sendPostRequest("set-subscription", { session_id });

        const data = await res.json();
        if (data?.subscriptionId) {
          setSuccess(true);
          navigate("/success");
        }
      };

      setSubscription();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/exhaustive-deps
  }, [session_id]);

  if (!success) return null;

  return <SuccessPage />;
};

export default Success;
