import React from 'react';

//Reference: https://medium.com/@farid12ansari7/make-a-snackbar-or-pop-up-notification-for-a-react-web-app-fd246dd1b9f0
export class Snackbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        };
    }

    openSnackBar = (message = 'Something went wrong...') => {
        this.message = message;
        this.setState({ isActive: true }, () => {
            setTimeout(() => {
                this.setState({ isActive: false });
            }, 4000);
        });
    }

    render() {
        const { isActive } = this.state;
        return (
            <div className={isActive ? "snackbar snackbarShow" : "snackbar"}>
                {this.message}
            </div>
        )
    }
}

export default Snackbar;