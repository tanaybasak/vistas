import PropTypes from "prop-types";
import { createContext, useContext, useState, useEffect } from "react";
import Loading from "../pages/Loading/Loading";

// Create a Context for Order management
const OrderContext = createContext();

// Custom hook to use Order context
export const useOrderContext = () => useContext(OrderContext);

// Provider component to wrap your app
export const OrderProvider = ({ children }) => {
  const [orderId, setOrderId] = useState(null); // Initialize orderId state
  const [loading, setLoading] = useState(true); // Optional loading state

  // Set loading to false after initial render (if you want to show loading spinner)
  useEffect(() => {
    setLoading(false);
  }, []);

  // Function to update the orderId
  const updateOrderId = (newOrderId) => {
    setOrderId(newOrderId);
  };

  return (
    <OrderContext.Provider
      value={{
        orderId, // Current orderId
        updateOrderId, // Function to update orderId
      }}
    >
      {loading ? <Loading />: children} {/* Optionally, show loading state */}
    </OrderContext.Provider>
  );
};

OrderProvider.propTypes = {
  children: PropTypes.node,
};
