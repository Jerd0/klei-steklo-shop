import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AnimationStyles from "react-awesome-slider/src/styled/fall-animation/fall-animation.scss";
import MAIN1 from "../../Asserts/MAIN1.jpg";
import MAIN2 from "../../Asserts/MAIN2.jpg";
import MAIN3 from "../../Asserts/MAIN3.jpg";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import AwesomeSlider from "react-awesome-slider";
import CoreStyles from "react-awesome-slider/src/core/styles.scss";
import {toggleSlider} from "../../Redux/Actions";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";

const AutoplaySlider = withAutoplay(AwesomeSlider);
const mapStateToProps = state => {
    return {
        showSlider: state.showSlider
    };
};
class SliderNew extends Component{
    render() {
        if (!this.props.showSlider) return null;
        return (
            <div>
                <IconButton
                    style={{marginLeft:'95%'}}
                    onClick={() => {
                        this.props.dispatch(toggleSlider());
                    }}
                >
                    <CloseIcon size="small" alt='Закрыть'/>
                </IconButton>
            <AutoplaySlider
                play={true}
                cancelOnInteraction={false} // should stop playing on user interaction
                interval={5000}
                animation="fallAnimation"
                cssModule={[CoreStyles, AnimationStyles]}
                style={{maxWidth:'100%', marginBottom:'5%', marginLeft:'2%', marginRight:'2%'}}
            >
                <div><img
                    style={{maxWidth:'100%', maxHeight:'100%' }}
                    src={MAIN1} alt={'Клеим стёлка'}/></div>
                <div> <img style={{maxWidth:'100%', maxHeight:'100%'}} alt={'Клеим стёлка'} src={MAIN2} /></div>
                <div> <img style={{maxWidth:'100%', maxHeight:'100%'}}  alt={'Клеим стёлка'} src={MAIN3} /></div>
            </AutoplaySlider>
            </div>

        );
    }
}
const Slider = withRouter(connect(mapStateToProps)(SliderNew));
export default Slider;
