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
import { useLocation } from "react-router-dom";
import { useOrderContext } from "../../context/OrderContext";
const OrderDetails = () => {
    const [alertMessage, setAlertMessage] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("info");
    const { phoneNumber } = useOtpContext();
    const [displayRazorpay, setDisplayRazorpay] = useState(false);
    const { orderId } = useOrderContext(); // Access orderId and update function
    const [amountDetails, setAmountDetails] = useState({
        phoneNumber: '',
        gst: 0.05,
        amount: 200,
        deliveryCharges: 50,
        itemName:''

    })
    const [orderDetails, setOrderDetails] = useState({
        orderId: null,
        currency: null,
        amount: null,
    });


    useEffect(async () => {

        try {
            const amountDetails = await axios.get(config.baseURL + `/branding/getBranding/${orderId}`);
            console.log(amountDetails)
            setAmountDetails({
                phoneNumber: phoneNumber,
                gst: amountDetails.data.gst,
                amount: amountDetails.data.amount,
                deliveryCharges: amountDetails.data.deliveryCharges,
                itemName: amountDetails.data.itemName
            })

            handleShowAlert("Fetching amount details", "success");
        } catch (error) {
            handleShowAlert("Fetching Amount Details unsucessfull", "error");
        }


        return () => {

        };
    }, []);
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
            const placedOrder = await axios.post(config.baseURL + "/order/placeOrder", {
                amount: amountDetails.amount,
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

    const rows = [
        {
            name: amountDetails.itemName,
            price: amountDetails.amount,
        },
        { name: "Delivery charges", price: amountDetails.deliveryCharges },
        { name: "GST 5%", price: amountDetails.gst },
        { name: "Total", price: amountDetails.amount, className: "total_price" },
    ];

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
                                {rows.map((row, index) => (
                                    <TableRow key={row.name} className="table_row">
                                        {/* Handle first row differently */}
                                        {index === 0 ? (
                                            <>
                                                <TableCell className="table_content">
                                                    {row.name.split(",").map((item, idx) => (
                                                        <div key={idx} className="tableitems">
                                                            {item.trim()}
                                                        </div> // Each item on a new line
                                                    ))}
                                                </TableCell>
                                                <TableCell className="table_content">
                                                    &#8377;{row.price} {/* Price */}
                                                </TableCell>
                                            </>
                                        ) : (
                                            <>
                                                <TableCell className={`table_content ${row.className}`}>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell className={`table_content ${row.className}`}>
                                                    &#8377;{row.price}
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
                    keyId={"rzp_test_RJr4yjHjt8VHze"}
                    keySecret={"qTp0GBcJN1HDMSBL696csGuw"}
                />
            )}
        </Box>
    );
};

export default OrderDetails;
