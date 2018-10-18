import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
//import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import imgPerfect from '../../assets/perfectScore2.jpg';
import imgBad from '../../assets/badScore.jpg';
import imgMedium from '../../assets/mediumScore.png';

const styles = {
  card: {
    maxWidth: 345,
    marginBottom: 10,
  },
  media: {
    height: 180,
  },
};

class ReportCard extends Component {

    render() {
        const { classes } = this.props;

        let pic = imgBad;
        if (this.props.result === 100)
            pic = imgPerfect;
        else if (this.props.result >=75)
            pic = imgMedium;

        //let buttonText = "Review Incorrect"

        return (
            <div>
                <Card className={classes.card}>
                    {/* <CardActionArea> */}
                        <CardMedia className={classes.media} image={pic} title="Perfect Score" />
                        <CardContent>
                            <Typography gutterBottom variant="display3">
                                {this.props.result}%
                            </Typography>
                            <b>Time to Complete:</b><br />
                            {this.props.duration}
                        </CardContent>
                    {/* </CardActionArea> */}
                    <CardActions>
                        <Button size="small" color="primary" onClick={this.props.onReview}>
                            { this.props.review ? "Hide Incorrect" : "Review Incorrect" }
                        </Button>
                        <Button size="small" color="primary" onClick={this.props.onFinish}>
                            Complete
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(ReportCard);
