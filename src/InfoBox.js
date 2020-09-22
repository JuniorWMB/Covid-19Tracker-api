import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

function InfoBox({ title, cases, total }) {
  return (
    <Card className="infoBox">
      <CardContent>
        {/* title coronavirus cases */}
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        {/* Number of cases  */}

        <h2 className="infoBox__cases">{cases}</h2>
        {/* Totla */}
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
