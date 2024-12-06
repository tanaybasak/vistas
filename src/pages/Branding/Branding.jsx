import { Outlet } from "react-router-dom";
import CardBrand from "../../components/Card";
import { Grid2 } from "@mui/material"; // Assuming you use MUI's Grid2 for layout

const cardData = [
  { id: 1, title: "Brand 1", description: "This is Brand 1" },
  { id: 2, title: "Brand 2", description: "This is Brand 2" },
  { id: 3, title: "Brand 3", description: "This is Brand 3" },
  { id: 4, title: "Brand 4", description: "This is Brand 4" },
];

function Branding() {
  return (
    <>
      <Grid2
        container
        spacing={4}
        style={{ padding: 16 }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {cardData.map((card) => (
          <Grid2 key={card.id} xs={12} sm={6} md={4} lg={3}>
            <CardBrand title={card.title} description={card.description} />
          </Grid2>
        ))}
      </Grid2>
      <Outlet />
    </>
  );
}

export default Branding;
