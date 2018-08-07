import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import { withRouter } from 'react-router-dom';


const masonryOptions = {
    // transitionDuration : 0,
    // horizontalOrder : true
    columnWidth: 50,
    gutter: 10,
    fitWidth : true
}

{/* <Masonry options = {masonryOptions}>

</Masonry> */}


const theOptions = ['Create User', 'Upload Video Tutorial', 'Upload Audio', 'Design Templates'];


class Office extends Component {
    constructor(props) {
        super(props);

        this.perusetheClick = this.perusetheClick.bind(this);
    }


    perusetheClick(option) {
        console.log(option);
        this.props.history.push(`/${option}`);
    }

    render() {
        let theContent = null;
        theContent = theOptions.map((option, index) => {
            return (
                <div key={index} 
                onClick={() => this.perusetheClick(option.toLowerCase().replace(' ', '').replace(' ', ''))} 
                style={{ width: 200, marginBottom: 10, backgroundColor : '#f5f5f5', cursor: 'pointer', display: 'block', padding: 10, borderRadius: 5, boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.2)' }}>
                    <span style={{ fontSize: 18, }}>{option}</span>
                    <hr />
                </div>
            );
        })
        return (
            <div style={{ marginTop: 50 }}>
                <div style={{ marginTop: 80, maxWidth: '70%', margin: '0 auto', textAlign: 'center' }}>
                    <img src="./Logo22.png" alt="logo" style={{ width: 150, margin: '0 auto', display: 'block' }} />
                    <span style={{ fontSize: 20, }}>{this.props.username}, Anything for your boy? </span>
                    <div style={{ textAlign: 'left', marginTop : 30 }}>
                        <Masonry
                            options={masonryOptions}>
                            {theContent}
                        </Masonry>
                    </div>
                </div>
                <h6 style={{ position: 'absolute', bottom: '1%', left: '50%', transform: 'translateX(-50%)' }}>&copy;VidEcom, 2018</h6>
            </div>
        );
    }
}

export default withRouter(Office);