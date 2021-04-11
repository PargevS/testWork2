import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
//* import of components and developer packages
import './TD.scss';

const TD = ({children, elClassName, ...attrs}) => {
    const classes = classNames(elClassName);

    console.log('tddddddddd')

    return (
        <td className={classes} {...attrs}>
            {children}
        </td>
    );
};

TD.propTypes = {
    children: PropTypes.node,
    elClassName: PropTypes.string
};

TD.defaultProps = {
    children: <></>,
    elClassName: ''
};

export default React.memo(TD);