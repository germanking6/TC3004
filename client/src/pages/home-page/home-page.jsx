import React from 'react';
import './home-page.css';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import image1 from '../../../assets/bee.png';

function HomePage() {
    return (
        <Card sx={{ maxWidth:'70%', margin:'1rem auto' }}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <div className = 'homepage'>
                        <h1> WELCOME! </h1>
                        <h2> LERT - LABOR EXPENSES RECOVERY TOOL IS AN AID IN THE FINANCES OF THE MANAGER.
                            IT MANAGES SQUAD, EMPLOYEES AND CREATE THE FALL PLAN, PLANNING EXPENSES AND FINANCIAL RECOVERIES.
                        </h2>
                        <h3> THE GOAL OF THIS APPLICATIONS IS:</h3>
                        <p>-Reduction of invested by managers. <br/> -Having employee control.
                            <br/> -Ease of planning expense.
                            <br/>-Create financial recoveries.
                            <br/>-Create fall plan.
                        </p>
                    </div>
                </Grid>
                <Grid item xs={4} className='logo'>
                    <img src={image1} />
                </Grid>
            </Grid>
        </Card>
    );
}

export default HomePage;