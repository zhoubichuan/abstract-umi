import styles from './register.module.less';
// import logo from '@assets/images/logo.svg';
import React from 'react';
export default class Register extends React.Component<RegisterProps> {
    handleLinkBtnClick = () => {
        this.props.history.push('/login');
    };
    handleAddBtnClick = () => {
        this.props.incrementAsync();
    };

    render() {
        const { count } = this.props;
        return (
            <div className={styles.container}>
                <header className={styles.header}>
                    {/* <img src={logo} className={styles.logo} alt="logo" /> */}
                    <p>This is Register Page </p>
                    <p className={styles.btn} onClick={this.handleLinkBtnClick}>
                        Go to the <span className={styles.pageName}>Login</span> Page
                    </p>
                    <p className={styles.btn} onClick={this.handleAddBtnClick}>
                        Async Add Btn
                    </p>
                    <p>count : {count}</p>
                </header>
            </div>
        );
    }
}
// export default connect(mapStateToProps, mapDispatchToProps)(Register);
