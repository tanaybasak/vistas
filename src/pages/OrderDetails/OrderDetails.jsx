import {
    Box,
    Typography,
    Button,
    Table,
    TableRow,
    TableCell,
    TableContainer,
    TableBody,
} from "@mui/material";
import "./Order.css";
import { useEffect, useState } from "react";
import config from "../../config";
import RenderRazorpay from "./RenderRazorpay";
import AlertComponent from "../../components/Alert";
import axios from "axios";
import { useOtpContext } from "../../context/OtpContext";
import { useOrderContext } from "../../context/OrderContext";
const OrderDetails = () => {
    const [alertMessage, setAlertMessage] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("info");
    const { phoneNumber } = useOtpContext();
    const [displayRazorpay, setDisplayRazorpay] = useState(false);
    const [paymentBreakup, setPaymentBreakup] = useState([]);
  const { orderId } = useOrderContext(); // Access orderId and update function
  const [amountDetails, setAmountDetails] = useState({
    gst: 0.05,
    quantity: 0,
    amount: 200,
    delivery: 50,
    itemName: '',
    totalAmount: 0
  });
    const [orderDetails, setOrderDetails] = useState({
        orderId: null,
        currency: null,
        amount: null,
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(config.baseURL + `/branding/getBranding/${orderId}`);
                const amountDetails = response.data;
    
                setAmountDetails(amountDetails);
                setPaymentBreakup([
                    { name: `${amountDetails.itemName} * ${amountDetails.quantity}`, price: amountDetails.amount },
                    { name: "Delivery charges", price: amountDetails.delivery },
                    { name: "GST 5%", price: amountDetails.gst },
                    { name: "Total", price: amountDetails.totalAmount, className: "total_price" }
                ]);
            } catch (error) {
                handleShowAlert("Fetching Amount Details unsuccessful", "error");
            }
        };
    
        fetchData(); // Call the async function
    }, [orderId]); // Add orderId as a dependency
    
    const handleShowAlert = (message, severity) => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setAlertOpen(true);
    };

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };
    const handleCreateOrder = async () => {
        try {
            const placedOrder = await axios.post(config.baseURL + "/payment/createPayment", {
                amount: amountDetails.totalAmount,
                userId: phoneNumber,
                currency: "INR",
                keyId: import.meta.env.REACT_APP_RAZORPAY_KEY_ID,
                KeySecret: import.meta.env.REACT_APP_RAZORPAY_KEY_SECRET
            });

            const { data } = placedOrder;

            if (data && data.order_id) {
                setOrderDetails({
                    orderId: data.order_id,
                    currency: data.currency,
                    amount: data.amount,
                });
                setDisplayRazorpay(true);
            }
            handleShowAlert("Initiating Payment", "error");
        } catch (error) {
            handleShowAlert("Payment unsucessfull", "error");
        }
    };



    return (
        <Box className="order-page">
            <Box className="order-box">
                <Typography variant="h5" className="order-heading">
                    ORDER DETAILS
                </Typography>
                <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    className="order-subtitle"
                >
                    Address: T5B - 3C, Priya Exotica, Kahilipara, Guwahati, 781019{" "}
                </Typography>

                <Box className="order_content">
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {paymentBreakup.length > 0 && paymentBreakup?.map((row, index) => (
                                    <TableRow key={row.name} className="table_row">
                                        {/* Handle first row differently */}
                                        {index === 0 ? (
                                            <>
                                                <TableCell className="table_content">
                                                    {row?.name.split(",").map((item, idx) => (
                                                        <div key={idx} className="tableitems">
                                                            {item.trim()}
                                                        </div> // Each item on a new line
                                                    ))}
                                                </TableCell>
                                                <TableCell className="table_content">
                                                    &#8377;{row?.price} {/* Price */}
                                                </TableCell>
                                            </>
                                        ) : (
                                            <>
                                                <TableCell className={`table_content ${row?.className}`}>
                                                    {row?.name}
                                                </TableCell>
                                                <TableCell className={`table_content ${row?.className}`}>
                                                    &#8377;{row?.price}
                                                </TableCell>
                                            </>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button
                        variant="contained"
                        className="continue-button order_btn"
                        onClick={handleCreateOrder}
                        fullWidth
                    >
                        Pay
                    </Button>
                    <AlertComponent
                        message={alertMessage}
                        severity={alertSeverity}
                        open={alertOpen}
                        onClose={handleCloseAlert}
                    />
                </Box>
            </Box>
            {displayRazorpay && (
                <RenderRazorpay
                    amount={orderDetails.amount}
                    currency={orderDetails.currency}
                    orderId={orderDetails.orderId}
                    keyId={import.meta.env.REACT_APP_RAZORPAY_KEY_ID}
                    keySecret={import.meta.env.REACT_APP_RAZORPAY_KEY_SECRET}
                />
            )}
        </Box>
    );
};

export default OrderDetails;
