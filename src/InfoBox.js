import React from 'react';
import './InfoBox.css'
import { CardContent, Card, Typography } from '@material-ui/core';

function InfoBox({ title, cases, isRed, active,  total, ...props}) {
    return (
        <Card className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`} onClick={props.onClick}>
            <CardContent>
                <Typography className="infoBox-title" color="textSecondary">

                {title}
                </Typography>
                    <h2 className={`infoBox-cases ${!isRed && 'infoBox--cases-green'}` }>{cases}</h2>
                <Typography className="infoBox-total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox;