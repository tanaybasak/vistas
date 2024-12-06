import { Outlet } from "react-router-dom";
import CardBrand from "../../components/Card";
import Grid from '@mui/material/Grid2';
import visitingImg from '../../assets/image.svg';
import { Box } from "@mui/material";
import './Branding.css';
const cardData = [
  { id: 1, title: "VISITING CARD", description: "This is Brand 1", image: visitingImg },
  { id: 2, title: "LETTERHEAD", description: "This is Brand 2", image: visitingImg },
  { id: 3, title: "NOTEBOOK", description: "This is Brand 3", image: visitingImg },
  { id: 4, title: "NOTEPAD", description: "This is Brand 4", image: visitingImg },
  { id: 5, title: "PRESENTATION FOLDERS", description: "This is Brand 4", image: visitingImg },
  { id: 5, title: "ID CARD", description: "This is Brand 4", image: visitingImg },
  { id: 5, title: "FLIP DESK CALENDAR", description: "This is Brand 4", image: visitingImg },
  { id: 7, title: "ENVELOP", description: "This is Brand 4", image: visitingImg },

];

function Branding() {
  return (
    <>
      {/* <Grid2
        container
        spacing={4}
        style={{ padding: 16 }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {cardData.map((card) => (
          <Grid2 key={card.id} xs={12} sm={6} md={4} lg={3}>
            <CardBrand title={card.title} description={card.description} img={card.image} />
          </Grid2>
        ))}
      </Grid2> */}

      <div className="branding_container">
        {cardData.map((card) => (
          <div className="grid-item" key={card.id}>
            <CardBrand title={card.title} description={card.description} img={card.image} />
          </div>
        ))}
        <Outlet />

      </div>
    </>
  );
}

export default Branding;
