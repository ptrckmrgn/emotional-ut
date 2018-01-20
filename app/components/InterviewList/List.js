import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const mapList = (props) => {
    return _.map(props.interviews, (interview, id) => {
        return (
            <div className="column is-3" key={id}>
                <div className="tile is-parent">
                    <Link to={`/interview/${id}`} className="tile is-child notification is-info">
                        <h3>{interview.name}</h3>
                    </Link>
                </div>
            </div>
        );
    });
}

const List = (props) => {
    return (
        <div className="columns is-multiline">
            {mapList(props)}
        </div>
    );
}

export default List;