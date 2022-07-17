import React from 'react';
import styles from './login.module.less';


export default class Login extends React.Component<LoginProps> {
    constructor(props, context) {
        super(props, context);
    }

    handleLinkBtnClick = () => {
        this.props.history.push('/home');
    };

    handleAddBtnClick = () => {
        this.props.increment();
    };

    handleDecreaseBtnClick = () => {
        this.props.decrement();
    };

    render() {
        const { count } = this.props;
        return (
            <div className={styles.container}>
                <header className={styles.header}>
                    {/* <img src={logo} className={styles.logo} alt="logo" /> */}
                    <p>This is Login Page </p>
                    <p className={styles.btn} onClick={this.handleLinkBtnClick}>
                        Go to <span className={styles.pageName}>Home</span> Page
                    </p>
                    <p className={styles.btn} onClick={this.handleAddBtnClick}>
                        Add Btn
                    </p>
                    <p className={styles.btn} onClick={this.handleDecreaseBtnClick}>
                        Decrease Btn
                    </p>
                    <p>count : {count}</p>
                </header>
            </div>
        );
    }
}
